// 这里用于对API进行统一管理
import sendRequest from "./sendRequest";
// 引入模拟数据
import sendRequest_mock from "./sendRequest_mock";
// 服务器地址：http://gmall-h5-api.atguigu.cn

// 首页三级分类接口：/api/product/getBaseCategoryList  get请求  无参数
export const reqBaseCategoryList = () => {
  // 发请求：axios请求完成后返回的结果是Promise对象
  return sendRequest({
    url: "/product/getBaseCategoryList",
    method: "GET",
  });
};

export const reqBannerList_mock = () => {
  return sendRequest_mock({
    url: "/banner",
    method: "GET",
  });
};

export const reqFloorList_mock = () => {
  return sendRequest_mock({
    url: "/floor",
    method: "GET",
  });
};

// 搜索模块接口：/api/list  POST请求  需要携带参数（具体在接口文档处查看）
export const reqSearchList = (params) => {
  return sendRequest({
    url: "/list",
    method: "POST",
    data: params,
  });
};

// 商品详情接口: /api/item/{ skuId } get请求 需要携带参数
export const reqGoodsInfo = (skuId) => {
  return sendRequest({
    url: `/item/${skuId}`,
    method: "GET",
  });
};

// 添加产品到购物车：/cart/addToCart/${skuId}/${skuNum}
export const reqUpdateShopCart = (skuId, skuNum) => {
  return sendRequest({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "POST",
  });
};

// 获取购物车列表：/api/cart/cartList get请求
export const reqCartList = () => {
  return sendRequest({
    url: "/cart/cartList",
    method: "GET",
  });
};

// 删除购物车产品：/api/cart/deleteCart/{skuId} DELETE请求
export const deleteCart = (skuId) => {
  return sendRequest({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });
};

// 切换商品选中状态：/api/cart/checkCart/{skuId}/{isChecked}
export const changeCheckCart = (skuId, isChecked) => {
  return sendRequest({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "GET",
  });
};

// 获取验证码：/api/user/passport/sendCode/{phone}
export const reqSecureCode = (phone) => {
  return sendRequest({
    url: `/user/passport/sendCode/${phone}`,
    method: "GET",
  });
};

// 注册功能：/api/user/passport/register
export const reqregister = (userInfo) => {
  return sendRequest({
    url: `/user/passport/register`,
    method: "POST",
    data: userInfo,
  });
};

// 登录功能：/api/user/passport/login
export const reqLogin = (userInfo) => {
  return sendRequest({
    url: "/user/passport/login",
    method: "POST",
    data: userInfo,
  });
};

// 自动登录功能：/api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
  return sendRequest({
    url: "/user/passport/auth/getUserInfo",
    method: "GET",
  });
};

// 退出登录：/api/user/passport/logout
export const reqLogout = () => {
  return sendRequest({
    url: "/user/passport/logout",
    method: "GET",
  });
};
