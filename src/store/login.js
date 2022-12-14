import router from "@/router";
import {
  DELETE_SESSION,
  GET_ACCOUNT_MOVIE_DETAILS,
  GET_TOKEN,
  GET_USER_DETAILS,
  POST_AUTHENTICATE,
  POST_FAVORITE,
  POST_LOGIN,
} from "@/urlsAPI";
import axios from "axios";
import { defineStore } from "pinia";

function getTokenFromLocalStorage() {
  return localStorage.getItem("session_id");
}

export const useAccountStore = defineStore("login", {
  state: () => {
    return {
      session_id: getTokenFromLocalStorage(),
      userDetails: null,
      loginError: null,
    };
  },
  getters: {
    isLoggedIn: (state) => state.userDetails && state.session_id,
  },
  actions: {
    async getNewToken() {
      return await axios.get(GET_TOKEN()).then((r) => {
        return r.data.request_token;
      });
    },
    async submitForm(username, password) {
      const that = this;
      const token = await this.getNewToken();
      axios
        .post(POST_LOGIN(), {
          username,
          password,
          request_token: token,
        })
        .then((r) => {
          that.authenticate(token);
        })
        .catch((error) => {
          const error_code = error.response.data.status_code;
          if (error_code === 30)
            this.loginError = "Senha e/ou usuário inválidos.";
          if (error_code === 26)
            this.loginError = "Você deve inserir um nome de usuário e senha.";
        });
    },
    authenticate(token) {
      const that = this;
      axios
        .post(POST_AUTHENTICATE(), {
          request_token: token,
        })
        .then((r) => {
          window.localStorage.setItem("session_id", r.data.session_id);
          this.session_id = r.data.session_id;
          this.loginError = null;
          that.getAccountDetails(r.data.session_id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAccountDetails(id) {
      const session_id = id || this.session_id;
      axios
        .get(GET_USER_DETAILS(session_id))
        .then((r) => {
          this.userDetails = r.data;
          const currentPath = router.currentRoute.value.fullPath;
          if (currentPath === "/login") {
            router.push("/account");
          }
        })
        .catch((r) => console.log(r));
    },
    logout() {
      axios
        .delete(DELETE_SESSION(), { data: { session_id: this.session_id } })
        .then((r) => {
          window.localStorage.removeItem("session_id");
          this.session_id = null;
          this.userDetails = null;
          const currentPath = router.currentRoute.value.fullPath;
          if (currentPath === "/account") {
            router.push("/");
          }
        })
        .catch((r) => console.log(r));
    },
    async getMovieDetails(movie_id) {
      return await axios
        .get(GET_ACCOUNT_MOVIE_DETAILS(movie_id, this.session_id))
        .then((r) => {
          return r.data;
        })
        .catch((r) => console.log(r));
    },
    async markMovieAsFavorite(movie_id, isFavorited) {
      return await axios
        .post(
          POST_FAVORITE(this.userDetails.id, this.session_id),
          {
            media_type: "movie",
            media_id: movie_id,
            favorite: !isFavorited,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        )
        .then((r) => {
          return r.data.success;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
