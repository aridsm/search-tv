<template>
  <div class="no-item">
    <img :src="require(`../../assets/${img}.svg`)" />
  </div>
</template>

<script>
export default {
  name: "NoItem",
  props: ["img"],
};
</script>

<style scoped>
.no-item {
  background: var(--cor-8);
  color: var(--cor-4);
  font-weight: 900;
  font-size: 1.6em;
  display: grid;
  place-items: center;
}
</style>
