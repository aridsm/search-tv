<template>
  <section class="container">
    <div class="section">
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
          <div class="flex">
            <h1>{{ movieData.title }}</h1>
            <FavoriteMovie :movieId="movieId" :movieStatus="movieStatus" />
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
      <section class="vote">
        <h2>Qual seu voto para este filme?</h2>
        <div>{{ movieStatus }}</div>
      </section>
      <section class="more-data">
        <ul>
          <li>
            <h2>Título original</h2>
            <p>{{ movieData.original_title }}</p>
          </li>
          <li>
            <h2>Língua original</h2>
            <p>{{ movieData.original_language }}</p>
          </li>
          <li>
            <h2>Despesas</h2>
            <p>{{ movieData.budget }}</p>
          </li>
          <li>
            <h2>Lucro</h2>
            <p>{{ movieData.revenue }}</p>
          </li>
          <li>
            <h2>Data de lançamento</h2>
            <p>{{ movieData.release_date }}</p>
          </li>
        </ul>
      </section>
      <Loading v-if="loadingCredits" />
      <ListPeople
        v-else
        :listCredits="movieCast"
        title="Elenco"
        class="list-people"
      />

      <Loading v-if="loadingCredits" />
      <ListPeople
        v-else
        :listCredits="movieCrew"
        title="Equipe técnica"
        class="list-people"
      />
    </div>
  </section>
</template>

<script>
import {
  getAccountMovieDetails,
  getMovieById,
  getMovieCredits,
} from "@/urlsAPI";
import axios from "axios";
import StarVotings from "@/components/StarVotings.vue";
import NoImage from "@/components/NoImage.vue";
import ListPeople from "../components/ListPeople.vue";
import Loading from "@/components/Loading.vue";
import { inject } from "vue";
import FavoriteMovie from "../components/FavoriteMovie.vue";

export default {
  name: "MovieView",
  props: ["movieId"],
  components: { StarVotings, NoImage, ListPeople, Loading, FavoriteMovie },
  setup() {
    const store = inject("store");
    return { store };
  },
  data() {
    return {
      movieData: [],
      loadingMovie: false,
      loadingCredits: false,
      movieCast: [],
      movieCrew: [],
      movieStatus: null,
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
        this.movieCrew = r.data.crew.splice(0, 6);
        this.loadingCredits = false;
      });
    },
    getMovieDetails() {
      axios
        .get(getAccountMovieDetails(this.movieId, this.store.state.session_id))
        .then((r) => {
          this.movieStatus = r.data;
        })
        .catch((r) => console.log(r));
    },
  },
  created() {
    this.fetchData();
    this.fetchCredits();
    this.getMovieDetails();
  },
};
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: calc(77% - 2rem) 23%;
  grid-gap: 1.5em;
  max-width: 100%;
}

.movie,
.more-data,
.vote,
.list-people {
  background: var(--cor-2);
  padding: 1.5em;
  border-radius: 5px;
}
.movie {
  display: flex;
}
.movie-infos {
  margin-left: 1.5em;
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
  font-style: italic;
  color: var(--cor-4);
  margin-bottom: 0.5em;
}
.img-container {
  width: 250px;
  padding: 0.5em;
  border-radius: 5px;
  background: var(--cor-6);
  height: 23em;
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

.categories li + li {
  border-left: 1px solid var(--cor-4);
  padding-left: 0.5em;
  margin-left: 0.5em;
}

.overview {
  line-height: 1.3em;
  font-size: 1em;
}

.more-data {
  grid-row: 2;
  grid-column: 2;
}

.more-data h2 {
  font-size: 1em;
}
.more-data p {
  color: var(--cor-4);
  margin-top: 0.5em;
}
.more-data li + li {
  margin-top: 1em;
}
</style>
