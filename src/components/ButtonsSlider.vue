<template>
  <div>
    <button @click="swiper.slideNext()" class="btn-next">c</button>
    <button @click="swiper.slidePrev()" class="btn-prev">d</button>
  </div>
</template>
<script>
import { useSwiper } from "swiper/vue";

export default {
  setup() {
    const swiper = useSwiper();

    return {
      swiper,
    };
  },
  name: "ButtonsSlider",
};
</script>

<style scoped>
.btn-next,
.btn-prev {
  z-index: 9;
  top: 160px;
  width: 2rem;
  height: 4rem;
  border-radius: 5px;
  background: var(--cor-3);
  cursor: pointer;
  border: none;
  position: absolute;
  transition: 0.2s;
  box-shadow: 0 0 50px 0 var(--cor-1);
}

.btn-prev {
  left: 1rem;
}
.btn-next {
  right: 1rem;
}
.btn-next:hover,
.btn-prev:hover {
  transform: scale(1.1);
}
</style>
