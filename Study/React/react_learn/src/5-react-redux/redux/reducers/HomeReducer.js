const HomeReducer = (
  state = {
    val: 0,
    random: 0,
    random1: 0,
  },
  action
) => {
  switch (action.type) {
    case "plus":
      return { ...state, val: state.val + 1 };
    case "asyncAction":
      return { ...state, random: action.value };
    case "asyncActionPromise":
      return { ...state, random1: action.value };
    default:
      return state;
  }
};

export default HomeReducer;
