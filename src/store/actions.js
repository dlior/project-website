import router from '@/router';
import store from '.';
import firebase from 'firebase/app';
import '@/plugins/firebase';

const auth = firebase.auth();
const db = firebase.firestore();

const actions = {
  signInAction: (ctx, payload) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((authUser) => ctx.commit('setUser', authUser.user))
      .catch((err) => ctx.commit('setError', { err: true, msg: err.message }));
  },

  resetPasswordAction: (ctx, payload) => {
    firebase
      .auth()
      .sendPasswordResetEmail(payload)
      .then(() => ctx.commit('setSuccess', true))
      .catch((err) => ctx.commit('setError', { err: true, msg: err.message }));
  },

  authAction: async (ctx) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        user.getIdToken(true);
        const token = await user.getIdTokenResult();
        if (token.claims.admin) ctx.commit('setRole', 'מנהל');
        else if (token.claims.scientist) ctx.commit('setRole', 'מדען');
        else ctx.commit('setRole', 'מתנדב');
        ctx.commit('setUser', user);
        router.push('/');
      } else {
        ctx.commit('clearState');
        router.push('/login');
      }
    });
  },

  signOutAction: (ctx) => {
    auth.signOut();
    ctx.commit('clearState');
    router.push('/login');
  },

  createFaqAction: async (ctx, payload) => {
    try {
      const faqDocRef = db.collection('faqs').doc();
      const otherFields = {
        creator: {
          email: store.state.user.email,
          name: store.state.user.displayName,
          timestamp: new Date(),
        },
        lastModifiedAt: new Date(),
        approved: store.state.role !== 'מתנדב',
        docID: faqDocRef.id,
      };
      faqDocRef.set({ ...payload, ...otherFields });
      ctx.commit('setSuccess', true);
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  editFaqAction: async (ctx, payload) => {
    try {
      const faqDocRef = db.collection('faqs').doc(payload.docID.toString());
      const lastModifiedAt = firebase.firestore.FieldValue.serverTimestamp();
      if (
        !payload.approved &&
        payload.creator.email === store.state.user.email
      ) {
        faqDocRef.update({ ...payload, lastModifiedAt });
      } else if (store.state.role !== 'מתנדב') {
        if (!payload.approved) {
          payload.approved = true;
          const approver = {
            email: store.state.user.email,
            name: store.state.user.displayName,
          };
          faqDocRef.update(
            { ...payload, approver, lastModifiedAt },
            { merge: true },
          );
        } else {
          faqDocRef.update({ ...payload, lastModifiedAt }, { merge: true });
        }
      }
      ctx.commit('setSuccess', true);
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  deleteFaqAction: async (ctx, payload) => {
    try {
      await db.collection('faqs').doc(payload.toString()).delete();
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  createVolunteerAction: async (ctx, payload) => {
    try {
      const email = payload.volunteerInfo.email;
      const password = payload.password;
      const displayName =
        payload.volunteerInfo.firstName + ' ' + payload.volunteerInfo.lastName;
      const active = payload.volunteerInfo.active;
      const createVolunteer = firebase
        .functions()
        .httpsCallable('createVolunteer');
      const response = await createVolunteer({
        email,
        password,
        displayName,
        active,
      });
      if (response.data === true) {
        const ref = db.collection('volunteers').doc();
        const otherFields = {
          creator: {
            email: store.state.user.email,
            name: store.state.user.displayName,
            timestamp: new Date(),
          },
          lastModifiedAt: new Date(),
          active: true,
          docID: ref.id,
        };
        ref.set({ ...payload.volunteerInfo, ...otherFields });
        ctx.commit('setSuccess', true);
      } else
        ctx.commit('setError', {
          err: true,
          msg: response.data.errorInfo.message,
        });
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  editVolunteerAction: async (ctx, payload) => {
    try {
      const volunteerDocRef = db
        .collection('volunteers')
        .doc(payload.docID.toString());
      const lastModifiedAt = firebase.firestore.FieldValue.serverTimestamp();
      volunteerDocRef.update({ ...payload, lastModifiedAt }, { merge: true });
      ctx.commit('setSuccess', true);
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  deleteVolunteerAction: async (ctx, payload) => {
    try {
      const { docID, email } = payload;
      const deleteVolunteer = firebase
        .functions()
        .httpsCallable('deleteVolunteer');
      await deleteVolunteer({ email });
      await db.collection('volunteers').doc(docID.toString()).delete();
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  fetchFaqsAction: async (ctx) => {
    let unsubscribe;
    try {
      unsubscribe = db.collection('faqs').onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => doc.data());
        ctx.commit('setFaqs', items);
      });
    } catch (err) {
      console.log(err.message);
    }
    if (!store.state.user) unsubscribe && unsubscribe();
  },

  fetchVolunteersAction: async (ctx) => {
    let unsubscribe;
    try {
      unsubscribe = db.collection('volunteers').onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => doc.data());
        ctx.commit('setVolunteers', items);
      });
    } catch (err) {
      console.log(err.message);
    }
    if (!store.state.user) unsubscribe && unsubscribe();
  },

  fetchTweetsAction: async (ctx) => {
    const tweetsDocRef = db.collection('tweets').doc('tweets_list').get();
    tweetsDocRef
      .then((tweetsDoc) => {
        if (tweetsDoc.exists) ctx.commit('setTweets', tweetsDoc.data().tweets);
        else console.log('No such document...');
      })
      .catch((err) => console.log(err.message));
  },

  fetchTwitterSearchWords: async (ctx) => {
    const wordsDocRef = db.collection('tags').doc('tags_list').get();
    wordsDocRef
      .then((wordsDoc) => {
        ctx.commit('setTwitterSearchWords', wordsDoc.data());
      })
      .catch((err) => console.log(err.message));
  },

  updateSearchWords: async (ctx, payload) => {
    try {
      const tagsDocRef = db.collection('tags').doc('tags_list');
      tagsDocRef.update({ ...payload.old, ...payload.new }, { merge: true });
      ctx.commit('setSuccess', true);
    } catch (err) {
      ctx.commit('setError', { err: true, msg: err.message });
    }
  },

  donwloadFromBucketAction: (ctx) => {
    const storageRef = firebase.storage().ref();
    const chromeExtensionRef = storageRef.child(
      'chrome-extension/project-extension-v0.1.0-production.zip',
    );
    chromeExtensionRef
      .getDownloadURL()
      .then((url) => ctx.commit('setDownloadLink', url))
      .catch((err) => console.log(err.message));
  },
};

export default actions;
