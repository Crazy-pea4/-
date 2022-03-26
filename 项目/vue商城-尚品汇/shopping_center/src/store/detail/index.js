import {
    reqGoodsInfo
} from '../../api'
export default {
    namespaced: true,
    actions: {
        async getGoodsInfo(context, value) {
            const {data: {code,data}} = await reqGoodsInfo(value)
            if (code == 200) {
                context.commit('GETGOODSINFO', data)
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, value) {
            state.goodsInfo = value
        }
    },
    state: {
        goodsInfo: {}
    },
    getters: {
        // goodsInfo的初状态是空对象，为了保险起见让下面的语句至少返回一个空对象{}
        categoryView(state) {
            return state.goodsInfo.categoryView || {};
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || [];
        }
    }
}