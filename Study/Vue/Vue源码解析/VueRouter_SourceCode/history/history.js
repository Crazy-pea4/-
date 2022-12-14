import Base from "./base";

function getPathname() {
  return window.location.pathname;
}

class BrowserHistory extends Base {
  constructor(router) {
    super(router);
  }

  push(location) {
    this.transitionTo(location, () => {
      // window.location.hash = location;
      window.history.pushState(null, "", location);
    });
  }

  // 监控history的变化
  setupListener() {
    window.addEventListener("popstate", () => {
      console.log(getPathname());
    });
  }

  // 获取当前路由
  getCurrentLocation() {
    return getPathname();
  }
}

export default BrowserHistory;
