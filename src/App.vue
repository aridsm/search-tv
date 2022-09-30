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
export default {
  name: "App",
  components: { HeaderVue, Footer },
  setup() {
    provide("store", store);
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
  --cor-1: #1f1e34;
  --cor-2: #2b2a42;
  --cor-3: #ffed8d;
  --cor-4: #95a2b9;
  --cor-5: #e5defb;
  --cor-6: #32314b;
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
  padding-top: 11rem;
  padding-bottom: 6rem;
  min-height: 100vh;
}
a {
  text-decoration: none;
  color: inherit;
}
.container {
  padding: 0 2rem;
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
  font-size: 1.2rem;
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
  font-size: 0.8rem;
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
  padding: 0 2rem;
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
</style>
