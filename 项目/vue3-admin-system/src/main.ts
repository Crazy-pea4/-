import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mock/test.js";

createApp(App).use(store).use(router).mount("#app");
