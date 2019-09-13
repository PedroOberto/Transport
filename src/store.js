import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: "",
      role: "",
      email: "",
      password: "",
      name: "",
      country: "",
      zipcode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: ""
    },
    user_box: null,
    loading_tracking: false
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_BOX(state, payload) {
      state.user_box = payload;
    },
    ADD_USER_BOX(state, payload) {
      state.user_box.unshit(payload);
    }
  },
  actions: {
    getUserBox(context) {
      api.get(`/box?user_id=${context.state.user.id}`).then(response => {
        context.commit("ADD_USER_BOX", response.data);
      });
    },
    getUser(context) {
      api.get(`/user`).then(response => {
        context.commit("UPDATE_USER", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      api.post("/user", payload);
    },
    logoutUser(context) {
      context.commit("UPDATE_USER", {
        id: "",
        role: "",
        email: "",
        password: "",
        name: "",
        country: "",
        zipcode: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: ""
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
    loginUser(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.password
        })
        .then(response => {
          window.localStorage.token = `Bearer ${response.data.token}`;
        });
    }
  }
});
