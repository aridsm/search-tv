<template>
  <div class="no-item">?</div>
</template>

<script>
export default {
  name: "NoItem",
};
</script>

<style scoped>
.no-item {
  background: var(--cor-4);
  color: var(--cor-1);
  font-weight: 800;
  font-size: 1.5rem;
  display: grid;
  place-items: center;
}
</style>
