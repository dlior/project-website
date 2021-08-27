<template>
  <Header />

  <div
    id="faqs"
    class="flex flex-col -mt-12 sm:px-28 md:mt-12 md:px-30 lg:px-60 lg:mt-12"
    dir="rtl"
  >
    <div>
      <div
        v-if="!faqs.length && !$store.state.searchPhrase.length"
        class="flex flex-col justify-center items-center mt-20"
      >
        <QuestionMarkCircleIcon
          class="h-10 w-10 text-indigo-500 group-hover:text-indigo-500"
          aria-hidden="true"
        />
        <p class="mt-5 text-base">לא מצאנו תשובות שאתה כתבת...</p>
        <p class="mt-1 text-base">
          מעוניין להוסיף תשובה?
          <span
            ><router-link to="/create_faq" class="text-blue-500"
              >לחץ כאן</router-link
            ></span
          >
        </p>
      </div>

      <div
        v-if="!faqs.length && $store.state.searchPhrase.length"
        class="flex flex-col justify-center items-center mt-20"
      >
        <EmojiSadIcon
          class="h-10 w-10 text-indigo-500 group-hover:text-indigo-500"
          aria-hidden="true"
        />
        <p class="mt-5 text-base">לא נמצאו תשובות רלוונטיות</p>
      </div>
    </div>

    <Faq v-for="(faq, index) in faqs" :key="index" :faq="faq" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Faq from '@/components/Faq.vue';
import { QuestionMarkCircleIcon, EmojiSadIcon } from '@heroicons/vue/outline';

export default {
  name: 'MyFaqs',
  components: { Header, Faq, QuestionMarkCircleIcon, EmojiSadIcon },

  setup() {
    const store = useStore();

    onMounted(() => {
      if (!store.state.faqs.length) store.dispatch('fetchFaqsAction');
    });

    return {
      faqs: computed(() =>
        store.getters.getMyFilteredFaqs(store.state.searchPhrase),
      ),
    };
  },
};
</script>

<style scoped>
#faqs {
  padding-top: 2.875rem;
}
</style>
