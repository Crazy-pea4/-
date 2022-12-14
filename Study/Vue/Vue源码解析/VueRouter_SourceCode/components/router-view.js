export default {
  // 必须要声明这个组件只是用作函数功能，否则拿不到render的第二个参数FunctionalRenderContext
  functional: true,
  render(h, { parent, data }) {
    /**
     * 渲染逻辑，先渲染app.vue的<router-view></router-view>
     * 再渲染子组件中的，再渲染孙组件中的...
     */
    let route = parent.$route;
    data.routerView = true;

    let depth = 0;

    /**
     * 按顺序来，显示APP.vue身上的router-view，他是没有parent的
     * 所以depth就是0，按照matchedArr来看，所对应的就是第一个
     *
     * 接下来就是Home.vue身上的router-view，他有一个parent（APP.vue）
     * 所以depth会++一次，对应的matched数组中就是第二个
     */
    while (parent) {
      /**
       * _vnode对应的是组件的渲染函数的虚拟节点       $vnode代表的是组件本身
       */
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    let record = route.matched[depth];
    if (!record) {
      return h();
    }

    return h(record.component, data);
  },
};
