<template>
  <div class="flex flex-col justify-center items-center mt-32">
    <h1>Page not found.</h1>
    <p>Oops, We couldn't find that page.</p>
    <p>
      Try going
      <span><router-link to="/" class="text-blue-500">home</router-link></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
