<template>
  <div class="spec-preview">
    <!-- 商品图 -->
    <img :src="skuImageList[imgIndex].imgUrl" />
    <!-- 鼠标移过事件的承载体 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 放大效果图 -->
    <div class="big">
      <img :src="skuImageList[imgIndex].imgUrl" ref="bigImg" />
    </div>
    <!-- 放大镜阴影 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      imgIndex: 0,
    };
  },
  mounted() {
    this.$bus.$on("getIndex", (i) => {
      this.imgIndex = i;
    });
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let bigImg = this.$refs.bigImg;
      // 计算与限制
      let top = e.offsetY - mask.offsetHeight / 2;
      let left = e.offsetX - mask.offsetWidth / 2;
      if (top < 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      if (left < 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;

      mask.style.top = top + "px";
      mask.style.left = left + "px";
      bigImg.style.top = -2 * top + "px";
      bigImg.style.left = -2 * left + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>