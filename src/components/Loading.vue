<template>
  <div class="loading-container">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
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
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
