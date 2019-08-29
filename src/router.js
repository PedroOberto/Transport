import Vue from "vue";
import Router from "vue-router";
import NotFoundComponent from "./views/NotFoundComponent.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import User from "./views/user/User.vue";
import UserAddBox from "@/views/user/UserAddBox.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import UserListBox from "@/views/user/UserListBox.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: NotFoundComponent
    },
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
      meta: {
        login: true
      },
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
