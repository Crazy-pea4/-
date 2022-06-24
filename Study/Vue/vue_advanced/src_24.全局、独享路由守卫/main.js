//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'

// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由器
import router from './router/index'

// 关闭生产提示
Vue.config.productionTip = false
// 应用vue-router
Vue.use(VueRouter)

new Vue({
	render: h => h(App),
	router
}).$mount('#app')