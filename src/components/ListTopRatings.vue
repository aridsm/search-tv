<template>
  <section class="section">
    <h2 class="title">Popular hoje</h2>
    <swiper
      :slides-per-view="5"
      :space-between="20"
      @reachEnd="fetchNewData"
      grab-cursor
      v-if="listMovies && listMovies.length"
      class="list-movies"
      :preload-images="true"
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
          <StarVotings :rawVote="movie.vote_average" />
        </router-link>
      </swiper-slide>
    </swiper>
  </section>
</template>
<script>
import { getPopularMovies } from "@/urlsAPI";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import ButtonsSlider from "./ButtonsSlider.vue";
import StarVotings from "./StarVotings.vue";

export default {
  name: "ListTopRatings",
  components: { Swiper, SwiperSlide, ButtonsSlider, StarVotings },

  data() {
    return {
      listMovies: [],
      currPage: 1,
    };
  },
  methods: {
    fetchData() {
      axios.get(getPopularMovies(this.currPage)).then((r) => {
        this.listMovies = [...this.listMovies, ...r.data.results];
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
.section {
  margin-top: 6rem;
}

.list-movies {
  margin-top: 3rem;
  padding: 2px;
  height: 380px;
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
  padding: 0.7rem;
  border-radius: 5px;
  height: 100%;
  transition: 0.2s;
  max-width: 250px;
}

.item-movie:hover {
  background: var(--cor-6);
  box-shadow: 0 0 0 1px rgb(96, 68, 238);
}

.img {
  width: 100%;
}
.item-movie h3 {
  font-weight: 800;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
