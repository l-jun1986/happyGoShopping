import {
  myreq
} from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {},
    cate: {},
    goods: {
      floor_title: {}
    }
  },

  // 跳转分类
  tocate(){
    console.log('tocate')
    wx.switchTab({
      url: '/pages/cate/cate',
    })
  },

  onLoad: function(options) {

    //获取轮播图数据
    myreq({
      url: "home/swiperdata"
    }).then(res => {
      console.log("轮播图数据", res)
      this.setData({
        swiper: res
      })
      console.log(this.data.swiper)
    })

    // 获取分类数据

    myreq({
      url: 'home/catitems'
    }).then(res => {
      this.setData({
        cate: res
      })
      console.log(this.data.cate)
    })

    // 获取商品数据
    myreq({
      url: "home/floordata"
    }).then(res => {
      this.setData({
        goods: res
      })
      console.log(this.data.goods)
    })
  }
})