<template>
  <div class="vote-container">
    <img src="../../assets/star-fill.svg" class="stars-img" />
    <span class="vote">
      {{ voteData }}
    </span>
    <span class="contagem"> {{ voteCount }} votos </span>
  </div>
</template>

<script>
export default {
  props: ["rawVote", "voteCount"],
  computed: {
    voteData() {
      return (this.rawVote / 2).toFixed(2);
    },
  },
};
</script>

<style scoped>
.vote-container {
  display: flex;
  align-items: center;
  font-size: 0.8em;
}
.vote {
  color: var(--cor-7);
  margin-left: 0.7rem;
  display: inline-block;
}
.stars-img,
.vote {
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
}
.contagem {
  display: block;
  margin-left: 0.7rem;
  border-left: 1px solid var(--cor-8);
  padding-left: 0.7rem;
  color: var(--cor-4);
}

@media (max-width: 900px) {
  .stars-img {
    display: none;
  }
}
</style>
