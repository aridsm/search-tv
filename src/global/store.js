import router from "@/router";
import {
  deleteSession,
  getToken,
  getUserDetails,
  postAuthenticate,
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
});

const methods = {
  getNewToken() {
    const that = this;
    axios.get(getToken()).then((r) => {
      that.submitForm(r.data.request_token);
    });
  },
  submitForm(token) {
    const that = this;
    axios
      .post(postLogin(), {
        username: state.user,
        password: state.password,
        request_token: token,
      })
      .then((r) => {
        that.authenticate(token);
        router.push("/account");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  authenticate(token) {
    const that = this;
    axios
      .post(postAuthenticate(), {
        request_token: token,
      })
      .then((r) => {
        window.localStorage.setItem("session_id", r.data.session_id);
        that.getAccountDetails(r.data.session_id);
      })
      .catch((err) => console.log(err));
  },
  getAccountDetails(id) {
    const session_id = id || state.session_id;
    axios
      .get(getUserDetails(session_id))
      .then((r) => {
        state.userDetails = r.data;
      })
      .catch((r) => console.log(r));
  },
  logout() {
    axios
      .delete(deleteSession(), { data: { session_id: state.session_id } })
      .then((r) => {
        window.localStorage.removeItem("session_id");
        state.session_id = "";
        state.userDetails = "";
        router.push("/");
      })
      .catch((r) => console.log(r));
  },
};

export default {
  state,
  methods,
};
