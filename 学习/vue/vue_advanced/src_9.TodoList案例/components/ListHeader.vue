<template>
  <div>
    <div class="header">
      <!-- 添加键盘事件，按下enter键可以添加任务 -->
      <input
        type="text"
        name=""
        id=""
        placeholder="请输入要添加的任务名称"
        v-model="title"
        @keyup.enter="getTodo"
      />
      <!-- 添加点击事件，按下"添加"可以添加任务 -->
      <a href="javascript:void(0)" @click="getTodo">添加</a>
    </div>
  </div>
</template>

<script>
// 由于添加任务时需要配置id属性，引入一个nanoid包，它是分别暴露的
import { nanoid } from "nanoid";
export default {
  name: "ListHeader",
  data() {
    return {
      title: "",
    };
  },
  props: ["todoList"],
  methods: {
    // 注意！！若要试图理解getTodo方法中的代码，请一定要认真阅读注释！！！！
    getTodo() {
      // 判断输入是否为空
      if (this.title.trim() === "") {
        alert("请输入任务名称！");
      } else {
        // 判断todoList是否已经存在任务
        // 若不存在任务
        if (this.todoList.length === 0) {
          this.formTodo();
        } else {
          // 若已经存在任务。这里不用forEach的原因是 在forEach中使用return不能终止整个回调函数，使用break也会报错
          for (let i = 0; i < this.todoList.length; i++) {
            // 第一个if为过滤器，防止出现添加空字符串""进入列表产生超循环
            if (this.title !== "") {
              // 第二个if判断第i个任务是否与当前输入框内的值相等，若相等则执行相应操作，随后跳出整个循环1
              if (this.todoList[i].title === this.title) {
                // 在Item组件给shine绑定的事件总线。当第二个if条件为真，触发在Item的回调函数
                this.$bus.$emit("shine", this.todoList[i].id);
                // 用定时器实现闪烁功能
                setTimeout(() => {
                  this.$bus.$emit("shine", this.todoList[i].id);
                }, 500);
                console.log(111);
                break;
              }
              // 第三个if来判断todoList是否遍历完毕，若遍历完毕后仍没有触发第二个if中的break，证明想要添加的任务是新任务
              if (i == this.todoList.length - 1) {
                this.formTodo();
                console.log(222);
              }
            }
          }
        }
      }
    },
    // 形成一个todo
    formTodo() {
      // 考虑到List组件里的todoList采取的是数组对象形式，这里将得到的数据包装成对象
      const getTodo_obj = {
        id: nanoid(),
        title: this.title,
        isDone: false,
        isEdit: false,
      };
      // 触发自定义事件，传参给ListBox
      this.$bus.$emit("addTodo_obj", getTodo_obj);
      this.title = "";
    },
  },
};
</script>

<style scope>
.header input {
  padding: 0 0 0 5px;
  width: 82%;
  height: 35px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.header a {
  float: right;
  width: 15%;
  height: 35px;
  border-radius: 10px;
  text-align: center;
  line-height: 35px;
  color: white;
  background-color: rgb(63, 150, 221);
}
</style>