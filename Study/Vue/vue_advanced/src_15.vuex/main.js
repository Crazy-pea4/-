//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'

// // 引入Vuex(这里注释掉，在store文件夹下的index.js中引入了)

// import Vuex from 'Vuex'

// 引入store(这里必须是小写s)
import store from './store/index.js'

// 在这里有一个需要注意的点：
// store文件中的index.js里面用到了Vuex.store，但在计算机读取其中的代码时，Vue并没有使用Vuex插件(没有Vue.use(Vuex))。
// 即使把第八行的代码放在Vue.use(Vuex)之后也无济于事，因为js总是优先解析import语句
// Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	store,
	// 创建一个全局事件总线$bus
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
}).$mount('#app')