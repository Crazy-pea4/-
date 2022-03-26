<template>
  <div class="con">
    <h2>Vue Router Test</h2>
    <div class="btn">
      <button @click="back">后退</button>
      <button @click="forward">前进</button>
      <button @click="go">go方法可指定跳转步数，正数往前跳转，反之</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
    go() {
      this.$router.go(3);
    }
  }
};
</script>

<style scoped>
.btn {
  position: relative;
  top: 0;
  left: -25%;
}
</style>