import router from "@/router";
import {
  deleteSession,
  getFavoriteMovies,
  getToken,
  getUserDetails,
  postAuthenticate,
  postFavorite,
  postLogin,
} from "@/urlsAPI";
import axios from "axios";
import { reactive } from "vue";

function getTokenFromLocalStorage() {
  return localStorage.getItem("session_id");
}

const state = reactive({
  session_id: getTokenFromLocalStorage(),
  user: "",
  password: "",
  userDetails: null,
  isLoggedIn: false,
});

const methods = {};

export default {
  state,
  methods,
};
