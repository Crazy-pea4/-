<template>
  <div>
    <h1>欢迎来到Vue，{{ introduce }}</h1>
    <!-- 1. 通过在父组件传递一个函数类型的prop给Person子组件 -->
    <Person :getPersonName="getPersonName"></Person>

    <!-- 2. 通过在父组件给子组件绑定一个自定义事件，在子组件中触发 -->
    <!-- 在Student子组件的实例对象VC身上绑定了一个自定义事件 -->

    <!-- 2.1 使用v-on（@）给子组件标签绑定一个自定义事件。同样可以加事件修饰符 -->
    <Student @get="getStudentName" @test="m"></Student>
    <!-- 注意，在组件标签里面，要用原生事件的话，需要在原生事件后写上.native，否则Vue会认为那是一个自定义事件。例如@click.native -->

    <!-- 2.2 使用给子组件标签添加一个ref属性，用mounted钩子给其绑定自定义事件 -->
    <!-- <Student ref="student"></Student> -->
  </div>
</template>

<script>
// 引入文件
import Person from "./components/Person.vue";
import Student from "./components/Student.vue";

export default {
  name: "App",
  components: {
    Person,
    Student,
  },
  data() {
    return {
      introduce: "",
    };
  },
  methods: {
    getPersonName(name) {
      console.log("拿到了从子组件传来的参数", name);
    },
    getStudentName(name) {
      this.introduce = name;
    },
    m() {
      console.log("test事件被触发啦");
    },
  },
  mounted() {
    // 以这种方法绑定自定义事件时，若添加的回调函数直接将整个函数体写在这里，需要写成箭头函数，因为普通函数的this指不到App也就无法获取对应的方法
    // 如：不能写成function() {} 应当写成 () => {}
    this.$refs.student.$on('get', this.getStudentName)

    // this.$refs.student.$once('get', this.getStudentName) // 同样也可以加事件修饰符
  },
};
</script>
