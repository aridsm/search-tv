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
          <li v-for="movie in searchResults" :key="movie.id" class="item-movie">
            {{ movie.title }}
            {{ movie.popularity }}
            {{ movie.release_date }}
          </li>
        </ul>
        <p v-else>No results</p>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { searchMovies } from "@/mixins/fetchData";
import { toRaw } from "@vue/reactivity";

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
          .get(searchMovies(this.searchQuery))
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
      if (fetchedData.results) return fetchedData.results.slice(0, 10);
    },
  },
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
  min-width: 20rem;
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
  z-index: 2;
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
  height: 3.5rem;
  border-radius: 5px;
  background: var(--cor-6);
}

.item-movie + .item-movie {
  margin-top: 0.5rem;
}
</style>
