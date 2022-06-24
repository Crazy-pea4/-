// 不再是import Vue from 'vue'，而是一个createApp工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象——app（类似于Vue2中的vm，但Vue3的app比vm更轻）
createApp(App).mount('#app')
