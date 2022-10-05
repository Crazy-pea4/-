import { login, register, getWeather } from "../../api/request";

interface LoginAndRegisterData {
  account: string;
  password: string;
}

export default {
  namespaced: true,
  actions: {
    async login(context: any, value: LoginAndRegisterData) {
      const result = await login(value);
      console.log(result);
      return Promise.resolve(result);
    },
    async register(context: any, value: LoginAndRegisterData) {
      const result = await register(value);
      console.log(result);
      return Promise.resolve(result);
    },
    async getWeather(context: any) {
      const result = await getWeather();
      return Promise.resolve(result);
    },
  },
  mutations: {
    CHANGE_NAV_BOOL(state: any, value: boolean) {
      state.navBool = value;
    },
  },
  state: {
    navBool: false,
  },
  getters: {},
};
