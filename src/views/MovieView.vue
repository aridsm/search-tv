<template>
  <section class="container">
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
        <h1>{{ movieData.title }}</h1>
        <p>{{ movieData.tagline }}</p>
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
    <ListPeople :listCredits="movieCast" title="Cast" />
    <ListPeople :listCredits="movieCrew" title="Crew" />
  </section>
</template>

<script>
import { getMovieById, getMovieCredits } from "@/urlsAPI";
import axios from "axios";
import StarVotings from "@/components/StarVotings.vue";
import NoImage from "@/components/NoImage.vue";
import ListPeople from "../components/ListPeople.vue";

export default {
  name: "MovieView",
  props: ["movieId"],
  components: { StarVotings, NoImage, ListPeople },
  data() {
    return {
      movieData: [],
      movieCast: [],
      movieCrew: [],
    };
  },
  methods: {
    fetchData() {
      axios.get(getMovieById(this.movieId)).then((r) => {
        this.movieData = r.data;
      });
    },
    fetchCredits() {
      axios.get(getMovieCredits(this.movieId)).then((r) => {
        this.movieCast = r.data.cast.splice(0, 10);
        this.movieCrew = r.data.crew.splice(0, 10);
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
.movie-infos > p {
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
