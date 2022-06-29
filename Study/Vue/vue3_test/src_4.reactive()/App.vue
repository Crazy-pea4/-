<template>
  <div class="con">
    <!-- 在模板字符串中使用数据不需要.value，这是Vue3帮我们把引用对象里面的value给出来了 -->
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>x：{{ location.x }}, y：{{ location.y }}</h2>
    <h2>我喜欢：{{ skills.sport }}</h2>
    <h2>好学生标配：{{ hobby }}</h2>
    <button @click="changeValue">点我改变数据</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    // 需要使用ref函数来讲数据变为响应式数据。与Vue2不同，需要手动设置数据是否响应
    let name = ref("张三");
    let age = ref(18);
    let location = ref({
      x: 5,
      y: 10,
    });
    // reactive函数，专门处理对象类型数据，不可以处理基本类型数据
    let skills = reactive({
      sport: "dance",
    });
    // reactive处理数组数据
    let hobby = reactive(["抽烟", "喝酒", "烫头"]);

    // 定义一个函数用来修改页面中的name和age
    function changeValue() {
      name.value = "周瑜";
      age.value = 26;
      // 处理对象类型的数据
      console.log(location.value); // 发现该引用对象的value是一个proxy
      location.value.x = 10; // 对于location对象里面的x，Vue3不再是用ref函数生成一个引用对象，不需要用locaiton.value.x.value操作数据
      location.value.y = 20;
      // 使用了reactive后，处理对象类型数据
      skills.sport = "play basketball"; // 可以直接访问到skills下的sport
      for (let i = 0; i < hobby.length; i++) {
        hobby[i] = "学习！";
      }
    }
    return {
      name,
      age,
      location,
      skills,
      hobby,
      changeValue,
    };
  },
};
</script>

