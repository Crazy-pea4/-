v-if 和 v-for 在同意标签内，会发生什么，谁的优先级高

## 在 Vue2 中

v-for 的优先级高，这会导致每次遍历后才判断，v-if 会大量消耗性能。

如何解决？ 在外层包一个 template 标签，让 v-if 先判断再遍历

```html
<template v-if="condition">
  <div v-for="expression">{{ xxx }}</div>
</template>
```

## 在 Vue3 中

v-if 的优先级高，可以将其与 v-for 放在同一标签内。不过仍然建议保留 Vue2 的习惯，使用`<template></template>`
