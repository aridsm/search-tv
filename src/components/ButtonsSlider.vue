<template>
  <div>
    <button @click="swiper.slideNext()" class="btn-next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-right-short"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
        />
      </svg>
    </button>
    <button @click="swiper.slidePrev()" class="btn-prev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left-short"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
        />
      </svg>
    </button>
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
  width: 2em;
  height: 4em;
  border-radius: 5px;
  background: linear-gradient(180deg, #55d4e6 0%, var(--cor-3) 100%);
  position: absolute;
  transition: 0.2s;
  box-shadow: 0 0 50px 0 var(--cor-1);
  color: var(--cor-1);
}
.btn-next svg,
.btn-prev svg {
  fill: currentColor;
  width: 1.3em;
  height: 1.3em;
}
.btn-prev {
  left: 1em;
}
.btn-next {
  right: 1em;
}
.btn-next:hover,
.btn-prev:hover {
  transform: scale(1.1);
}
</style>
