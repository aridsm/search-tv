<template>
  <section>
    <h2 class="title">{{ title }}</h2>
    <Loading v-if="loading" />
    <div class="container-movies">
      <swiper
        :breakpoints="breakpoints"
        @reachEnd="fetchNewData"
        grab-cursor
        v-if="listMovies && listMovies.length"
        class="movies"
      >
        <ButtonsSlider class="btns-slide" />

        <swiper-slide v-for="movie in listMovies" :key="movie.id">
          <MovieItem :movie="movie" />
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
import MovieItem from "./MovieItem.vue";

export default {
  name: "ListMovies",
  components: {
    Swiper,
    SwiperSlide,
    ButtonsSlider,
    StarVotings,
    Loading,
    MovieItem,
  },
  props: ["title", "getListMovies"],
  data() {
    return {
      listMovies: [],
      currPage: 1,
      loading: true,
      breakpoints: {
        1700: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
        1100: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        550: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        400: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
      },
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
.movies {
  padding: 2px;
  position: relative;
  overflow: visible;
  margin-left: -1.9rem;
}

.container-movies {
  overflow: hidden;
  padding: 2rem;
  height: 440px;
  margin-top: 1rem;
}
.btns-slide {
  opacity: 0;
}
.movies:hover .btns-slide {
  opacity: 1;
}

@media (max-width: 400px) {
  .item-movie {
    max-width: initial;
  }
}
</style>
