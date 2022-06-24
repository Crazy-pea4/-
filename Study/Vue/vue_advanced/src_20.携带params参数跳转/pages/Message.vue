<template>
  <div class="con">
    <ul>
      <li v-for="item in msg" :key="item.id">
        <!-- 在使用params传参时，需要在路由器中给传递目标组件路径path后面写上/:xxx/:yyy占位符，来声明接收params参数 -->

        <!-- 携带params参数的to字符串写法跳转路由 -->
        <!-- <router-link
          :to="`/home/message/detail/${item.id}/${item.name}`"
          >点我显示 {{ item.name }} 信息
        </router-link> -->

        <!-- 携带params参数的to对象写法跳转路由（注意，使用params传参时，不可以使用path配置项，必须用name配置项。query不做限制） -->
        <router-link
          :to="{
            name: 'detail',
            params: {
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