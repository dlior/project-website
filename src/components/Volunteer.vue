<template>
  <tr>
    <!-- user information -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div>
          <div class="text-sm font-medium text-gray-900 capitalize">
            {{ volunteer.firstName + ' ' + volunteer.lastName }}
          </div>
          <div class="text-sm text-gray-500">
            {{ volunteer.email }}
          </div>
        </div>
      </div>
    </td>

    <!-- user title -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ volunteer.title }}</div>
      <div class="text-sm text-gray-500">
        {{ volunteer.position }}
      </div>
    </td>

    <!-- user status -->
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        v-if="volunteer.active"
        class="
          px-2
          inline-flex
          text-xs
          leading-5
          font-semibold
          rounded-full
          bg-green-100
          text-green-800
        "
      >
        פעיל
      </span>
      <span
        v-else
        class="
          px-2
          inline-flex
          text-xs
          leading-5
          font-semibold
          rounded-full
          bg-red-100
          text-red-800
        "
      >
        לא פעיל
      </span>
    </td>

    <!-- user role -->
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ volunteer.role }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
      <router-link
        :to="{ name: 'EditVolunteer', params: { id: volunteer.docID } }"
        class="text-indigo-600 hover:text-indigo-900"
        ><PencilAltIcon class="h-5 w-5 text-gray-600 hover:text-black" />
      </router-link>
    </td>
    <td class="pl-4 pt-5 py-4 whitespace-nowrap text-left text-sm font-medium">
      <Modal :document="'volunteer'" @deleteVolunteerDoc="deleteVolunteer">
        <TrashIcon class="h-5 w-5 text-gray-600 hover:text-black" />
      </Modal>
    </td>
  </tr>
</template>

<script>
import { useStore } from 'vuex';
import Modal from '@/components/Modal.vue';
import { PencilAltIcon, TrashIcon } from '@heroicons/vue/outline';

export default {
  name: 'Volunteer',
  components: { Modal, PencilAltIcon, TrashIcon },

  props: {
    volunteer: {
      type: Object,
      required: true,
      default: null,
    },
  },

  setup(props) {
    const store = useStore();

    return {
      props,

      deleteVolunteer: () =>
        store.dispatch('deleteVolunteerAction', props.volunteer),
    };
  },
};
</script>
