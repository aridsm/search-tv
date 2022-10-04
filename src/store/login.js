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

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      session_id: getTokenFromLocalStorage(),
      userDetails: null,
      isLoggedIn: false,
    };
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
      console.log("toke" + token);
      axios
        .post(POST_LOGIN(), {
          username,
          password,
          request_token: token,
        })
        .then((r) => {
          console.log("ok");
          that.authenticate(token);
        })
        .catch((error) => {
          console.log(error);
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
          console.log("autenticado");
          this.session_id = r.data.session_id;
          that.getAccountDetails(r.data.session_id);
          router.push("/account");
        })
        .catch((err) => console.log(err));
    },
    getAccountDetails(id) {
      const session_id = id || this.session_id;
      console.log(session_id);
      axios
        .get(GET_USER_DETAILS(session_id))
        .then((r) => {
          console.log("pegou dados");
          this.userDetails = r.data;
          this.isLoggedIn = true;
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
          this.isLoggedIn = false;
          router.push("/");
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
