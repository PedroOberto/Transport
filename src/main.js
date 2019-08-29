import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ErrorNotification from "@/components/ErrorNotification.vue";
import Loading from "@/components/Loading.vue";

Vue.config.productionTip = false;

Vue.component("ErrorNotification", ErrorNotification);
Vue.component("Loading", Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
