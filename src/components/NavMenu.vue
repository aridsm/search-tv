<template>
  <nav class="nav" v-if="showMenu">
    <router-link to="/">Home</router-link>
    <router-link to="/movies">Todos os filmes</router-link>
    <hr />
    <a
      v-if="!loginStore.isLoggedIn"
      href="https://www.themoviedb.org/signup"
      target="_blank"
      >Cadastre-se</a
    >
    <router-link to="/login" v-if="!loginStore.isLoggedIn">Entrar</router-link>

    <router-link to="/account" v-if="loginStore.isLoggedIn"
      >Sua conta</router-link
    >

    <button
      v-if="loginStore.isLoggedIn"
      @click="loginStore.logout"
      class="sair"
    >
      Sair
    </button>
  </nav>
</template>

<script>
import { useAccountStore } from "@/store/login";

export default {
  props: ["showMenu"],
  setup() {
    const loginStore = useAccountStore();
    return { loginStore };
  },
};
</script>

<style scoped>
hr {
  border: none;
  border-top: 1px solid var(--cor-8);
  margin: 1.5rem 0;
}
.nav {
  margin-top: 4rem;
  margin-bottom: auto;
  overflow: hidden;
  padding: 1.5rem;
}
.sair {
  color: var(--cor-4);
}
.nav a,
.sair {
  display: block;
  transition: 0.1s;
}
.nav a:hover,
.sair:hover {
  color: var(--cor-5);
}
.nav a + a,
.sair {
  margin-top: 1.5rem;
}

.router-link-active {
  color: var(--cor-5);
  position: relative;
}

.router-link-active::after {
  content: "";
  background: var(--cor-5);
  height: 1.5rem;
  width: 3px;
  display: block;
  position: absolute;
  right: -1.5rem;
  top: calc(50% - 0.75rem);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 0 30px 0 var(--cor-5);
}
</style>
