<template>
  <div>
    <button @click="isShow = true">弹窗</button>
    <!-- teleport传送DOM结构 -->
    <teleport to="body">
      <div v-if="isShow" class="mask">
        <div class="dialog">
          <h3>我是内容</h3>
          <h3>我是内容</h3>
          <h3>我是内容</h3>
          <h3>我是内容</h3>
          <button @click="isShow = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Dialog",
  setup() {
    let isShow = ref(false);

    return {
      isShow,
    };
  },
};
</script>

<style scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 300px;
  height: 300px;
  background-color: dodgerblue;
}
</style>