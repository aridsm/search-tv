<template>
  <div class="container-search">
    <form class="form" @submit.prevent>
      <label for="search">Procure por um filme</label>
      <div class="input-search">
        <input
          type="search"
          name="search"
          id="search"
          autocomplete="off"
          v-model="searchQuery"
          placeholder="E.x: Avatar"
          class="input-style"
          @input="(e) => (searchQuery = e.target.value)"
          @keyup="getSearchResults"
        />
      </div>
    </form>
    <transition>
      <div
        class="results container-style"
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
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { toRaw } from "@vue/reactivity";
import { getSearchMovies } from "@/urlsAPI";
import NoImage from "./NoImage.vue";
import { useDate } from "@/composable/formatDate";

export default {
  name: "SearchField",
  setup() {
    const { formatDate } = useDate();
    return { formatDate };
  },
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
      this.searchData = [];
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
  max-width: 22rem;
  width: 100%;
}
#search {
  padding-right: 2rem;
  width: 100%;
}
.input-search {
  position: relative;
}
.form {
  position: relative;
  width: 100%;
}

.input-search::after {
  content: "";
  background: url("../../assets/search.svg");
  position: absolute;
  display: block;
  right: 1rem;
  top: 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  background-size: 0.8rem;
  background-position: center;
  z-index: 9;
}

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

@media (max-width: 500px) {
  .results {
    width: calc(100vw - 1.4rem);
  }
}
</style>
