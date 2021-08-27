<template>
  <div class="bg-gray-100 py-4 px-3 rounded-lg m-4" dir="rtl">
    <!-- clipboard copy button -->
    <div class="flex justify-start">
      <button class="mb-2 focus:outline-none pl-2" @click="copyAnswer">
        <ClipboardCopyIcon class="h-5 w-5 text-gray-600 hover:text-blue-500" />
      </button>

      <!-- edit and delete buttons -->
      <div
        v-show="
          (faq.creator.email === $store.state.user.email && !faq.approved) ||
          $store.state.role === 'מדען'
        "
        class="flex"
      >
        <router-link
          :to="{ name: 'EditFaq', params: { id: faq.docID } }"
          class="mb-2 focus:outline-none pl-2"
        >
          <PencilAltIcon class="h-5 w-5 text-gray-600 hover:text-green-600" />
        </router-link>
        <Modal :document="'faq'" @deleteFaqDoc="deleteFaq">
          <TrashIcon class="h-5 w-5 text-gray-600 hover:text-black" />
        </Modal>
      </div>
    </div>
    <div
      v-show="clicked"
      class="bg-gray-800 text-white text-center rounded -mt-1 w-12"
    >
      הועתק!
    </div>

    <!-- question -->
    <h1
      class="
        font-bold
        text-green-900
        mb-2
        overflow-ellipsis overflow-hidden
        text-lg
      "
    >
      {{ faq.q }}
    </h1>

    <!-- answer -->
    <article class="text-sm font-medium">
      {{ faq.a }}
    </article>

    <!-- additional information panel -->
    <div class="bg-white rounded-2xl mt-4 text-gray-800">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            px-4
            py-2
            text-sm
            font-semibold
            text-left
            bg-gray-200
            rounded-lg
            hover:bg-gray-300
            focus:outline-none
          "
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
            <span class="font-semibold ml-1">תגיות:</span>
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
            <span class="font-semibold mx-1">{{ faq.creator.name }}</span>
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
          <div v-show="!faq.approved" class="text-red-500 font-semibold">
            <span>תשובה ממתינה לאישור</span>
          </div>

          <!-- link -->
          <div>
            <p v-if="faq.link.length && !faq.approved">
              <a :href="faq.link" target="_blank" class="font-semibold ml-1"
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
