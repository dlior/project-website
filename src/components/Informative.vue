<template>
  <div class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon
          class="h-5 w-5 text-blue-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <!-- success message -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { InformationCircleIcon } from '@heroicons/vue/solid';

export default {
  name: 'Informative',
  components: {
    InformationCircleIcon,
  },
};
</script>
