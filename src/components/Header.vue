<template>
  <header class="header">
    <div class="container">
      <div class="logo">TV</div>

      <SearchField class="form" />

      <router-link to="/" class="login btn-padrao">Login</router-link>
      <button
        :class="['menu-btn', menuShown ? 'menu-active' : '']"
        aria-label="menu"
        @click="menuShown = !menuShown"
        v-outside-click="closeMenu"
      ></button>
      <transition>
        <nav class="nav" v-show="menuShown">
          <router-link to="/">Home</router-link>
          <router-link to="/">Todos os filmes</router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script>
import SearchField from "./SearchField.vue";
export default {
  name: "Header",
  components: { SearchField },
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
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid var(--cor-2);
}

.header .container {
  display: flex;
  align-items: center;
  position: relative;
}

.logo {
  background: var(--cor-3);
  width: 4rem;
  height: 2.5rem;
  border-radius: 5px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 1.3rem;
  color: var(--cor-1);
}

.form {
  margin-left: 2rem;
}

.login {
  margin-left: auto;
}
.menu-btn {
  width: 2rem;
  height: 2rem;
  background: url("../assets/list.svg");
  background-size: 1.8rem;
  background-position: center;
  padding: 1rem;
  border: none;
  cursor: pointer;
  margin-left: 2rem;
  border: 2px solid transparent;
  border-radius: 5px;
}

.menu-active {
  border: 2px solid var(--cor-4);
}
.nav {
  position: absolute;
  background: var(--cor-2);
  padding: 1rem;
  text-align: right;
  border-radius: 5px;
  top: 4rem;
  right: 2rem;
}

.nav a {
  display: block;
}

.nav a + a {
  margin-top: 1rem;
}
</style>
