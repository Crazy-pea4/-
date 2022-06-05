<template>
  <div class="con">
    <Category>
      <!-- 若要接收slot标签传递过来的值，必须使用template标签和v-slot属性，值可任意(代表接收到的数据集名称) -->
      <template v-slot:games="received">
        <ul>
          <li v-for="(item, index) in received.games" :key="index">{{item}}</li>
        </ul>
        {{ received }}
      </template>
    </Category>
    <Category>
      <!-- 因为传过来的是一个对象（就是Category中的data）并且支持对象解构 -->
      <template v-slot:games="{games}">
        <ol>
          <li v-for="(item, index) in games" :key="index">{{item}}</li>
        </ol>
        {{ games }}
      </template>
    </Category>
  </div>
</template>

<script>
// 引入文件
import Category from "./components/Category";
export default {
  name: "App",
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
</style>