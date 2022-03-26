<template>
  <div class="con">
    <!-- 在组件标签结构体中写html标签，需要在对应组件文件中的目标位置写上<slot></slot>来指明想要插入的位置 -->
    <Category>
      <h3>我是一张图片</h3>
    </Category>
    <Category>
      <!-- 给插入的元素一个slot属性，其值为插槽的name属性值，这样就会严格去匹配 -->
      <ul slot="games">
        <li v-for="(item, index) in games" :key="index">{{ item }}</li>
      </ul>
    </Category>
    <Category>
      <!-- vue3 对template标签中写slot规定如下写法，vue2.6以上也支持，vue3不支持旧版写法 -->
      <template v-slot:videos>
        <h3>我是一段视频</h3>
        <div class="foot">
          <a href="">第一</a>
          <a href="">第二</a>
          <a href="">第三</a>
        </div>
      </template>
    </Category>
  </div>
</template>

<script>
// 引入文件
import Category from "./components/Category";
export default {
  name: "App",
  data() {
    return {
      games: ["GTA6", "使命召唤22", "穿越火线3", "DOOM5"],
    };
  },
  components: {
    Category,
  },
};
</script>

<style scoped>
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
.con {
  float: left;
}
.foot a {
  margin: 0 8px;
}
</style>