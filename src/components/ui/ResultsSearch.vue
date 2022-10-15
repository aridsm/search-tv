<template>
  <div class="results container-style">
    <ul v-if="searchResults && searchResults.length">
      <li v-for="movie in searchResults" :key="movie.id">
        <router-link :to="`/movies/${movie.id}`" class="item-movie">
          <div class="img-container">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.title"
            />
            <NoImage v-else img="movie" />
          </div>
          <div class="movie-infos">
            <p>{{ movie.title }}</p>
            <span>{{ formatDate(movie.release_date) }}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <p v-else>No results</p>
  </div>
</template>

<script>
import { useDate } from "@/composable/formatDate";

export default {
  props: ["searchResults"],
  setup() {
    const { formatDate } = useDate();
    return { formatDate };
  },
};
</script>

<style scoped>
.results {
  position: absolute;
  width: 100%;
  max-height: 20rem;
  top: 3rem;
  left: 0;
  padding: 0.5rem;
  overflow: auto;
  z-index: 9;
}

.results::-webkit-scrollbar-track {
  background: transparent;
}
.results::-webkit-scrollbar-thumb {
  background: var(--cor-1);
}
.item-movie {
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  transition: 0.2s;
}

.item-movie:hover {
  background: var(--cor-8);
}

ul li + li {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--cor-8);
}

.img-container {
  min-width: 3.5rem;
  max-width: 3.5rem;
  height: 3.5rem;
}
.img-container > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-infos {
  margin-left: 0.7rem;
}
.movie-infos p {
  color: var(--cor-5);
}
.movie-infos span {
  margin-top: 0.5rem;
  display: block;
}
</style>
