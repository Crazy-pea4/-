<template>
  <div class="con">
    <!-- 在模板字符串中使用数据不需要.value，这是Vue3帮我们把引用对象里面的value给出来了 -->
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeValue">点我改变姓名年龄</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    // 需要使用ref函数来讲数据变为响应式数据。与Vue2不同，需要手动设置数据是否响应
    let name = ref("张三");
    let age = ref(18);

    // 定义一个函数用来修改页面中的name和age
    function changeValue() {
      // name = '周瑜'
      // age = 26
      // 发现上面的代码无法修改页面中的数据，ref就此登场
      // 但在使用ref定义数据为响应式后，上面的代码仍然无法改变页面数据
      console.log(name, age); // 尝试打印name，age。发现数据已变为一个 引用对象（简称ref对象）
      // 将代码修改为如下
      name.value = "周瑜";
      age.value = 26;
      // 成功改变页面数据
    }
    return {
      name,
      age,
      changeValue,
    };
  },
};
</script>

