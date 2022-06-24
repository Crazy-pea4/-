<template>
  <div class="con">
    <Calculate></Calculate>
    <MessageBoard></MessageBoard>
  </div>
</template>

<script>
// 引入文件
import Calculate from "./components/Calculate";
import MessageBoard from './components/MessageBoard.vue'
export default {
  name: "App",
  components: {
    Calculate,
    MessageBoard,
  },
};
</script>

<style scoped>
</style>