import Base from "./base";

function ensureSlash() {
  if (window.location.hash) return;
  window.location.hash = "/";
}

function getHash() {
  return window.location.hash.slice(1);
}

class HashHistory extends Base {
  constructor(router) {
    super(router);

    // 初始化hash路由时，要给定一个默认的hash路径 /
    ensureSlash();
  }

  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location;
    });
  }

  // 监控hash值的变化
  setupListener() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
    });
  }

  // 获取当前路由
  getCurrentLocation() {
    return getHash();
  }
}

export default HashHistory;
