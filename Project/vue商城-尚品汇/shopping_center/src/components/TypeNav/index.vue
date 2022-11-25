<template>
  <div class="nav">
    <div class="w">
      <!-- 商品下拉菜单有讲究，一般是用类名是dt dd的div来区分 -->
      <div class="dropdown" @mouseenter="enterShow" @mouseleave="outShow">
        <!-- 一般来说，下拉菜单的上部分和下部分应该放在一起，而不要分开写 -->
        <div class="dt">全部商品分类</div>
        <transition name="dd">
          <div class="dd" v-show="isShow">
            <!-- 使用事件委托，大大提高搜索效率 -->
            <ul class="iconfont" @click="goSearch">
              <li class="item" v-for="c1 in categoryList" :key="c1.categoryId">
                <!-- 一级分类 -->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                <div class="item-list clearfix">
                  <!-- 二级分类 -->
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <!-- 三级分类 -->
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="navitems">
        <ul>
          <!-- 值得注意的是，这里的li用padding隔开得到的用户体验会更好 -->
          <li>
            <a href="" style="margin-left: 20px">服装城</a>
          </li>
          <li>
            <a href="">美妆馆</a>
          </li>
          <li>
            <a href="">智能家居</a>
          </li>
          <li>
            <a href="">全球购</a>
          </li>
          <li>
            <a href="">闪购</a>
          </li>
          <li>
            <a href="">团购</a>
          </li>
          <li>
            <a href="">拍卖</a>
          </li>
          <li>
            <a href="">二手交易</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isShow: true,
    };
  },
  // 当分类导航组件挂载完毕后，调用mounted钩子向服务器发请求
  mounted() {
    // 这里还用不了mapActions，因为它需要在methods中配置(步骤二：将下面的代码放到)
    // this.$store.dispatch("home/getBaseCategoryList");
    // console.log(this.$route);
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    goSearch(event) {
      // this.$router.push({
      //   name: "search",
      // })
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        // 整理参数。值得注意的一点，在这里尽量使用query传参，而不是params，因为params传参需要去路由器配置占位符，这里的变量数目多，不方便
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 整合location、query对象
        location.query = query;
        // 若路由中存在params参数也整合进去(先搜索，再使用分类导航)
        location.params = this.$route.params;
        // console.log(location);
        this.$router.push(location);
      }
    },
    enterShow() {
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },
    outShow() {
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
  },
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}

.nav {
  width: 100%;
  height: 50px;
  border-bottom: 3px solid rgb(200, 21, 21);
}

/* 导航下拉框 */
.nav .dropdown {
  float: left;
  width: 200px;
  height: 50px;
  background-color: rgb(200, 21, 21);
}

.nav .dropdown .dt {
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 19px;
  color: rgb(238, 238, 238);
}

.nav .dropdown .dd {
  position: relative;
  width: 100%;
  height: 466px;
  background-color: rgb(224, 10, 10);
  z-index: 999;
}

.nav .dropdown .dd li ul {
  height: 99%;
  overflow: hidden;
}

.nav .dropdown .dd li {
  margin-left: 2px;
  padding-left: 8px;
  width: 198px;
  height: 31px;
  color: white;
  line-height: 30px;
}

.nav .dropdown .dd li:hover {
  background-color: white;
}

.nav .dropdown .dd li:hover a {
  color: rgb(224, 10, 10);
}

.nav .dropdown .dd li a {
  font-size: 13px;
  color: white;
}

.nav .dropdown .dd li::after {
  float: right;
  margin-right: 5px;
  content: "\eb1b";
}

.nav .item .item-list {
  display: none;
  position: absolute;
  width: 795px;
  min-height: 467px;
  background: #f7f7f7;
  left: 198px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}

.nav .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}

.nav .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}

.nav .item .item-list .subitem dl.fore {
  border-top: 0;
}

.nav .item .item-list .subitem dl dt {
  float: left;
  width: 62px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}

.nav .item .item-list .subitem dl dt a {
  color: black;
}

.nav .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}

.nav .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}

.nav .item .item-list .subitem dl dd em a {
  color: black;
}

.nav .item:hover .item-list {
  display: block;
}

/* 导航区域框 */
.nav .navitems {
  float: left;
  width: 1050px;
  height: 50px;
}

.nav .navitems li a {
  float: left;
  padding: 0 23px;
  line-height: 50px;
  color: rgb(41, 40, 40);
  text-align: center;
  font-size: 16px;
}

.nav .navitems li a:hover {
  color: #c81623;
}

.dd-enter,
.dd-leave-to {
  height: 0px !important;
}

.dd-enter-to,
.dd-leave {
  height: 466px !important;
}

.dd-enter-active,
.dd-leave-active {
  overflow: hidden;
  transition: all 0.3s linear;
}
</style>
