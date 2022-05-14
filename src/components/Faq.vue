<template>
  <div class="px-3 py-4 m-4 bg-gray-100 rounded-lg" dir="rtl">
    <!-- clipboard copy button -->
    <div class="flex justify-start">
      <button class="pl-2 mb-2 focus:outline-none" @click="copyAnswer">
        <ClipboardCopyIcon class="w-5 h-5 text-gray-600 hover:text-blue-500" />
      </button>

      <!-- edit and delete buttons -->
      <div
        v-show="
          (faq.creator.email === $store.state.user.email && !faq.approved) ||
          $store.state.role != 'מתנדב'
        "
        class="flex"
      >
        <router-link
          :to="{ name: 'EditFaq', params: { id: faq.docID } }"
          class="pl-2 mb-2 focus:outline-none"
        >
          <PencilAltIcon class="w-5 h-5 text-gray-600 hover:text-green-600" />
        </router-link>
        <Modal :document="'faq'" @deleteFaqDoc="deleteFaq">
          <TrashIcon class="w-5 h-5 text-gray-600 hover:text-black" />
        </Modal>
      </div>
    </div>
    <div
      v-show="clicked"
      class="w-12 -mt-1 text-center text-white bg-gray-800 rounded"
    >
      הועתק!
    </div>

    <!-- question -->
    <h1
      class="mb-2 overflow-hidden text-lg font-bold text-green-900  overflow-ellipsis"
    >
      {{ faq.q }}
    </h1>

    <!-- answer -->
    <article class="text-sm font-medium">
      {{ faq.a }}
    </article>

    <!-- additional information panel -->
    <div class="mt-4 text-gray-800 bg-white rounded-2xl">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left bg-gray-200 rounded-lg  hover:bg-gray-300 focus:outline-none"
        >
          <span>פרטים נוספים</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-xs font-medium">
          <!-- tags -->
          <div class="text-indigo-800">
            <span class="ml-1 font-semibold">תגיות:</span>
            <ul
              v-for="(tag, index) in faq.tags"
              :key="index"
              class="inline-flex flex-wrap ml-2"
            >
              <li v-if="tag.length">
                {{ '#' + tag.split(' ').join('_') }}
              </li>
            </ul>
          </div>

          <!-- creator -->
          <div class="text-blue-600">
            <span>תשובה נכתבה ע״י</span>
            <span class="mx-1 font-semibold">{{ faq.creator.name }}</span>
            <span
              >בתאריך
              {{
                new Date(faq.creator.timestamp.seconds * 1000)
                  .toISOString()
                  .replace(/T.*/, '')
                  .split('-')
                  .reverse()
                  .join('.')
              }}
            </span>
          </div>

          <!-- pending approval -->
          <div v-show="!faq.approved" class="font-semibold text-red-500">
            <span>תשובה ממתינה לאישור</span>
          </div>

          <!-- link -->
          <div>
            <p v-if="faq.link.length && !faq.approved">
              <a :href="faq.link" target="_blank" class="ml-1 font-semibold"
                >קישור</a
              >
            </p>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Modal from '@/components/Modal.vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/solid';
import {
  ClipboardCopyIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/vue/outline';
import useClipboard from 'vue-clipboard3';

export default {
  name: 'Faq',
  components: {
    Modal,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    ClipboardCopyIcon,
    PencilAltIcon,
    TrashIcon,
  },

  props: {
    faq: {
      type: Object,
      required: true,
      default: null,
    },
  },

  setup(props) {
    const store = useStore();
    const clicked = ref(false);
    const { toClipboard } = useClipboard();

    const copyAnswer = async () => {
      clicked.value = true;
      setTimeout(() => (clicked.value = false), 800);
      try {
        await toClipboard(props.faq.a);
      } catch (err) {
        console.log(err.message);
      }
    };

    return {
      props,
      clicked,
      copyAnswer,

      deleteFaq: () => store.dispatch('deleteFaqAction', props.faq.docID),
    };
  },
};
</script>
