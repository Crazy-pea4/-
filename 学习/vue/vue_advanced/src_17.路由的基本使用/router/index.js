// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router';
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'

// 创建并暴露一个路由器
export default new VueRouter({
    // 在前端中，路由是一组key: value关系
    routes: [{
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})