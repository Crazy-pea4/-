<template>
  <div class="con">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="test">点我测试</button>
    <slot name="tem"></slot>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Demo",
  // beforeCreate() {
  // 可以验证，setup函数是在beforeCreate钩子之前执行的
  //   console.log('---beforeCreate---', this);
  // },
  // 需要配置props来接收参数，随后才给setup。传递了但不接收会有警告，但依旧能用
  props: ["msg"],
  // Vue3有个新增的配置项——emits，用来声明接收到的自定义事件。传递了但不接收会有警告，但依旧能用
  emits: ["sayHi"],
  // setup函数能接受两个参数，分别是：props, context
  setup(props, context) {
    // console.log('---setup---', this);
    console.log("---props---", props);
    console.log("---context---", context); // context有三个常用的参数分别为：attrs, emit, slot
    console.log("---context.attrs---", context.attrs); // 与Vue2中的$attrs作用类似---->捡漏
    console.log("---context.emit---", context.emit); // 触发传递的自定义事件
    console.log("---context.slots---", context.slots); // 触发传递的自定义事件
    let person = reactive({
      name: "张三",
      age: 18,
    });
    function test() {
      context.emit("sayHi", "张家辉");
    }
    return {
      person,
      test
    };
  },
};
</script>

<style>
</style>