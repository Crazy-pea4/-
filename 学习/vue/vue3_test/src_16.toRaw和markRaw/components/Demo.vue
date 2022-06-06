<template>
  <div class="con">
    <h2>总和：{{ sum }}</h2>
    <button @click="sum++">+1</button>
    <h2>{{ person }}</h2>
    <h2>姓名：{{ name }}</h2>
    <button @click="name += '!'">点我修改名字</button>
    <h2>年龄：{{ age }}</h2>
    <button @click="age++">点我修改年龄</button>
    <h2>薪水：{{ shenzhen.tencent.salary }}k</h2>
    <button @click="shenzhen.tencent.salary++">点我修改年龄</button>
    <hr />
    <button @click="getOriginPerson">获取person原始对象</button><br />
    <h2 v-show="person.car">汽车信息：{{ person.car }}</h2>
    <button @click="addComplicatedObj">点我增加一台车的信息</button><br />
    <button @click="person.car.name += '@'">修改车的名字</button><br />
    <button @click="changePrice">修改车的价格</button>
  </div>
</template>

<script>
import { ref, reactive, toRefs, toRaw, markRaw } from "vue";
export default {
  name: "Demo",
  setup() {
    let sum = ref(0);
    let person = reactive({
      name: "李四",
      age: 35,
      shenzhen: {
        tencent: {
          salary: 15,
        },
      },
    });

    function getOriginPerson() {
      // toRaw将响应式对象转换成原始定义的对象，对其修改并不会影响到已存在的响应式对象
      // 虽然此时点击按钮不会导致页面更改，但内部数据已经改变，若此后再次点击修改年龄按钮，则页面的数据会根据内部数据改变（实际上已经改了，但是页面不显示）
      const p = toRaw(person);
      p.age++;
      console.log("我是原始的person数据", p);
      // 无法处理ref定义的响应式数据
      // const sum = toRaw(sum);
      // console.log(sum);
    }

    function addComplicatedObj() {
      const car = { name: "宝马", price: 42 };
      // 在这里有个小细节：当浏览器读到下方的...toRefs(person)时，此时person中是没有car的
      // 这个时候在模板中用car就会报错，解决办法是将整个person在...之前传过去，利用person.car

      // 有时，我们希望新增加（后来增加）的属性不是响应式的（减少性能消耗）。这时我们可以用markRaw
      person.car = markRaw(car);
    }
    // 同样的markRaw生成的普通对象的改变不会影响到页面数据，但其内部已经更改
    function changePrice() {
      person.car.price++;
      console.log(person.car.price);
    }

    return {
      person,
      ...toRefs(person),
      sum,
      getOriginPerson,
      addComplicatedObj,
      changePrice
    };
  },
};
</script>

<style>
</style>