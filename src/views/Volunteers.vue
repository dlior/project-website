<template>
  <Header />

  <div class="flex flex-col sm:px-28 md:px-30 lg:px-60" dir="rtl">
    <div class="flex-shrink-0 mb-4">
      <router-link
        to="/create_volunteer"
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
        <span class="ml-2">הוסף מתנדב</span>
      </router-link>
    </div>

    <div
      v-if="!volunteers.length && $store.state.searchPhrase.length"
      id="volunteers
"
      class="flex justify-center items-center"
    >
      <p>לא נמצאו מתנדבים רלוונטיים</p>
    </div>

    <!-- volunteers table -->
    <div
      class="-my-2 overflow-x-auto m-4 sm:-mx-6 md:-px-3 md:-mx-1 lg:-mx-4"
      v-show="volunteers.length"
    >
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <!-- table head -->
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-right text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  שם
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-right text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  תפקיד
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-right text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  סטאטוס
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-right text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  הרשאה
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="px-6 relative py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <!-- table data -->
            <tbody class="bg-white divide-y divide-gray-200">
              <Volunteer
                v-for="(volunteer, index) in volunteers"
                :key="index"
                :volunteer="volunteer"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { PlusIcon } from '@heroicons/vue/outline';
import Header from '@/components/Header.vue';
import Volunteer from '@/components/Volunteer.vue';

export default {
  name: 'Volunteers',
  components: { Header, Volunteer, PlusIcon },

  setup() {
    const store = useStore();

    onMounted(() => {
      if (!store.state.volunteers.length)
        store.dispatch('fetchVolunteersAction');
    });

    return {
      volunteers: computed(() =>
        store.getters.getFilteredVolunteers(store.state.searchPhrase),
      ),
    };
  },
};
</script>

<style scoped>
#volunteers {
  padding-top: 2.875rem;
}
</style>
