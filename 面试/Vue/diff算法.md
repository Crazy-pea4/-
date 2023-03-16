diff 算法是一种通过同层的树节点进行比较的高效算法

其有两个特点：

- 比较只会在同层级进行, 不会跨层级比较
- 在 diff 比较的过程中，循环从两边向中间比较

diff 算法在很多场景下都有应用，在 vue 中，作用于虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较

## 二、比较方式

`diff`整体策略为：深度优先，同层比较

1. 比较只会在同层级进行, 不会跨层级比较

![img](https://static001.infoq.cn/resource/image/91/54/91e9c9519a11caa0c5bf70714383f054.png)

2. 比较的过程中，循环从**两边向中间收拢**

![img](https://static001.infoq.cn/resource/image/2d/ec/2dcd6ad5cf82c65b9cfc43a27ba1e4ec.png)
