"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let getPicture = function() {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["album"],
        success: (res) => {
          console.log(res);
          common_vendor.index.setStorageSync("flag", true);
          common_vendor.index.setStorage({
            key: "picUrl",
            data: res.tempFilePaths[0],
            success() {
              console.log("存图片成功");
              common_vendor.index.switchTab({
                url: `/pages/data/index`
              });
            }
          });
        }
      });
    };
    let takePicture = function() {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["camera"],
        success(res) {
          console.log(res);
          common_vendor.index.setStorageSync("flag", true);
          common_vendor.index.setStorage({
            key: "picUrl",
            data: res.tempFilePaths[0],
            success() {
              console.log("存图片成功");
              common_vendor.index.switchTab({
                url: `/pages/data/index`
              });
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => common_vendor.unref(getPicture) && common_vendor.unref(getPicture)(...args)),
        b: common_vendor.o((...args) => common_vendor.unref(takePicture) && common_vendor.unref(takePicture)(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "D:/Program/H5C3-JS/Project/虾苗计数小程序/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
