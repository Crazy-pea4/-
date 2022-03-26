import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 注册三级分类导航全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 注册轮播图全局组件
import Carousel from './components/Carousel'
Vue.component(Carousel.name, Carousel)
// 注册分页器全局组件
import Pagination from './components/Pagination'
Vue.component(Pagination.name, Pagination)
// 引入swiper的样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

// 引入mockServe.js
import './mock/mockServe.js'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')