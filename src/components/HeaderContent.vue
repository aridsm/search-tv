<template>
  <div class="header-entrada container">
    <router-link to="/" class="logo">TvSearch</router-link>
    <router-link to="/login" class="entrar">Entrar</router-link>
    <a
      href="https://www.themoviedb.org/signup"
      class="btn-padrao"
      target="_blank"
      >Cadastre-se</a
    >
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
