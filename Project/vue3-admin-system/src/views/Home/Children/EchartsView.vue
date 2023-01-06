<template>
    <div class="con">
        <header>
            <p>智能数虾监管平台</p>
        </header>
        <div class="body">
            <div class="leftSide">
                <div class="box">
                    <p class="title">虾苗数量(单位: 只)</p>
                    <div class="info">213</div>
                </div>
                <div class="box">
                    <p class="title">天气:</p>
                    <div class="info">{{ condition }}</div>
                </div>
                <div class="box">
                    <p class="title">气温:</p>
                    <div class="info">{{ temperature }}</div>
                </div>
                <div class="box">
                    <p class="title">xxx:</p>
                    <div class="info">xxxx</div>
                </div>
            </div>
            <div class="rightSide">
                <div class="img">这是拍摄画面</div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

let temperature = ref('')
let condition = ref('')

// 天气获取
onMounted(() => {
    store.dispatch('Home/getWeather').then(({ data: { now } }) => {
        temperature.value = now.temp + '℃'
        condition.value = now.text
    })
    // axios.get('http://47.101.166.148/gallery.php').then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // })
})
</script>

<style lang='scss' scoped>
.con {
    width: 100%;
    height: 100%;
}

header {
    p {
        margin-bottom: 1.5rem;
        text-align: center;
        font-size: 26px;
        color: rgb(214, 117, 87)
    }
}

.body {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 95%;

    .leftSide {
        display: flex;
        float: left;
        width: 20%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;

        .box {
            position: relative;
            width: 100%;
            height: 23%;
            border: 1px solid black;
            background-color: #3881ca;

            .title {
                text-align: center;
                font-size: 20px;
                color: white;
            }

            .info {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 28px;
                color: darkorange
            }
        }
    }

    .rightSide {
        float: left;
        position: relative;
        width: 75%;
        height: 100%;
        border: 1px solid black;
        background-color: #fff;

        .img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }
    }
}
</style>