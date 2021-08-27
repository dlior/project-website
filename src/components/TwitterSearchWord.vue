<template>
  <div>
    <fieldset class="space-y-5">
      <legend class="sr-only">Search words</legend>
      <div class="relative flex items-start">
        <div class="flex items-center h-5">
          <input
            id="search-word"
            name="search-word"
            type="checkbox"
            class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-300
              rounded
            "
            :checked="searchWord.status"
          />
        </div>
        <div class="mr-2 text-sm">
          <label
            for="search-word"
            class="font-medium text-gray-700 overflow-ellipsis overflow-hidden"
            >{{ searchWord.tag }}</label
          >
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TwitterSearchWord',

  props: {
    searchWord: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
