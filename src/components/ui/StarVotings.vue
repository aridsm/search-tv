<template>
  <div class="vote-container">
    <div class="stars">
      <img
        v-for="(star, index) in voteData.starsImages"
        :key="index"
        :src="require(`../assets/${star}`)"
      />
    </div>
    <span class="vote">
      {{ voteData.vote }}
    </span>
    <span class="contagem"> {{ voteCount }} votos </span>
  </div>
</template>

<script>
export default {
  props: ["rawVote", "voteCount"],
  computed: {
    voteData() {
      const vote = (this.rawVote / 2).toFixed(2);
      const roundedVote = Math.round(this.rawVote) / 2;

      const starsImages = [];

      const fillStars = Math.floor(roundedVote);
      const halfStar = roundedVote % 1;
      const emptyStar = 5 - Math.ceil(roundedVote);

      for (let i = 0; i < fillStars; i++) {
        starsImages.push("star-fill.svg");
      }
      if (halfStar) starsImages.push("star-half.svg");

      for (let i = 0; i < emptyStar; i++) {
        starsImages.push("star-empty.svg");
      }

      return { starsImages, vote };
    },
  },
};
</script>

<style scoped>
.vote-container {
  display: flex;
  font-size: 0.8em;
}
.stars {
  display: inline-block;
}

.stars img {
  width: 14px;
}
.stars img + img {
  margin-left: 3px;
}
.vote {
  color: var(--cor-7);
  margin-left: 0.5rem;
  display: inline-block;
}

.contagem {
  display: block;
  margin-left: auto;
  color: var(--cor-4);
}
</style>
