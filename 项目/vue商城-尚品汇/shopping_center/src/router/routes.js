// 引入路由组件
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Search from '../pages/Search';
import Detail from '../pages/Detail'
export default [{
        // 重定向，将初始地址指向/home
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            showFooter: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            showFooter: false
        }
    },
    {
        name: 'search',
        // 在占位符末尾写上 ? 代表该params参数可传可不传
        path: '/search/:keyword?',
        component: Search,
        meta: {
            showFooter: true
        },
    },
    {
        name: 'detail',
        path: '/detail/:goodsId',
        component: Detail,
        meta: {
            showFooter: true
        }
    }
]