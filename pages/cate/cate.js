// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate:{},
    num:1
  },
  // 选中左边栏
  active(event){
    this.setData({num:event.currentTarget.dataset.num})
    
  },
  // 点击商品跳转商品搜索列表
  // toDetail
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      success:res=>{
        console.log("分类页面数据",res.data.meta.msg)
        this.setData({
          cate:res.data.message
        })
        console.log(this.data.cate)
      }
    })
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