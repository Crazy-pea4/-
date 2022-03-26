<template>
  <div class="con">
    <ul>
      <li v-for="item in msg" :key="item.id">
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
        <button @click="pushShow(item)">Push查看</button>
        <button @click="replaceShow(item)">Replace查看</button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  beforeDestroy() {
    console.log('Message组件将被销毁');
  },
  data() {
    return {
      msg: [
        { id: 1, name: "张三" },
        { id: 2, name: "李四" },
        { id: 3, name: "王五" },
      ],
    };
  },
  // 编程式路由导航，更加的灵活，不局限于router-link
  methods: {
    pushShow(item) {
      console.log(this.$router);
      this.$router.push({
        name: "detail",
        params: {
          id: item.id,
          name: item.name,
        },
      });
    },
    replaceShow(item) {
      this.$router.replace({
        name: "detail",
        params: {
          id: item.id,
          name: item.name,
        },
      });
    },
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