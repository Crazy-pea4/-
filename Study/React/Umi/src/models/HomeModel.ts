interface InitialState {
  num: number;
  list: any[];
}

const initialState: InitialState = {
  num: 0,
  list: [],
};
export default {
  // 在Umi中namespace是可选的，不写默认按照文件名
  namespace: 'HomeModel',
  state: initialState,
  reducers: {
    changeNum(state: InitialState, action: any) {
      return { ...state, num: state.num + action.payload };
    },
    changeList(state: InitialState, action: any) {
      return { ...state, list: action.payload };
    },
  },
  effects: {
    *getList(action: any, effects: any): any {
      const res = yield effects.call(fetchList);
      yield effects.put({ type: 'changeList', payload: res });
    },
  },
};

async function fetchList() {
  const list = await fetch('/maizuo', {
    headers: {
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16735000082187250750193665"}',
      'X-Host': 'mall.film-ticket.film.list',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.films)
    .catch((err) => {
      console.log(err);
    });
  return list;
}
