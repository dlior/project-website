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
              <p class="text-sm font-medium text-green-800">
                מתנדב נוצר בהצלחה!
              </p>
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
                  v-model="volunteer.firstName"
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
                  placeholder="ישראל"
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteer.firstName.length"
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
                  v-model="volunteer.lastName"
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
                  placeholder="ישראלי"
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteer.lastName.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- ID number -->
              <div class="col-span-6 sm:col-span-3">
                <label for="id" class="block text-sm font-medium text-gray-700"
                  >מספר זהות</label
                >
                <input
                  v-model="volunteer.id"
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
                  placeholder="123456789"
                  required="required"
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!String(volunteer.id).length"
                  >שדה חובה!</span
                >
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="
                    (/^[0-9].{8,}/.test(volunteer.id) != true &&
                      String(volunteer.id).length > 0) ||
                    String(volunteer.id).length > 9
                  "
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
                  v-model="volunteer.phone"
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
                  placeholder="050-1234567"
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteer.phone.length"
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
                  v-model="volunteer.email"
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
                  placeholder="israel@mail.com"
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteer.email.length"
                  >שדה חובה!</span
                >
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="
                    /.+@.+/.test(volunteer.email) != true &&
                    volunteer.email.length
                  "
                  >אימייל לא תקין!</span
                >
              </div>

              <!-- password -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                  >סיסמה</label
                >
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
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
                  v-if="!password.length"
                  >שדה חובה!</span
                >
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="/.{6,}/.test(password) != true && password.length"
                  >סיסמה חייבת להכיל 6 תווים לפחות!</span
                >
              </div>

              <!-- password repeat -->
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="password_repeat"
                  class="block text-sm font-medium text-gray-700"
                  >חזור על הסיסמה</label
                >
                <input
                  v-model="passwordRepeat"
                  type="password"
                  name="password_repeat"
                  id="password_repeat"
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
                  v-if="!passwordRepeat.length"
                  >שדה חובה!</span
                >

                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="passwordRepeat !== password"
                  >סיסמאות לא זהות!</span
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
                  v-model="volunteer.position"
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
                  placeholder="עורך תוכן"
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!volunteer.position.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- role -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="role"
                  class="block text-sm font-medium text-gray-700"
                  >הרשאה</label
                >
                <select
                  v-model="volunteer.role"
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
                  <option>מתנדב</option>
                  <option>מדען</option>
                  <option>מנהל</option>
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
        @click="resetForm, $router.go(-1)"
      >
        חזרה
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';
import Success from '@/components/Success.vue';

export default {
  name: 'CreateVolunteer',
  components: { Header, Alert, Success },

  setup() {
    const store = useStore();
    const volunteer = reactive({
      firstName: '',
      lastName: '',
      id: '',
      phone: '',
      email: '',
      position: '',
      role: '',
    });
    const clicked = ref(false);
    const password = ref('');
    const passwordRepeat = ref('');
    const validationErrors = ref(false);
    const error = computed(() => store.getters.getError);

    onUnmounted(() => {
      store.commit('setSuccess', false);
      store.commit('setError', {});
    });

    return {
      volunteer,
      clicked,
      password,
      passwordRepeat,
      validationErrors,
      error,
      success: computed(() => store.getters.getSuccess),

      resetForm: () => {
        for (const prop in volunteer) volunteer[prop] = '';
        validationErrors.value = false;
        clicked.value = false;
      },

      submitForm: () => {
        clicked.value = true;
        validationErrors.value = false;
        if (
          !volunteer.firstName.length ||
          !volunteer.lastName.length ||
          !String(volunteer.id).length ||
          String(volunteer.id).length > 9 ||
          /^[0-9].{8,}/.test(volunteer.id) != true ||
          !volunteer.phone.length ||
          !volunteer.email.length ||
          /.+@.+/.test(volunteer.email) != true ||
          /.{6,}/.test(password.value) != true ||
          passwordRepeat.value !== password.value ||
          !volunteer.position.length
        )
          validationErrors.value = true;
        if (!validationErrors.value) {
          store.dispatch('createVolunteerAction', {
            volunteerInfo: volunteer,
            password: password.value,
          });
          validationErrors.value = false;
        } else if (clicked.value) {
          store.commit('setError', { err: true, msg: 'קיימות שגיאות בטופס' });
          clicked.value = false;
          passwordRepeat.value = '';
        }
      },
    };
  },
};
</script>
