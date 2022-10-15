<template>
  <div class="container">
    <BestMovie />
    <ListMovies
      title="popular hoje"
      class="list-movies"
      :getListMovies="GET_TREND_MOVIES('day')"
    />
    <ListMovies
      title="mais bem avaliados"
      class="list-movies"
      :getListMovies="GET_TOP_RATED_MOVIES"
    />
  </div>
</template>

<script>
import ListMovies from "@/components/ListMovies/ListMovies.vue";
import { GET_TREND_MOVIES, GET_TOP_RATED_MOVIES } from "@/urlsAPI";
import BestMovie from "@/components/BestMovie.vue";

export default {
  name: "HomeView",
  components: { ListMovies, BestMovie },
  setup() {
    return { GET_TREND_MOVIES, GET_TOP_RATED_MOVIES };
  },
};
</script>

<style scoped>
.list-movies {
  margin-top: 6rem;
}

.container {
  padding-top: 4rem;
}

@media (max-width: 1100px) {
  .container {
    padding-top: 2rem;
  }
}

@media (max-width: 500px) {
  .list-movies {
    margin-top: 4rem;
  }
}
</style>
