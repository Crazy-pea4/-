<template>
  <!-- html -->
  <div>
    <h1>欢迎来到Vue</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ myAge }}</h2>
    <button @click="myAge++">点我改变年龄</button>
    <hr />
  </div>
</template>

<script>
// JavaScript
export default {
  // 对于props配置项而言，在Vue2不使用props接收参数的话，实际上也能在vc身上的$attrs里找到
  // $attrs就像是个捡漏的，没有在props里声明接收的参数，都由$attrs接收
  name: "School",
  data() {
    return {
      // props是只读的，Vue底层会监测对props的修改，一般是被禁止的，但如果确实需要修改传入的prop，
      // 建议在data中存储props里的数据，再去修改data中的数据
      // 这里也说明了props配置项是优先于data被组件实例对象给读取的
      myAge: this.age,
    };
  },
  // 第一种，简单接收
  // props: ["name", "age"],
  // 第二种，限制数据类型接收
  // props: {
  //   name: String,
  //   age: Number
  // }
  // 第三种，限制数据类型、必要性、指定默认值接收
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 999,
    }
  }
};
</script>