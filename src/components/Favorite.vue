<template>
  <button
    :class="['favorite', { favorited: movieStatus?.favorite }]"
    v-if="store.state.isLoggedIn"
    @click="markAsFavorite"
  >
    {{ movieStatus?.favorite ? "Favoritado" : "Favoritar" }}
  </button>
</template>

<script>
export default {};
</script>

<style></style>
