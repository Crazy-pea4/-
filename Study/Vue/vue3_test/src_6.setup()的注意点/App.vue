<template>
  <!-- 像Demo组件传入参数 -->
  <Demo msg="我是参数" @sayHi="hello">
    <template v-slot:tem>
        <span>111</span>
    </template>
  </Demo>
</template>

<script>
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: {
    Demo,
  },
  setup() {
    function hello(value) {
      alert("你好，我是" + value);
    }
    return {
      hello,
    };
  },
};
</script>

