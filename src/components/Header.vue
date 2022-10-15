<template>
  <header class="header container-style">
    <router-link to="/" class="logo">TvSearch</router-link>

    <button
      class="menu-btn"
      :class="{ active: showMenu }"
      title="Abrir menu"
      @click="toggleMenu"
      v-outside-click="closeMenu"
    ></button>
    <transition>
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
        <router-link to="/login" v-if="!loginStore.isLoggedIn"
          >Entrar</router-link
        >

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
    </transition>
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
import { useAccountStore } from "@/store/login";
export default {
  name: "Header",
  data() {
    return {
      menuIsOpen: false,
      isMobile: false,
    };
  },
  setup() {
    const loginStore = useAccountStore();
    return { loginStore };
  },
  computed: {
    showMenu() {
      return (this.isMobile && this.menuIsOpen) || !this.isMobile;
    },
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    closeMenu() {
      this.menuIsOpen = false;
    },
    checkWindowWidth() {
      if (window.innerWidth < 1100) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkWindowWidth);
    this.checkWindowWidth();
  },
  unmounted() {
    window.removeEventListener("resize", this.checkWindowWidth);
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 99;
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
.api,
.by {
  padding: 0 1.5rem;
}
.api {
  margin-bottom: 1.5rem;
}

.api a,
.by a {
  color: var(--cor-5);
}
.nav .router-link-active {
  color: var(--cor-5);
  position: relative;
}

.nav .router-link-active::after {
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

.logo {
  color: var(--cor-5);
  margin: 0 auto;
  font-weight: 700;
}

@media (max-width: 1100px) {
  .header {
    height: 4rem;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 2rem;
    border-radius: 0;
    flex-direction: row;
    align-items: center;
    border: none;
    border-bottom: 1px solid var(--cor-8);
  }
  .logo {
    margin: initial;
  }
  .menu-btn {
    display: block;
    width: 2rem;
    height: 2rem;
    background: url("../assets/list.svg");
    background-size: 2rem;
    order: 2;
  }

  .menu-btn.active {
    box-shadow: 0 0 0 2px var(--cor-3);
    border-radius: 0.2rem;
  }
  .by {
    display: none;
  }

  .api {
    padding: 0 1rem;
    margin-bottom: 0;
    margin-left: auto;
  }
  .nav {
    margin-top: 0;
    position: absolute;
    background: var(--cor-2);
    border-radius: 0.8rem;
    border: 1px solid var(--cor-8);
    right: 1.5rem;
    top: 4rem;
  }
}

@media (max-width: 700px) {
  .header {
    padding: 0 0.7rem;
  }

  .nav {
    right: 0.7rem;
  }
}
</style>
