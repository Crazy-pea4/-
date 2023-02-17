// 分页

// 最终版本
async function render() {
  const data = await fetch("");
  // 分页
  let total = data.length;
  let page = 0;
  let limit = 50;
  let totalPages = Math.ceil(total / limit);
  function getPage() {
    if (page >= totalPages) return;
    // 请求动画帧，根据屏幕刷新率执行回调
    requestAnimationFrame(() => {
      // 创建文档碎片，避免频繁上树
      const fragment = document.createDocumentFragment();
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = data[i];
        const div = document.createElement("div");
        div.innerHTML = `<span>${item.title}</span>`;
        fragment.appendChild(div);
      }
      // 上树...
      page++;
      getPage();
    });
  }
  getPage();
}

async function render() {
  // 10w+数据
  const data = await fetch("");
  /**
   * 使用分页：
   *    总数 页数 每页限制数
   */
  let total = data.length;
  let page = 0; // 当前页数
  let limit = 50; // 每页限制50条
  let totalPages = Math.ceil(total / limit); // 可能除不尽，向上取整

  function getPage() {
    if (page >= totalPages) return;
    for (let i = page * limit; i < page * limit + limit; i++) {
      const item = data[i];
      const div = document.createElement("div");
      div.innerHTML = `<span>${item.title}</span>`;
      // 上树...
    }
    page++;
    getPage();
  }

  getPage();
}

// 优化 requestAnimationFrame 以屏幕刷新率每刷新一次执行回调
function getPage() {
  requestAnimationFrame(() => {
    for (let i = page * limit; i < page * limit + limit; i++) {
      const item = data[i];
      const div = document.createElement("div");
      div.innerHTML = `<span>${item.title}</span>`;
      // 上树...
    }
    page++;
    getPage();
  });
}

// 优化 createDocumentFragment
function getPage() {
  requestAnimationFrame(() => {
    // 创建文档碎片
    const fragment = document.createDocumentFragment();
    for (let i = page * limit; i < page * limit + limit; i++) {
      const item = data[i];
      const div = document.createElement("div");
      div.innerHTML = `<span>${item.title}</span>`;
      fragment.appendChild(div);
    }
    // 上树...
    page++;
    getPage();
  });
}
