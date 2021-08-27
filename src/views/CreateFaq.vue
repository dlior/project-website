<template>
  <Header />

  <div class="space-y-6 sm:px-28 mx-4 md:px-30 lg:px-60" dir="rtl">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            פרטי השאלה והתשובה
          </h3>

          <!-- error alerts -->
          <div v-show="error.err && !success" class="mt-4" dir="rtl">
            <Alert>
              <h3 class="text-sm font-medium text-red-700 mr-2">
                {{ error.msg }}
              </h3>
            </Alert>
          </div>

          <!-- success alerts -->
          <div v-show="success" class="mt-4" dir="rtl">
            <Success>
              <h3 class="text-sm font-medium text-green-800">
                תשובה נוספה בהצלחה!
              </h3>
            </Success>
          </div>
        </div>

        <!-- create faq form -->
        <div class="mt-5 md:mt-0 md:col-span-2 text-sm">
          <form>
            <div class="grid grid-cols-6 gap-6">
              <!-- question -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="question"
                  class="block text-sm font-medium text-gray-700"
                  >שאלה</label
                >
                <input
                  v-model.trim="faq.q"
                  type="text"
                  name="question"
                  id="question"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                  placeholder="האם קיים חיסון למחלת הקורונה?"
                  required=""
                />
                <span class="mb-2 mr-2 text-red-500 italic" v-if="!faq.q.length"
                  >שדה חובה!</span
                >
              </div>
            </div>

            <div>
              <!-- answer -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="answer"
                  class="block text-sm font-medium text-gray-700 mt-2"
                >
                  תשובה
                </label>
                <div class="mt-1">
                  <textarea
                    v-model.trim="faq.a"
                    id="answer"
                    name="answer"
                    rows="7"
                    class="
                      shadow-sm
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      sm:text-sm
                      border border-gray-300
                      rounded-md
                      wrap
                    "
                    placeholder="בחודשים האחרונים בוצעו ניסויים קליניים ופותחו חיסונים לנגיף הקורונה על ידי מספר חברות."
                    required=""
                  />
                  <span
                    class="mb-2 mr-2 text-red-500 italic"
                    v-if="!faq.a.length"
                    >שדה חובה!</span
                  >
                </div>
              </div>

              <!-- link -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="link"
                  class="block text-sm font-medium text-gray-700 mt-2"
                  >קישור</label
                >
                <input
                  v-model="faq.link"
                  type="text"
                  name="link"
                  id="link"
                  class="
                    text-left
                    mt-1
                    mb-3
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                  placeholder=".../https://facebook.com"
                />
              </div>

              <!-- tags (optional) -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="tags"
                  class="block text-sm font-medium text-gray-700 mt-2"
                  >תגיות (אופציונלי)</label
                >
                <input
                  v-model.trim="faq.tags"
                  type="text"
                  name="tags"
                  id="tags"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                  placeholder="בדיקות,אבחנה,טיפול"
                  required=""
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- submit and reset form buttons -->
    <div class="flex justify-end mt-10">
      <button
        type="button"
        class="
          ml-3
          inline-flex
          justify-center
          py-2
          px-4
          border border-transparent
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-white
          bg-indigo-600
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          mb-2
        "
        @click="submitForm"
      >
        אישור
      </button>
      <button
        type="button"
        class="
          bg-white
          py-2
          px-4
          border border-gray-300
          rounded-md
          shadow-sm
          text-sm
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          mb-2
        "
        @click="resetForm, $router.go(-1)"
      >
        חזרה
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Success from '@/components/Success.vue';
import Alert from '@/components/Alert.vue';

export default {
  name: 'CreateFaq',
  components: { Header, Success, Alert },

  setup() {
    const store = useStore();
    const faq = reactive({ q: '', a: '', link: '', tags: '' });
    const clicked = ref(false);
    const error = computed(() => store.getters.getError);

    onUnmounted(() => {
      store.commit('setSuccess', false);
      store.commit('setError', {});
    });

    return {
      faq,
      clicked,
      error,
      success: computed(() => store.getters.getSuccess),

      resetForm: () => {
        for (const prop in faq) faq[prop] = '';
        clicked.value = false;
      },

      submitForm: () => {
        clicked.value = true;

        faq.tags += '';
        faq.tags = faq.tags.split(',');

        if (faq.q.length && faq.a.length) {
          store.dispatch('createFaqAction', {
            ...faq,
          });
          for (const prop in faq) faq[prop] = '';
        } else if (clicked.value) {
          store.commit('setError', { err: true, msg: 'קיימות שגיאות בטופס' });
          clicked.value = false;
        }
      },
    };
  },
};
</script>
