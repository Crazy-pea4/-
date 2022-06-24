// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router';
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
// 引入二级路由
import News from '../pages/News'
import Message from '../pages/Message'
// 引入三级路由
import Detail from '../pages/Detail'
// 创建并暴露一个路由器
export default new VueRouter({
    // 在前端中，路由是一组key: value关系
    routes: [{
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            // 实现嵌套路由需要一个全新的配置项，children
            children: [{
                    // 注意，子路由不需要再在前面加上 / 
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    // 在message中的路由
                    children: [{
                        path: 'detail',
                        component: Detail
                    }]
                }
            ]
        }
    ]
})