<template>
  <div class="flex flex-col justify-center items-center mt-32">
    <h1>Restricted page.</h1>
    <p>Oops, you are not an authorized user.</p>
    <p>
      Try going
      <span><router-link to="/" class="text-blue-500">home</router-link></span>
    </p>
    <div class="mt-5">
      <BanIcon
        class="h-10 w-10 text-red-500 group-hover:text-red-500"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script>
import { BanIcon } from '@heroicons/vue/solid';

export default {
  name: 'Unauthorized',
  components: { BanIcon },
};
</script>
