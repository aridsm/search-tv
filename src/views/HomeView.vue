<template>
  <div class="container">
    <div class="entrada">
      <h1>
        Procure por um <br />
        filme!
      </h1>
      <SearchField class="form" />
      <p class="dados">Dados da API <a href="/">TMDB</a></p>
    </div>
    <ListTopRatings />
  </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import ListTopRatings from "@/components/ListTopRatings.vue";
export default {
  name: "HomeView",
  components: { SearchField, ListTopRatings },
};
</script>

<style scoped>
.entrada {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entrada h1 {
  font-size: 3.5rem;
  line-height: 3.7rem;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.dados {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--cor-4);
  font-style: italic;
}

.dados a {
  color: var(--cor-3);
}

.dados a:hover {
  border-bottom: 1px dashed var(--cor-3);
}

.form {
  min-width: 30rem;
}
</style>
