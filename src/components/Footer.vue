<template>
  <footer class="footer">
    Projeto feito por <a href="https://github.com/aridsm">Ariane Morelato</a>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  text-align: center;
  padding: 2em;
  margin-left: 16rem;
}

.footer a {
  transition: 0.2s;
  color: var(--cor-3);
}

.footer a:hover {
  color: var(--cor-5);
}
</style>
