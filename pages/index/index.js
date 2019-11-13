Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:{},
    cate:{},
    goods:{
      floor_title:{}
    }
  },
  toTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // 获取轮播图数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success:res=>{
        console.log("轮播图数据",res.data.meta.msg)
        this.setData(
          {swiper:res.data.message}
        )
        console.log(this.data.swiper)
        wx.hideLoading()
      }
    })

    // 获取分类数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:res=>{
        console.log("分类数据",res.data.meta.msg)
        this.setData(
          {cate:res.data.message}
        )
        console.log(this.data.cate)
      }
    })

    // 获取商品数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:res=>{
        console.log("商品数据",res.data.meta.msg)
        this.setData(
          {goods:res.data.message}
        )
        console.log(this.data.goods)
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