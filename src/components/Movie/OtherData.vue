<template>
  <section class="more-data container-style">
    <h2 class="title">Informações adicionais</h2>
    <ul>
      <li>
        <h3>Título original</h3>
        <p>{{ movieData.original_title }}</p>
      </li>
      <li>
        <h3>Língua original</h3>
        <p>{{ movieData.original_language }}</p>
      </li>
      <li v-if="movieData.budget > 0">
        <h3>Despesas</h3>
        <p>{{ formatMoney(movieData.budget) }}</p>
      </li>
      <li v-if="movieData.revenue > 0">
        <h3>Lucro</h3>
        <p>{{ formatMoney(movieData.revenue) }}</p>
      </li>
      <li>
        <h3>Data de lançamento</h3>
        <p>{{ formatDate(movieData.release_date) }}</p>
      </li>
      <li>
        <h3>País de produção</h3>
        <p v-for="pais in movieData.production_countries" :key="pais.name">
          {{ pais.name }}
        </p>
      </li>
      <li>
        <h3>Companias de produção</h3>
        <p
          v-for="company in movieData.production_companies"
          :key="company.name"
        >
          {{ company.name }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import { useDate } from "@/composable/formatDate";

export default {
  props: ["movieData"],
  setup() {
    const { formatDate } = useDate();
    return { formatDate };
  },
  methods: {
    formatMoney(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>

<style scoped>
.more-data {
  grid-row: 2 / 4;
  grid-column: 2;
}

.more-data h3 {
  font-size: 1em;
  color: var(--cor-5);
}
.more-data p {
  color: var(--cor-4);
  margin-top: 0.5rem;
}
.more-data li + li {
  margin-top: 1.5rem;
}

@media (max-width: 1000px) {
  .more-data {
    grid-row: 4;
  }
}
</style>
