<template>
  <div class="mb-10 md:mb-15 lg:mb-20">
    <!-- disclosure -->
    <Disclosure as="nav" class="w-full bg-gray-800" v-slot="{ open }">
      <div class="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8" dir="rtl">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex items-center px-2 lg:px-0">
            <!-- logo icon -->
            <div class="flex-shrink-0">
              <a href="https://www.midaat.org.il" target="_blank">
                <img
                  class="hidden w-auto h-6 lg:block"
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
                  class="px-2 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
                  >לוח</router-link
                >
                <router-link
                  to="/faqs"
                  class="px-2 py-2 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
                  >שאלות ותשובות</router-link
                >
                <router-link
                  to="/my_faqs"
                  class="px-2 py-2 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
                  >התשובות שלי</router-link
                >
                <router-link
                  v-show="userInfo.role !== 'מתנדב'"
                  to="/pending_approval"
                  class="relative px-2 py-2 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
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
                  class="relative px-2 py-2 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
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
                  class="px-2 py-2 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
                  >מתנדבים</router-link
                >
                <router-link
                  v-show="userInfo.role !== 'מתנדב'"
                  to="/settings"
                  class="px-2 py-2 text-sm font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
                  >הגדרות</router-link
                >
              </div>
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 -mr-4 text-gray-400 rounded-md  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
              <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <!-- search input -->
          <div class="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
            <div class="w-full max-w-lg lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none "
                >
                  <SearchIcon
                    class="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  v-model="phrase"
                  dir="rtl"
                  id="search"
                  name="search"
                  class="block w-full py-2 pl-3 pr-10 leading-5 text-gray-300 placeholder-gray-400 bg-gray-700 border border-transparent rounded-md  focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
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
                class="block w-auto h-6 lg:hidden"
                src="@/assets/icons/logo.png"
                alt="logo"
              />
            </a>
          </div>

          <!-- menu lg screen -->
          <div class="hidden lg:block lg:ml-4">
            <div class="flex items-center">
              <!-- profile dropdown -->
              <Menu as="div" class="relative flex-shrink-0 mr-4">
                <div>
                  <MenuButton
                    class="flex text-sm text-white bg-gray-800 rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      :src="userInfo.photoURL"
                      alt="avatar"
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg  w-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
        <div class="flex flex-col pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/home.svg"
              class="w-6 h-6 ml-2"
              alt="home"
            />
            <span>לוח</span>
          </router-link>
          <router-link
            to="/faqs"
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/collection.svg"
              class="w-6 h-6 ml-2"
              alt="collection"
            />
            <span>כל התשובות</span>
          </router-link>
          <router-link
            to="/my_faqs"
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/document-text.svg"
              class="w-6 h-6 ml-2"
              alt="my-faqs"
            />
            <span>התשובות שלי</span>
          </router-link>

          <router-link
            v-show="userInfo.role !== 'מתנדב'"
            to="/pending_approval"
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/exclamation.svg"
              class="w-6 h-6 ml-2"
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
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/twitter-icon.svg"
              alt="twitter"
              class="w-6 h-6 ml-2"
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
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/users.svg"
              class="w-6 h-6 ml-2"
              alt="volunteers"
            />
            <span>מתנדבים</span>
          </router-link>

          <router-link
            v-show="userInfo.role !== 'מתנדב'"
            to="/settings"
            class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:bg-gray-700 hover:text-white"
          >
            <img
              src="@/assets/icons/cog.svg"
              class="w-6 h-6 ml-2"
              alt="settings"
            />
            <span>הגדרות</span>
          </router-link>

          <div class="px-2 mt-3 space-y-1">
            <button
              class="inline-flex items-center px-3 py-2 mt-2 text-base font-medium text-white bg-indigo-500 rounded-md  hover:bg-indigo-600"
              @click="$router.push('/create_faq')"
            >
              <PlusIcon class="w-5 h-5 ml-2" aria-hidden="true" />
              <span class="ml-2">הוסף תשובה</span>
            </button>
          </div>
        </div>

        <!-- user information -->
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5" dir="ltr">
            <div class="flex-shrink-0">
              <img
                class="w-8 h-8 rounded-full"
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
          <div class="px-2 mt-3 space-y-1">
            <button
              class="inline-flex items-center px-3 py-2 text-base font-medium text-white bg-red-500 rounded-md  hover:bg-red-700"
              @click="signOut"
            >
              <LogoutIcon class="w-5 h-5 ml-2" aria-hidden="true" />
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
