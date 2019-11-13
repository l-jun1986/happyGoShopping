// pages/goodlist/goodlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    currenttab:0,
    tab:["综合","销量","价格"]
  },
  // tab栏切换
  change(event){
    console.log(event)
    this.setData(
      {currenttab:event.currentTarget.dataset.num}
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/goods/search',
      data: {
        query: this.options.query
      },
      success: res => {
        this.setData(
          { goods: res.data.message.goods }
        )
        console.log("商品列表数据:", this.data.goods)
        wx.hideLoading()
      }
    })
    // console.log(this.options.query)
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