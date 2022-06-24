<template>
  <div class="con">
    <h2>你好鸭</h2>
    <!-- 作用域插槽，插槽可以将data中的games数据反向传给插槽的使用者（props的逆作用） -->
      <slot :games="games" name="games"></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  // 当数据只能在插槽处的组件当中，若需要使用到这些数据，可以通过插槽来像父组件传值
  data() {
    return {
      games: ["GTA6", "使命召唤22", "穿越火线3", "DOOM5"],
    };
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