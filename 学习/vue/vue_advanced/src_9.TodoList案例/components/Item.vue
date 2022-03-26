<template>
  <div class="item">
    <ul>
      <label :for="item.id">
        <li class="item_li" :class="classObj_Li">
          <input
            type="checkbox"
            :id="item.id"
            v-model="item.isDone"
            ref="checkbox"
          />
          <!-- 插值语法渲染数据到页面上 -->
          <span v-show="!item.isEdit">{{ item.title }}</span>
          <!-- 编辑输入框 -->
          <input
            v-show="item.isEdit"
            type="text"
            v-model="item.title"
            class="editInput"
            @keyup.enter="confirmItem(item)"
            @blur="confirmItem(item)"
            ref="editInput"
          />
          <!-- 
            有一个有意思的事情，如果在上面的编辑input框同时添加@keyup.enter和@blur，
            按下enter，会发现input框闪烁的情况。经过我多次仔细的观察后得出结论：
            input框在拥有上面两种事件后，按下enter会调用方法将isEdit取反，搜索框隐藏，导致失焦，
            这样又会触发到@blur事件，导致isEdit再次取反，因此出现闪烁的情况。所以将下面调整为取固定值，而不是取反，这样就可以解决问题
            （值得注意的是，这次经历可以推导出 搜索框失焦 这一行为是默认事件，优先执行）
             -->
          <!-- 删除按钮 -->
          <a
            href="javascript:void(0)"
            @click="deleteItem(item.id)"
            class="deleteItem"
            >删除</a
          >
          <!-- 编辑按钮 -->
          <a
            href="javascript:void(0)"
            @click="editItem(item)"
            class="editItem"
            v-show="!item.isEdit"
            >编辑</a
          >
          <a
            href="javascript:void(0)"
            @click="confirmItem(item)"
            class="confirmItem"
            v-if="item.isEdit"
            >确认</a
          >
          <!-- 
          在这里需要舍弃掉确认按钮，因为也出现了闪烁的情况，就算使用定时器也无法解决，目前暂不知其原因。

          2022.1.3编辑：该问题已经解决，原因是 编辑输入框 编辑按钮 显示与隐藏条件使用了不相同的条件渲染(v-if、v-show)，
          当这两种条件渲染用在了相关联的行为上，vue就没那么快反应过来(v-show比v-if快)。
          ----------
          注意到当 确认按钮 的条件渲染也为v-show时，操作不会出现闪烁。当 确认按钮 条件渲染为v-if时，编辑按钮 和 编辑输入框 条件渲染
          为v-show时，点击确认按钮不会造成任务的选中。当上述条件渲染相反时，操作不会出现闪烁，但点击确认按钮会造成任务的选中
           -->
        </li>
      </label>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Item",
  // 使用props配置项接收来自List组件传来的参数
  props: ["item"],
  data() {
    return {
      // 使用对象的方法绑定样式
      classObj_Li: {
        shine: false,
      },
    };
  },
  methods: {
    // 删除，触发deleteTodo_obj事件并传递对应任务的id
    deleteItem(id) {
      if (confirm("确定删除吗")) {
        // 触发单个删除事件
        this.$bus.$emit("deleteTodo_obj", id);
      }
    },
    // 编辑
    editItem(item) {
      item.isEdit = true;
      this.$nextTick(() => {
        this.$refs.editInput.focus();
      });
    },
    // 确认编辑
    confirmItem(item) {
      item.isEdit = false;
    },
    // shine事件的回调函数，目的是将data中的classObj_Li中的shine属性取反
    shine(id) {
      console.log('shine回调执行了');
      if (id == this.$refs.checkbox.id) {
        this.classObj_Li.shine = !this.classObj_Li.shine;
      }
    },
  },
  mounted() {
    // 在ListHeader组件触发
    this.$bus.$on("shine", this.shine);
  },
  beforeDestroy() {
    this.$bus.$off("shine")
  }
};
</script>

<style scope>
.item ul .item_li {
  padding-left: 5px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  border-top: 0;
}

.item ul .item_li:hover {
  background-color: #ddd;
}

.item ul .item_li:hover .deleteItem,
.item ul .item_li:hover .editItem,
.item ul .item_li:hover .confirmItem {
  display: block;
}

.item ul .item_li span {
  margin-left: 5px;
}

.item ul .deleteItem,
.item ul .editItem,
.item ul .confirmItem {
  display: none;
  float: right;
  margin-top: 2px;
  width: 45px;
  height: 80%;
  text-align: center;
  font-size: 14px;
  border-radius: 8px;
  line-height: 23px;
}

.item ul .deleteItem {
  background-color: #da514c;
  color: rgb(241, 239, 239);
}

.item ul .editItem,
.item ul .confirmItem {
  margin-right: 5px;
  background-color: darkturquoise;
  color: rgb(241, 239, 239);
}
.editInput {
  padding-left: 4px;
  /* 测试“确认按钮时”，请改为width: 350px */
  width: 350px;
  height: 100%;
  font-size: 16px;
}
.shine {
  background-color: tomato;
}
</style>