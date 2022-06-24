<template>
  <div class="con">
    <h2>计算器</h2>
    <h3>当前求和为：{{ sum }}</h3>
    <!-- 通过getters加工并返回的数据 -->
    <h4>当前求和放大10倍为：{{ bigSum }}</h4>
    <h4>我是{{ name }}，来自{{ school }}</h4>
    <select v-model.number="n">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当和为奇数时再加</button>
    <button @click="incrementWait(n)">过一会再加</button>
    <!-- --------------------------------------组件间通讯----------------------------------------- -->
    <!-- 因为这两个组件都存在vuex里，所以可以轻易拿到MessageBoard组件的数据（这里在下面的computed里的mapState里配置↓） -->
    <h3 style="color: red">下方留言板的留言条数：{{messages.length}}</h3>
  </div>
</template>

<script>
// 引入mapState
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: "Calculate",
  data() {
    return {
      n: 0,
    };
  },
  // 我们同样希望在↓面的高重复度代码中，选用合适的方法去书写↓ (mapActios, mapMutations)
  methods: {
    // increment() {
    // this.$store.commit("JIA", this.n);
    // },
    // // 同理
    // decrement() {
    //   this.$store.commit("JIAN", this.n);
    // },

    // 写完下面的代码还需要在上面的方法中传递一个参数，这里就是data中的n。（因为所涉及到的是函数操作，mapMutations生成的函数会默认带一个值）
    ...mapMutations({increment:'JIA', decrement: 'JIAN'}),
    // 同理，这里也可以使用数组的写法，当键名和值一样的时候。

    // -------------------------------------------------------------------------------
    
    // incrementOdd() {
    //   this.$store.dispatch("jiaOdd", this.n);
    // },
    // incrementWait() {
    //   this.$store.dispatch("jiaWait", this.n);
    // },

    // 同理，mapActions也是同样写法
    ...mapActions({incrementOdd:'jiaOdd', incrementWait: 'jiaWait'}),
    // 数组写法也同样不演示了

  },
  // 我们希望插值语法里的内容能够简单点，所以这样做↓ (mapState、mapGetters)
  computed: {
    // sum() {
    //   return this.$store.state.sum
    // },
    // name() {
    //   return this.$store.state.name
    // },
    // school() {
    //   return this.$store.state.school
    // },
    // bigSum() {
    //   return this.$store.getters.bigSum
    // }

    // 但是这样写，代码重复度太高了，于是vuex里提供了一些方法
    // 可以借助mapState函数。1. 对象写法 对象里面的key为原computed中的key，值为state里的配置项。可以看到大大简化了
    // ...mapState({sum:'sum', name: 'name', school: 'school'}), // 这里不能用简写写法，简写写法满足的条件是 键名和键值相等并且键值是变量
    
    // 2. 数组写法 可以看到数组写法要是键名和键值相同也没办法简写，所以mapState也有数组写法专门应对这种情况
    ...mapState(['sum', 'name', 'school', 'messages']),

    // ----------------------------------------------------------------------------------------

    // mapGetters 对象写法
    // ...mapGetters({bigSum: 'bigSum'})

    // mapGetters 数组写法
    ...mapGetters(['bigSum'])

  },
  mounted() {
    console.log(this);
    console.log(mapState({sum:'sum', name: 'name', school: 'school'}));
    console.log(mapGetters(['bigSum']));
    console.log(mapMutations({increment:'JIA', decrement: 'JIAN'}));
    console.log(mapActions({incrementOdd:'jiaOdd', incrementWait: 'jiaWait'}));
  },
};
</script>

<style scoped>
.con {
  width: 100%;
  height: 300px;
  text-align: center;
  background-color: lightblue;
}
.con button {
  margin-left: 5px;
}
</style>