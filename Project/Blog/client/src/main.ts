import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";

// 引入包入口样式
import "./index.css";
import "nprogress/nprogress.css";
import "animate.css";
import "ant-design-vue/dist/antd.css";
// 在入口处引入hljs，并挂载到window上。目的是配合highlightjs-line-numbers.js库的使用
import hljs from "highlight.js";
// @ts-ignore
window.hljs = hljs;

createApp(App).use(createPinia()).use(router).mount("#app");
