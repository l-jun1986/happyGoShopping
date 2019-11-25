import {
  myreq
} from "../../utils/request.js"
Page({
  data: {
    goods: [],
    total: 0,
    num: 0,
    checkAll: true,
    address: {}
  },

  onShow: function() {
    let that = this
    wx.getStorage({
      key: 'cart',
      success: function(res) {
        let text = res.data.length
        wx.setTabBarBadge({
          index: 2,
          text: text.toString()
        })
        that.setData({
          goods: res.data
        })
        let temp = []
        temp = that.data.goods
        temp.map(e => {
          e.chosen = true
        })
        wx.setStorage({
          key: 'cart',
          data: temp,
          success() {
            that.getData()
          }
        })
        that.setData({
          checkAll: true
        })
      }
    })
  },

  // 刷新数据渲染
  getData() {
    let that = this
    wx.getStorage({
      key: 'cart',
      success(res) {
        let text = res.data.length
        wx.setTabBarBadge({
          index: 2,
          text: text.toString()
        })
        that.setData({
          goods: res.data
        })
        that.getTotal()
        that.getNum()
      }
    })
  },
  // 求总价
  getTotal() {
    let temp = 0
    this.data.goods.map(e => {
      if (e.chosen) {
        temp += e.goods_price * e.goods_number
      }
    })
    this.setData({
      total: temp
    })
  },

  // 求件数
  getNum() {
    let temp = 0
    this.data.goods.map(e => {
      if (e.chosen) {
        temp += e.goods_number
      }
    })
    this.setData({
      num: temp
    })
  },

  // 增加
  increase(event) {
    let index = event.currentTarget.dataset.idx
    let temp = this.data.goods,
      temp1 = temp[index]
    temp1.goods_number = temp1.goods_number + 1
    temp.splice(index, 1, temp1)
    wx.setStorage({
      key: 'cart',
      data: temp
    })
    this.getData()
  },

  // 减少
  reduce(event) {
    let index = event.currentTarget.dataset.idx
    let temp = this.data.goods,
      temp1 = temp[index]
    if (temp1.goods_number > 1) {
      temp1.goods_number = temp1.goods_number - 1
      temp.splice(index, 1, temp1)
      wx.setStorage({
        key: 'cart',
        data: temp
      })
      this.getData()
    } else {
      wx.showToast({
        title: '不能少于1',
        icon: 'none',
        duration: 600
      })
    }
  },

  // 删除本条购物车
  del(event) {
    let that = this
    wx.showModal({
      title: '',
      content: '确认删除本件商品？',
      success(res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'cart',
            success(res) {
              let temp = res.data
              temp.splice(event.currentTarget.dataset.idx, 1)
              wx.setStorage({
                key: 'cart',
                data: temp,
              })
              that.getData()
            },
          })
        }
      }
    })

  },

  // 选中本条购物车
  add(event) {
    let that = this
    let index = event.currentTarget.dataset.idx
    let temp = this.data.goods
    temp[index].chosen = !temp[index].chosen
    wx.setStorage({
      key: 'cart',
      data: temp
    })
    this.getData()
    let choose = []
    choose = this.data.goods.filter(e => {
      return e.chosen === true
    })
    if (choose.length === this.data.goods.length) {
      this.setData({
        checkAll: true
      })
    } else {
      this.setData({
        checkAll: false
      })
    }
  },

  // 点击全选按钮
  checkAll() {
    this.setData({
      checkAll: !this.data.checkAll
    })
    let that = this
    if (this.data.checkAll) {
      let temp = this.data.goods
      temp.map(e => {
        e.chosen = true
      })
      wx.setStorage({
        key: 'cart',
        data: temp,
        success() {
          that.getData()
        }
      })
    } else {
      let temp = this.data.goods
      temp.map(e => {
        e.chosen = false
      })
      wx.setStorage({
        key: 'cart',
        data: temp,
        success() {
          that.getData()
        }
      })
    }
  },

  // 跳转支付
  toPay() {
    if (!this.data.address.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 1000
      })
    } else if (!this.data.num) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '/pages/pay/pay'
      })
    }
  },

  // 选择地址
  chooseUserAddress() {
    let that = this
    wx.chooseAddress({
      success(res) {
        that.setData({
          address: {
            user: res.userName,
            tel: res.telNumber,
            address: `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
        })
        wx.setStorage({
          key: 'address',
          data: that.data.address
        })
        console.log(that.data.address)
      }
    })
  },

  // 添加收货地址
  address() {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.address'] === false) {
          wx.openSetting({
            success() {
              that.chooseUserAddress()
            }
          })
        } else {
          that.chooseUserAddress()
        }
      }
    })

  },

  // 跳转回详情
  toDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?goods_id=${event.currentTarget.dataset.goods_id}`
    })
  }
})