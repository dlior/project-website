<template>
  <div>
    <button
      type="button"
      @click="open = true"
      class="mb-2 focus:outline-none pl-2"
    >
      <!-- slot for trash icon -->
      <slot></slot>
    </button>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
      :open="open"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- this element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              px-4
              pt-5
              pb-4
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
            "
          >
            <div class="sm:flex sm:items-start" dir="rtl">
              <div
                class="
                  mx-auto
                  flex-shrink-0 flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-full
                  bg-red-100
                  sm:mx-0 sm:h-10 sm:w-10
                "
              >
                <ExclamationIcon
                  class="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div
                class="
                  mt-3
                  text-center
                  sm:mt-0 sm:ml-4 sm:text-left
                  md:text-right
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900 mr-4"
                >
                  מחיקת מסמך
                </DialogTitle>
                <div class="mt-2 mr-4">
                  <p class="text-sm text-gray-500">
                    האם אתה בטוח שאתה רוצה למחוק מסמך זה?
                  </p>
                </div>
              </div>
            </div>

            <!-- confirmation butttons -->
            <div
              class="
                mt-5
                sm:mt-4 sm:flex sm:flex-row-reverse
                md:flex-row md:flex-justify-end md:ml-4
              "
            >
              <button
                type="button"
                class="
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  bg-red-600
                  text-base
                  font-medium
                  text-white
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-red-500
                  sm:ml-3 sm:w-auto sm:text-sm
                  md:mr-4
                "
                @click="
                  (open = false),
                    document === 'faq'
                      ? $emit('deleteFaqDoc')
                      : $emit('deleteVolunteerDoc')
                "
              >
                כן, מחק
              </button>
              <button
                type="button"
                class="
                  mt-3
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                  sm:mt-0 sm:w-auto sm:text-sm
                "
                @click="open = false"
                ref="cancelButtonRef"
              >
                ביטול
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

export default {
  name: 'Modal',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
  },

  props: {
    document: {
      type: String,
      required: false,
    },
  },

  emits: ['deleteFaqDoc', 'deleteVolunteerDoc'],

  setup(props) {
    const open = ref(false);

    return {
      props,
      open,
    };
  },
};
</script>
