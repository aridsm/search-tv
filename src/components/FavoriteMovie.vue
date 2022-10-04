<template>
  <button
    :class="['favorite', { favorited: isMovieFavorited }]"
    v-if="loginStore.isLoggedIn"
    @click="markAsFavorite"
  >
    <Loading v-if="loading" class="loading" />
    <div v-else>{{ isMovieFavorited ? "Favoritado" : "Favoritar" }}</div>
  </button>
</template>

<script>
import { useLoginStore } from "@/store/login";
import Loading from "./Loading.vue";

export default {
  name: "FavoriteMovie",
  props: ["movieId"],
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
  data() {
    return {
      isMovieFavorited: "",
      loading: false,
    };
  },
  methods: {
    async getMovieDetails() {
      this.loading = true;
      const movieAccountStatus = await this.loginStore.getMovieDetails(
        this.movieId
      );
      this.loading = false;
      this.isMovieFavorited = movieAccountStatus.favorite;
    },
    async markAsFavorite() {
      this.loading = true;
      const markWasSuccessfull = await this.loginStore.markMovieAsFavorite(
        this.movieId,
        this.isMovieFavorited
      );
      this.loading = false;
      if (markWasSuccessfull) {
        this.isMovieFavorited = !this.isMovieFavorited;
      }
    },
  },
  created() {
    this.getMovieDetails();
  },
  components: { Loading },
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

.loading {
  padding: 0;
}
</style>
