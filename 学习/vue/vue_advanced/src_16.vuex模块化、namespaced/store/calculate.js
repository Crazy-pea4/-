// 在前一节vuex学习中可以看到，在state中有两个模块里的内容。在实际开发中，往往有大量的内容需要放在state中，这就会造成state过于臃肿。
// 相同的，actions、mutations、getters都会出现过于臃肿的情况，于是vuex还提供了如下写法
export default {
    // 因为
    namespaced: true,
    actions: {
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
    },
    mutations: {
        JIA(state, value) {
            state.sum += value;
        },
        JIAN(state, value) {
            state.sum -= value;
        }
    },
    state: {
        sum: 0,
        school: '广东海洋大学',
        name: '华强',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10;
        }
    }
}