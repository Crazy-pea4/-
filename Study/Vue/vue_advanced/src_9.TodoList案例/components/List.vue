<template>
  <div>
    <div class="list">
      <!-- 根据todoList.length决定打印多少个<Item> -->
      <!-- 使用prop传入对应数组对象中的数据给Item组件 -->
      <Item v-for="item in todoList" :key="item.id" :item="item"></Item>
      <!-- 当任务列表长度为零时，显示提示信息 -->
      <div class="show_whenListIsEmpty" v-if="todoList.length === 0">
        一项任务都没有呢
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
export default {
  name: "List",
  components: {
    Item,
  },
  // 接收并存放在List组件实例对象身上，上面的v-for指令可以直接使用
  props: ["todoList"],
};
</script>

<style scope>
.list {
  margin-top: 15px;
  width: 100%;
  border-top: 1px solid #ccc;
}

.show_whenListIsEmpty {
  width: 100%;
  height: 80px;
  font-size: 22px;
  color: rgb(184, 184, 200);
  text-align: center;
  line-height: 120px;
}
</style>