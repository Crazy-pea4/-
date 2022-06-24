//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	// 使用beforeCreated钩子，在一切初始之前给Vue原型上添加一个$Bus，这个$Bus是当前vm的复制品，使用this指代
	beforeCreate() {
		Vue.prototype.$bus = this;
	}
	// 这样，一个事件总线中心就建立起来了。它可以被vm和所有的VueComponent实例对象给访问到
}).$mount('#app')