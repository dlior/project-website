<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  margin-bottom: 1.25rem;
  overflow: hidden;
}

input:placeholder-shown {
  font-style: italic;
}
textarea {
  white-space: pre-wrap;
}
textarea:placeholder-shown {
  font-style: italic;
}
</style>
