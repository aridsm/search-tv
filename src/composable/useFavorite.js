import { getAccountMovieDetails } from "@/urlsAPI";
import { ref } from "vue";

export const useFavorite = (movie_id, session_id) => {
  const movieStatus = ref(null);

  const markAsFavorite = () => {
    this.store.methods.markMovieAsFavorite(
      movie_id,
      movieStatus.value.favorite
    );
  };

  const getMovieDetails = () => {
    axios
      .get(getAccountMovieDetails(movie_id, session_id))
      .then((r) => {
        movieStatus.value = r.data;
      })
      .catch((r) => console.log(r));
  };
};
