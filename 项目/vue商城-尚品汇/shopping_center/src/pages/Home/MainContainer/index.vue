<template>
  <div class="w clearfix">
    <div class="main">
      <!-- 轮播图模块 -->
      <div class="focus">
        <Carousel :list="bannerList_mock"></Carousel>
      </div>
      <!-- 快报模块 -->
      <div class="newflash">
        <div class="news">
          <div class="news_hd">
            <h5>品优购快报</h5>
            <a href="" class="iconfont">更多</a>
          </div>
          <div class="news_bd">
            <ul>
              <li>
                <i>[特惠]</i>
                <a href="">IoT智能家具专区满500-50</a>
              </li>
              <li>
                <i>[公告]</i>
                <a href="">5G时代联手智能家居</a>
              </li>
              <li>
                <i>[特惠]</i>
                <a href="">百元中秋全品种类礼券限量领</a>
              </li>
              <li>
                <i>[公告]</i>
                <a href="">全场手机以旧换新</a>
              </li>
              <li>
                <i>[特惠]</i>
                <a href="">每日领美容、养护券</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="lifeservice">
          <ul>
            <li><a href="" class="service_pic1">话费</a></li>
            <li><a href="" class="service_pic2">机票</a></li>
            <li><a href="" class="service_pic3">电影票</a></li>
            <li><a href="" class="service_pic4">游戏</a></li>
            <li><a href="" class="service_pic5">彩票</a></li>
            <li><a href="" class="service_pic6">加油卡</a></li>
            <li><a href="" class="service_pic7">酒店</a></li>
            <li><a href="" class="service_pic8">火车票</a></li>
            <li><a href="" class="service_pic9">众筹</a></li>
            <li><a href="" class="service_pic10">理财</a></li>
            <li><a href="" class="service_pic11">礼品卡</a></li>
            <li><a href="" class="service_pic12">白条</a></li>
          </ul>
        </div>
        <div class="bargain">
          <a href="">
            <img src="./images/bargain.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainContainer",
  mounted() {
    this.$store.dispatch("home/getBannerList_mock");
  },
  computed: {
    ...mapState("home", ["bannerList_mock"]),
  },
};
</script>

<style scoped>
.main {
  float: left;
  margin: 10px 0 0 210px;
  width: 1040px;
  height: 455px;
}

/* 轮播图模块 */
.main .focus {
  float: left;
  width: 780px;
  height: 456px;
  overflow: hidden;
}

.main .focus img {
  width: 100%;
  height: 100%;
}

/* 快报模块 */
.main .newflash {
  float: right;
  width: 250px;
  height: 455px;
}

.newflash .news {
  padding: 0 4px;
  height: 165px;
  border: 1px solid #ccc;
}

.news .news_hd {
  height: 33px;
  line-height: 33px;
  border-bottom: 1px dotted #ccc;
}

.news .news_hd h5 {
  float: left;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
}

.news .news_hd a {
  float: right;
}

.news .news_hd a::after {
  content: "\eb1b";
  margin: 0 2px 0 5px;
}

.news .news_bd li {
  margin: 6px 0 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news .news_bd li i {
  font-weight: 600;
}

/* 生活服务模块 */
.newflash .lifeservice {
  height: 209px;
  border-left: 1px solid #ccc;
}

.lifeservice li {
  float: left;
  width: 25%;
  height: 70px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.lifeservice li .service_pic1 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) 2px -3px;
}

.lifeservice li .service_pic2 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -60px -3px;
}

.lifeservice li .service_pic3 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -124px -3px;
}

.lifeservice li .service_pic4 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -187px -3px;
}

.lifeservice li .service_pic5 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) 2px -72px;
}

.lifeservice li .service_pic6 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -60px -72px;
}

.lifeservice li .service_pic7 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -124px -72px;
}

.lifeservice li .service_pic8 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -187px -72px;
}

.lifeservice li .service_pic9 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) 2px -142px;
}

.lifeservice li .service_pic10 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -60px -142px;
}

.lifeservice li .service_pic11 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -124px -142px;
}

.lifeservice li .service_pic12 {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 46px;
  background: no-repeat url(../../../assets/images/icons.png) -187px -142px;
}

.newflash .bargain {
  margin-top: 7px;
}
</style>