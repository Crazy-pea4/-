<template>
    <el-row>
        <el-col>
            <el-menu active-text-color="#ffd04b" background-color="#3881ca" class="el-menu-vertical-demo"
                :collapse="navBool" :router="true" text-color="#fff" @open="handleOpen" @close="handleClose">
                <template v-for="item in menu" :key="item.path">
                    <!-- 下拉菜单 -->
                    <el-sub-menu :index="`/home/${item.path}`" v-if="item.children">
                        <!-- 标题 -->
                        <template #title>
                            <el-icon>
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            <span>{{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="i in item.children" :key="i.path" :index="`/home/${item.path}/${i.path}`">
                            {{ i.meta.title }}
                        </el-menu-item>
                    </el-sub-menu>
                    <!-- 普通菜单 -->
                    <el-menu-item :index="`/home/${item.path}`" v-else>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onMounted, } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import getHomeView from '../utils/getHomeView'

const store = useStore();
const router = useRouter();

// 这里犯了一个错误 N4
let menu: any = ref([]);
onMounted(() => {
    menu.value = getHomeView(router).children
    console.log('路由信息', menu.value);
})

const navBool = computed(() => store.state.Home.navBool)

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style lang='scss' scoped>

</style>