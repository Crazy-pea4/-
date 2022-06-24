<template>
  <div class="con">
    <h2>总和：{{ sum }}</h2>
    <button @click="sum++">点我加一</button>
    <hr />
    <h2>当前鼠标坐标。x：{{ point.x }}, y: {{ point.y }}</h2>
  </div>
</template>

<script>
import { ref } from "vue";
import useGetPoint from "../hooks/useGetPoint";
export default {
  name: "Demo",

  setup() {
    let sum = ref(0);
    let point = useGetPoint();

    return {
      sum,
      point,
    };
  },
};
</script>

<style>
</style>