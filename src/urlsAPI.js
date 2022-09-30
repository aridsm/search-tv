const base = "https://api.themoviedb.org/3/";
const api_key = "0f294f1a2f41080ae252ca8b1ab63bd7";

export const getSearchMovies = (query) => {
  return `${base}search/movie?api_key=${api_key}&language=pt-BR&page=1&include_adult=false&query=${query}`;
};

export const getPopularMovies = (page) => {
  return `${base}movie/popular?api_key=${api_key}&language=pt-BR&page=${page}`;
};

export const getMovieById = (id) => {
  return `${base}movie/${id}?api_key=${api_key}&language=pt-BR`;
};
export const getMovieCredits = (id) => {
  return `${base}movie/${id}/credits?api_key=${api_key}&language=pt-BR`;
};
export const getGenres = () => {
  return `${base}genre/movie/list?api_key=${api_key}&language=pt-BR`;
};

export const getMoviesByGenre = (genreId) => (page) => {
  return `${base}discover/movie?api_key=${api_key}&language=pt-BR&page=${page}&with_genres=${genreId}`;
};

export const getToken = () => {
  return `${base}authentication/token/new?api_key=${api_key}`;
};

export const postLogin = () => {
  return `${base}authentication/token/validate_with_login?api_key=${api_key}`;
};
