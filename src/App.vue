<template>
  <HeaderVue />
  <main>
    <HeaderContent />
    <router-view></router-view>
  </main>
  <Footer />
</template>
<script>
import HeaderVue from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useAccountStore } from "./store/login";
import HeaderContent from "./components/HeaderContent.vue";
export default {
  name: "App",
  components: { HeaderVue, Footer, HeaderContent },
  setup() {
    const loginStore = useAccountStore();
    return { loginStore };
  },
  created() {
    if (this.loginStore.session_id) this.loginStore.getAccountDetails();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --cor-1: #222329;
  --cor-2: rgb(45, 46, 52);
  --cor-3: #6fd6ff;
  --cor-4: #898d96;
  --cor-5: #eeedff;
  --cor-6: rgb(35, 126, 136);
  --cor-7: #ffed8d;
  --cor-8: rgba(124, 125, 134, 0.2);
}

body {
  background: var(--cor-1);
  color: var(--cor-4);
  font-family: "Ubuntu", sans-serif;
  font-size: 15px;
}

ul {
  list-style: none;
}

main {
  margin-left: 16rem;
  min-height: 100vh;
  padding-top: 1rem;
  padding-bottom: 4rem;
}
a {
  text-decoration: none;
  color: inherit;
}
.container {
  padding: 0 2rem;
  max-width: 1050px;
  width: 100%;
  margin: 0 auto;
}
label {
  position: absolute;
  visibility: hidden;
  top: 0;
  left: 0;
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
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.7rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--cor-4);
}

.container-style {
  background: var(--cor-2);
  border-radius: 0.5rem;
  border: 1px solid var(--cor-8);
}
.input-style {
  background: var(--cor-2);
  outline: none;
  border: none;
  border-radius: 0.3rem;
  height: 2.5rem;
  padding: 0 1rem;
  font-family: inherit;
  color: var(--cor-5);
  transition: 0.2s;
}

.input-style::placeholder {
  color: var(--cor-4);
}

.input-style:hover,
.input-style:focus {
  box-shadow: 0 0 0 1px var(--cor-3);
}

.btn-padrao {
  padding: 0 1.2rem;
  height: 2.5rem;
  background: var(--cor-3);
  font-weight: 900;
  color: var(--cor-6);
  border-radius: 0.3rem;
  display: grid;
  place-items: center;
  transition: 0.2s;
}

.btn-padrao:hover {
  background: rgb(133, 220, 255);
}

.btn-padrao:active {
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
  width: 15px;
}

::-webkit-scrollbar-track {
  background: var(--cor-1);
}

::-webkit-scrollbar-thumb {
  background: var(--cor-2);
  border-radius: 6px;
}

@media (max-width: 1100px) {
  body {
    font-size: 13px;
  }
  main {
    margin-left: 0;
    padding-top: 4rem;
  }
}

@media (max-width: 700px) {
  .container {
    padding: 0 0.7rem;
  }
}

@media (max-width: 500px) {
  .input-style,
  .btn-padrao {
    height: 2.3rem;
    padding: 0 0.7rem;
  }
}
</style>
