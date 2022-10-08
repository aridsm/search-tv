<template>
  <div>
    <div v-if="loading" class="loading">...</div>
    <button
      :class="['favorite', { favorited: isMovieFavorited }]"
      v-if="!loading && loginStore.isLoggedIn"
      @click.stop.prevent="markAsFavorite"
    >
      <div class="favorite-text">
        {{ isMovieFavorited ? "Favoritado" : "Favoritar" }}
      </div>
    </button>
  </div>
</template>

<script>
import { useLoginStore } from "@/store/login";
import Loading from "./Loading.vue";

export default {
  name: "FavoriteMovie",
  props: ["movieId"],
  emits: ["send-favorite-status"],
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
      this.$emit("send-favorite-status", this.isMovieFavorited);
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
      this.$emit("send-favorite-status", this.isMovieFavorited);
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
.favorite-text {
  display: inline-block;
}
.favorited {
  color: rgb(255, 123, 202);
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
