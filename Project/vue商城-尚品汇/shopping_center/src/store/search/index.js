import {
    reqSearchList
} from "../../api"
export default {
    namespaced: true,
    actions: {
        // 调用dispatch传递的参数至少得是一个对象，这里采用es6的参数默认值
        async getSearchList(context, value = {}) {
            const {data} = await reqSearchList(value);
            // console.log(data);
            if (data.code === 200) {
                context.commit("GETSEARCHLIST", data.data);
            }
        }
    },
    mutations: {
        GETSEARCHLIST(state, data) {
            state.searchList = data;
            // console.log(data);
        }
    },
    state: {
        searchList: {}
    },
    getters: {
        attrsList(state) {
            return state.searchList.attrsList || [];
        },
        goodsList(state) {
            return state.searchList.goodsList || [];
        },
        trademarkList(state) {
            return state.searchList.trademarkList || [];
        },
        total(state) {
            return state.searchList.total || 0;
        }
    }
}