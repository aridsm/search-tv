<template>
  <section class="movie container-style">
    <div class="img-container">
      <img
        v-if="movieData.poster_path"
        :src="`https://image.tmdb.org/t/p/w780/${movieData.poster_path}`"
        :alt="movieData.title"
      />
      <NoImage v-else img="movie" />
    </div>
    <div class="movie-infos">
      <div class="flex">
        <h1>{{ movieData.title }}</h1>
        <FavoriteMovie
          v-if="loginStore.isLoggedIn"
          :movieId="movieData.id"
          :showText="true"
        />
      </div>
      <p v-if="movieData.tagline" class="tagline">{{ movieData.tagline }}</p>
      <span class="runtime">{{ movieRuntime }}</span>
      <StarVotings
        :rawVote="movieData.vote_average"
        :voteCount="movieData.vote_count"
      />
      <ul class="categories">
        <li v-for="genre in movieData.genres" :key="genre.id">
          {{ genre.name }}
        </li>
      </ul>
      <p class="overview">
        {{ movieData.overview || "Não há descrição para este filme" }}
      </p>
    </div>
  </section>
</template>

<script>
import StarVotings from "../ui/StarVotings.vue";
import FavoriteMovie from "../ui/FavoriteMovie.vue";
import NoImage from "../ui/NoImage.vue";
import { useLoginStore } from "@/store/login";
export default {
  props: ["movieData"],
  components: { StarVotings, FavoriteMovie, NoImage },
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
  computed: {
    movieRuntime() {
      const timeInMinutes = this.movieData.runtime;
      const fullHours = Math.floor(timeInMinutes / 60);
      const fullMinutes = timeInMinutes % 60;

      const padNumber = (num) => {
        return num.toString().padStart(2, "0");
      };

      return `${padNumber(fullHours)}h:${padNumber(fullMinutes)}min`;
    },
  },
};
</script>

<style scoped>
.movie {
  display: flex;
  grid-column: 1 / -1;
}
.movie-infos {
  margin-left: 2rem;
  flex: 4;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-size: 2em;
  color: var(--cor-5);
}

h1,
.tagline,
.overview {
  max-width: 500px;
}
.tagline,
.runtime {
  display: block;
  font-size: 1em;
  font-weight: 400;
  color: var(--cor-4);
  margin: 0.2rem 0 1rem 0;
}
.img-container {
  width: 250px;
  height: 23rem;
}

.tagline {
  color: var(--cor-5);
}

.img-container > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.categories {
  margin: 1rem 0 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: var(--cor-4);
}

.categories li + li {
  border-left: 1px solid var(--cor-4);
  padding-left: 0.5rem;
}

.overview {
  font-size: 1em;
  line-height: 140%;
}

@media (max-width: 750px) {
  .movie {
    flex-direction: column;
  }
  .movie-infos {
    margin-left: 0;
    margin-top: 1.5rem;
  }

  .img-container {
    width: 200px;
    height: 19rem;
    margin: 0 auto;
    padding: 0.5rem;
    background: var(--cor-6);
    border-radius: 5px;
  }
  .flex {
    flex-direction: column;
    align-items: flex-start;
  }
  .tagline {
    margin-top: 0.5rem;
  }
}
</style>
