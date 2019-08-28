import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import User from "./views/user/User.vue";
import UserAddBox from "@/views/user/UserAddBox.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import UserListBox from "@/views/user/UserListBox.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/user",
      name: "user",
      component: User,
      children: [
        {
          path: "add-box",
          name: "add-box",
          component: UserAddBox
        },
        {
          path: "user-info",
          name: "user-info",
          component: UserInfo
        },
        {
          path: "user-box",
          name: "user-box",
          component: UserListBox
        }
      ]
    }
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
