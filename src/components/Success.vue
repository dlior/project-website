<template>
  <div class="rounded-md bg-green-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
      </div>
      <div class="mr-3">
        <!-- success message -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/solid';

export default {
  name: 'Success',
  components: {
    CheckCircleIcon,
  },
};
</script>
