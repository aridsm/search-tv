<template>
  <div class="item-movie">
    <router-link :to="`/movies/${movie.id}`" :title="movie.title">
      <img
        :src="`https://image.tmdb.org/t/p/w780/${movie.poster_path}`"
        :alt="movie.title"
        class="img"
      />
      <h3>{{ movie.title }}</h3>
      <div class="flex">
        <StarVotings
          :rawVote="movie.vote_average"
          :voteCount="movie.vote_count"
          class="infos-vote"
        />
        <FavoriteMovie
          v-if="loginStore.isLoggedIn"
          :movieId="movie.id"
          class="favorite-movie"
          showText
        />
      </div>
    </router-link>
  </div>
</template>

<script>
import { useLoginStore } from "@/store/login";
import FavoriteMovie from "../ui/FavoriteMovie.vue";
import StarVotings from "../ui/StarVotings.vue";
export default {
  name: "MovieItem",
  components: { FavoriteMovie, StarVotings },
  props: ["movie"],
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
};
</script>

<style scoped>
.img {
  width: 100%;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.item-movie h3 {
  font-weight: 900;
  font-size: 1em;
  margin-top: 0.7em;
}
.favorite-movie {
  font-size: 0.8rem;
}
.item-movie {
  transition: 0.2s;
}

.item-movie:hover {
  color: var(--cor-5);
}

.item-movie .img {
  filter: saturate(90%) brightness(90%);

  border-radius: 0.8rem;
  overflow: hidden;
  transition: 0.2s;
}

.item-movie:hover .img {
  filter: initial;
  transform: translateY(-0.5rem);
}
@media (max-width: 1100px) {
  .item-movie {
    color: var(--cor-5);
  }
}
</style>
