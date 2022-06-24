<template>
  <div>
    <h1>欢迎来到Vue动画大讲堂</h1>
    <button @click="isShow1 = !isShow1">点我切换动画效果</button>
    <!-- transition还可以添加appear属性来完成初始渲染的过渡 -->
    <transition name="info1" appear>
      <h2 v-show="isShow1" class="info1">我是一段信息</h2>
    </transition>
    <!-- 多个元素过渡 -->
    <button @click="isShow2 = !isShow2">点我切换动画效果</button>
    <transition-group name="info2">
      <!-- 在transition-group中的孩子元素都要有key属性(不然会报错)，不过在创建列表时，用v-for就会要求有key -->
      <h2 v-show="!isShow2" key="1" class="info2">hello！</h2>
      <h2 v-show="isShow2" key="2" class="info2">我喜欢吃没有骨头的鱼</h2>
    </transition-group>

    <!--
          Vue还支持动画的自定义类名，支持第三方动画库的运用
          enter-class
          enter-active-class
          enter-to-class (2.1.8+)
          leave-class
          leave-active-class
          leave-to-class (2.1.8+)


          v-enter：进入的起点
          v-enter-active：进入过程中
          v-enter-to：进入的终点
          ------------------------------(v开头则控制该组件中中所有的动画，可以给transition配置name属性来自定义配置动画)
          v-leave：离开的起点
          v-leave-active：离开过程中
          v-leave-to：离开的终点
-->
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow1: true,
      isShow2: true,
    };
  },
};
</script>

<style>
.info1 {
  background-color: darkseagreen;
}
.info2 {
  color: skyblue;
  background-color: darkslateblue;
}
@keyframes show {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* transition标签里有name属性，则在样式名处需要改成对应的name属性的值 */
.info1-enter-active,
.info2-enter-active {
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation: show 1s;
}
.info1-leave-active,
.info2-leave-active {
  /* reverse 反转动画效果 */
  animation: show 1s reverse;
}
</style>