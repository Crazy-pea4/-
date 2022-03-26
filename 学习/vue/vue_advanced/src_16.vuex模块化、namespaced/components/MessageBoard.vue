<template>
  <div class="con">
    <h2>留言板</h2>
    <input type="text" name="" id="" v-model="n" />
    <button @click="addMessage">提交</button>
    <ul>
      <li v-for="(item, index) in messages" :key="index">{{ item }}</li>
    </ul>
    <h3 style="color: red">上方计算器的和：{{ sum }}</h3>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "MessageBoard",
  data() {
    return {
      n: "",
    };
  },
  methods: {
    addMessage() {
      // 若不使用mapState直接调用$store中的相关API，则指定标识的方式如下（可以理解为路径）。
      this.$store.commit('messageRelate/add_message', this.n);
      this.n = "";
    },
  },
  computed: {
    // 这里不用mapState是为了演示另一种写法
    // ...mapState(["messages", "sum"]),
    messages() {
      return this.$store.state.messageRelate.messages;
    },
    sum() {
      return this.$store.state.countRelate.sum;
    },
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