<template>
  <div class="demo">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <hr />
  </div>
</template>
<script>
export default {
  name: "Person",
  data() {
    return {
      name: "超级大胖虎",
      age: "15",
    };
  },
};
</script>

<style scoped>
/* 相同组件之间如果运用了相同的类名，会导致串台
也就是在App组建中最后引入的组件中的样式会覆盖掉前面的组件样式 */
.demo {
  background-color: darkslateblue;
}
</style>