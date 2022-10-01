<template>
  <div class="container-search">
    <form class="form" @submit.prevent>
      <label for="search">Procure por um filme</label>
      <input
        type="search"
        name="search"
        id="search"
        autocomplete="off"
        v-model="searchQuery"
        placeholder="E.x: Piratas do Caribe"
        class="input-style"
        @input="getSearchResults"
      />
    </form>
    <transition>
      <div
        class="results"
        v-outside-click="cleanSearchQuery"
        v-if="searchQuery.length"
      >
        <ul v-if="searchResults && searchResults.length">
          <li v-for="movie in searchResults" :key="movie.id">
            <router-link :to="`/movies/${movie.id}`" class="item-movie">
              <div class="img-container">
                <img
                  v-if="movie.poster_path"
                  :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                  :alt="movie.title"
                />
                <NoImage v-else />
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
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { toRaw } from "@vue/reactivity";
import { getSearchMovies } from "@/urlsAPI";
import NoImage from "./NoImage.vue";

export default {
  name: "SearchField",
  data() {
    return {
      searchQuery: "",
      searchData: [],
    };
  },
  methods: {
    getSearchResults() {
      if (this.searchQuery.length) {
        axios
          .get(getSearchMovies(this.searchQuery))
          .then((r) => (this.searchData = r.data));
      }
    },
    cleanSearchQuery() {
      this.searchQuery = "";
    },
    formatDate(date) {
      const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      let newData = new Date(date);
      let formatedDate =
        newData.getDate() +
        " " +
        meses[newData.getMonth()] +
        " " +
        newData.getFullYear();
      return formatedDate;
    },
  },
  computed: {
    searchResults() {
      const fetchedData = toRaw(this.searchData);
      if (fetchedData.results) return fetchedData.results.slice(0, 20);
    },
  },
  components: { NoImage },
};
</script>

<style scoped>
.container-search {
  position: relative;
}
#search {
  background: var(--cor-2);
  padding-right: 2rem;
  width: 100%;
}

.form {
  position: relative;
  min-width: 25rem;
}

.form::after {
  content: "";
  background: url("../assets/search.svg");
  position: absolute;
  display: block;
  right: 1rem;
  top: 0.7rem;
  width: 1rem;
  height: 1rem;
  background-size: 1rem;
  background-position: center;
  z-index: 9;
}

.results {
  background: var(--cor-2);
  position: absolute;
  width: 100%;
  max-height: 20rem;
  top: 3rem;
  border-radius: 5px;
  padding: 1rem;
  overflow: auto;
}

.item-movie {
  padding: 0.5rem;
  border-radius: 5px;
  background: var(--cor-6);
  display: flex;
}

ul li + li {
  margin-top: 0.5rem;
}

.img-container {
  min-width: 4rem;
  max-width: 4rem;
  height: 4rem;
}
.img-container > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-infos {
  margin-left: 1rem;
}
.movie-infos p {
  font-weight: 900;
}
.movie-infos span {
  margin-top: 0.5rem;
  font-size: 1rem;
  display: block;
  color: var(--cor-4);
}
</style>
