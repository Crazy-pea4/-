<template>
  <div class="con">
    <h2>你好鸭</h2>
    <!-- 默认插槽，这里表示在h2标签下面插入对应内容 -->
    <slot></slot>
    <!-- 具名插槽，给slot标签一个name属性 -->
    <slot name="games"></slot>
    <slot name="videos"></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {};
  },
};
</script>

<style scoped>
.con {
  margin: 0 50px;
  float: left;
  width: 150px;
  height: 300px;
  background-color: skyblue;
}
</style>