<template>
  <div class="container">
    <AddList></AddList>
    <List></List>
    <Echarts></Echarts>
  </div>
</template>

<script>
import AddList from "./components/addList.vue";
import List from "./components/List.vue";
import Echarts from "./components/Echarts.vue";
export default {
  name: "App",
  components: {
    AddList,
    List,
    Echarts,
  },
};
</script>

<style>
.container {
  width: 600px;
  margin: 0 auto;
  border: 1px solid black;
}
</style>
