import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const ousideClickDirective = {
  mounted(el, binding) {
    el.ousideClick = (e) => {
      if (e.target !== el && !el.contains(e.target)) {
        binding.value();
      }
    };
    window.addEventListener("click", el.ousideClick);
  },
};

const pinia = createPinia();

createApp(App)
  .directive("outside-click", ousideClickDirective)
  .use(pinia)
  .use(router)
  .mount("#app");
