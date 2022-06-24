<template>
  <div class="user_box clearfix">
    <div class="item" v-for="item in usersInfo" :key="item.id">
      <a :href="item.html_url" class="item_pic">
        <img :src="item.avatar_url" alt="" />
      </a>
      <a :href="item.html_url" class="item_intro">{{ item.login }}</a>
    </div>
    <h2 v-show="isLoading">加载中...</h2>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      isLoading: false,
      usersInfo: [],
    };
  },
  methods: {
    renderInfo(dataObj) {
      console.log("成功接收", dataObj);
      this.usersInfo = dataObj.usersInfo;
      this.isLoading = dataObj.isLoading;
    },
  },
  mounted() {
    this.$bus.$on("usersInfo", this.renderInfo);
  },
};
</script>

<style scoped>
.user_box {
  position: relative;
  margin: 0 auto;
  margin-top: 50px;
  width: 1200px;
}
.item {
  position: relative;
  float: left;
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  text-align: center;
}
.item .item_pic img {
  margin-top: 10px;
  width: 200px;
  height: 200px;
}
.item .item_intro {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>