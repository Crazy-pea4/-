export default {
  namespaced: true,
  actions: {},
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
