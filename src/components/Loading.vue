<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
.loading {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  border: 5px solid var(--cor-2);
  border-top-color: var(--cor-3);
  margin: 1rem;
  animation: rotate 1s infinite forwards;
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
