//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'

Vue.config.productionTip = false

// 引入plungin插件
import plugin from './plugins'

// 应用plugin，也可以传参给install函数
Vue.use(plugin, 1, 2, 3)
new Vue({
	render: h => h(App),
}).$mount('#app')