<template>
  <HeaderVue />
  <main>
    <router-view></router-view>
  </main>
  <Footer />
</template>
<script>
import HeaderVue from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import store from "./global/store";
import { provide } from "vue";
import { useLoginStore } from "./store/login";
export default {
  name: "App",
  components: { HeaderVue, Footer },
  setup() {
    provide("store", store);
    const loginStore = useLoginStore();
    return { loginStore };
  },
  created() {
    if (this.loginStore.session_id) this.loginStore.getAccountDetails();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --cor-1: #1b1937;
  --cor-2: #211f3f;
  --cor-3: #ffed8d;
  --cor-4: #95a2b9;
  --cor-5: #e5defb;
  --cor-6: #2a294d;
}

body {
  background: var(--cor-1);
  color: var(--cor-5);
  font-family: "Lato", sans-serif;
  font-size: 15px;
}

ul {
  list-style: none;
}

main {
  padding-top: 10rem;
  padding-bottom: 4rem;
  min-height: 100vh;
}
a {
  text-decoration: none;
  color: inherit;
}
.container {
  padding: 0 1.5rem;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
}

label {
  position: absolute;
  visibility: hidden;
}
button {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  background: none;
  border: none;
  cursor: pointer;
}
.title {
  font-size: 1.3em;
  text-transform: uppercase;
  border-left: 15px solid var(--cor-3);
  padding-left: 0.5rem;
}

.input-style {
  background: var(--cor-2);
  outline: none;
  border: none;
  border-radius: 5px;
  height: 2.5rem;
  padding: 0 1rem;
  font-family: inherit;
  color: inherit;
  transition: 0.2s;
}

.input-style::placeholder {
  color: var(--cor-4);
  font-style: italic;
}

.input-style:hover,
.input-style:focus {
  box-shadow: 0 0 0 1px var(--cor-3);
}

.btn-padrao {
  padding: 0 1.5rem;
  height: 2.5rem;
  background: var(--cor-3);
  font-weight: 900;
  color: var(--cor-1);
  border-radius: 50px;
  display: grid;
  place-items: center;
  transition: 0.2s;
}

.btn-padrao:hover {
  background: #efdc70;
}

.btn-padrao:active {
  background: #fff2a9;
  transform: scale(0.95);
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.v-enter-active,
.v-leave-active {
  transition: 0.2s;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--cor-2);
}

::-webkit-scrollbar-thumb {
  background: var(--cor-3);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--cor-5);
}

@media (max-width: 700px) {
  body {
    font-size: 13px;
  }
  .btn-padrao {
    padding: 0 1rem;
    height: 2rem;
  }
}
</style>
