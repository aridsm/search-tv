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
      <ResultsSearch
        v-if="searchQuery.length"
        v-outside-click="cleanSearchQuery"
        :searchResults="searchResults"
      />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { toRaw } from "@vue/reactivity";
import { getSearchMovies } from "@/urlsAPI";
import NoImage from "./NoImage.vue";
import ResultsSearch from "./ResultsSearch.vue";

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
      this.searchData = [];
    },
  },
  computed: {
    searchResults() {
      const fetchedData = toRaw(this.searchData);
      if (fetchedData.results) return fetchedData.results.slice(0, 20);
    },
  },
  components: { NoImage, ResultsSearch },
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

@media (max-width: 500px) {
  .results {
    width: calc(100vw - 1.4rem);
  }
}
</style>
