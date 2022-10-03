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
import { inject } from "vue";

export default {
  name: "FavoriteMovie",
  props: ["movieId", "movieStatus"],
  setup() {
    const store = inject("store");
    return { store };
  },
  methods: {
    markAsFavorite() {
      const isMovieFavorited = this.movieStatus.favorite;
      this.store.methods.markMovieAsFavorite(this.movieId, isMovieFavorited);
      this.movieStatus.favorite = !isMovieFavorited;
    },
  },
};
</script>

<style scoped>
.favorite {
  color: var(--cor-4);
  transition: 0.2s;
}
.favorite:hover,
.favorited {
  color: rgb(255, 136, 241);
}
.favorite::after {
  content: "☆";
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1.3em;
  margin-left: 0.3em;
}
.favorited::after {
  content: "★";
}
</style>
