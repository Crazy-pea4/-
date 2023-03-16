"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const imgSrc = common_vendor.ref("../../static/empty.png");
    const shrimpSeedNum = common_vendor.ref(null);
    common_vendor.onShow(() => {
      let flag = common_vendor.index.getStorageSync("flag");
      if (flag) {
        common_vendor.index.getStorage({
          key: "picUrl",
          success({
            data
          }) {
            console.log("data", data);
            imgSrc.value = data;
            common_vendor.index.setStorageSync("flag", false);
            common_vendor.index.uploadFile({
              url: "http://nnf8xj.natappfree.cc/toReceiveAndPressSave",
              name: "img",
              filePath: data,
              fileType: "image",
              success(res) {
                setTimeout(() => {
                  common_vendor.index.request({
                    url: "http://nnf8xj.natappfree.cc/getShrimpData",
                    success(res2) {
                      console.log("返回来的数据", res2);
                    }
                  });
                }, 2e3);
              },
              fail(err) {
                console.log(err);
              }
            });
          }
        });
      } else {
        console.log("flag是false");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: imgSrc.value,
        b: common_vendor.t(shrimpSeedNum.value),
        c: shrimpSeedNum.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af28c7f4"], ["__file", "D:/Program/H5C3-JS/Project/虾苗计数小程序/pages/data/index.vue"]]);
wx.createPage(MiniProgramPage);
