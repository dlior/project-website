const getters = {
  getUserAuthStatus: (state) => !!state.user,

  getUserRole: (state) => state.role,

  getUserInfo: (state) => {
    if (state.user) {
      return {
        photoURL: require('@/assets/icons/avatar.png'),
        email: state.user.email,
        displayName: state.user.displayName,
        role: state.role,
      };
    } else return {};
  },

  getFilteredFaqs: (state) => (keyPhrase) => {
    const filter = new RegExp(keyPhrase, 'i');
    const approvedFaqs = state.faqs.filter((faq) => faq.approved === true);
    return approvedFaqs.filter(
      (faq) =>
        faq.q.match(filter) ||
        faq.a.match(filter) ||
        faq.tags.includes(keyPhrase),
    );
  },

  getMyFilteredFaqs: (state) => (keyPhrase) => {
    const myFaqs = state.faqs.filter(
      (faq) => faq.creator.email === state.user.email,
    );
    const filter = new RegExp(keyPhrase, 'i');
    return myFaqs.filter(
      (faq) =>
        faq.q.match(filter) ||
        faq.a.match(filter) ||
        faq.tags.includes(keyPhrase),
    );
  },

  getPendingApprovalFaqs: (state) => (keyPhrase) => {
    const faqs = state.faqs.filter((faq) => faq.approved === false);
    const filter = new RegExp(keyPhrase, 'i');
    return faqs.filter(
      (faq) =>
        faq.q.match(filter) ||
        faq.a.match(filter) ||
        faq.tags.includes(keyPhrase),
    );
  },

  getFaq: (state) => (id) => state.faqs.find((faq) => faq.docID === id),

  getFilteredVolunteers: (state) => (keyPhrase) => {
    const filter = new RegExp(keyPhrase, 'i');
    return state.volunteers.filter((volunteer) => {
      const name = volunteer.firstName + ' ' + volunteer.lastName;
      return name.match(filter);
    });
  },

  getVolunteer: (state) => (id) =>
    state.volunteers.find((volunteer) => volunteer.docID === id),

  getTweets: (state) => state.tweets,

  getTwitterSearchWords: (state) => state.twitterSearchWords,

  getDownloadLink: (state) => state.downloadLink,

  getError: (state) => state.error,

  getSuccess: (state) => state.success,
};

export default getters;
