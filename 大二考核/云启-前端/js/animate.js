function animate(obj, target, callBack) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 缓动动画初始化
        let steps = (target - obj.offsetLeft) / 10;
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数callBack在停止定时器后执行
            if (callBack) {
                callBack();
            }
        } else {
            steps = steps > 0 ? Math.ceil(steps) : Math.floor(steps);
            obj.style.left = obj.offsetLeft + steps + 'px';
        }
    }, 10);
}