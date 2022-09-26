const base = "https://api.themoviedb.org/3/";
const api_key = "0f294f1a2f41080ae252ca8b1ab63bd7";

export const searchMovies = (query) => {
  return `${base}search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`;
};
