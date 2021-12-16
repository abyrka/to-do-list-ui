import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getUsers } from "@/services/index";
import "./assets/css/styles.css";

function init() {
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.mount("#app");
}

async function checkAuth() {
  const res = await getUsers();
  return new Promise((resolve) => {
    console.log("store");
    console.log(store);
    if (store) {
      console.log(res.data[0]);
      store.commit("changeCurrentUser", res.data[0]);
    }
    resolve();
  });
}

checkAuth().then(init);
