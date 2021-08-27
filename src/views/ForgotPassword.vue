<template>
  <div
    class="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <!-- logo -->
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="@/assets/icons/login-logo.png"
          alt="logo"
        />
      </div>

      <!-- forgot password form -->
      <form class="mt-8 space-y-6" @keyup.enter="signIn">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- email -->
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              required=""
              class="
                appearance-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Email address"
            />
          </div>
        </div>

        <!-- go back to login -->
        <div class="flex items-center justify-center">
          <div class="text-sm">
            <router-link
              to="/login"
              class="
                font-medium
                text-indigo-600
                hover:text-indigo-500
                focus:outline-none
              "
            >
              חזרה
            </router-link>
          </div>
        </div>

        <!-- reset password button -->
        <div>
          <button
            type="button"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
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
            "
            @click="resetPassword"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockOpenIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            איפוס סיסמה
          </button>
        </div>

        <!-- error and informative alert -->
        <Alert v-show="error.err && !success">
          <h3 class="text-sm font-medium text-red-700 mr-2">
            {{ error.msg }}
          </h3>
        </Alert>

        <Informative v-show="success" dir="rtl">
          <h3 class="text-sm font-medium text-blue-700 mr-2">
            מייל לאיפוס סיסמה נשלח ל {{ email }}
          </h3>
        </Informative>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Alert from '@/components/Alert.vue';
import Informative from '@/components/Informative.vue';
import { LockOpenIcon } from '@heroicons/vue/solid';

export default {
  name: 'ForgotPassword',
  components: { Alert, Informative, LockOpenIcon },

  setup() {
    const store = useStore();
    const email = ref('');

    onUnmounted(() => {
      store.commit('setSuccess', false);
      store.commit('setError', {});
    });

    return {
      email,
      error: computed(() => store.getters.getError),
      success: computed(() => store.getters.getSuccess),

      resetPassword: () => {
        store.dispatch('resetPasswordAction', email.value);
      },
    };
  },
};
</script>
