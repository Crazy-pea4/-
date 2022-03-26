<template>
  <div class="recom w">
    <div class="recom_hd">
      <img src="./images/clock.png" alt="" />
      <h5>今日推荐</h5>
    </div>
    <div class="recom_bd">
      <ul>
        <li>
          <a href="">
            <img src="./images/recom_1.jpg" alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img src="./images/recom_2.jpg" alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img src="./images/recom_3.jpg" alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img src="./images/recom_4.jpg" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style scoped>
.recom {
  height: 163px;
  margin-top: 12px;
}

.recom .recom_hd {
  position: relative;
  float: left;
  margin-top: -5px;
  width: 220px;
  height: 173px;
  background-color: #666666;
}

.recom .recom_hd img {
  position: absolute;
  top: 25px;
  left: 79px;
  width: 65px;
  height: 65px;
}

.recom .recom_hd h5 {
  position: absolute;
  top: 105px;
  left: 75px;
  font-size: 18px;
  font-weight: 500;
  color: #f9f9f9;
}

.recom .recom_bd {
  float: left;
  padding-left: 2px;
  width: 1030px;
  height: 163px;
  background-color: #ebebeb;
}

.recom .recom_bd a {
  float: left;
  width: 257px;
  height: 163px;
}

.recom .recom_bd a img {
  width: 100%;
  height: 100%;
}
</style>