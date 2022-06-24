// 引入Vue
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
import countRelate from './calculate.js';
import messageRelate from './messages.js'
// 这此处引入Vuex以解决在main.js中的问题
Vue.use(Vuex)


// Store中也需要改变，需要用到modules配置项
export default new Vuex.Store({
    modules: {
        // 简写形式
        countRelate,
        messageRelate
    }
});