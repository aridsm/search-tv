<template>
  <h2 class="title">Top da semana</h2>
  <section class="container-style movie">
    <Loading v-if="loadingMovie" />
    <div v-else class="movie-infos">
      <StarVotings
        :rawVote="bestMovie.vote_average"
        :voteCount="bestMovie.vote_count"
      />
      <h3>{{ bestMovie.title }}</h3>
      <p>{{ bestMovie.overview }}</p>
      <router-link class="movie-link" :to="`/movies/${bestMovie.id}`"
        >Ver mais</router-link
      >
    </div>
    <div class="video">
      <Loading v-if="loadingVideo" />
      <iframe
        v-else
        width="100%"
        height="315"
        :src="`https://www.youtube.com/embed/${video.key}?controls=0`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>

<script>
import { GET_MOVIE_VIDEOS, getPopularMovies } from "@/urlsAPI";
import axios from "axios";
import Loading from "./ui/Loading.vue";
import StarVotings from "./ui/StarVotings.vue";

export default {
  setup() {
    return { GET_MOVIE_VIDEOS, getPopularMovies };
  },
  data() {
    return {
      video: null,
      loadingVideo: true,
      bestMovie: null,
      loadingMovie: true,
    };
  },
  methods: {
    fetchVideos() {
      axios.get(this.GET_MOVIE_VIDEOS(this.bestMovie.id)).then((r) => {
        this.video = r.data.results[0];
        this.loadingVideo = false;
      });
    },
    fetchData() {
      axios.get(this.getPopularMovies(1)).then((r) => {
        this.bestMovie = r.data.results[0];
        this.loadingMovie = false;
        this.fetchVideos();
      });
    },
  },
  created() {
    this.fetchData();
  },
  components: { Loading, StarVotings },
};
</script>

<style scoped>
.container-style {
  padding: 1.5rem;
}

.movie {
  display: flex;
  align-items: center;
}
.movie-infos {
  flex: 2;
  padding-left: 1.5rem;
  padding-right: 2rem;
}
h3 {
  color: var(--cor-5);
  font-size: 1.6rem;
  font-weight: 900;
  margin: 1.5rem 0;
}
.movie-infos p {
  line-height: 140%;
}
.video {
  flex: 3;
  display: grid;
  place-items: center;
  border-radius: 0.8rem;
  overflow: hidden;
}

.movie-link {
  display: block;
  margin-top: 1.5rem;
  color: rgb(111, 214, 255);
}
</style>
