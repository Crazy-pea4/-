<template>
  <!-- footer模块制作 -->
  <footer class="footer">
    <div class="w">
      <!-- 服务介绍模块 -->
      <div class="mod_service">
        <ul>
          <li>
            <h5 class="service_pic1"></h5>
            <div>
              <h3>正品保证</h3>
              <p>正品保证，提供发票</p>
            </div>
          </li>
          <li>
            <h5 class="service_pic2"></h5>
            <div>
              <h3>极速物流</h3>
              <p>急速物流，急速送达</p>
            </div>
          </li>
          <li>
            <h5 class="service_pic3"></h5>
            <div>
              <h3>无忧售后</h3>
              <p>7天无理由退换货</p>
            </div>
          </li>
          <li>
            <h5 class="service_pic4"></h5>
            <div>
              <h3>特色服务</h3>
              <p>私人订制家电套餐</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 帮助模块 -->
      <div class="mod_help">
        <dl>
          <dt>购物指南</dt>
          <dd><a href="">购物流程</a></dd>
          <dd><a href="">会员介绍</a></dd>
          <dd><a href="">生活旅行/团购</a></dd>
          <dd><a href="">常见问题</a></dd>
          <dd><a href="">大家电</a></dd>
          <dd><a href="">联系客服</a></dd>
        </dl>
        <dl>
          <dt>购物指南</dt>
          <dd><a href="">购物流程</a></dd>
          <dd><a href="">会员介绍</a></dd>
          <dd><a href="">生活旅行/团购</a></dd>
          <dd><a href="">常见问题</a></dd>
          <dd><a href="">大家电</a></dd>
          <dd><a href="">联系客服</a></dd>
        </dl>
        <dl>
          <dt>购物指南</dt>
          <dd><a href="">购物流程</a></dd>
          <dd><a href="">会员介绍</a></dd>
          <dd><a href="">生活旅行/团购</a></dd>
          <dd><a href="">常见问题</a></dd>
          <dd><a href="">大家电</a></dd>
          <dd><a href="">联系客服</a></dd>
        </dl>
        <dl>
          <dt>购物指南</dt>
          <dd><a href="">购物流程</a></dd>
          <dd><a href="">会员介绍</a></dd>
          <dd><a href="">生活旅行/团购</a></dd>
          <dd><a href="">常见问题</a></dd>
          <dd><a href="">大家电</a></dd>
          <dd><a href="">联系客服</a></dd>
        </dl>
        <dl>
          <dt>购物指南</dt>
          <dd><a href="">购物流程</a></dd>
          <dd><a href="">会员介绍</a></dd>
          <dd><a href="">生活旅行/团购</a></dd>
          <dd><a href="">常见问题</a></dd>
          <dd><a href="">大家电</a></dd>
          <dd><a href="">联系客服</a></dd>
        </dl>
        <dl>
          <dt>帮助中心</dt>
          <img src="./image/wx_cz.jpg" alt="" />
          <dd><a href="">京东客户端</a></dd>
        </dl>
      </div>
      <!-- 版权信息模块 -->
      <div class="mod_copyright">
        <div class="links">
          <li><a href="">关于我们</a></li>
          <li><a href="">联系我们</a></li>
          <li><a href="">联系客服</a></li>
          <li><a href="">商家入驻</a></li>
          <li><a href="">销售中心</a></li>
          <li><a href="">手机京东</a></li>
          <li><a href="">友情链接</a></li>
          <li><a href="">销售联盟</a></li>
          <li><a href="">京东社区</a></li>
          <li><a href="">京东公益</a></li>
          <li><a href="">English</a></li>
          <li><a href="">Site</a></li>
          <li><a href="">Contact U</a></li>
        </div>
        <div class="copyright">
          <p>
            地址：广东省深圳市宝安区企鹅工厂3楼312 邮编：518100
            电话：400-618-4000 传真：010-829.5100 邮箱：ym-firstshow.com
          </p>
          <p>京ICP备08001421号京公安备1101080007702</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* 底部模块 */
.footer {
  height: 420px;
  padding-top: 20px;
  background-color: rgb(240, 240, 240);
}

/* 服务介绍模块 */
.footer .mod_service {
  height: 80px;
  border-bottom: 1px solid #c3c3c3;
}

.footer .mod_service li {
  position: relative;
  float: left;
  padding-left: 40px;
  width: 312px;
  height: 50px;
}

.footer .mod_service li h5 {
  float: left;
  margin-right: 5px;
  width: 50px;
  height: 50px;
}

.footer .mod_service li .service_pic1 {
  background: url(./image/icons.png) no-repeat -252px -3px;
}

.footer .mod_service li .service_pic2 {
  background: url(./image/icons.png) no-repeat -255px -54px;
}

.footer .mod_service li .service_pic3 {
  background: url(./image/icons.png) no-repeat -256px -106px;
}

.footer .mod_service li .service_pic4 {
  background: url(./image/icons.png) no-repeat -257px -157px;
}

.footer .mod_service div h3 {
  margin: 2px 0 2px 0;
}

.footer .mod_help {
  padding: 24px 0 0 50px;
  height: 195px;
  border-bottom: 1px solid #c3c3c3;
}

.footer .mod_help dl {
  float: left;
  margin-right: 130px;
}

.footer .mod_help dl:last-child {
  position: relative;
  margin-right: 0;
}

.footer .mod_help dt {
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}

.footer .mod_help dl:last-child dt {
  position: absolute;
  top: 0;
  left: 11px;
}

.footer .mod_help dl:last-child dd {
  position: absolute;
  bottom: -25px;
  left: 10px;
}

.footer .mod_help dl:last-child img {
  margin-top: 35px;
}

.footer .mod_copyright .links {
  height: 60px;
}

/* 版权信息模块 */
.footer .mod_copyright .links li {
  float: left;
  margin-top: 20px;
  border-right: 1px solid black;
}

.footer .mod_copyright .links li:first-child {
  padding-left: 40px;
}

.footer .mod_copyright .links li:last-child {
  border: 0;
}

.footer .mod_copyright .links li a {
  padding: 20px;
}

.footer .mod_copyright .copyright p {
  text-align: center;
}
</style>