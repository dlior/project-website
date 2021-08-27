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
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          אתר הניהול
        </h2>
      </div>

      <!-- signin form -->
      <form class="mt-8 space-y-6" @keyup.enter="signIn">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- email -->
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="user.email"
              id="email-address"
              name="email"
              type="email"
              required=""
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Email address"
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
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Password"
            />
          </div>
        </div>

        <!-- forgot password? -->
        <div class="flex items-center justify-center">
          <div class="text-sm">
            <router-link
              to="/forgot_password"
              class="
                font-medium
                text-indigo-600
                hover:text-indigo-500
                focus:outline-none
              "
            >
              ?שכחת סיסמה
            </router-link>
          </div>
        </div>

        <!-- signin button -->
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
            @click="signIn"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            התחבר
          </button>
        </div>

        <!-- error alert -->
        <Alert v-show="error.err">
          <h3 class="text-sm font-medium text-red-700 mr-2">
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
      email: '',
      password: '',
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
