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
        class="results"
        :class="classResults"
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
import { useDate } from "@/composable/formatDate";

export default {
  name: "SearchField",
  props: ["classResults"],
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
  padding-right: 2rem;
  width: 100%;
}
.input-search {
  position: relative;
}
.form {
  position: relative;
  max-width: 25rem;
  width: 100%;
}

.input-search::after {
  content: "";
  background: url("../../assets/search.svg");
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
  padding: 0.5rem;
  overflow: auto;
  box-shadow: 0 0 0 1px rgba(82, 127, 217, 0.3);
}

.results::-webkit-scrollbar-track {
  background: transparent;
}
.item-movie {
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  transition: 0.2s;
}

.item-movie:hover {
  background: var(--cor-6);
}

ul li + li {
  margin-top: 0.5rem;
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
  font-weight: 900;
}
.movie-infos span {
  margin-top: 0.5em;
  display: block;
  color: var(--cor-4);
}

@media (max-width: 700px) {
  .input-search::after {
    height: 0.7rem;
    width: 0.7rem;
    background-size: 0.7rem;
  }
  .form {
    position: static;
  }
  .stretch {
    width: calc(100vw - 1.4rem);
    left: 0.7rem;
  }
}
</style>
