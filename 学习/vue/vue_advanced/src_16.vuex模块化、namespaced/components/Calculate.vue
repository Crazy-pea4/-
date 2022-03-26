<template>
  <div class="con">
    <h2>计算器</h2>
    <h3>当前求和为：{{ sum }}</h3>
    <!-- 通过getters加工并返回的数据 -->
    <h4>当前求和放大10倍为：{{ bigSum }}</h4>
    <h4>我是{{ name }}，来自{{ school }}</h4>
    <select v-model.number="n">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当和为奇数时再加</button>
    <button @click="incrementWait(n)">过一会再加</button>
    <!-- --------------------------------------组件间通讯----------------------------------------- -->
    <!-- 因为这两个组件都存在vuex里，所以可以轻易拿到MessageBoard组件的数据（这里在下面的computed里的mapState里配置↓） -->
    <h3 style="color: red">下方留言板的留言条数：{{ messages.length }}</h3>
  </div>
</template>

<script>
// 引入mapState
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Calculate",
  data() {
    return {
      n: 0,
    };
  },
  // 在使用到了actions、mutations等的地方需要指定是谁的actions、mutations。第一个参数用于标识
  methods: {
    ...mapMutations('countRelate', { increment: "JIA", decrement: "JIAN" }),
    ...mapActions('countRelate', { incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),
  },
  computed: {
    ...mapState('countRelate', ["sum", "name", "school"]),
    ...mapState('messageRelate', ["messages"]),
    ...mapGetters('countRelate', ["bigSum"]),
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style scoped>
.con {
  width: 100%;
  height: 300px;
  text-align: center;
  background-color: lightblue;
}
.con button {
  margin-left: 5px;
}
</style>