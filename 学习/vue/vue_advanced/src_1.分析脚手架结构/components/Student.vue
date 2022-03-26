<template>
  <div class="student">
    <h3>学生姓名：{{ name }}</h3>
    <h3>学生年龄：{{ age }}</h3>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "叶萌",
      age: 19,
    };
  },
};
</script>

<style>
.student {
  background-color: yellowgreen;
}
</style>