<template>
  <div class="container">
    <div class="entrada">
      <h1>
        Procure por um <br />
        filme!
      </h1>
      <SearchField class="form" />
      <p class="dados">
        Dados da API
        <a href="https://www.themoviedb.org/documentation/api">TMDB</a>
      </p>
    </div>
    <ListMovies
      title="popular hoje"
      :getListMovies="getPopularMovies"
      class="list-movies"
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
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  align-items: center;
}
.list-movies {
  margin-top: 6rem;
}
.entrada h1 {
  font-size: 3.5rem;
  line-height: 3.7rem;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.dados {
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--cor-4);
}

.dados a {
  color: var(--cor-3);
}

.dados a:hover {
  border-bottom: 1px dashed var(--cor-3);
}

.form {
  min-width: 30rem;
}
</style>
