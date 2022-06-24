<template>
  <div class="con">
    <Banner></Banner>
    <br />
    <div class="bottom_box">
      <div class="left">
        <!-- 以前开发中的多页面实现跳转功能 -->
        <!-- <a href="./About.html" class="box1">About</a> -->
        <!-- <a href="./Home.html" class="box2">Home</a> -->

        <!-- Vue中借助router-link标签实现路由的切换 -->
        <!-- 值得注意的是，切换时，不显示的组件默认是被销毁掉的，需要时再去挂载 -->
        <router-link to="/about" active-class="active" class="box1 btn"
          >About</router-link
        >
        <router-link to="/home" active-class="active" class="box2 btn"
          >Home</router-link
        >
      </div>
      <div class="right">
        <!-- 指定组建的呈现位置 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "./components/Banner.vue";
export default {
  name: "App",
  components: {
    Banner,
  },
};
</script>

<style scoped>
.active {
  background-color: rgb(63, 183, 231) !important;
}
.btn:hover {
  background-color: rgb(238, 238, 238);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: black;
  text-decoration: none;
}
.con {
  margin: 0 auto;
  width: 1200px;
  text-align: center;
}
.bottom_box {
  position: relative;
}
.left {
  margin-left: 200px;
  width: 200px;
  height: 80px;
}
.box1,
.box2 {
  position: relative;
  z-index: 9999;
  display: block;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  background-color: rgb(245, 243, 243);
}
.right {
  position: absolute;
  top: 0;
  left: 45%;
  transform: translateX(-50%);
  height: 80px;
  line-height: 80px;
}
</style>