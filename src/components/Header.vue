<template>
  <header class="header">
    <div class="container">
      <router-link class="logo" to="/">TV</router-link>

      <SearchField class="form" />

      <router-link
        to="/login"
        class="login btn-padrao"
        v-if="!loginStore.userDetails"
        >Login</router-link
      >
      <router-link v-else to="/account" class="btn-padrao btn-account"
        >{{ loginStore.userDetails.username }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          />
        </svg>
      </router-link>
      <button
        :class="['menu-btn', menuShown ? 'menu-active' : '']"
        aria-label="menu"
        @click="menuShown = !menuShown"
        v-outside-click="closeMenu"
      ></button>
      <transition>
        <nav class="nav" v-show="menuShown">
          <router-link to="/">Home</router-link>
          <router-link to="/movies">Todos os filmes</router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script>
import { useLoginStore } from "@/store/login";
import { inject } from "vue";
import SearchField from "./SearchField.vue";
export default {
  name: "Header",
  components: { SearchField },
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
  data() {
    return {
      menuShown: false,
    };
  },
  methods: {
    closeMenu() {
      this.menuShown = false;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background: var(--cor-1);
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid rgba(82, 127, 217, 0.2);
}

.header .container {
  display: flex;
  align-items: center;
  position: relative;
}

.logo {
  background: linear-gradient(180deg, #55d4e6 0%, var(--cor-3) 100%);
  min-width: 4rem;
  height: 2.5rem;
  border-radius: 5px;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 1.3em;
  color: var(--cor-1);
}

.form {
  margin-left: 1.5rem;
  margin-right: auto;
}

.menu-btn {
  width: 2em;
  height: 2em;
  background: url("../assets/list.svg");
  background-size: 1.8rem;
  background-position: center;
  padding: 1rem;
  margin-left: 1.5rem;
  border: 2px solid transparent;
  border-radius: 5px;
}

.menu-active {
  border: 2px solid var(--cor-4);
}

.btn-account {
  display: flex;
  margin-left: 1.5rem;
}
.btn-account svg {
  margin-left: 5px;
}
.nav {
  position: absolute;
  background: var(--cor-2);
  padding: 1rem;
  text-align: right;
  border-radius: 5px;
  top: 4rem;
  right: 1.5rem;
}

.nav a {
  display: block;
}

.nav a + a {
  margin-top: 1rem;
}
</style>
