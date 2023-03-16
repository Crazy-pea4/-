在 scoped 的<style></style>中，使用 v-deep 或:deep()来进行样式穿透。

由于加了 scoped，该组件生成的 dom 会有一个 data-v-[hash] 的属性，防止不同组件的样式的污染

```css
/* 以后写的样式 */
.text {
  color: blue;
}
```

所有的选择器会变成 `.text[data-v-[该组件的hash]]`，后面加上了 data-v-[hash]

但是如果我们想要修改某个组件库的某个组件样式，直接通过类名去指定是没用的

```css
.el-button {
  background-color: green;
}
```

在浏览器上呈现出的是`.el-button[data-v-[该组件的hash]]`。很明显 element 组件库是没有这个属性的，因此我们需要样式穿透

```css
::v-deep .el-button {
  background-color: green;
}
```

在浏览器上呈现出的是`[data-v-[该组件的hash]] .el-button`

由上得出/deep/原理是在样式表上加了父组件的[data-v-hash]这个属性选择器，达到控制子组件样式的效果
