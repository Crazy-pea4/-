<template>
  <!-- html -->
  <div>
    <h2>姓名：{{ name | mySliceFull }}</h2>
    <h2>年龄：{{ age }}</h2>
    <input type="text" v-fbind:value="name" />
    <hr />
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      name: "超级大胖虎",
      age: "15",
    };
  },
};
</script>