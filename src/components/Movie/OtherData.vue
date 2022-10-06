<template>
  <section class="more-data">
    <ul>
      <li>
        <h2>Título original</h2>
        <p>{{ movieData.original_title }}</p>
      </li>
      <li>
        <h2>Língua original</h2>
        <p>{{ movieData.original_language }}</p>
      </li>
      <li>
        <h2>Despesas</h2>
        <p>{{ movieData.budget }}</p>
      </li>
      <li>
        <h2>Lucro</h2>
        <p>{{ movieData.revenue }}</p>
      </li>
      <li>
        <h2>Data de lançamento</h2>
        <p>{{ movieData.release_date }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["movieData"],
};
</script>

<style>
.more-data {
  grid-row: 2;
  grid-column: 2;
}

.more-data h2 {
  font-size: 1em;
}
.more-data p {
  color: var(--cor-4);
  margin-top: 0.5rem;
}
.more-data li + li {
  margin-top: 1rem;
}
</style>
