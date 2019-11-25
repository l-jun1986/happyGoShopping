//app.js
import {myreq} from './utils/request.js'
App({
  onLaunch: function() {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              const {
                rawData,
                signature,
                iv,
                encryptedData
              } = res
              wx.setStorage({
                key: 'rawData',
                data: 
                  JSON.parse(res.rawData)
                ,
              })
              wx.login({
                success(res) {
                  const {
                    code
                  } = res
                  myreq({
                    url: 'users/wxlogin',
                    method: 'POST',
                    data: {
                      rawData,
                      signature,
                      iv,
                      encryptedData,
                      code
                    }
                  }).then(res => {
                    if (res === null) {
                      wx.showToast({
                        title: '获取token失败，请重新获取',
                        icon: "none",
                        duration: 1000
                      })
                    } else {
                      that.globalData.token=res.token
                      wx.setStorage({
                        key: 'token',
                        data: res.token
                      })
                    }
                  })
                },
                fail(err) {
                  console.log(err)
                  wx.showToast({
                    title: '网络故障，请重试',
                    icon: 'none',
                    duration: 1000
                  })
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  onShow() {
    wx.getStorage({
      key: 'cart',
      success(res) {
        let text = res.data.length
        wx.setTabBarBadge({
          index: 2,
          text: text.toString()
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    token:''
  }
})