<template>
  <div class="con">
    <h2>我是Home相关内容</h2>
    <div>
      <ul>
        <li>
          <!-- 路由组件嵌套路由组件 -->
          <router-link to="/home/news" active-class="active" class="btn">News</router-link>
        </li>
        <li>
          <router-link to="/home/message" active-class="active" class="btn">Message</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.active {
  background-color: rgb(63, 183, 231) !important;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
.con {
  width: 800px;
  text-align: center;
}
.con ul {
    margin-left: 250px;
}
.con ul li {
  float: left;
  margin-right: 10px;
}
.btn {
  display: block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(233, 232, 232);
  border: 1px solid #ccc;
}
</style>