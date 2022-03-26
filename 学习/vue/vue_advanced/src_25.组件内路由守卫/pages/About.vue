<template>
  <div class="con">
    <h2>我是About相关内容</h2>
  </div>
</template>

<script>
export default {
  name: "About",
  // 组件内路由守卫

  // 通过路由规则，进入该组件时调用
  beforeRouteEnter(to, from, next) {
    console.log("进入了About组件", to, from);
    next();
    // 也可以把路由器中的判断条件放在这里，不再赘述
  },
  // 通过路由规则，离开该组件时调用
  beforeRouteLeave(to, from, next) {
    console.log("离开了About组件", to, from);
    next();
  },
};
</script>

<style scoped>
</style>