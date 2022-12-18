import {
  reqBaseCategoryList,
  reqBannerList_mock,
  reqFloorList_mock,
} from "../../api";
export default {
  namespaced: true,
  actions: {
    async getBaseCategoryList(context) {
      const result = await reqBaseCategoryList();
      if (result.data.code === 200) {
        result.data.data.splice(-2, 2);
        context.commit("GETBASECATEGORYLIST", result.data.data);
      }
      // console.log(result.data);
    },
    async getBannerList_mock(context) {
      const { data } = await reqBannerList_mock();
      // console.log(data);
      context.commit("GETBANNERLIST_MOCK", data.data);
    },
    async getFloorList_mock(context) {
      const { data } = await reqFloorList_mock();
      context.commit("GETFLOORLIST_MOCK", data.data);
    },
  },
  mutations: {
    GETBASECATEGORYLIST(state, value) {
      state.categoryList = value;
    },
    GETBANNERLIST_MOCK(state, value) {
      state.bannerList_mock = value;
    },
    GETFLOORLIST_MOCK(state, value) {
      state.floorList_mock = value;
    },
  },
  state: {
    categoryList: [],
    bannerList_mock: [],
    floorList_mock: [],
  },
  getters: {},
};
