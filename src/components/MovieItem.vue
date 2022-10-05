<template>
  <div :class="['item-movie', { 'movie-favorited': isMovieFavorited }]">
    <router-link :to="`/movies/${movie.id}`">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        :alt="movie.title"
        class="img"
      />
      <h3>{{ movie.title }} {{ isMovieFavorited }}</h3>
      <FavoriteMovie
        :movieId="movie.id"
        class="favorite-movie"
        @send-favorite-status="getFavoriteStatus"
      />
      <StarVotings
        :rawVote="movie.vote_average"
        :voteCount="movie.vote_count"
        class="infos-vote"
      />
    </router-link>
  </div>
</template>

<script>
import FavoriteMovie from "./FavoriteMovie.vue";
import StarVotings from "./StarVotings.vue";
export default {
  name: "MovieItem",
  components: { FavoriteMovie, StarVotings },
  props: ["movie"],
};
</script>

<style scoped>
.img {
  width: 100%;
}
.item-movie h3 {
  font-weight: 900;
  font-size: 1em;
  margin-top: 0.5em;
}
.infos-vote {
  display: none;
  margin-top: 0.5em;
}
.item-movie:hover .infos-vote {
  display: flex;
}
.favorite-movie {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}
.item-movie {
  background: var(--cor-2);
  padding: 0.6em;
  border-radius: 5px;
  transition: 0.2s;
}

.item-movie:hover {
  background: var(--cor-6);
  box-shadow: 0 0 0 1px var(--cor-3);
  transform: scale(1.03) translateY(-1rem);
}
</style>
