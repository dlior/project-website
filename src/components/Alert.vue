<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <!-- error message -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from '@heroicons/vue/solid';

export default {
  name: 'Alert',
  components: {
    XCircleIcon,
  },
};
</script>
