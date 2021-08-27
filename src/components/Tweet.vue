<template>
  <div
    class="
      bg-gray-100
      py-2
      px-3
      rounded-lg
      m-4
      flex flex-col
      hover:bg-gray-800 hover:text-white
    "
  >
    <div class="flex justify-start items-center">
      <div class="ml-2 w-1/4 h-1/6 md:ml-2 md:w-5 md:h-5">
        <img src="@/assets/icons/twitter.svg" class="w-5 h-5" alt="twitter" />
      </div>
      <div class="truncate text-sm">
        <a :href="url + tweet.id" target="_blank">
          <span>
            {{ tweet.text }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Tweet',

  props: {
    tweet: {
      type: Object,
      required: true,
      default: null,
    },
  },

  setup(props) {
    const url = ref('https://twitter.com/web/status/');

    return {
      props,
      url,
    };
  },
};
</script>
