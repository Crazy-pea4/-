<template>
  <div class="search_box">
    <div class="search">
      <h2>搜索GitHub用户</h2>
      <input type="text" v-model="keywords" @keyup.enter="getUsersInfo" />
      <button @click="getUsersInfo">搜索</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keywords: "",
    };
  },

  methods: {
    getUsersInfo() {
      this.$bus.$emit("usersInfo", { isLoading: true, usersInfo: [] });
      axios
        .get(`https://api.github.com/search/users?q=${this.keywords}`)
        .then((res) => {
          console.log("给Users组件发送信息");
          this.$bus.$emit("usersInfo", {
            isLoading: false,
            usersInfo: res.data.items,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.search_box {
  position: relative;
  margin: 0 auto;
  width: 800px;
  height: 250px;
  background-color: #ccc;
}
.search {
  position: absolute;
  bottom: 30px;
  left: 40px;
}
</style>