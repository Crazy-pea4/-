keep-alive 内部会维护一个缓存对象（用来缓存符合条件的组件）和一个缓存组件的 keys 数组

因为支持 max 最长缓存数量，keep-alive 还采用了 LRU 算法 （Least Recently Used）。

```js
export default {
  name: "keep-alive",
  abstract: true, // 判断此组件是否需要在渲染成真实DOM，这是致使它不会渲染到页面上的关键
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },
  created() {
    this.cache = Object.create(null); // 创建对象来存储  缓存虚拟dom
    this.keys = []; // 创建数组来存储  缓存key
  },
  mounted() {
    // 实时监听include、exclude的变动
    this.$watch("include", (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },
  destroyed() {
    for (const key in this.cache) {
      // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  // 这里以下搭配下面的讲解来看
  render() {
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot); // 找到第一个子组件对象
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // 存在组件参数
      // check pattern
      const name: ?string = getComponentName(componentOptions); // 组件名
      const { include, exclude } = this;
      if (
        // 条件匹配
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      const key: ?string =
        vnode.key == null // 定义组件的缓存key
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      if (cache[key]) {
        // 已经缓存过该组件
        vnode.componentInstance = cache[key].componentInstance;
        // 将当前使用缓存的组件key在原先位置删除，随后放入keys队列末尾
        remove(keys, key);
        keys.push(key); // LRU算法关键
      } else {
        cache[key] = vnode; // 缓存组件对象
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          // 超过缓存数限制，将第一个删除
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true; // 渲染和执行被包裹组件的钩子函数需要用到
    }
    return vnode || (slot && slot[0]);
  },
};
```

render 函数里主要做了这些事：

第一步：获取到 keep-alive 包裹的第一个组件以及它的组件名称

第二步：判断此组件名称是否能被白名单、黑名单匹配，如果不能被白名单匹配 || 能被黑名单匹配，则直接返回 VNode，不往下执行，如果不符合，则往下执行第三步

第三步：根据组件 ID、tag 生成缓存 key，并在缓存集合中查找是否已缓存过此组件。如果已缓存过，直接取出缓存组件，并更新缓存 key 在 keys 中的位置（keys.push(key)位置改为末尾，这是 LRU 算法的关键），如果没缓存过，则继续第四步

第四步：分别在 cache、keys 中保存此组件以及他的缓存 key，并检查数量是否超过 max，超过则根据 LRU 算法进行删除

第五步：将此组件实例的 keepAlive 属性设置为 true，这很重要哦，下面会讲到的！

再详细分析：

在第二步的时候，只要不能被白名单匹配或者能被黑名单匹配满足其实一个，那我们就不对该组件进行缓存，直接返回他的 VNode。

白名单就是我们需要缓存的组件，黑名单就是我们不需要缓存的组件。

认真看流程，可以理解的。（请再多看一遍）

---

pruneCacheEntry 函数

```ts
function pruneCacheEntry(
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key];
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy(); // 执行组件的destory钩子函数
  }
  cache[key] = null; // 设为null
  remove(keys, key); // 删除对应的元素
}
```
