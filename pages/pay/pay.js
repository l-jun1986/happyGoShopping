// pages/pay/pay.js
import {
  myreq
} from "../../utils/request.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    goodsData: [],
    newCart: [],
    goods: [],
    total: 0,
    num: 0,
    address: {},
    userInfo: {},
    token: ''
  },

  onLoad: function(options) {
    let that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({token: res.data})
      },
    })
    wx.getStorage({
      key: 'cart',
      success(res) {
        let temp = res.data.filter(e => {
          return e.chosen === true
        })
        that.setData({
          goodsData: temp
        })
        let temp2 = res.data.filter(e => {
          return e.chosen === false
        })
        that.setData({
          newCart: temp2
        })
        that.getTotal()
        that.getNum()
        let goods = []
        that.data.goodsData.map(e => {
          const {
            chosen,
            name,
            pic,
            ...good
          } = e
          goods.push(good)
        })
        that.setData({
          goods: goods
        })
        console.log(that.data.goods)
      }
    })
    wx.getStorage({
      key: 'address',
      success(res) {
        that.setData({
          address: res.data
        })
        console.log(that.data.address)
      }
    })
  },

  // 求总价
  getTotal() {
    let temp = 0
    this.data.goodsData.map(e => {
      temp += e.goods_price * e.goods_number
    })
    this.setData({
      total: temp
    })
  },

  // 求件数
  getNum() {
    let temp = 0
    this.data.goodsData.map(e => {
      temp += e.goods_number
    })
    this.setData({
      num: temp
    })
  },

  // 获取用户信息
  getUserInfo(e) {
    let that = this
    const {
      rawData,
      signature,
      iv,
      encryptedData
    } = e.detail
    wx.setStorageSync({
      key: 'rawData',
      data: {
        rawData
      },
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
            that.setData({
              'token': res.token
            })
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

  },
  // 支付流程
  async createBill() {
    let that = this
    // 创建订单,获取order_number
    let temp = {}
    temp.order_price = this.data.total
    temp.consignee_addr = this.data.address.address
    temp.goods = this.data.goods
    console.log(temp)
    const {
      order_number
    } = await myreq({
      url: 'my/orders/create',
      method: 'POST',
      data: temp
    });
    console.log(order_number)
    // 获取预支付参数
    const {
      pay
    } = await myreq({
      url: 'my/orders/req_unifiedorder',
      method: 'POST',
      data: {
        order_number
      }
    })
    // 发起微信支付
    await wx.requestPayment({ ...pay,
      success: res => {
        wx.setStorage({
          key: 'cart',
          data: that.data.newCart,
        })
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
        // 支付成功跳转订单详情页
        wx.showToast({
          title: '支付成功',
          duration: 1000
        })
        that.toOrder()
      },
      fail: res => {
        // 支付失败提示并停留当前页面
        wx.showToast({
          title: '支付失败，请重新支付',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  // 跳转回详情
  toDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?goods_id=${event.currentTarget.dataset.goods_id}`
    })
  },


  // 跳转订单列表
  toOrder() {
    wx.navigateTo({
      url: '/pages/order/order'
    })
  }
})