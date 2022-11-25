<template>
  <div class="floor w">
    <!-- 盒子头部 -->
    <div class="box_hd">
      <h3>{{ floorList.name }}</h3>
      <ul class="table_list">
        <li v-for="(item, index) in floorList.navList" :key="index">
          <a :href="item.url" class="red">{{ item.text }}</a
          >|
        </li>
      </ul>
    </div>
    <!-- 盒子主体 -->
    <div class="box_bd">
      <div class="table_content">
        <!-- 左侧盒子 -->
        <div class="w_210">
          <ul>
            <!-- 左上侧关键词 -->
            <li v-for="(item, index) in floorList.keywords" :key="index">
              <a href="">{{ item }}</a>
            </li>
          </ul>
          <!-- 左下侧图片 -->
          <a href="">
            <img :src="floorList.imgUrl" alt="" />
          </a>
        </div>
        <!-- 轮播图 -->
        <div class="w_329" style="margin: 0 12px">
          <Carousel :list="floorList.carouselList"></Carousel>
        </div>
        <!-- 右侧大盒子第一个小盒子 -->
        <div href="" class="w_221">
          <a href="" class="bb">
            <img :src="floorList.recommendList[0]" alt="" />
          </a>
          <a href="">
            <img
              :src="floorList.recommendList[1]"
              alt=""
              style="margin-top: 1px"
            />
          </a>
        </div>
        <!-- 右侧大盒子第二个小盒子 -->
        <div href="" class="w_220">
          <a href="">
            <img :src="floorList.bigImg" alt="" />
          </a>
        </div>
        <!-- 右侧大盒子第三个小盒子 -->
        <div href="" class="w_219">
          <a href="" class="bb"
            ><img :src="floorList.recommendList[2]" alt=""
          /></a>
          <a href=""
            ><img
              :src="floorList.recommendList[3]"
              alt=""
              style="margin-top: 1px"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props: ["floorList"],
};
</script>

<style scoped>
.floor .box_hd {
  margin-top: 35px;
  height: 30px;
  border-bottom: 2px solid rgb(200, 21, 21);
}

.floor .box_hd h3 {
  float: left;
  line-height: 30px;
  color: rgb(200, 21, 21);
  font-size: 18px;
  font-weight: 400;
}

.floor .box_hd ul {
  float: right;
}

.floor .box_hd li {
  float: left;
  line-height: 30px;
}

.floor .box_hd a {
  float: left;
  padding: 0 15px;
  line-height: 30px;
  color: black;
}

.floor .box_hd a:hover {
  color: #c81623;
}

.floor .box_bd {
  height: 361px;
  background-color: #fbfbfb;
}

.floor .box_bd div {
  float: left;
}
.floor .box_bd a {
  display: block;
}
.w_210 {
  text-align: center;
  width: 210px;
  height: 361px;
}

.w_210 ul li {
  float: left;
  margin-left: 15px;
  width: 85px;
  height: 34px;
  line-height: 34px;
  border-bottom: 1px solid #c0c0c0;
}

.w_210 a img {
  width: 210px;
  height: 255px;
}

.w_329 {
  width: 329px;
}

.w_221 {
  width: 221px;
}

.w_220 {
  width: 220px;
  margin: 0 13px;
}

.w_219 {
  width: 219px;
}

.bb {
  border-bottom: 1px solid #e9e9e9;
}
</style>