import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

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

createApp(App)
  .directive("outside-click", ousideClickDirective)
  .use(store)
  .use(router)
  .mount("#app");
