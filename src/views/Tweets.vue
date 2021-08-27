<template>
  <Header />

  <div class="flex flex-col sm:px-28 md:px-30 lg:px-60" dir="rtl">
    <Tweet v-for="(tweet, index) in tweets" :key="index" :tweet="tweet" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Tweet from '@/components/Tweet.vue';

export default {
  name: 'Tweets',
  components: { Header, Tweet },

  setup() {
    const store = useStore();

    onMounted(() => {
      if (!store.state.tweets.length) store.dispatch('fetchTweetsAction');
    });

    return {
      tweets: computed(() => store.getters.getTweets),
    };
  },
};
</script>
