<template>
  <div
    class="flex items-center justify-center min-h-screen px-4 py-12  bg-gray-50 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <!-- logo -->
      <div>
        <img
          class="w-auto h-12 mx-auto"
          src="@/assets/icons/login-logo.png"
          alt="logo"
        />
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
          אתר הניהול
        </h2>
      </div>

      <!-- signin form -->
      <form class="mt-8 space-y-6" @keyup.enter="signIn">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <!-- email -->
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="user.email"
              id="email-address"
              name="email"
              type="email"
              required=""
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <!-- password -->
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="user.password"
              id="password"
              name="password"
              type="password"
              required=""
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <!-- forgot password? -->
        <div class="flex items-center justify-center">
          <div class="text-sm">
            <router-link
              to="/forgot_password"
              class="font-medium text-indigo-600  hover:text-indigo-500 focus:outline-none"
            >
              ?שכחת סיסמה
            </router-link>
          </div>
        </div>

        <!-- signin button -->
        <div>
          <button
            type="button"
            class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md  group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="signIn"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            התחבר
          </button>
        </div>

        <!-- error alert -->
        <Alert v-show="error.err">
          <h3 class="mr-2 text-sm font-medium text-red-700">
            {{ error.msg }}
          </h3>
        </Alert>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Alert from '@/components/Alert.vue';
import { LockClosedIcon } from '@heroicons/vue/solid';

export default {
  name: 'Login',
  components: { Alert, LockClosedIcon },

  setup() {
    const store = useStore();
    const user = reactive({
      email: 'lior.degu@gmail.com',
      password: 'lior123',
    });

    onMounted(() => store.dispatch('authAction'));
    onUnmounted(() => store.commit('setError', {}));

    return {
      user,
      error: computed(() => store.getters.getError),
      success: computed(() => store.getters.getSuccess),

      signIn: () => {
        store.dispatch('signInAction', {
          email: user.email,
          password: user.password,
        });
      },
    };
  },
};
</script>
