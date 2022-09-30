import router from "@/router";
import {
  getToken,
  getUserDetails,
  postAuthenticate,
  postLogin,
} from "@/urlsAPI";
import axios from "axios";
import { reactive } from "vue";

const state = reactive({
  token: "",
  isLoggedIn: false,
  user: "",
  password: "",
  userDetails: {},
});

const methods = {
  getNewToken() {
    const that = this;
    axios.get(getToken()).then((r) => {
      const newToken = r.data.request_token;
      state.token = newToken;

      that.submitForm(newToken);
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", newToken);
      }
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
        console.log(r.data);
        state.isLoggedIn = true;
        that.getAccountDetails(r.data.session_id);
      })
      .catch((err) => console.log(err));
  },
  getAccountDetails(session_id) {
    axios
      .get(getUserDetails(session_id))
      .then((r) => (state.userDetails = r.data))
      .catch((r) => console.log(r));
  },
};

export default {
  state,
  methods,
};
