<template>
  <section class="list">
    <h2>{{ title }}</h2>
    <swiper
      :slides-per-view="6"
      :space-between="15"
      grab-cursor
      v-if="listCredits && listCredits.length"
    >
      <swiper-slide v-for="person in listCredits" :key="person.id">
        <div class="img-person">
          <img
            v-if="person.profile_path"
            :src="`https://image.tmdb.org/t/p/w500/${person.profile_path}`"
            :alt="person.name"
          />
          <NoImage v-else />
        </div>

        <h2>{{ person.name }}</h2>
        <p>{{ person.character || person.job }}</p>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import NoImage from "./NoImage.vue";
export default {
  name: "ListPeople",
  props: ["listCredits", "title"],
  components: { Swiper, SwiperSlide, NoImage },
};
</script>

<style scoped>
.list {
  background: var(--cor-2);
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}
.img-person {
  width: 100%;
  height: 16rem;
  overflow: hidden;
}

.img-person > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>
