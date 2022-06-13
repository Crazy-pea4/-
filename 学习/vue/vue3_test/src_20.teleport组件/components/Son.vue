<template>
  <div class="son">
    <h3>我是孙组件Son</h3>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  name: "Son",
  components: {
    Dialog,
  },
};
</script>

<style scoped>
.son {
  padding: 10px;
  background-color: rgb(0, 139, 46) !important;
}
</style>