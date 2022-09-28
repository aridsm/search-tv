const base = "https://api.themoviedb.org/3/";
const api_key = "0f294f1a2f41080ae252ca8b1ab63bd7";

export const getSearchMovies = (query) => {
  return `${base}search/movie?api_key=${api_key}&language=pt-BR&page=1&include_adult=false&query=${query}`;
};

export const getTopRatings = (page) => {
  return `${base}movie/top_rated?api_key=${api_key}&language=pt-BR&page=${page}`;
};
