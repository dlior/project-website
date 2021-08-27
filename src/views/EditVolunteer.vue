<template>
  <Header />

  <div class="space-y-6 m-4 sm:px-28 md:px-30 lg:px-60" dir="rtl">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            פרטים אישיים
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
                מתנדב נערך בהצלחה!
              </h3>
            </Success>
          </div>
        </div>

        <!-- create volunteer form  -->
        <div class="mt-5 md:mt-0 md:col-span-2 text-sm">
          <form>
            <div class="grid grid-cols-6 gap-6">
              <!-- first name -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700"
                  >שם פרטי</label
                >
                <input
                  v-model="volunteerData.firstName"
                  type="text"
                  name="first_name"
                  id="first_name"
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
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteerData.firstName.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- last name  -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-700"
                  >שם משפחה</label
                >
                <input
                  v-model="volunteerData.lastName"
                  type="text"
                  name="last_name"
                  id="last_name"
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
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteerData.lastName.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- ID number -->
              <div class="col-span-6 sm:col-span-3">
                <label for="id" class="block text-sm font-medium text-gray-700"
                  >מספר זהות</label
                >
                <input
                  v-model="volunteerData.id"
                  type="number"
                  name="id"
                  id="id"
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
                  min="0"
                  max="999999999"
                  required="required"
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!String(volunteerData.id).length"
                  >שדה חובה!</span
                >
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="/^[0-9].{8,}/.test(volunteerData.id) != true"
                  >מספר זהות חייב להכיל 9 ספרות!</span
                >
              </div>

              <!-- phone -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                  >טלפון</label
                >
                <input
                  v-model="volunteerData.phone"
                  type="text"
                  name="phone"
                  id="phone"
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
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteerData.phone.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- email -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >אימייל</label
                >
                <input
                  v-model="volunteerData.email"
                  type="email"
                  name="email"
                  id="email"
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
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteerData.email.length"
                  >שדה חובה!</span
                >
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="
                    /.+@.+/.test(volunteerData.email) != true &&
                    volunteerData.email.length
                  "
                  >אימייל לא תקין!</span
                >
              </div>

              <!-- position -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="position"
                  class="block text-sm font-medium text-gray-700"
                  >תפקיד</label
                >
                <input
                  v-model="volunteerData.position"
                  type="text"
                  name="position"
                  id="position"
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
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteerData.position.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- status -->
              <div class="col-span-6 sm:col-span-3">
                <span class="block text-sm font-medium text-gray-700 mb-2"
                  >סטאטוס</span
                >
                <label for="active" class="text-sm font-medium text-gray-700"
                  >פעיל</label
                >
                <input
                  type="radio"
                  id="active"
                  class="mx-2"
                  :value="true"
                  v-model="volunteerData.active"
                  :checked="volunteerData.active"
                />
                <label
                  for="active"
                  class="text-sm font-medium text-gray-700 mr-3"
                  >לא פעיל</label
                >
                <input
                  type="radio"
                  id="not_active"
                  :value="false"
                  class="mx-2"
                  v-model="volunteerData.active"
                  :checked="!volunteerData.active"
                />
              </div>

              <!-- role -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="role"
                  class="block text-sm font-medium text-gray-700"
                  >הרשאה</label
                >
                <select
                  v-model="volunteerData.role"
                  id="role"
                  name="role"
                  class="
                    mt-1
                    block
                    w-full
                    py-2
                    px-3
                    border border-gray-300
                    bg-white
                    rounded-md
                    shadow-sm
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                    pr-10
                  "
                  required=""
                  dir="rtl"
                >
                  <option :selected="volunteerData.role === 'מנהל'">
                    מנהל
                  </option>
                  <option :selected="volunteerData.role === 'מדען'">
                    מדען
                  </option>
                  <option :selected="volunteerData.role === 'מתנדב'">
                    מתנדב
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

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
        @click="$router.go(-1)"
      >
        חזרה
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';
import Success from '@/components/Success.vue';

export default {
  name: 'EditVolunteer',
  components: { Header, Alert, Success },

  setup() {
    const store = useStore();
    const route = useRoute();
    const clicked = ref(false);
    const validationErrors = ref(false);
    const volunteerData = computed(() =>
      store.getters.getVolunteer(route.params.id),
    );
    const error = computed(() => store.getters.getError);

    onUnmounted(() => {
      store.commit('setSuccess', false);
      store.commit('setError', {});
    });

    return {
      volunteerData,
      validationErrors,
      error,
      clicked,
      success: computed(() => store.getters.getSuccess),

      submitForm: () => {
        clicked.value = true;
        validationErrors.value = 0;
        if (
          !volunteerData.value.firstName.length ||
          !volunteerData.value.lastName.length ||
          !volunteerData.value.id.length ||
          String(volunteerData.value.id).length > 9 ||
          /^[0-9].{8,}/.test(volunteerData.value.id) != true ||
          !volunteerData.value.phone.length ||
          !volunteerData.value.email.length ||
          /.+@.+/.test(volunteerData.value.email) != true ||
          !volunteerData.value.position.length
        )
          validationErrors.value = true;

        if (!validationErrors.value) {
          volunteerData.value.active = !!volunteerData.value.active;
          store.dispatch('editVolunteerAction', volunteerData.value);
          validationErrors.value = false;
        } else if (clicked.value) {
          store.commit('setError', { err: true, msg: 'קיימות שגיאות בטופס' });
          clicked.value = false;
        }
      },
    };
  },
};
</script>
