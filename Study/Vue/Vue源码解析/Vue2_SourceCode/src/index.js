import { initMixin } from "./init";

// 这里使用常规es5的写法，比es6更加清晰
function Vue(options) {
  this._init(options);
}

initMixin(Vue);

export default Vue;
