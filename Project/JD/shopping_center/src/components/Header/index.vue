<template>
  <div class="con">
    <!-- 顶部快捷导航栏 -->
    <div class="shortcut">
      <div class="w">
        <section class="shortcut_l">
          <p style="float: left">京东欢迎您！</p>
          <ul>
            <li>
              <router-link to="/login" class="sign_in" v-show="!userInfo.name">请登录</router-link>
              <span to="/login" class="sign_in" v-show="userInfo.name">{{ userInfo.name }}</span>
            </li>
            <li>
              <router-link to="/register" class="register red" v-show="!userInfo.name">免费注册！</router-link>
              <span class="logout red" v-show="userInfo.name" @click="logout">退出登录</span>
            </li>
          </ul>
        </section>
        <section class="shortcut_r">
          <ul>
            <li>
              <a href="">我的订单</a>
            </li>
            <li>
              <a href="" class="arrow_icon iconfont">我的京东</a>
            </li>
            <li>
              <a href="">京东会员</a>
            </li>
            <li>
              <a href="">企业采购</a>
            </li>
            <li>
              <a href="" class="arrow_icon iconfont">关注京东</a>
            </li>
            <li>
              <a href="" class="arrow_icon iconfont">客户服务</a>
            </li>
            <li>
              <a href="" style="border: none" class="arrow_icon iconfont">网站导航</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <!-- 网页头部 -->
    <div class="header w">
      <!-- logo部分 -->
      <!-- 下面是logo SEO优化 -->
      <div class="logo">
        <h1>
          <router-link to="/home" title="京东网上商城">
            京东商城
            <img src="./image/logo.jpg" alt="" width="170px" height="85px" />
          </router-link>
        </h1>
      </div>

      <!-- 搜索部分 -->
      <div class="search">
        <input type="search" placeholder="一元购惊喜折扣！" v-model="keyword" @keyup.enter="search" />
        <button class="search_button" @click="search">搜索</button>
      </div>
      <!-- 购物车部分 -->
      <div class="shopcar">
        <router-link to="/shopcart" class="iconfont">
          我的购物车
          <!-- 购物车计数 -->
          <i class="shopcount">8</i>
        </router-link>
      </div>
      <!-- 热点词部分 -->
      <div class="hotwords">
        <ul>
          <li>
            <a href="" style="color: rgb(236, 15, 15)">优惠购首发</a>
          </li>
          <li>
            <a href="">百亿大补贴</a>
          </li>
          <li>
            <a href="">满99减10活动</a>
          </li>
          <li>
            <a href="">红包雨来袭</a>
          </li>
          <li>
            <a href="">生活用品</a>
          </li>
          <li>
            <a href="">电器</a>
          </li>
          <li>
            <a href="">文具</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on('clearInputValue', () => {
      this.keyword = ""
    })
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    search() {
      // 整合参数
      if (this.keyword.trim().length) {
        let location = {
          name: "search",
          params: { keyword: this.keyword },
        };
        location.query = this.$route.query;
        this.$router.push(location);
        // this.$router.push({
        //   // 路由名称，而非组件名称
        //   name: "search",
        //   params: {
        //     searchValue: this.searchValue,
        //   },
        // });
      } else {
        alert("请输入商品名！");
      }
    },
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({ name: 'Home' })
      }).catch((err) => {
        console.log(err);
      })
    }
  },
};
</script>

<style scoped>
/* 字体颜色，红色 */
.red {
  color: rgb(224, 10, 10) !important;
}

/* 顶部快捷导航栏 */
.shortcut {
  height: 32px;
  background-color: #f1f1f1;
}

/* 快捷栏左边 */
.shortcut_l {
  float: left;
  width: 220px;
  height: 32px;
  line-height: 32px;
}

.shortcut_l li {
  float: left;
}

.shortcut_l .register {
  margin-left: 8px;
  font-weight: 700;
}

.shortcut_l .logout {
  margin-left: 8px;
  font-weight: 700;
  cursor: pointer;
}

/* 快捷栏右边 */
.shortcut_r {
  float: right;
  margin-right: 20px;
  width: 670px;
  height: 32px;
  line-height: 32px;
}

.shortcut_r li {
  float: left;
}

.shortcut_r li a {
  padding: 0 15px 0 15px;
  height: 14px;
  border-right: 1px solid black;
}

.shortcut_r .arrow_icon::after {
  content: "\e60b";
  margin-left: 8px;
}

/* 网页头部 */
.header {
  position: relative;
  height: 120px;
}

/* logo部分 */
.header .logo a {
  float: left;
  margin-top: 32.5px;
  font-size: 0;
}

/* 搜索部分 */
.header .search {
  float: left;
  position: relative;
  top: 32.5px;
  left: 205px;
  width: 520px;
  height: 38px;
  border: 3px solid rgb(200, 21, 21);
}

.header input {
  position: absolute;
  top: 0;
  left: 0;
  width: 415px;
  height: 32px;
  padding-left: 8px;
}

.header button {
  position: absolute;
  top: -1.5px;
  right: -3px;
  width: 95px;
  height: 35px;
  color: rgb(238, 238, 238);
  text-align: center;
  line-height: 35px;
  font-size: 18px;
  background-color: rgb(200, 21, 21);
}

/* 购物车部分 */
.header .shopcar a {
  float: right;
  position: relative;
  margin: 32.5px 38px 0 0;
  width: 150px;
  height: 36px;
  line-height: 33px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #c3c3c3;
  background-color: #f1f1f1;
}

/* 购物车小图标 */
.header .shopcar a::before {
  content: "\e604";
  margin-right: 5px;
  font-size: 19px;
  color: rgb(200, 21, 21);
}

.header .shopcar a::after {
  content: "\eb1b";
  margin-left: 10px;
  font-size: 14px;
}

/* 购物车计数 */
/* 由于加购的数目会经常变所以不要给它宽度，只给个高度 */
.header .shopcar a .shopcount {
  position: absolute;
  top: -8px;
  left: 110px;
  height: 17px;
  padding: 5px;
  line-height: 6px;
  color: white;
  border-radius: 8px 8px 8px 0;
  background-color: rgb(236, 15, 15);
}

/* 热点词部分 */
.header .hotwords {
  float: left;
  position: relative;
  top: 38px;
  left: 215px;
  width: 500px;
  height: 30px;
}

.header .hotwords li {
  float: left;
  margin-right: 21px;
}
</style>