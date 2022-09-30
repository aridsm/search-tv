<template>
  <section class="container">
    <Loading v-if="loadingMovie" />
    <section v-else class="movie">
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
    <Loading v-if="loadingCredits" />
    <ListPeople v-else :listCredits="movieCast" title="Cast" />

    <Loading v-if="loadingCredits" />
    <ListPeople v-else :listCredits="movieCrew" title="Crew" />
  </section>
</template>

<script>
import { getMovieById, getMovieCredits } from "@/urlsAPI";
import axios from "axios";
import StarVotings from "@/components/StarVotings.vue";
import NoImage from "@/components/NoImage.vue";
import ListPeople from "../components/ListPeople.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "MovieView",
  props: ["movieId"],
  components: { StarVotings, NoImage, ListPeople, Loading },
  data() {
    return {
      movieData: [],
      loadingMovie: false,
      loadingCredits: false,
      movieCast: [],
      movieCrew: [],
    };
  },
  methods: {
    fetchData() {
      this.loadingMovie = true;
      axios.get(getMovieById(this.movieId)).then((r) => {
        this.movieData = r.data;
        this.loadingMovie = false;
      });
    },
    fetchCredits() {
      this.loadingCredits = true;
      axios.get(getMovieCredits(this.movieId)).then((r) => {
        this.movieCast = r.data.cast.splice(0, 10);
        this.movieCrew = r.data.crew.splice(0, 10);
        this.loadingCredits = false;
      });
    },
  },
  created() {
    this.fetchData();
    this.fetchCredits();
  },
};
</script>

<style scoped>
.movie {
  display: flex;
  background: var(--cor-2);
  padding: 1rem;
  border-radius: 5px;
}
.movie-infos {
  margin-left: 2rem;
  flex: 4;
}

h1 {
  font-size: 2rem;
}
.tagline {
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  color: var(--cor-4);
  margin-bottom: 0.5rem;
}
.img-container {
  flex: 1;
  padding: 0.5rem;
  border-radius: 5px;
  background: var(--cor-6);
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
