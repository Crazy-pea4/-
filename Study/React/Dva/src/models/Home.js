import { queryList } from "../services/Home";
export default {
  namespace: "HomeModel",

  state: {
    num: 0,
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  // 异步
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *fetchList({ payload }, { call, put }) {
      // call异步
      const {
        data: {
          data: { films },
        },
      } = yield call(queryList);
      // put相当于同步再发一个dispatch
      yield put({ type: "changeList", payload: films });
    },
  },

  // 同步
  reducers: {
    changeNum(state, action) {
      return { ...state, num: state.num + action.payload };
    },
    changeList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
