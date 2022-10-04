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

export const GET_TOKEN = () => {
  return `${base}authentication/token/new?api_key=${api_key}`;
};

export const POST_LOGIN = () => {
  return `${base}authentication/token/validate_with_login?api_key=${api_key}`;
};

export const POST_AUTHENTICATE = () => {
  return `${base}authentication/session/new?api_key=${api_key}`;
};

export const GET_USER_DETAILS = (session_id) => {
  return `${base}account?api_key=${api_key}&session_id=${session_id}`;
};

export const DELETE_SESSION = () => {
  return `${base}authentication/session?api_key=${api_key}`;
};

export const POST_FAVORITE = (account_id, session_id) => {
  return `${base}account/${account_id}/favorite?api_key=${api_key}&session_id=${session_id}`;
};

export const GET_ACCOUNT_MOVIE_DETAILS = (movie_id, session_id) => {
  return `${base}movie/${movie_id}/account_states?api_key=${api_key}&session_id=${session_id}`;
};

export const getFavoriteMovies = (account_id, session_id) => (page) => {
  return `${base}account/${account_id}/favorite/movies?api_key=${api_key}&session_id=${session_id}&page=${page}`;
};
