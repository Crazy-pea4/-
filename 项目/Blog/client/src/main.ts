import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";

// 引入tailwindcss入口样式
import "./index.css";
import "ant-design-vue/dist/antd.css";

createApp(App).use(createPinia()).use(router).mount("#app");
