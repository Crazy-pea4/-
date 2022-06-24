// 引入Vue
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';

// 这此处引入Vuex以解决在main.js中的问题
Vue.use(Vuex)

// 准备actions——用于响应组件中的动作
const actions = {
    // 这里的配置项需要与组建中调用dispatch函数所传的第一个参数相同dispatch('name', value)
    // 同时这里的函数可以接收两个参数，第一个参数意为上下文，是一个对象里面有一些可能需要调用的函数其中就有commit；第二个参数为dispatch中传过来的值

    /*
    jia(context, value) {
        context.commit('JIA', value)
    },                                  // 因为在这两句代码中，没有逻辑需求，从而可以跳过调用dispatch函数，直接去组件里调用commit函数
    jian(context, value) {
        context.commit('JIAN', value)
    },
    */

    jiaOdd(context, value) {
        // 配置逻辑可以在actions里写，比较规范（context里也有state）
        if (context.state.sum % 2 != 0) {
            context.commit('JIA', value)
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIA', value)
        }, 500);
    },
};
// 准备mutations——用于操作数据
const mutations = {
    // 一般在开发中，都在actions里面用小写的配置项，在mutations里面用大写的
    // 这里的函数也能接收两个参数，第一个参数是一个对象state（里面就存放着一开始配置的数据）；第二个参数是从commit传过来的值
    JIA(state, value) {
        state.sum += value;
    },
    JIAN(state, value) {
        state.sum -= value;
    }
};
// 准备state——用于存储数据
const state = {
    sum: 0,
    school: '广东海洋大学',
    name: '华强',
    messages: []
};
// getters配置项——用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10;
    }
}
// 创建store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
});