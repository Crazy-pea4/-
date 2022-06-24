// index.js
Page({
  data: {
    name: 'zhangsan'
  },
  toList() {
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  toHello() {
    wx.navigateTo({
      url: '/pages/hello/hello?666=qwe',
    })
  }
})