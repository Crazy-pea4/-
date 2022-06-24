<template>
    <div class="con">
        <h2>留言板</h2>
        <input type="text" name="" id="" v-model="n">
        <button @click="addMessage">提交</button>
        <ul>
            <li v-for="(item, index) in messages" :key="index">{{item}}</li>
        </ul>
        <h3 style="color: red">上方计算器的和：{{sum}}</h3>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'MessageBoard',
    data() {
        return {
            n: ''
        }
    },
    methods: {
        addMessage() {
            this.messages.unshift(this.n)
            this.n = ''
        }
    },
    computed: {
        ...mapState(['messages', 'sum'])        
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