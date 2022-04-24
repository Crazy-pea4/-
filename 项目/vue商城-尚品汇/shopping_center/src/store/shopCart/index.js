import {
    reqCartList,
    deleteCart
} from '../../api'
export default {
    namespaced: true,
    actions: {
        async getCartList(context) {
            let {data} = await reqCartList();
            if (data.code == 200) {
                context.commit('GETCARTLIST', data.data);
            }
        },
        async deleteCartBySkuId(context, value) {
            let {data} = await deleteCart(value);
            console.log(data);
        }
    },
    mutations: {
        GETCARTLIST(state, value) {
            state.cartList = value;
        }
    },
    state: {
        cartList: []
    },
    getters: {
        cartInfoList(state) {
            // 发现在原来购物车页面刷新后，数据没有显示在页面上，而且控制台报“无法在undefined中读取cartInfoList字段”
            // 发现这样做很危险，因为在数据没有那么快回来之前，state.cartList[0]会被认为是undefined从而导致数据渲染不到页面上，个人认为原因就在这个[0]身上
            // 因此这里将下面的代码注释掉，改为第二行代码
            // return state.cartList[0].cartInfoList || [];
            return state.cartList[0] || [];
        }
    }
}