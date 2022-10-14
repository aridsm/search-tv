<template>
  <div class="header-entrada container">
    <router-link to="/" class="logo">TvSearch</router-link>
    <router-link to="/login" class="entrar" v-if="!loginStore.isLoggedIn"
      >Entrar</router-link
    >
    <a
      href="https://www.themoviedb.org/signup"
      class="btn-padrao"
      target="_blank"
      v-if="!loginStore.isLoggedIn"
      >Cadastre-se</a
    >
    <router-link to="/account" class="btn-padrao" v-else>Sua conta</router-link>
  </div>
</template>

<script>
import { useLoginStore } from "@/store/login";

export default {
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
};
</script>

<style scoped>
.header-entrada {
  display: flex;
  align-items: center;
  height: 5rem;
  font-weight: 700;
}

.logo {
  color: var(--cor-5);
  margin-right: auto;
}

.entrar {
  transition: 0.2s;
}
.entrar:hover {
  color: var(--cor-5);
}
.btn-padrao {
  margin-left: 2rem;
}
</style>
