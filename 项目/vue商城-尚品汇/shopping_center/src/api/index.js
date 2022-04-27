// 这里用于对API进行统一管理
import sendRequest from './sendRequest'
// 引入模拟数据
import sendRequest_mock from './sendRequest_mock'
// 服务器地址：http://gmall-h5-api.atguigu.cn

// 首页三级分类接口：/api/product/getBaseCategoryList  GET请求  无参数
export const reqBaseCategoryList = () => {
    // 发请求：axios请求完成后返回的结果是Promise对象
    return sendRequest({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

export const reqBannerList_mock = () => {
    return sendRequest_mock({
        url: '/banner',
        method: 'get'
    })
}

export const reqFloorList_mock = () => {
    return sendRequest_mock({
        url: '/floor',
        method: 'get'
    })
}

// 搜索模块接口：/api/list  POST请求  需要携带参数（具体在接口文档处查看）
export const reqSearchList = (params) => {
    return sendRequest({
        url: '/list',
        method: 'post',
        data: params,
    });
}

// 商品详情接口: /api/item/{ skuId } GET请求 需要携带参数
export const reqGoodsInfo = (skuId) => {
    return sendRequest({
        url: `/item/${skuId}`,
        method: 'get',
    })
}

// 添加产品到购物车：/cart/addToCart/${skuId}/${skuNum}
export const reqUpdateShopCart = (skuId, skuNum) => {
    return sendRequest({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 获取购物车列表：/api/cart/cartList GET请求
export const reqCartList = () => {
    return sendRequest({
        url: '/cart/cartList',
        method: 'get'
    })
}

// 删除购物车产品：/api/cart/deleteCart/{skuId} DELETE请求
export const deleteCart = (skuId) => {
    return sendRequest({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}