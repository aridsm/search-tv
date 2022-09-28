<template>
  <section class="container">
    <div class="movie">
      <div class="img-container">
        <img
          v-if="movieData.poster_path"
          :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`"
          :alt="movieData.title"
        />
        <NoImage v-else />
      </div>
      <div class="movie-infos">
        <h1>{{ movieData.title }}</h1>
        <h2>{{ movieData.tagline }}</h2>
        <StarVotings :rawVote="movieData.vote_average" />
        <ul class="categories">
          <li v-for="genre in movieData.genres" :key="genre.id">
            {{ genre.name }}
          </li>
        </ul>
        <p class="overview">
          {{ movieData.overview || "Não há descrição para este filme" }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { getMovieById } from "@/urlsAPI";
import axios from "axios";
import StarVotings from "@/components/StarVotings.vue";
import NoImage from "@/components/NoImage.vue";

export default {
  name: "MovieView",
  props: ["movieId"],
  data() {
    return {
      movieData: [],
    };
  },
  methods: {
    fetchData() {
      axios.get(getMovieById(this.movieId)).then((r) => {
        this.movieData = r.data;
      });
    },
  },
  created() {
    this.fetchData();
  },
  components: { StarVotings, NoImage },
};
</script>

<style scoped>
.movie {
  display: flex;
}

.movie-infos {
  margin-left: 2rem;
  flex: 4;
}

h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1rem;
  font-weight: 400;
  color: var(--cor-4);
  margin-bottom: 0.5rem;
}
.img-container {
  flex: 1;
  padding: 1rem;
  background: var(--cor-2);
  border-radius: 5px;
  min-height: 22rem;
}

.img-container > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  line-height: 1.3rem;
  font-size: 1rem;
}
</style>
