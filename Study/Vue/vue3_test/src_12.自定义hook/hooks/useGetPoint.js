import {
    reactive,
    onMounted,
    onBeforeUnmount
} from 'vue'

export default () => {
    let point = reactive({
        x: 0,
        y: 0,
    });

    function getPoint(e) {
        console.log(e.pageX, e.pageY);
        point.x = e.pageX;
        point.y = e.pageY;
    }
    onMounted(() => {
        window.addEventListener("mousemove", getPoint);
    });
    // 为了防止页面在被卸载掉后，window身上还有这个函数
    onBeforeUnmount(() => {
        window.removeEventListener("mousemove", getPoint);
    });

    return point;
}