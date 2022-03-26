<template>
  <div class="con">
    <ul>
      <li v-for="item in msg" :key="item.id">
        <!-- 携带query参数的to字符串写法跳转路由 -->
        <!-- <router-link :to="`/home/message/detail?id=${item.id}&name=${item.name}`"
          >点我显示 {{ item.name }} 信息
        </router-link> -->
        
        <!-- 携带query参数的to对象写法跳转路由 -->
        <router-link
          :to="{
            path: '/home/message/detail',
            query: {
              id: item.id,
              name: item.name,
            },
          }"
          >点我显示 {{ item.name }} 信息
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      msg: [
        { id: 1, name: "张三" },
        { id: 2, name: "李四" },
        { id: 3, name: "王五" },
      ],
    };
  },
};
</script>

<style scoped>
ul li {
  float: left;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
</style>