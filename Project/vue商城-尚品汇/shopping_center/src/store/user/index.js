import {
  reqLogin,
  reqUserInfo,
  reqSecureCode,
  reqregister,
  reqLogout,
} from "../../api/index";

export default {
  namespaced: true,
  actions: {
    async login(context, userInfo) {
      let { data } = await reqLogin(userInfo);
      if (data.code === 200) {
        localStorage.setItem("token", data.data.token);
        return Promise.resolve();
      } else {
        return Promise.reject(data.message);
      }
    },
    async getUserInfo({ commit }) {
      let { data } = await reqUserInfo();
      console.log(data);
      if (data.code === 200) {
        commit("GETUSERINFO", data.data);
        return Promise.resolve();
      } else {
        return Promise.reject(data.message);
      }
    },
    async getSecureCode({ commit }, phone) {
      let { data } = await reqSecureCode(phone);
      if (data.code === 200) {
        console.log(data);
        commit("GETSECURECODE", data.data);
        return Promise.resolve();
      } else {
        Promise.reject(data);
      }
    },
    async register(context, userInfo) {
      let { data } = await reqregister(userInfo);
      if (data.code === 200) {
        return Promise.resolve();
      } else {
        return Promise.reject(data.message);
      }
    },
    async logout({ commit }) {
      let { data } = await reqLogout();
      console.log(data);
      if (data.code === 200) {
        localStorage.removeItem("token");
        commit("GETUSERINFO", {});
        return Promise.resolve();
      } else {
        return Promise.reject(data.message);
      }
    },
  },
  mutations: {
    GETUSERINFO(state, value) {
      state.userInfo = value;
    },
    GETSECURECODE(state, value) {
      state.secureCode = value;
    },
  },
  state: {
    userInfo: {},
    secureCode: 0,
  },
  getters: {},
};
