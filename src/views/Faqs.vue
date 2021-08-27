<template>
  <Header />

  <div class="flex flex-col sm:px-28 md:px-30 lg:px-60" dir="rtl">
    <div class="flex-shrink-0">
      <router-link
        to="/create_faq"
        class="
          relative
          inline-flex
          items-center
          px-4
          py-2
          mb-2
          mr-4
          border border-transparent
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-white
          bg-indigo-500
          hover:bg-indigo-600
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-offset-gray-800
          focus:ring-indigo-500
        "
      >
        <PlusIcon class="ml-2 h-5 w-5" aria-hidden="true" />
        <span class="ml-2">הוסף תשובה</span>
      </router-link>
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

    <Faq v-for="(faq, index) in faqs" :key="index" :faq="faq" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { PlusIcon, EmojiSadIcon } from '@heroicons/vue/outline';
import Header from '@/components/Header.vue';
import Faq from '@/components/Faq.vue';

export default {
  name: 'Faqs',
  components: { Header, Faq, PlusIcon, EmojiSadIcon },

  setup() {
    const store = useStore();

    onMounted(() => {
      if (!store.state.faqs.length) store.dispatch('fetchFaqsAction');
    });

    return {
      faqs: computed(() =>
        store.getters.getFilteredFaqs(store.state.searchPhrase),
      ),
    };
  },
};
</script>
