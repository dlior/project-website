const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Twit = require('twit');
require('dotenv').config();

admin.initializeApp();

exports.createVolunteer = functions.https.onCall(async (data, context) => {
  try {
    await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      emailVerified: false,
      disabled: !data.active,
    });
    console.log(
      `Successfully created new volunteer: Name: ${data.displayName} Email: ${data.email}.`,
    );
    return true;
  } catch (err) {
    console.log(err.message);
    return err;
  }
});

exports.setCustomClaims = functions.firestore
  .document('/volunteers/{volunteer}')
  .onWrite(async (change, context) => {
    const volunteer = change.after.data();
    try {
      const volunteerRecord = await admin
        .auth()
        .getUserByEmail(volunteer.email);
      if (volunteer.active === true) {
        if (volunteer.role === 'מנהל')
          return admin
            .auth()
            .setCustomUserClaims(volunteerRecord.uid, { admin: true })
            .then(() =>
              console.log(
                `Successfully set role מנהל to volunteer: ${volunteerRecord.displayName}.`,
              ),
            )
            .catch((err) => console.log(err.message));
        else if (volunteer.role === 'מדען')
          return admin
            .auth()
            .setCustomUserClaims(volunteerRecord.uid, { scientist: true })
            .then(() =>
              console.log(
                `Successfully set role מדען to volunteer: ${volunteerRecord.displayName}.`,
              ),
            )
            .catch((err_1) => console.log(err_1.message));
        else if (volunteer.role === 'מתנדב')
          return admin
            .auth()
            .setCustomUserClaims(volunteerRecord.uid, { volunteer: true })
            .then(() =>
              console.log(
                `Successfully set role מתנדב to volunteer: ${volunteerRecord.displayName}.`,
              ),
            )
            .catch((err_2) => console.log(err_2.message));
      }
    } catch (err_3) {
      console.log(err_3.message);
      return err_3;
    }
  });

exports.disableVolunteer = functions.firestore
  .document('/volunteers/{volunteer}')
  .onWrite(async (change, context) => {
    const volunteer = change.after.data();
    try {
      const volunteerRecord = await admin
        .auth()
        .getUserByEmail(volunteer.email);
      return admin
        .auth()
        .updateUser(volunteerRecord.uid, {
          disabled:
            change.before.data() === undefined ? false : !volunteer.active,
        })
        .then(() => {
          if (change.before.data() === undefined || !volunteer.active)
            console.log(
              `Successfully disabled volunteer ${volunteerRecord.displayName}`,
            );
          else
            console.log(
              `Successfully enabled volunteer ${volunteerRecord.displayName}`,
            );
        })
        .catch((err) => err);
    } catch (err_1) {
      return err_1;
    }
  });

exports.deleteVolunteer = functions.https.onCall(async (data, context) => {
  try {
    const volunteerRecord = await admin.auth().getUserByEmail(data.email);
    try {
      await admin.auth().deleteUser(volunteerRecord.uid);
      console.log(`Successfully deleted volunteer: 
                   Name: ${volunteerRecord.displayName} Email: ${volunteerRecord.email}`);
      return true;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  } catch (err_1) {
    console.log(err_1.message);
    return err_1;
  }
});

exports.searchTweets = functions.pubsub
  .schedule('5 */12 * * *')
  .timeZone('Asia/Jerusalem')
  .onRun((context) => {
    console.log('Started...');
    const T = new Twit({
      consumer_key: process.env.CUSTOMER_KEY,
      consumer_secret: process.env.CUSTOMER_KEY_SECRET,
      access_token: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000,
    });

    const getTweets = (tags) => {
      return new Promise((resolve, reject) => {
        const today = new Date();
        let yesterday = new Date(today);

        yesterday.setDate(yesterday.getDate() - 1);
        yesterday = yesterday.toISOString().split('T')[0];

        let trueTags = [];
        for (let prop in tags) {
          if (tags[prop].status) trueTags.push(tags[prop].tag);
        }

        let q_by_tags = '';
        for (let i = 0; i < trueTags.length / 2; i++)
          q_by_tags += trueTags[i] + ' OR ';

        q_by_tags += trueTags[trueTags.length - 1];

        const params = {
          q: q_by_tags,
          filter: `-filter:[retweets,replies]`,
          since: `since:${yesterday}`,
        };

        const qs = `${params.q} ${params.filter} ${params.since}`.toString();

        T.get('search/tweets', { q: qs, count: 100 }, (err, data) => {
          if (err) return reject(err);
          return resolve(data.statuses);
        });
      });
    };

    const filterTweets = async (data) => {
      let tweets = [];
      data.forEach((tweet) => {
        if (tweet.retweeted_status) {
          tweets.push({
            text: tweet.retweeted_status.text,
            id: tweet.retweeted_status.id_str,
            followers: tweet.user.followers_count,
            friends: tweet.user.friends_count,
            retweets: tweet.retweeted_status.retweet_count,
            likes: tweet.retweeted_status.favorite_count,
          });
        } else {
          tweets.push({
            text: tweet.text,
            id: tweet.id_str,
            followers: tweet.user.followers_count,
            friends: tweet.user.friends_count,
            retweets: tweet.retweet_count,
            likes: tweet.favorite_count,
          });
        }
      });
      const seen = new Set();
      const uniqueTweets = tweets
        .filter((tweet) => {
          const duplicate = seen.has(tweet.id);
          seen.add(tweet.id);
          return !duplicate;
        })
        .filter((tweet) => tweet.retweets >= 10)
        .map((tweet) => {
          return { text: tweet.text, id: tweet.id };
        });
      return uniqueTweets;
    };

    (async () => {
      try {
        const tags = await admin
          .firestore()
          .doc('tags/tags_list')
          .get()
          .then((r) => r.data())
          .catch((err) => console.log(err));
        const rawData = await getTweets(tags);
        const tweets = await filterTweets(rawData);
        console.log(`Found ${tweets.length} tweets!`);
        try {
          await admin
            .firestore()
            .doc(`tweets/tweets_list`)
            .update({ tweets: tweets }, { merge: true });
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();

    console.log('Done.');

    return true;
  });
