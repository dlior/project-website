<template>
  <div class="mb-10 md:mb-15 lg:mb-20">
    <!-- disclosure -->
    <Disclosure as="nav" class="bg-gray-800 w-full" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8" dir="rtl">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex items-center px-2 lg:px-0">
            <!-- logo icon -->
            <div class="flex-shrink-0">
              <a href="https://www.midaat.org.il" target="_blank">
                <img
                  class="hidden lg:block h-6 w-auto"
                  src="@/assets/icons/logo.png"
                  alt="logo"
                />
              </a>
            </div>

            <!-- navigation -->
            <div class="hidden lg:block lg:mr-6">
              <div class="flex space-x-4">
                <router-link
                  to="/"
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                    ml-4
                  "
                  >לוח</router-link
                >
                <router-link
                  to="/faqs"
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >שאלות ותשובות</router-link
                >
                <router-link
                  to="/my_faqs"
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >התשובות שלי</router-link
                >
                <router-link
                  v-show="userInfo.role === 'מדען'"
                  to="/pending_approval"
                  class="
                    relative
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                >
                  <span
                    v-show="pendingApprovalFaqs.length"
                    class="
                      absolute
                      -top-1
                      -right-2
                      px-1.5
                      py-0.5
                      rounded-full
                      text-xs
                      font-medium
                      bg-indigo-500
                      text-white
                    "
                  >
                    {{ pendingApprovalFaqs.length }}
                  </span>
                  תשובות ממתינות לאישור</router-link
                >
                <router-link
                  to="/tweets"
                  class="
                    relative
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                >
                  <span
                    v-show="tweets.length"
                    class="
                      absolute
                      -top-1
                      -right-2
                      px-1.5
                      py-0.5
                      rounded-full
                      text-xs
                      font-medium
                      bg-indigo-500
                      text-white
                    "
                  >
                    {{ tweets.length }}
                  </span>
                  ציוצים ממתינים לתגובה
                </router-link>
                <router-link
                  v-show="userInfo.role === 'מנהל'"
                  to="/volunteers"
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >מתנדבים</router-link
                >
                <router-link
                  v-show="userInfo.role === 'מדען'"
                  to="/settings"
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-2
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >הגדרות</router-link
                >
              </div>
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- mobile menu button -->
            <DisclosureButton
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
                -mr-4
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <!-- search input -->
          <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="max-w-lg w-full lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="
                    absolute
                    inset-y-0
                    right-0
                    pr-3
                    flex
                    items-center
                    pointer-events-none
                  "
                >
                  <SearchIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  v-model="phrase"
                  dir="rtl"
                  id="search"
                  name="search"
                  class="
                    block
                    w-full
                    pr-10
                    pl-3
                    py-2
                    border border-transparent
                    rounded-md
                    leading-5
                    bg-gray-700
                    text-gray-300
                    placeholder-gray-400
                    focus:outline-none
                    focus:bg-white
                    focus:border-white
                    focus:ring-white
                    focus:text-gray-900
                    sm:text-sm
                  "
                  placeholder="חיפוש"
                  type="search"
                />
              </div>
            </div>
          </div>

          <!-- logo icon -->
          <div class="flex-shrink-0 px-2">
            <a href="https://www.midaat.org.il" target="_blank">
              <img
                class="block lg:hidden h-6 w-auto"
                src="@/assets/icons/logo.png"
                alt="logo"
              />
            </a>
          </div>

          <!-- menu lg screen -->
          <div class="hidden lg:block lg:ml-4">
            <div class="flex items-center">
              <!-- profile dropdown -->
              <Menu as="div" class="mr-4 relative flex-shrink-0">
                <div>
                  <MenuButton
                    class="
                      bg-gray-800
                      rounded-full
                      flex
                      text-sm text-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-offset-gray-800
                      focus:ring-white
                    "
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="userInfo.photoURL"
                      alt="avatar"
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="
                      origin-top-right
                      absolute
                      right-0
                      mt-2
                      w-36
                      rounded-md
                      shadow-lg
                      py-1
                      bg-white
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <MenuItem v-slot="{ active }">
                      <p
                        :class="[
                          active ? 'bg-white' : '',
                          'block px-4 py-2 text-sm',
                        ]"
                      >
                        שלום {{ userInfo.displayName }}
                      </p>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <router-link
                        to="/login"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        @click="signOut"
                        >התנתק</router-link
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <!-- mobile menu dropdown -->
      <DisclosurePanel class="h-3/4" dir="rtl">
        <!-- navigation -->
        <div class="pt-2 pb-3 space-y-1 flex flex-col">
          <router-link
            to="/"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/home.svg"
              class="h-6 w-6 ml-2"
              alt="home"
            />
            <span>לוח</span>
          </router-link>
          <router-link
            to="/faqs"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/collection.svg"
              class="h-6 w-6 ml-2"
              alt="collection"
            />
            <span>כל התשובות</span>
          </router-link>
          <router-link
            to="/my_faqs"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/document-text.svg"
              class="h-6 w-6 ml-2"
              alt="my-faqs"
            />
            <span>התשובות שלי</span>
          </router-link>

          <router-link
            v-show="userInfo.role === 'מדען'"
            to="/pending_approval"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/exclamation.svg"
              class="h-6 w-6 ml-2"
              alt="pending"
            />
            <span>תשובות ממתינות לאישור</span>
            <span
              v-show="pendingApprovalFaqs.length"
              class="
                px-1.5
                py-0.5
                mr-2
                rounded-full
                text-xs
                font-medium
                bg-indigo-500
                text-white
              "
            >
              {{ pendingApprovalFaqs.length }}
            </span>
          </router-link>

          <router-link
            to="/tweets"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/twitter-icon.svg"
              alt="twitter"
              class="h-6 w-6 ml-2"
            />

            <span>ציוצים ממתינים לתגובה</span>
            <span
              v-show="tweets.length"
              class="
                px-1.5
                py-0.5
                mr-2
                rounded-full
                text-xs
                font-medium
                bg-indigo-500
                text-white
              "
            >
              {{ tweets.length }}
            </span>
          </router-link>

          <router-link
            v-show="userInfo.role === 'מנהל'"
            to="/volunteers"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/users.svg"
              class="h-6 w-6 ml-2"
              alt="volunteers"
            />
            <span>מתנדבים</span>
          </router-link>

          <router-link
            v-show="userInfo.role === 'מדען'"
            to="/settings"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/cog.svg"
              class="h-6 w-6 ml-2"
              alt="settings"
            />
            <span>הגדרות</span>
          </router-link>

          <div class="mt-3 px-2 space-y-1">
            <button
              class="
                text-white
                bg-indigo-500
                hover:bg-indigo-600
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                inline-flex
                items-center
                mt-2
              "
              @click="$router.push('/create_faq')"
            >
              <PlusIcon class="ml-2 h-5 w-5" aria-hidden="true" />
              <span class="ml-2">הוסף תשובה</span>
            </button>
          </div>
        </div>

        <!-- user information -->
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5" dir="ltr">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8 rounded-full"
                :src="userInfo.photoURL"
                alt="avatar"
              />
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-400">
                {{ userInfo.displayName }} - {{ userInfo.role }}
              </div>
              <div class="text-sm font-medium text-gray-400">
                {{ userInfo.email }}
              </div>
            </div>
          </div>

          <!-- signout button -->
          <div class="mt-3 px-2 space-y-1">
            <button
              class="
                text-white
                bg-red-500
                hover:bg-red-700
                inline-flex
                items-center
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
              @click="signOut"
            >
              <LogoutIcon class="ml-2 h-5 w-5" aria-hidden="true" />
              <span class="ml-2">התנתק</span>
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { SearchIcon } from '@heroicons/vue/solid';
import { MenuIcon, XIcon, LogoutIcon, PlusIcon } from '@heroicons/vue/outline';

export default {
  name: 'Header',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    SearchIcon,
    XIcon,
    LogoutIcon,
    PlusIcon,
  },

  setup() {
    const store = useStore();
    const open = ref(false);
    const phrase = ref('');

    onMounted(() => store.commit('updateSearchPhrase', phrase));

    watch(phrase, (newVal) => store.commit('updateSearchPhrase', newVal));

    return {
      open,
      phrase,
      userInfo: computed(() => store.getters.getUserInfo),
      pendingApprovalFaqs: computed(() =>
        store.getters.getPendingApprovalFaqs(store.state.searchPhrase),
      ),
      tweets: computed(() => store.getters.getTweets),

      signOut: () => store.dispatch('signOutAction'),
    };
  },
};
</script>
