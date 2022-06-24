<template>
  <div>
    <div class="footer">
      <!-- 全选按钮 -->
      <input
        type="checkbox"
        name=""
        id="chooseAll_input"
        @click="chooseAll"
        ref="chooseAll_input"
        v-if="todoList.length !== 0"
      />
      <!-- 任务状态 -->
      <label for="chooseAll_input">
        <span v-if="todoList.length !== 0"
          >已完成{{ doneNumber }} / 全部{{ todoList.length }}</span
        >
      </label>
      <!-- 清楚选中任务 -->
      <a href="javascript:void(0)" @click="clear" v-if="todoList.length !== 0"
        >清楚已完成任务</a
      >
      <!-- 不清楚为什么这里的a标签用Vue格式化插件后会那么奇怪 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ListFooter",
  props: ["todoList"],
  computed: {
    doneNumber() {
      let i = 0;
      this.todoList.forEach((todo) => {
        if (todo.isDone) {
          i++;
        }
      });
      // 别忘记了计算属性需要return
      return i;
    },
  },
  watch: {
    // 单一按钮控制全选按钮
    doneNumber() {
      if (this.doneNumber === this.todoList.length) {
        this.$refs.chooseAll_input.checked = true;
      } else {
        this.$refs.chooseAll_input.checked = false;
      }
    },
  },
  methods: {
    // 全选按钮逻辑，全选按钮控制逐个单一按钮
    chooseAll() {
      // 使用ref属性定位到全选按钮，判断全选按钮的状态
      if (this.$refs.chooseAll_input.checked) {
        // 虽然Vue不推荐改变prop的值，但考虑到这里的prop是个对象，只改变对象里的属性问题不大
        this.todoList.forEach((todo) => {
          todo.isDone = true;
        });
      } else {
        this.todoList.forEach((todo) => {
          todo.isDone = false;
        });
      }
    },
    // 全部清除逻辑
    clear() {
      if (this.doneNumber === 0) {
        alert("请选择需要删除的任务！");
      } else {
        if (confirm("确认删除已选任务吗？")) {
          this.todoList.forEach((todo) => {
            // 传入已完成（已选中）任务的id作为删除目标
            if (todo.isDone) {
              this.$bus.$emit("clearTodo_obj", todo.id);
            }
          });
        }
      }
    },
  },
};
</script>

<style>
.footer {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.footer span {
  margin-left: 15px;
}
.footer a {
  margin-top: 6px;
  float: right;
  width: 140px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: white;
  background-color: #da514c;
  border-radius: 5px;
}
</style>