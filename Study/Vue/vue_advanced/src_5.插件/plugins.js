export default {
    install(Vue, x, y, z) {
        // 接收use传过来的参数
        console.log(x, y, z);
        // 全局过滤器
        Vue.filter('mySliceFull', function (value) {
            console.log(value);
            return value.slice(0, 4)
        })
        // 全局注册
        Vue.directive('fbind', {
            // 当指令与元素成功绑定时(一开始)
            bind(element, binding) {
                element.value = binding.value;
            },
            // 指令所在元素被插入页面时
            inserted(element) {
                element.focus();
            },
            // 指令所在模板被重新解析时
            update(element, binding) {
                element.value = binding.value;
            }
        })
        // 全局混入
        Vue.mixin({
            data() {
                return {
                    x: 999,
                    y: 666
                }
            },
        })
    }
}