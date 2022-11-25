<template>
  <div class="con">
    <Header></Header>
    <!-- 路由展示区 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("home/getBaseCategoryList");
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
@font-face {
  font-family: "iconfont";
  src: url("./assets/font/iconfont.ttf?t=1626801988439") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 12px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 版心 */
.w {
  width: 1250px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>