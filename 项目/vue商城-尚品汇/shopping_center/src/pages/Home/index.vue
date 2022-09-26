<template>
  <div class="con">
    <!-- TypeNav已注册为全局组件 -->
    <TypeNav></TypeNav>
    <MainContainer></MainContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Likes></Likes>
    <Floor v-for="floor in floorList_mock" :key="floor.id" :floorList="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import MainContainer from "./MainContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Likes from "./Likes";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    MainContainer,
    Recommend,
    Rank,
    Likes,
    Floor,
    Brand,
  },
  mounted() {
    // 获取mock数据，楼层列表
    this.$store.dispatch("home/getFloorList_mock");
    // 用于用户登陆后，利用token自动登录获取用户信息
    if (localStorage.getItem("token")) {
      this.$store.dispatch('user/getUserInfo').then(() => {
      }).catch((err) => {
        console.log(err)
      });
    }

  },
  computed: {
    ...mapState("home", ["floorList_mock"]),
  },
};
</script>

<style>

</style>