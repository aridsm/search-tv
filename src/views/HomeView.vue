<template>
  <div class="container">
    <BestMovie />
    <ListMovies
      title="popular hoje"
      class="list-movies"
      :getListMovies="getPopularMovies"
    />
  </div>
</template>

<script>
import ListMovies from "@/components/ListMovies/ListMovies.vue";
import { getPopularMovies } from "@/urlsAPI";
import BestMovie from "@/components/BestMovie.vue";

export default {
  name: "HomeView",
  components: { ListMovies, BestMovie },
  setup() {
    return { getPopularMovies };
  },
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
.list-movies {
  margin-top: 4rem;
}
</style>
