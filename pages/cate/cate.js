// pages/cate/cate.js
import {
  myreq
} from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: {},
    activeIndex: 0,
    activeData: {},
    righttop: 0
  },
  // 封装获取数据
  getData() {
    myreq({
      url: "categories"
    }).then(res => {
      this.setData({
        cate: res,
        activeData: res[0]
      })
      console.log(this.data.cate)
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    this.getData()
  },
  // 选中左边栏
  active(event) {
    this.setData({
      activeIndex: event.currentTarget.dataset.index,
      activeData: this.data.cate[event.currentTarget.dataset.index],
      righttop: 0
    })
  },
  // 点击商品跳转商品列表
  toList(event) {
    wx.navigateTo({
      url: `/pages/goodlist/goodlist?query=${event.currentTarget.dataset.name}&cid=${event.currentTarget.dataset.cid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  }
})