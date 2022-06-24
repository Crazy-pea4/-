<template>
  <!-- html -->
  <div>
    <h2 @click="shownName">姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <hr />
  </div>
</template>

<script>
// import { mixin, mixin2 } from "../mixin";
// JavaScript
export default {
  name: "School",
  data() {
    return {
      name: "周星驰",
      age: "45",
      // 如果原组件里面有的数据，以原组件为主
      x: 111,
    };
  },
  // 但如果原组件和mixin里都有生命周期钩子，那这些钩子会统一去执行，而不会向上面的数据一样被覆盖掉
  // mixins: [mixin, mixin2],
};
</script>