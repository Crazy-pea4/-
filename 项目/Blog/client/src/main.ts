import { createApp } from "vue";
// 引入pinia
import { createPinia } from "pinia";

import App from "./App.vue";
import "./index.css";

createApp(App).use(createPinia()).mount("#app");
