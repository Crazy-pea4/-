//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
// 全局mixin配置，引入mixin.js
import {mixin, mixin2} from './mixin'
Vue.mixin(mixin)
Vue.mixin(mixin2)

Vue.config.productionTip = false
/* 
	功能：可以把多个组件 共用 的配置提取成一个混入对象
*/

new Vue({ 
  render: h => h(App),
}).$mount('#app')