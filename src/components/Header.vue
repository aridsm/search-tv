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
      <NavMenu :showMenu="showMenu" />
    </transition>
    <div class="api">
      Dados da API
      <a href="https://www.themoviedb.org/documentation/api" target="_blank"
        >TMDB</a
      >
    </div>
    <div class="by">
      Projeto feito por <a href="https://github.com/aridsm">Ariane Morelato</a>
    </div>
  </header>
</template>

<script>
import NavMenu from "./NavMenu.vue";
export default {
  name: "Header",
  data() {
    return {
      menuIsOpen: false,
      isMobile: false,
    };
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
  components: { NavMenu },
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
