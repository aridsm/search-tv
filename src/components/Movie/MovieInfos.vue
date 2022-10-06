<template>
  <section class="movie">
    <div class="img-container">
      <img
        v-if="movieData.poster_path"
        :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`"
        :alt="movieData.title"
      />
      <NoImage v-else />
    </div>
    <div class="movie-infos">
      <div class="flex">
        <h1>{{ movieData.title }}</h1>
        <FavoriteMovie :movieId="movieData.id" />
      </div>
      <p class="tagline">{{ movieData.tagline }}</p>
      <StarVotings
        :rawVote="movieData.vote_average"
        :voteCount="movieData.vote_count"
      />
      <ul class="categories">
        <li v-for="genre in movieData.genres" :key="genre.id">
          {{ genre.name }}
        </li>
      </ul>
      <p class="overview">
        {{ movieData.overview || "Não há descrição para este filme" }}
      </p>
    </div>
  </section>
</template>

<script>
import StarVotings from "../ui/StarVotings.vue";
import FavoriteMovie from "../ui/FavoriteMovie.vue";
import NoImage from "../ui/NoImage.vue";
export default {
  props: ["movieData"],
  components: { StarVotings, FavoriteMovie, NoImage },
};
</script>

<style scoped>
.movie {
  display: flex;
  grid-column: 1 / -1;
}
.movie-infos {
  margin-left: 1.5rem;
  flex: 4;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-size: 2em;
}
.tagline {
  font-size: 1em;
  font-weight: 400;
  color: var(--cor-4);
  margin-bottom: 0.5rem;
}
.img-container {
  width: 250px;
  height: 23rem;
}

.img-container > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.categories {
  margin: 0.5rem 0 2rem 0;
  display: flex;
  color: var(--cor-4);
}

.categories li + li {
  border-left: 1px solid var(--cor-4);
  padding-left: 0.5rem;
  margin-left: 0.5rem;
}

.overview {
  line-height: 1.3em;
  font-size: 1em;
}
</style>
