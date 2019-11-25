// pages/personal/personal.js
Page({
  data: {
    rawData: {}
  },

  // 页面加载
  onLoad() {
    let that = this
    wx.getStorage({
      key: 'rawData',
      success: function(res) {
        that.setData({
          rawData: res.data
        })
      },
    })
  },

  // 跳转订单
  toOrder() {
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },

  // 联系客服
  call(){
    wx.makePhoneCall({
      phoneNumber: '13512740456'
    })
  }
})