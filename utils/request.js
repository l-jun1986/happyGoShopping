const baseUrl = "https://api.zbztb.cn/api/public/v1/"

export const myreq = (obj) => {
  // 拼接请求路径
  obj.url = baseUrl + obj.url
  // 给需要header的请求添加请求头带token
  obj.header = obj.header || {}
  if (obj.url.includes('my/') === true) {
    obj.header.Authorization = wx.getStorageSync('token')
  }
  // 加载效果图
  wx.showLoading({
    title: 'loading...',
  })

  // 创建一个promise实例
  return new Promise((resolve, reject) => {
    // 请求
    wx.request({
      // 结构obj作为数据发请求
      ...obj,
      // 请求成功处理
      success: res => {
        resolve(res.data.message);
      },
      // 请求失败
      fail: err => {
        reject(err)
      },
      // 请求完成无论成功失败
      complete: res => {
        wx.hideLoading();
        wx.stopPullDownRefresh()
      }
    })
  })
}