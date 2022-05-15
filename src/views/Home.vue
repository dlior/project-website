<template>
  <Header />

  <div
    id="dashboard"
    class="flex flex-col px-3 m-4 sm:px-28 md:px-30 lg:px-60"
    dir="rtl"
  ></div>
  <div
    class="flex flex-col items-center justify-center text-xl font-bold text-gray-700 "
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
    <div class="flex flex-col justify-center">
      <div class="flex items-center justify-center mt-10 text-lg text-gray-800">
        <img
          src="@/assets/icons/google-chrome-icon.svg"
          class="inline w-6 h-6 ml-2"
          alt="google-chrome"
        />
        <button class="focus:outline-none" disabled>
          <del>
            <a href="#">
              <span class="text-base">הורד את התוסף לדפדפן גוגל כרום</span>
              <DownloadIcon class="inline w-5 h-5 mr-2" aria-hidden="true" />
            </a>
          </del>
        </button>
      </div>
      <a :href="downloadLink" target="_blank">
        <p class="block text-base text-center">
          see chrome extension project and files in github
        </p>
      </a>
      <p class="block text-base text-center text-red-700">
        !some of the features are disabled on purpose
      </p>
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
      // downloadLink: computed(() => store.getters.getDownloadLink),
      downloadLink: 'https://github.com/dlior/project-extension',
    };
  },
};
</script>

<style scoped>
#dashboard {
  padding-top: 2.875rem;
}
</style>
