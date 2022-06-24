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
  mounted() {
    this.$bus.$on("getMsgFromStduent", (msg) => {
      console.log('收到了来自Studnet组件的信息...', msg);
    })
  },
  // 在一般开发中，销毁一个组件之前，需要解绑它身上的自定义事件，以免占用$bus的命名空间
  beforeDestroy() {
    this.$bus.$off('getMsgFromStduent');
  }
};
</script>

<style scoped>
.demo {
  background-color: darkslateblue;
}
</style>