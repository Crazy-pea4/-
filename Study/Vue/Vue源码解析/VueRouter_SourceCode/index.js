import install, { Vue } from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";

/**
 * 1. 需要将用户的路由配置进行映射    {'/': Home, '/about': About}
 * 2. 要将根实例注入的router属性共享给每个组件
 */
class VueRouter {
  // 匹配器，里面有addRoute addRoutes match方法
  matcher;
  // 对应路由模式生成的history实例
  history;
  beforeEachHooks = [];
  constructor(options) {
    let routes = options.routes || [];
    console.log(routes);
    // 将传进来的routes形成映射表
    this.matcher = createMatcher(routes);

    let mode = options.mode || "hash";
    if (mode === "hash") {
      this.history = new HashHistory(this);
    } else if (mode === "history") {
      this.history = new BrowserHistory(this);
    } else {
      console.error("输入的mode模式有误");
    }

    this.beforeEachHooks = [];
  }

  match(location) {
    return this.matcher.match(location);
  }

  push(location) {
    this.history.push(location);
  }

  beforeEach(cb) {
    this.beforeEachHooks.push(cb);
  }

  init(app) {
    let history = this.history;

    history.transitionTo(history.getCurrentLocation(), () => {
      history.setupListener();
    });

    // 每次路由切换的时候都需要调用listen中的回调，来对在install响应式处理的_route更新数据
    history.listen((newRoute) => {
      app._route = newRoute;
    });
  }
}

// 由于默认的Vue.use()会去执行传入的参数，而一个类被调用会报错
// 这里的install方法是为了解决当用户导出的是一个class类而不是一个方法时，Vue.use()不会去执行类，而是执行里面的install方法
VueRouter.install = install;

export default VueRouter;
