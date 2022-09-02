class TestPlugin {
  constructor() {
    console.log("plugin-constructor");
  }

  apply(compiler) {
    console.log("plugin-compiler");
    /**
     * 同步钩子
     */
    compiler.hooks.environment.tap("MyPlugin", (params) => {
      console.log("plugin-SyncHooks");
    });
    /**
     * 异步钩子
     */
    compiler.hooks.emit.tap("MyPlugin", (params) => {
      console.log("plugin-AsyncHooks-tap");
    });
    // tapAsync 必须要手动调用callback表示异步操作结束
    compiler.hooks.emit.tapAsync("MyPlugin", (params, callback) => {
      setTimeout(() => {
        console.log("plugin-AsyncHooks-tapAsync");
        callback();
      }, 1000);
    });
    // tapPromise 必须返回一个Promise
    compiler.hooks.emit.tapPromise("MyPlugin", (params) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("plugin-AsyncHooks-tapPromise");
          resolve();
        });
      }, 1500);
    });

    // make
    compiler.hooks.make.tapAsync("MyPlugin", (compilation, callback) => {
      // compilation要写在compiler.make之前，否则执行compilation的阶段就过了
      compilation.hooks.buildModule.tap("MyPlugin", (module) => {
        console.log("compilation");
      });
      setTimeout(() => {
        console.log("plugin-AsyncHooks-make1");
        callback();
      }, 500);
    });

    compiler.hooks.make.tapAsync("MyPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("plugin-AsyncHooks-make2");
        callback();
      }, 700);
    });

    compiler.hooks.make.tapAsync("MyPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("plugin-AsyncHooks-make3");
        callback();
      }, 300);
    });
  }
}

module.exports = TestPlugin;
