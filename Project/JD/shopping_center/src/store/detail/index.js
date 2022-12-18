import {
    reqGoodsInfo,
    reqUpdateShopCart
} from '../../api'
import getUUID from '../../utils/uuid'
export default {
    namespaced: true,
    actions: {
        async getGoodsInfo(context, value) {
            const {
                data: {code, data}
            } = await reqGoodsInfo(value)
            if (code == 200) {
                context.commit('GETGOODSINFO', data)
            }
        },
        // 在这里，我们可以通过对返回的data进行判断，返回一个成功的Promise或失败的Promise，这样来对使用该方法的函数提供一个.then和.catch方法，从而进行纠错
        async updateShopCart(context, value) {
            const {data} = await reqUpdateShopCart(value.skuId, value.skuNum)
            console.log(data);
            if (data.code == 200) {
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, value) {
            state.goodsInfo = value
        }
    },
    state: {
        goodsInfo: {},
        // 游客临时身份
        uuidToken: getUUID()
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