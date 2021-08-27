<template>
  <Header />

  <div
    id="dashboard"
    class="flex flex-col m-4 px-3 sm:px-28 md:px-30 lg:px-60"
    dir="rtl"
  ></div>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      text-xl text-gray-700
      font-bold
    "
    dir="rtl"
  >
    <p>ברוכים הבאים לאתר הניהול.</p>
    <p class="">האתר נועד לשרת את מתנדבי עמותת מדעת.</p>
    <div class="flex flex-col justify-center mt-10 text-base fonte-semibold">
      <p class="mb-5">האתר משמש לנושאים הבאים:</p>
      <ul class="text-base">
        <li>1. עריכה והוספת שאלות ותשובות</li>
        <li>2. עריכה והוספת מתנדבים</li>
        <li>3. עריכה והוספת מילות חיפוש ב Twitter</li>
      </ul>
    </div>
    <div class="flex justify-center items-center text-gray-800 text-lg mt-10">
      <img
        src="@/assets/icons/google-chrome-icon.svg"
        class="w-5 h-5 ml-2 inline"
        alt="google-chrome"
      />
      <button class="focus:outline-none">
        <a :href="downloadLink" target="_blank">
          <span class="text-base">הורד את התוסף לדפדפן גוגל כרום </span>
          <DownloadIcon class="mr-2 h-5 w-5 inline" aria-hidden="true" />
        </a>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { DownloadIcon } from '@heroicons/vue/outline';
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: { Header, DownloadIcon },

  setup() {
    const store = useStore();

    onMounted(() => {
      if (!store.state.faqs.length) store.dispatch('fetchFaqsAction');
      if (!store.state.tweets.length) store.dispatch('fetchTweetsAction');
      if (!store.state.twitterSearchWords.length)
        store.dispatch('fetchTwitterSearchWords');
      store.dispatch('donwloadFromBucketAction');
    });

    return {
      downloadLink: computed(() => store.getters.getDownloadLink),
    };
  },
};
</script>

<style scoped>
#dashboard {
  padding-top: 2.875rem;
}
</style>
