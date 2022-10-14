<template>
  <header class="header container-style">
    <SearchField />

    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/movies">Todos os filmes</router-link>
      <hr />
      <a
        v-if="!loginStore.isLoggedIn"
        href="https://www.themoviedb.org/signup"
        target="_blank"
        >Cadastre-se</a
      >
      <router-link to="/login" v-if="!loginStore.isLoggedIn"
        >Entrar</router-link
      >

      <router-link to="/account" v-if="loginStore.isLoggedIn"
        >Sua conta</router-link
      >

      <button v-if="loginStore.isLoggedIn" class="sair">Sair</button>
    </nav>

    <div class="api">
      Dados da API
      <a href="https://www.themoviedb.org/documentation/api" target="_blank"
        >TMDB</a
      >
    </div>
    <div class="by">Projeto feito por <a href="/">Ariane Morelato</a></div>
  </header>
</template>

<script>
import { useLoginStore } from "@/store/login";
import SearchField from "./ui/SearchField.vue";
export default {
  name: "Header",
  components: { SearchField },
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9;
  width: 14rem;
  height: calc(100% - 2rem);
  top: 1rem;
  left: 1rem;
  padding: 2rem 0;
}

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

.api {
  margin-bottom: 1.5rem;
}

.api a,
.by a {
  color: var(--cor-5);
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
@media (max-width: 1100px) {
  .header {
    height: 4rem;
    width: calc(100% - 3rem);
    padding: 0;
    left: 1.5rem;
    top: 0.5rem;
  }

  .nav {
    margin-top: 0;
    position: absolute;
    background: var(--cor-2);
    border-radius: 0.8rem;
    border: 1px solid var(--cor-8);
    right: 1.5rem;
    top: 4rem;
    display: none;
  }
}
</style>
