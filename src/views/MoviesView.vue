<template>
  <section class="container">
    <h1>Todos os filmes</h1>
    <button class="btn-filtrar" @click="showListGenres">
      Filtrar por categoria
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        :class="['arrow', { rotate: listGenresShown }]"
      >
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
        />
      </svg>
    </button>
    <transition name="height">
      <ul class="list-genres" v-show="listGenresShown">
        <li
          v-for="genre in moviesGenres"
          :key="genre.id"
          :class="{ active: isGenreAlreadyInList(genre.id) }"
        >
          <button @click="addGenreToFilter(genre)">{{ genre.name }}</button>
        </li>
      </ul>
    </transition>
    <ListMovies
      class="list-movies"
      v-for="genre in genresList"
      :key="genre.id"
      :title="genre.name"
      :getListMovies="getMoviesByGenre(genre.id)"
    />
  </section>
</template>

<script>
import axios from "axios";
import { getGenres, getMoviesByGenre } from "@/urlsAPI";
import ListMovies from "@/components/ListMovies/ListMovies.vue";

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
  computed: {
    genresList() {
      if (this.genresSelected.length) return this.genresSelected;
      else return this.moviesGenres;
    },
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
    isGenreAlreadyInList(id) {
      const genreIndex = this.genresSelected.findIndex(
        (genreSelected) => genreSelected.id === id
      );
      const genreAlreadyInList = genreIndex < 0 ? false : true;

      return genreAlreadyInList;
    },
    addGenreToFilter(genre) {
      const genreAlreadyInList = this.isGenreAlreadyInList(genre.id);

      if (genreAlreadyInList) {
        this.genresSelected = this.genresSelected.filter(
          (genreSelected) => genreSelected.id !== genre.id
        );
      } else {
        this.genresSelected.push(genre);
      }
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
  font-size: 2em;
}
.list-genres {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  grid-gap: 0.5rem;
  margin-top: 1rem;
}
.list-genres button {
  width: 100%;
  background: var(--cor-2);
  color: var(--cor-4);
  padding: 0.5rem;
  border-radius: 5px;
  transition: 0.2s;
}
.list-genres button:hover,
.active button {
  color: var(--cor-5);
  box-shadow: 0 0 0 1px var(--cor-3);
  background: var(--cor-6);
}
.list-movies {
  margin-top: 3rem;
}
.btn-filtrar {
  transition: 0.2s;
  color: var(--cor-4);
}

.btn-filtrar:hover {
  color: var(--cor-5);
}

.arrow {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  fill: currentColor;
  margin-bottom: -1.5px;
  transition: 0.2s;
}

.arrow.rotate {
  transform: rotate(90deg);
}

.height-enter-from,
.height-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}

.height-enter-active,
.height-leave-active {
  transition: 0.2s; /* MISSING RULE */
}
</style>
