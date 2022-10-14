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
    <div class="media">
      <Loading v-if="loadingVideo" />
      <div v-else-if="!loadingVideo && !video" class="img">
        <img
          :src="`https://image.tmdb.org/t/p/w780/${bestMovie.backdrop_path}`"
        />
      </div>
      <iframe
        v-else
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
import { GET_MOVIE_VIDEOS, GET_TREND_MOVIES } from "@/urlsAPI";
import axios from "axios";
import Loading from "./ui/Loading.vue";
import StarVotings from "./ui/StarVotings.vue";

export default {
  setup() {
    return { GET_MOVIE_VIDEOS, GET_TREND_MOVIES };
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
      axios.get(this.GET_TREND_MOVIES("week")(1)).then((r) => {
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
  font-weight: 700;
  margin: 1.5rem 0;
}
.movie-infos p {
  line-height: 140%;
}
.media {
  flex: 3;
  display: grid;
  place-items: center;
  border-radius: 0.8rem;
  overflow: hidden;
}

.img,
.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-link {
  display: block;
  margin-top: 1.5rem;
  color: var(--cor-3);
}

iframe {
  width: 100%;
  height: 20rem;
}

@media (max-width: 1100px) {
  .movie-infos {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 900px) {
  .movie {
    flex-direction: column;
    align-items: stretch;
  }

  .movie-infos {
    padding: 0;
    margin-bottom: 2rem;
  }
}
</style>
