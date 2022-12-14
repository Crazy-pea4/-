export let Vue;

import routerLink from "./components/router-link";
import routerView from "./components/router-view";

function install(_Vue) {
  Vue = _Vue; // 将传入的Vue构造函数变为全局

  console.log("VueRouter install Func");

  /**
   * 这里不能直接将$router直接挂载到原型身上，得根据new Vue()中是否传入的配置项有关
   * Vue.prototype.$router
   */

  // mergeOptions 所有组件初始化都会采用这个方法
  Vue.mixin({
    beforeCreate() {
      // 判断当前处理的组件是否是父组件（根组件）
      if (this.$options.router) {
        // 根实例上传递了router
        this._routerRoot = this;
        this._router = this.$options.router;
        // 初始化
        this._router.init(this);

        // 内置工具包，在当前实例身上响应式地绑定_route，值是history.current
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  // 代理Vue.prototype.$router，当访问它时，返回当前实例中的_router
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot && this._routerRoot._router;
    },
  });

  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot && this._routerRoot._route;
    },
  });

  Vue.component("router-link", routerLink);

  Vue.component("router-view", routerView);
}

export default install;
