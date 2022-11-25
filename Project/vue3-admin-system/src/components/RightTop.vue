<template>
    <div class="rightTop">
        <el-icon @click="test">
            <MoreFilled v-if="!navBool" />
            <More v-else />
        </el-icon>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { MoreFilled, More } from '@element-plus/icons-vue'

// 这里遇到了一个问题 N3
const store = useStore();
let navBool = computed(() => store.state.Home.navBool)
const test = () => {
    store.commit('Home/CHANGE_NAV_BOOL', !navBool.value)
}
</script>

<style lang='scss' scoped>
.rightTop {
    position: relative;
    width: 100%;
    height: 100%;

    .el-icon {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        font-size: 20px;
        cursor: pointer;
    }
}
</style>