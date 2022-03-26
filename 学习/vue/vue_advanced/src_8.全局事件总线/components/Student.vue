<template>
    <div class="demo">
        <h2>我是一名学生</h2>
        <h2>{{introduce}}</h2>
        <button @click="sendMsgToPerson">点我给Person组件传送信息，实现同级组件间互相通讯</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            introduce: '我喜欢打羽毛球'
        }
    },
    methods: {
        sendMsgToPerson() {
            this.$bus.$emit('getMsgFromStduent', '我是Stduent组件，我来找你了')
        }
    },
};
</script>

<style scoped>
/* 在style后面加上scoped，可以限制样式的作用范围（只在本组件中） */
    .demo {
        background-color: sandybrown;
    }
</style>