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
import { ref, reactive, onMounted } from 'vue'
import link from '../../../api/link'

let temperature = ref('')
let condition = ref('')

// 天气获取
onMounted(() => {
    link('https://devapi.qweather.com/v7/weather/now', 'GET', {}, {
        key: 'e6e5e0f66a0740b28b4215d7d6d3f798',
        location: 101280301
    }).then(({ data: { now } }) => {
        temperature.value = now.temp + '℃'
        condition.value = now.text
    })
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
        font-size: 26px
    }
}

.body {
    display: flex;
    width: 100%;
    height: 95%;

    justify-content: space-between;

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

            .title {
                text-align: center;
                font-size: 20px;
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

        .img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }
    }
}
</style>