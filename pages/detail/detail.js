// pages/detail/detail.js
import {
  myreq
} from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    goodsData: {},
    pics: [],
    galshow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    myreq({
      url: "goods/detail",
      data: {
        goods_id: options.goods_id
      }
    }).then(res => {
      let temp = []
      if (res.pics.length !== 0) {
        res.pics.map(e => {
          temp.push(e.pics_mid)
        })
      } else {
        temp = ["/assets/images/-crocodile.svg"]
      }
      this.setData({
        goodsData: res,
        pics: temp,
      })
      console.log(this.data.goodsData)
    })
  },
  // 显示画廊
  showGal() {
    this.setData({
      galshow: true,
      current: 0
    })
  },
  // 隐藏画廊
  hideGal() {
    this.setData({
      galshow: false
    })
  },

  // 添加收藏
  addFav() {
    wx.showToast({
      title: '已收藏',
      icon: 'success',
      duration: 1000
    })
    let that = this
    // 先从本地获取id数据
    wx.getStorage({
      key: 'fav',
      // 成功表示之前已经存储有数据，添加id进数组里
      success: function(res) {
        let temp = []
        temp = res.data
        temp.push(that.options.goods_id)
        // 数组去重避免重复添加收藏
        temp = Array.from(new Set(temp))
        wx.setStorage({
          key: 'fav',
          data: temp,
        })
      },
      // 失败则为第一次添加收藏，创建数组存进id
      fail: function(err) {
        wx.setStorage({
          key: 'fav',
          data: [that.options.goods_id]
        })
      }
    })
  },

  // 加入购物车
  addcart() {
    wx.showToast({
      title: '已添加至购物车',
      icon: 'success',
      duration: 1000
    })
    let that = this
    // 先从本地获取id数据
    wx.getStorage({
      key: 'cart',
      // 成功表示之前已经存储有数据，添加id进数组里
      success: function(res) {
        let temp = []
        // 判断数据里是否有本页商品的数据
        res.data.map((e, i) => {
          if (e.goods_id == that.options.goods_id) {
            temp = res.data
            temp[i].num = temp[i].num + 1
          }
        })
        // 有数据则num+1
        if (temp.length !== 0) {
          console.log(temp)
          wx.setStorage({
            key: 'cart',
            data: temp,
          })
        } else {
          // 没数据则添加数据
          temp = res.data
          temp.push({
            goods_id: that.options.goods_id,
            name: that.data.goodsData.goods_name,
            pic: that.data.goodsData.goods_small_logo,
            goods_number: 1,
            goods_price: that.data.goodsData.goods_price,
            chosen: true
          })
          wx.setStorage({
            key: 'cart',
            data: temp,
          })
          let str = temp.length.toString()
          console.log(str)
          wx.setTabBarBadge({
            index: 2,
            text: str
          })
        }
      },
      // 失败则为第一次添加收藏，创建数组存进id
      fail: function(err) {
        wx.setStorage({
          key: 'cart',
          data: [{
            goods_id: that.options.goods_id,
            name: that.data.goodsData.goods_name,
            pic: that.data.goodsData.goods_small_logo,
            goods_price: that.data.goodsData.goods_price,
            goods_number: 1,
            chosen: true
          }]
        })
        wx.setTabBarBadge({
          index: 2,
          text: '1',
        })
      }
    })
  },

  // 跳转购物车
  tocart() {
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    })
  },

  // 买买买
  buy() {
    wx.navigateTo({
      url: `/pages/pay/pay?goods_id=${this.options.goods_id}`,
    })
  }
})