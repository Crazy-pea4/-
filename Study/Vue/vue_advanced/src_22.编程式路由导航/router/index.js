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
                        // 命名路由（使用params传参的时候，需要用到name配置项）
                        name: 'detail',
                        // 声明接收params参数。detail后面的内容为占位符，告诉路由器哪块是参数
                        path: 'detail/:id/:name',
                        component: Detail,

                        // 路由的props配置
                        // 第一种写法，值为对象，该对象中的所有key-value都会以props的形式传递给同级组件配置项指定的组件（这里为Detail）
                        // props: {a:123, b:'路由props'}

                        // 第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传递给Detail组件
                        // props: true

                        // 第三种写法，值为函数，能接收到Detail组件实例对象上的$route
                        props($route) {
                            return {
                                id: $route.params.id,
                                name: $route.params.name
                            }
                        }
                    }]
                }
            ]
        }
    ]
})