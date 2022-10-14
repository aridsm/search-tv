<template>
  <div>
    <div v-if="loading" class="loading">...</div>
    <button
      :class="['favorite', { favorited: isMovieFavorited }]"
      v-if="!loading && loginStore.isLoggedIn"
      @click.stop.prevent="markAsFavorite"
      :title="isMovieFavorited ? 'Tirar dos favoritos' : 'Favoritar'"
    >
      <span v-if="showText">
        {{ isMovieFavorited ? "Favoritado" : "Favoritar" }}
      </span>
      <img
        v-if="isMovieFavorited"
        src="../../assets/heart-fill.svg"
        alt=""
        class="heart"
      />
      <img v-else src="../../assets/heart-empty.svg" alt="" class="heart" />
    </button>
  </div>
</template>

<script>
import { useLoginStore } from "@/store/login";
import Loading from "./Loading.vue";

export default {
  name: "FavoriteMovie",
  props: ["movieId", "showText"],
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
  display: flex;
  align-items: center;
}
.favorited {
  color: #ff7bb4;
}
.loading {
  padding: 0;
}
.favorite span {
  margin-right: 0.5rem;
}
.heart {
  width: 1.2rem;
}
</style>
