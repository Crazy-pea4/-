<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="auto">
                <LeftMenu></LeftMenu>
            </el-aside>
            <el-container>
                <el-header>
                    <RightTop></RightTop>
                </el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" v-if="$route.meta.keepAlive" />
                        </keep-alive>
                        <component :is="Component" v-if="!$route.meta.keepAlive" />
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import LeftMenu from "../../components/LeftMenu.vue"
import RightTop from "../../components/RightTop.vue"
</script>

<style lang='scss' scoped>
.common-layout {
    height: 100%;
}

.el-container {
    height: 100%;

    .el-aside {
        height: 100%;
        background-color: #545c64
    }

    .el-main {
        background-color: gainsboro
    }
}
</style>