<template>
  <div class="container">
    <div class="entrada">
      <p class="dados">
        Dados da API
        <a href="https://www.themoviedb.org/documentation/api">TMDB</a>
      </p>
      <h1><span>Procure</span> por um filme!</h1>
      <SearchField class="form" />
    </div>
    <ListMovies
      title="popular hoje"
      class="list-movies"
      :getListMovies="getPopularMovies"
    />
  </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import ListMovies from "@/components/ListMovies.vue";
import { getPopularMovies } from "@/urlsAPI";

export default {
  name: "HomeView",
  components: { SearchField, ListMovies },
  setup() {
    return { getPopularMovies };
  },
};
</script>

<style scoped>
.entrada {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  align-items: flex-start;
}
.entrada h1 {
  font-size: 3.2em;
  margin-bottom: 1.5rem;
}
.entrada h1 span {
  background: linear-gradient(180deg, #55d4e6 0%, var(--cor-3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dados {
  font-size: 1em;
  color: var(--cor-4);
}

.dados a {
  color: var(--cor-3);
}

.dados a:hover {
  border-bottom: 1px dashed var(--cor-3);
}
.form {
  max-width: 30rem;
}

.list-movies {
  margin-top: 4rem;
}
</style>
