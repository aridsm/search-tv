<template>
  <section class="list container-style" v-if="listCredits.length">
    <h2 class="title">{{ title }}</h2>
    <div class="container-swiper">
      <swiper
        class="swiper"
        :breakpoints="breakpoints"
        grab-cursor
        v-if="listCredits && listCredits.length"
      >
        <swiper-slide
          v-for="person in listCredits"
          :key="person.id"
          class="item-person"
        >
          <div class="img-person">
            <img
              v-if="person.profile_path"
              :src="`https://image.tmdb.org/t/p/w780/${person.profile_path}`"
              :alt="person.name"
            />
            <NoImage v-else img="person" />
          </div>
          <div class="person-infos">
            <h3>{{ person.name }}</h3>
            <p class="as">como {{ person.character || person.job }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import NoImage from "../ui/NoImage.vue";
export default {
  name: "ListPeople",
  props: ["listCredits", "title"],
  components: { Swiper, SwiperSlide, NoImage },
  data() {
    return {
      breakpoints: {
        550: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        360: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    };
  },
};
</script>

<style scoped>
.swiper {
  overflow: visible;
  display: flex;
}

.container-swiper {
  padding-right: 2rem;
  overflow: hidden;
}
.list {
  grid-column: 1;
}

.item-person {
  display: flex;
  flex-direction: column;
  height: auto;
}

.person-infos {
  height: 5.5rem;
}
.img-person {
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 12rem;
}

.img-person > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

h3 {
  font-size: 1em;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  color: var(--cor-5);
}

.as {
  color: var(--cor-4);
}
</style>
