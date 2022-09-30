import { getToken, postLogin } from "@/urlsAPI";
import axios from "axios";
import { reactive } from "vue";

const state = reactive({
  token: "",
  isLoggedIn: false,
  user: "",
  password: "",
});

const methods = {
  getNewToken() {
    axios.get(getToken()).then((r) => {
      state.token = r.data.request_token;
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", state.token);
        console.log("ok");
      }
    });

    this.submitForm();
  },
  submitForm() {
    axios
      .post(postLogin(), {
        username: state.user,
        password: state.password,
        request_token: state.token,
      })
      .then(function (response) {
        console.log(response);
        state.isLoggedIn = true;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default {
  state,
  methods,
};
