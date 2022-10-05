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
import { useLoginStore } from "./store/login";
export default {
  name: "App",
  components: { HeaderVue, Footer },
  setup() {
    const loginStore = useLoginStore();
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
  --cor-1: #12102e;
  --cor-2: #131236;
  --cor-3: #5280d9;
  --cor-4: #95a2b9;
  --cor-5: #e5defb;
  --cor-6: #1e1c47;
  --cor-7: #ffeb7c;
}

body {
  background: radial-gradient(
    100% 100% at 50% 0%,
    var(--cor-1) 0%,
    #100d2d 100%
  );
  color: var(--cor-5);
  font-family: "Ubuntu", sans-serif;
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
}
.title::before {
  content: "";
  display: inline-block;
  position: relative;
  background: var(--cor-3);
  width: 2rem;
  height: 3px;
  margin-right: 0.5rem;
  top: -0.3rem;
}
.input-style {
  background: var(--cor-2);
  outline: none;
  border: none;
  border-radius: 2rem;
  height: 2.7rem;
  padding: 0 1rem;
  font-family: inherit;
  color: inherit;
  transition: 0.2s;
  box-shadow: 0 0 0 1px rgba(82, 127, 217, 0.2);
}

.input-style::placeholder {
  color: var(--cor-4);
}

.input-style:hover,
.input-style:focus {
  box-shadow: 0 0 0 1px var(--cor-3);
}

.btn-padrao {
  padding: 0 2rem;
  height: 2.5rem;
  background: linear-gradient(180deg, #55d4e6 0%, var(--cor-3) 100%);
  font-weight: 900;
  color: var(--cor-1);
  border-radius: 50px;
  display: grid;
  place-items: center;
  transition: 0.1s;
}

.btn-padrao:hover {
  color: #243c6d;
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
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--cor-2);
}

::-webkit-scrollbar-thumb {
  background: var(--cor-3);
  border-radius: 3px;
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
