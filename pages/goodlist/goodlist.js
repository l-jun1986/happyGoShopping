// pages/goodlist/goodlist.js
import {
  myreq
} from "../../utils/request.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    currenttab: 0,
    tab: ["综合", "销量", "价格"],
    pagesize: 10,
    pagenum: 0,
    reachBottom: false
  },
  // 封装获取数据
  getData() {
    myreq({
      url: "goods/search",
      data: {
        cid: this.options.cid,
        query: this.options.query,
        pagesize: this.data.pagesize,
        pagenum: this.data.pagenum
      }
    }).then(res => {
      this.setData({
        goodsData: this.data.goodsData.concat(res.goods)
      })
      // 获取的数据比页容量小则判断为数据触底了
      if (res.goods.length < this.data.pagesize) {
        this.setData({
          reachBottom: true
        })
      }
    })
  },
  // tab栏切换
  change(event) {
    this.setData({
      currenttab: event.currentTarget.dataset.num
    })
    // 价格排序
    let arr = this.data.goodsData
    let order = function (arr) {
      var len = arr.length,
        i, j, k, tmp, result;

      result = arr.slice(0);
      for (i = 0; i < len; i++) {
        k = i;
        for (j = i + 1; j < len; j++) {
          if (result[j].goods_price < result[k].goods_price) k = j;
        }
        if (k != i) {
          tmp = result[k];
          result[k] = result[i];
          result[i] = tmp;
        }
      }
      return result;
    }
    this.setData({
      goodsData:order(arr)
    })
  },
  // 上拉翻页
  onReachBottom() {
    // 如果数据触底了，提示没有更多数据并返回，不发送请求
    if (this.data.reachBottom) {
      wx.showToast({
        title: '没有更多商品了',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    // 否则页数+1，发请求获取新数据
    this.setData({
      pagenum: this.data.pagenum + 1
    })
    this.getData()
    console.log('商品列表数据', this.data.goodsData)
  },
  // 跳转商品详情
  toDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?goods_id=${event.currentTarget.dataset.goods_id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  // 下拉刷新
  onPullDownRefresh() {

  }
})