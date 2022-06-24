<template>
  <div>
    <h2 @click="shownName">姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
  </div>
</template>

<script>
// import { mixin, mixin2 } from "../mixin";
export default {
  name: "Person",
  data() {
    return {
      name: "胖虎",
      age: 15,
    };
  },
//   mixins: [mixin, mixin2],
};
</script>

<style>
</style>