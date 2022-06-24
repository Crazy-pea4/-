<template>
  <div class="con">
    <h2>我是Home相关内容</h2>
    <div>
      <ul>
        <li>
          <!-- 路由组件嵌套路由组件 -->
          <router-link to="/home/news" active-class="active" class="btn"
            >News</router-link
          >
        </li>
        <li>
          <router-link to="/home/message" active-class="active" class="btn"
            >Message</router-link
          >
        </li>
      </ul>
      <!-- 点击News后，相关的路由是由下面的代码呈现的。 -->
      <!-- 这里用到一个全新的标签。它含一个include属性，可以指定防止销毁的路由组件（默认全防止）。（这里我们希望News组件保持，而不对Message组件做要求） -->
      <!-- 注意：include属性里面写的是 组件名 组件名 组件名 而不是路由名 -->
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>
      <!-- 当要缓存多个组件时 -->
      <!-- <keep-alive :include="['News', 'Message']"></keep-alive> -->
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