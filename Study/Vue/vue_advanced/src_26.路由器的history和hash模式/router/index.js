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

const router = new VueRouter({
    // vue路由器有两种工作方式、history和hash。hash模式体现在地址栏中出现/#/，其后的值为hash值，不作为地址向服务器返回。默认为hash
    mode: 'history',
    routes: [{
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            // 实现嵌套路由需要一个全新的配置项，children
            children: [{
                    name: 'xinwen',
                    // 注意，子路由不需要再在前面加上 / 
                    path: 'news',
                    component: News,
                    meta: {
                        isAuth: true
                    },
                    // 独享路由守卫
                    // beforeEnter: (to, from, next) => {
                    //     console.log('前置守卫11111', to, from);
                    //     if (localStorage.getItem('school') === 'gdo') {
                    //         next();
                    //     } else {
                    //         alert('学校名称不对，无权进入')
                    //     }
                    // }
                },
                {
                    name: 'xinxi',
                    path: 'message',
                    component: Message,
                    meta: {
                        isAuth: true
                    },
                    // 在message中的路由
                    children: [{
                        // 命名路由（使用params传参的时候，需要用到name配置项）
                        name: 'detail',
                        // 声明接收params参数。detail后面的内容为占位符，告诉路由器哪块是参数
                        path: 'detail/:id/:name',
                        component: Detail,
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
// 全局前置路由守卫（调用时刻：初始化和每次路由间跳转之前）
router.beforeEach((to, from, next) => {
    console.log('前置守卫', to, from);
    // 可以使用路由对象中的meta属性，meta中可以配置程序员预先写好的代码。简写 if (to.name == 'xinwen' || to.name == 'xinxi')
    if (to.meta.isAuth) {
        if (localStorage.getItem('school') === 'gdou') {
            next();
        } else {
            alert('学校名称不对，无权进入')
        }
    } else {
        next();
    }
})

// 全局后置路由守卫（调用时刻：初始化和每次路由间跳转之后）
router.afterEach((to, from) => {
    console.log('后置守卫', to, from);
    // 这里用于修改一些页签的title，提示等等
})

// 在路由守卫创建成功之后再暴露
export default router