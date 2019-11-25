// components/toTop/toTop.js
Page({
// 返回顶点
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500,
    })
  }
})