1. 当项目使用 keep-alive 时，可搭配组件 name 进行缓存过滤。

```html
<div id="app">
  <keep-alive exclude="Demo">
    <router-view />
  </keep-alive>
</div>
```

2. DOM 做递归组件时需要调用自身 name。（制作树形组件时）

```html
<div>
  <div v-for="(item,index) of list" :key="index">
    <div>
      <span class="item-title-icon"></span>
      {{item.title}}
    </div>
    <div v-if="item.children">
      <detail-list :list="item.children"></detail-list>
    </div>
  </div>
</div>
<script>
  export default {
    name: "DetailList", //递归组件是指组件自身调用自身
    props: {
      list: Array,
    },
  };
</script>
```

3、使用开发工具时，vue-devtools 调试工具里显示的组见名称是由 vue 中组件 name 决定的。
