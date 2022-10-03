<template>
  <section>
    <h2 class="title">{{ title }}</h2>
    <Loading v-if="loading" />
    <div v-else class="slider-container">
      <swiper
        :slides-per-view="5"
        :space-between="15"
        @reachEnd="fetchNewData"
        grab-cursor
        v-if="listMovies && listMovies.length"
        class="list-movies"
      >
        <ButtonsSlider class="btns-slide" />

        <swiper-slide
          v-for="movie in listMovies"
          :key="movie.id"
          class="item-movie"
        >
          <router-link :to="`/movies/${movie.id}`">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.title"
              class="img"
            />
            <h3>
              {{ movie.title }}
            </h3>
            <StarVotings
              :rawVote="movie.vote_average"
              :voteCount="movie.vote_count"
              class="infos-vote"
            />
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import ButtonsSlider from "./ButtonsSlider.vue";
import StarVotings from "./StarVotings.vue";
import Loading from "./Loading.vue";
import FavoriteMovie from "./FavoriteMovie.vue";

export default {
  name: "ListMovies",
  components: {
    Swiper,
    SwiperSlide,
    ButtonsSlider,
    StarVotings,
    Loading,
    FavoriteMovie,
  },
  props: ["title", "getListMovies"],
  data() {
    return {
      listMovies: [],
      currPage: 1,
      loading: true,
    };
  },

  methods: {
    fetchData() {
      axios.get(this.getListMovies(this.currPage)).then((r) => {
        this.listMovies = [...this.listMovies, ...r.data.results];
        this.loading = false;
      });
    },

    fetchNewData() {
      this.currPage++;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.slider-container {
  margin-left: -2em;
  padding: 2em;
  overflow: hidden;
  height: 450px;
}
.list-movies {
  padding: 2px;
  overflow: visible;
  position: relative;
}
.btns-slide {
  opacity: 0;
}
.list-movies:hover .btns-slide {
  opacity: 1;
}
.item-movie {
  background: var(--cor-2);
  padding: 0.6em;
  border-radius: 5px;
  transition: 0.2s;
  max-width: 250px;
}

.item-movie:hover {
  background: var(--cor-6);
  box-shadow: 0 0 0 1px rgb(96, 68, 238);
  transform: scale(1.05) translateY(-1rem);
}

.img {
  width: 100%;
}
.item-movie h3 {
  font-weight: 900;
  font-size: 1em;
  margin-top: 0.5em;
}
.infos-vote {
  display: none;
  margin-top: 0.5em;
}
.item-movie:hover .infos-vote {
  display: flex;
}
</style>
