// pages/search/search.js
import {
  myreq
} from "../../utils/request.js"

let timer = 0;

Page({
  data: {
    result: [],
    history: []
  },

  onLoad: function() {
    let that = this
    wx.getStorage({
      key: 'searchHistory',
      success: function(res) {
        that.setData({
          history: res.data
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // 根据关键字搜索数据
  search(query) {
    let that = this
    myreq({
        url: "goods/qsearch",
        data: {
          query: query
        }
      })
      .then(res => {
        if (res.length === 0) {
          wx.showToast({
            title: '没有匹配的商品',
            icon: 'none',
            duration: 1000,
          })
        } else {
          let temp = that.data.history
          temp.unshift(query)
          temp = Array.from(new Set(temp))
          that.setData({
            result: res,
            history: temp
          })
          wx.setStorage({
            key: 'searchHistory',
            data: that.data.history
          })
          console.log("搜索结果", this.data)
        }
      })
  },
  // 输入框改变
  change(event) {
    let value = event.detail.value
    clearTimeout(timer)
    if (value.trim() === '') {
      this.setData({
        result: []
      })
    } else {
      timer = setTimeout(() => {
        this.search(value)}, 800)
    }
  },

  // 清空
  clear() {
    this.setData({
      result: {}
    })
  },

  // 选择历史记录
  choose(event) {
    this.search(event.currentTarget.dataset.value)
  },

  // 跳转详情页
  toDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?goods_id=${event.currentTarget.dataset.goods_id}`,
    })
  }
})