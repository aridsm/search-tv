<template>
  <header class="header container-style">
    <SearchField classResults="stretch" />

    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/movies">Todos os filmes</router-link>
      <a
        href="https://www.themoviedb.org/signup"
        target="_blank"
        class="cadastre-se"
        >Cadastre-se</a
      >
      <router-link to="/login">Entrar</router-link>
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
  padding: 2rem 1.2rem;
  overflow: hidden;
}
.nav {
  margin-top: 4rem;
  margin-bottom: auto;
}
.nav a {
  display: block;
  transition: 0.1s;
}
.nav a:hover {
  color: var(--cor-5);
}
.nav a + a {
  margin-top: 1.5rem;
}

.cadastre-se {
  padding-top: 1.5rem;
  border-top: 1px solid var(--cor-8);
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
  right: -1.2rem;
  top: calc(50% - 0.75rem);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 0 30px 0 var(--cor-5);
}
@media (max-width: 700px) {
  .header {
    height: 4rem;
  }
}
</style>
