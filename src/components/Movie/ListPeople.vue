<template>
  <section class="list">
    <h2>{{ title }}</h2>
    <swiper
      :slides-per-view="4"
      :space-between="20"
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

        <h3>{{ person.name }}</h3>
        <p class="as">como {{ person.character || person.job }}</p>
      </swiper-slide>
    </swiper>
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
};
</script>

<style scoped>
.list {
  grid-column: 1;
}
.img-person {
  width: 100%;
  height: 17rem;
  overflow: hidden;
}

.img-person > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

h2 {
  font-size: 1.6em;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1em;
  font-weight: 800;
  margin-top: 0.5rem;
}

.as {
  color: var(--cor-4);
}
</style>
