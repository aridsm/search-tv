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
            <FavoriteMovie :movieId="movie.id" />
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
.item-movie {
  background: var(--cor-2);
  padding: 0.6em;
  border-radius: 5px;
  transition: 0.2s;
}

.item-movie:hover {
  background: var(--cor-6);
  box-shadow: 0 0 0 1px var(--cor-3);
  transform: scale(1.03) translateY(-1rem);
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

@media (max-width: 400px) {
  .item-movie {
    max-width: initial;
  }
}
</style>
