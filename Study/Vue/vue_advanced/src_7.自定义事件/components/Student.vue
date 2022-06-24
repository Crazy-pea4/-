<template>
  <div class="demo">
    <h2>我是一名学生</h2>
    <h2>{{ introduce }}</h2>
    <button @click="sendStudentName">点我发送介绍给父组件</button>
    <button @click="disbind">点我解除绑定</button>
    <button @click="goDie">点我销毁Student组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      introduce: "我喜欢打羽毛球",
    };
  },
  methods: {
    sendStudentName() {
      // 触发自定义事件。第一个参数为事件名，第二个参数为传递的值
      this.$emit("get", this.introduce);
      this.$emit("test")
    },
    disbind() {
      // 解除绑定
      this.$off("get"); // 适用于解绑一个事件
      // this.$off(["get", "test"]); // 适用于绑多个事件
      // this.$off(); // 适用于解绑所有事件
      console.log('解除绑定');
    },
    goDie() {
      this.$destroy(); // 杀掉组件实例对象
      // 再次点击自定义事件按钮，发现自定义事件也随着vc消逝了
    }
  },
};
</script>

<style scoped>
/* 在style后面加上scoped，可以限制样式的作用范围（只在本组件中） */
.demo {
  background-color: sandybrown;
}
</style>