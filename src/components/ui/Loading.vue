<template>
  <div class="loading-container" :class="{
    small: small
  }">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["small"]
};
</script>

<style scoped>
.loading {
  border-radius: 50%;
  width: 3em;
  height: 3em;
  border: 5px solid var(--cor-2);
  border-top-color: var(--cor-3);
  animation: rotate 1s infinite forwards;
}

.loading-container {
  padding: 2em;
}
.loading-container.small {
  padding: .1em !important;
}
.small .loading {
  width: 1em !important;
  height: 1em !important;
  border: 2px solid var(--cor-2);
  border-top-color: var(--cor-3);
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
