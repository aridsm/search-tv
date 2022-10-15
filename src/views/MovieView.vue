<template>
  <section class="container">
    <div class="section">
      <Loading v-if="loadingMovie" />
      <MovieInfos v-else :movieData="movieData" />

      <Loading v-if="loadingMovie" />
      <OtherData :movieData="movieData" />

      <Loading v-if="loadingCredits" />
      <ListPeople
        v-else
        :listCredits="movieCast"
        title="Elenco"
        class="list-people"
      />

      <Loading v-if="loadingCredits" />
      <ListPeople
        v-else
        :listCredits="movieCrew"
        title="Equipe técnica"
        class="list-people"
      />
    </div>
  </section>
</template>

<script>
import { getMovieById, getMovieCredits } from "@/urlsAPI";
import axios from "axios";
import ListPeople from "../components/Movie/ListPeople.vue";
import Loading from "@/components/ui/Loading.vue";
import { useAccountStore } from "@/store/login";
import MovieInfos from "@/components/Movie/MovieInfos.vue";
import OtherData from "@/components/Movie/OtherData.vue";

export default {
  name: "MovieView",
  props: ["movieId"],
  components: {
    ListPeople,
    Loading,
    MovieInfos,
    OtherData,
  },
  setup() {
    const loginStore = useAccountStore();
    return { loginStore };
  },
  data() {
    return {
      movieData: [],
      loadingMovie: false,
      loadingCredits: false,
      movieCast: [],
      movieCrew: [],
    };
  },
  methods: {
    fetchData() {
      this.loadingMovie = true;
      axios.get(getMovieById(this.movieId)).then((r) => {
        this.movieData = r.data;
        this.loadingMovie = false;
      });
    },
    fetchCredits() {
      this.loadingCredits = true;
      axios.get(getMovieCredits(this.movieId)).then((r) => {
        this.movieCast = r.data.cast.splice(0, 10);
        this.movieCrew = r.data.crew.splice(0, 6);
        this.loadingCredits = false;
      });
    },
  },
  created() {
    this.fetchData();
    this.fetchCredits();
  },
  watch: {
    movieId() {
      this.fetchData();
      this.fetchCredits();
    },
  },
};
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: calc(73% - 2rem) 27%;
  grid-gap: 1.5rem;
  max-width: 100%;
}

.movie,
.more-data,
.list-people {
  padding: 1.5rem;
}
.container {
  padding-top: 4rem;
}
@media (max-width: 1100px) {
  .container {
    padding-top: 2rem;
  }
}

@media (max-width: 1000px) {
  .section {
    grid-gap: 1rem;
    grid-template-columns: 100%;
  }
  .movie,
  .more-data,
  .list-people {
    grid-column: 1 / -1;
  }

  .container {
    padding-top: 1rem;
  }
}
</style>
