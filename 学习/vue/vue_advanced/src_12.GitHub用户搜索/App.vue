<template>
  <div>
    <Search></Search>
    <Users></Users>
  </div>
</template>

<script>
// 引入文件
import Search from "./components/Search";
import Users from "./components/Users";
export default {
  name: "App",
  components: {
    Search,
    Users,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>