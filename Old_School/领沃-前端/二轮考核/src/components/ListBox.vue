<template>
  <div class="big-box">
    <!-- 将接收函数传给ListHeader子组件 -->
    <ListHeader :todoList="todoList"></ListHeader>
    <List :todoList="todoList"></List>
    <ListFooter :todoList="todoList"></ListFooter>
    <!-- 列表部分 -->
  </div>
</template>

<script>
import ListHeader from "./ListHeader.vue";
import ListFooter from "./ListFooter.vue";
import List from "./List.vue";
export default {
  name: "ListBox",
  components: {
    ListHeader,
    ListFooter,
    List,
  },
  data() {
    return {
      // 若本地储存没有数据的话，就用空数组代替，否则会报错
      todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    };
  },
  methods: {
    // 父组件定义一个接收函数，用于接收ListHeader子组件的getTodo_obj
    addTodo_obj(todo) {
      // unshift 总是往数组第一位添加元素
      this.todoList.unshift(todo);
    },
    // 确认删除后，接收来自Item组件传来的id形参
    deleteTodo_obj(id) {
      // filter过滤符合条件的元素，重新赋值给this.todoList
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
    },
    // 清楚选中的Todo
    clearTodo_obj(id) {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
    },
  },
  watch: {
    todoList: {
      // 加入深度监测，刷新也能保存选中状态，增加用户体验
      deep: true,
      // 值得注意的是，每添加一次todo，形成一个新数组，是这个新数组作为value，而不是添加的todo对象作为value，所以新添加的todo会与之前的todo统一存在一个数组里
      handler(value) {
        localStorage.setItem("todoList", JSON.stringify(value));
      },
    },
  },
  // 绑定单个删除事件
  mounted() {
    this.$bus.$on("addTodo_obj", this.addTodo_obj);
    this.$bus.$on("deleteTodo_obj", this.deleteTodo_obj);
    this.$bus.$on("clearTodo_obj", this.clearTodo_obj);
  },
  beforeDestroy() {
    this.$bus.$off("addTodo_obj");
    this.$bus.$off("deleteTodo_obj");
    this.$bus.$off("clearTodo_obj");
  },
};
</script>

<style>
/* CSS初始化 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  outline: none;
}
a {
  text-decoration: none;
}
.big-box {
  position: relative;
  margin: 0 auto;
  padding: 10px 15px 0px 15px;
  width: 500px;
  border: 1px solid #ccc;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
}
</style>