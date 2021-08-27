const mutations = {
  clearState: (state) => {
    state.user = null;
    state.role = null;
    state.faqs = [];
    state.volunteers = [];
    state.tweets = [];
    state.twitterSearchWords = [];
    state.downloadLink = null;
    state.searchPhrase = '';
    state.error = {};
    state.success = false;
    localStorage.clear();
  },

  setUser: (state, payload) => (state.user = payload),

  setRole: (state, payload) => (state.role = payload),

  setFaqs: (state, payload) => (state.faqs = payload),

  setVolunteers: (state, payload) => (state.volunteers = payload),

  setTweets: (state, payload) => (state.tweets = payload),

  setTwitterSearchWords: (state, payload) =>
    (state.twitterSearchWords = payload),

  setDownloadLink: (state, payload) => (state.downloadLink = payload),

  updateSearchPhrase: (state, payload) => (state.searchPhrase = payload),

  setError: (state, payload) => (state.error = { ...payload }),

  setSuccess: (state, payload) => (state.success = payload),
};

export default mutations;
