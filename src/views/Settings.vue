<template>
  <Header />

  <div class="flex flex-col sm:px-28 md:px-30 lg:px-60" dir="rtl">
    <div class="flex-shrink-0">
      <button
        class="
          relative
          inline-flex
          items-center
          px-4
          py-2
          mb-4
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
        @click="add = !add"
      >
        <PlusIcon class="ml-2 h-5 w-5" aria-hidden="true" />
        <span class="ml-2">הוסף מילות חיפוש</span>
      </button>
    </div>
    <div v-if="add" class="px-4">
      <input
        v-model="words"
        type="text"
        class="w-full rounded"
        placeholder="קורונה,חיסונים,..."
      />
    </div>
  </div>
  <div
    class="
      grid grid-cols-2
      gap-6
      sm:grid-cols-4
      md:grid-cols-6
      lg:grid-cols-10
      sm:px-28
      md:px-30
      lg:px-60
      mx-4
    "
    dir="rtl"
  >
    <div v-for="(searchWord, index) in searchWords" :key="index">
      <fieldset class="space-y-5">
        <legend class="sr-only">Search words</legend>
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input
              id="search-word"
              name="search-word"
              type="checkbox"
              class="
                focus:ring-indigo-500
                h-4
                w-4
                text-indigo-600
                border-gray-300
                rounded
              "
              :value="searchWord.status"
              v-model="searchWord.status"
              :checked="searchWord.status"
            />
          </div>
          <div class="mr-2 text-sm">
            <label
              for="search-word"
              class="
                font-medium
                text-gray-700
                overflow-ellipsis overflow-hidden
              "
              >{{ searchWord.tag }}</label
            >
          </div>
        </div>
      </fieldset>
    </div>
  </div>
  <div class="flex mt-20 justify-center space-x-6">
    <button
      class="px-4 py-2 rounded border bg-indigo-600 text-white shadow-lg"
      @click="save"
    >
      שמור
    </button>
    <button class="px-4 py-2 rounded border" @click="$router.go(-1)">
      חזור
    </button>
  </div>
  <!-- success alerts -->
  <div v-show="success" class="mt-4 px-28" dir="rtl">
    <Success>
      <h3 class="text-sm font-medium text-green-800">הגדרות עודכנו!</h3>
    </Success>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Success from '@/components/Success.vue';
import { PlusIcon } from '@heroicons/vue/outline';

export default {
  name: 'Settings',
  components: { Header, Success, PlusIcon },

  setup() {
    const store = useStore();
    const add = ref(false);
    const words = ref('');
    const searchWords = computed(() => store.getters.getTwitterSearchWords);

    onMounted(() => {
      if (!store.state.volunteers.length)
        store.dispatch('fetchTwitterSearchWords');
    });

    onUnmounted(() => store.commit('setSuccess', false));

    return {
      add,
      words,
      searchWords,
      success: computed(() => store.getters.getSuccess),
      save: () => {
        words.value = words.value.split(', ');
        words.value = words.value
          .map((word) => word.split(' ').join('_'))
          .map((word) => {
            return { tag: word, status: true };
          });
        store.dispatch('updateSearchWords', {
          old: searchWords.value,
          new: words.value,
        });
        words.value = '';
      },
    };
  },
};
</script>
