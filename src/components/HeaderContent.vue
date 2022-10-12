<template>
  <div class="header-entrada container">
    <router-link to="/" class="logo">TvSearch</router-link>
    <router-link to="/">Entrar</router-link>
    <router-link to="/" class="btn-padrao">Cadastre-se</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header-entrada {
  display: flex;
  align-items: center;
  height: 5rem;
}

.logo {
  color: var(--cor-5);
  font-weight: 900;
  margin-right: auto;
}

.btn-padrao {
  margin-left: 2rem;
}
</style>
