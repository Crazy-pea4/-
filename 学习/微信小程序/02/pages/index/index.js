// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: '你好，我是微信小程序',
        pic: '/images/abcd.jpg',
        rd: Math.floor(Math.random() * 10),
        count: 0,
        inpValue: '修改我data中的值也会改变',
        arr: ['GTA6', '半条命3', '虐杀原形3'],
        userList: [
            { id: 1, name: '王小明'},
            { id: 2, name: '猪肥膘'},
            { id: 3, name: '猪八戒'}
        ]
    },

    // 定义回调函数，直接写在该对象中
    tap(e) {
        console.log(e);
    },

    changCount1() {
        this.setData({
            count: this.data.count + 1,
        })
    },

    changCount2(e) {
        this.setData({
            count: this.data.count + e.target.dataset.num
        })
    },

    changeInpValue(e) {
        this.setData({
            inpValue: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})