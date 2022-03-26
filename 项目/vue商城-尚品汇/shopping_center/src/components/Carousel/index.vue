<template>
  <div class="swiper-container" ref="swiper_container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <a href="">
          <img :src="carousel.imgUrl" alt="" />
        </a>
      </div>
    </div>
    <!-- 分页器（下面的小圆点） -->
    <div class="swiper-pagination"></div>
    <!-- 前进后退按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // 版本5
          const mySwiper = new Swiper(this.$refs.swiper_container, {
            loop: true, // 循环模式选项
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
          // 鼠标悬停时结束自动轮播
          mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
          };
          mySwiper.el.onmouseout = function () {
            mySwiper.autoplay.start();
          };
        });
      },
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>