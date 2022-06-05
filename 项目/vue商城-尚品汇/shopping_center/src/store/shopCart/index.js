import {
    reqCartList,
    deleteCart,
    changeCheckCart
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
            let {data: {code}} = await deleteCart(value);
            if (code == 200) {
                return Promise.resolve();
            } else {
                return Promise.reject('网络异常');
            }
        },
        async updateCheckCart(context, {skuId, isChecked}) {
            let {data: {code}} = await changeCheckCart(skuId, isChecked)
            if (code == 200) {
                return Promise.resolve();
            } else {
                return Promise.reject('网络异常')
            }
        },
        deleteAllCheckedCart({dispatch, getters}) {
            let PromiseArr = []
            getters.cartInfoList.cartInfoList.forEach((item) => {
                if (item.isChecked) {
                    let result = dispatch('deleteCartBySkuId', item.skuId);
                    PromiseArr.push(result)
                }
            })
            return Promise.all(PromiseArr)
        },
        checkedAllCart({dispatch, getters}, value) {
            // console.log(getters, value);
            let PromiseArr = []
            getters.cartInfoList.cartInfoList.forEach((item) => {
                let result = dispatch('updateCheckCart', { skuId: item.skuId, isChecked: value });
                PromiseArr.push(result);
            });
            return Promise.all(PromiseArr)
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