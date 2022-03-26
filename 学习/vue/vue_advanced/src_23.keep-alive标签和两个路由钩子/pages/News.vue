<template>
  <ul>
    <li :style="{ opacity }">透明度</li>
    <li>
      <a href="">我爱你</a>
      <input type="text" />
    </li>
    <li>
      <a href="">我爱你</a>
      <input type="text" />
    </li>
    <li>
      <a href="">我爱你</a>
      <input type="text" />
    </li>
    <li>
      既要让News在切换时不被销毁也要让再看不到News时里面的定时器暂停，我们需要用到一个新标签和两个全新的钩子(路由组件独有的)<br />
      1. 在Home组件中的keep-alive标签<br />
      2. 在News组件中的activated() {}、deactivated() {} 注意：这两个钩子需要配合keep-alive标签使用
    </li>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      opacity: 1,
    };
  },
  // 在mounted钩子中的逻辑，因为在Home组件中配置了keep-alive标签，所以即使从News切走了，定时器也不会关闭
  // mounted() {
  //   this.timer = setInterval(() => {
  //     this.opacity -= 0.01;
  //     // console.log(111);
  //     if (this.opacity <= 0) {
  //       this.opacity = 1;
  //     }
  //   }, 16);
  // },
  beforeDestroy() {
    console.log("News组件将被销毁");
    // clearInterval(this.timer)
  },
  // 这里用activated更加合适
  activated() {
    this.timer = setInterval(() => {
      this.opacity -= 0.01;
      console.log(111);
      if (this.opacity <= 0) {
        this.opacity = 1;
      }
    }, 16);
  },
  deactivated () {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
ul li {
  float: left;
  width: 327px;
  height: 30px;
  line-height: 30px;
}
</style>