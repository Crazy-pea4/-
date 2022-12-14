function createRoute(record, location) {
  let matched = [];
  if (record) {
    while (record) {
      matched.unshift(record); // [/about, /about/a]
      record = record.parent;
    }
  }

  return {
    ...location,
    matched,
  };
}

function runQueue(queue, from, to, cb) {
  function next(index) {
    // 当队列执行完毕后，执行transitionTo的后续操作
    if (index >= queue.length) return cb();
    let hook = queue[index++];
    hook(from, to, () => next(index));
  }
  next(0);
}

class Base {
  router;
  // 当前路径对象
  current;
  // listen的回调，用处是将最新的current传给Vue实例的_route
  cb;
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: "/",
    });
  }

  transitionTo(location, listener) {
    let record = this.router.match(location);

    // 若传进来的新location和之前的path相同，那就直接return
    if (location === this.current.path) return;

    let route = createRoute(record, { path: location });

    const queue = [...this.router.beforeEachHooks];
    runQueue(queue, this.current, route, () => {
      this.current = route;
      console.log(this.current, 89465);
      listener && listener();

      this.cb && this.cb(this.current);
    });
  }

  listen(cb) {
    this.cb = cb;
  }
}

export default Base;
