<template>
  <section class="container">
    <h1>Lista de Filmes</h1>
    <button class="btn-filtrar" @click="showListGenres">
      Filtrar por categoria <span class="arrow"></span>
    </button>
    <transition>
      <ul class="list-genres" v-if="listGenresShown">
        <li v-for="genre in moviesGenres.genres" :key="genre.id">
          <button @click="addGenreToFilter(genre.id)">{{ genre.name }}</button>
        </li>
      </ul>
    </transition>
    <ListMovies
      v-for="genre in moviesGenres"
      :key="genre.id"
      :title="genre.name"
      :getListMovies="getMoviesByGenre(genre.id)"
    />
  </section>
</template>

<script>
import axios from "axios";
import { getGenres, getMoviesByGenre } from "@/urlsAPI";
import ListMovies from "@/components/ListMovies.vue";

export default {
  name: "MoviesView",
  components: { ListMovies },
  setup() {
    return { getMoviesByGenre };
  },
  data() {
    return {
      moviesGenres: [],
      listGenresShown: false,
      genresSelected: [],
    };
  },
  methods: {
    fetchGenres() {
      axios.get(getGenres()).then((r) => {
        this.moviesGenres = r.data.genres;
      });
    },
    showListGenres() {
      this.listGenresShown = !this.listGenresShown;
    },
    addGenreToFilter(id) {
      this.genresSelected.push(id);
    },
  },
  created() {
    this.fetchGenres();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 3rem;
  font-size: 2.5rem;
}
.list-genres {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 150px));
  grid-gap: 0.5rem;
}
.list-genres button {
  width: 100%;
  background: var(--cor-2);
  border: none;
  color: var(--cor-4);
  padding: 0.5rem;
  border-radius: 5px;
  transition: 0.2s;
  font-size: inherit;
  cursor: pointer;
}

.list-genres button:hover {
  color: var(--cor-5);
  box-shadow: 0 0 0 1px rgb(96, 68, 238);
  background: var(--cor-6);
}

.btn-filtrar {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  color: var(--cor-4);
  background: transparent;
  border: none;
}

.arrow {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../assets/arrow.svg");
  background-size: 0.6rem;
  background-position: center;
}
</style>
