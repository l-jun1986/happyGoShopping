// pages/order/order.js
import {
  myreq
} from '../../utils/request.js'
Page({
  data: {
    type: 1,
    tab: ['全部', '待付款', '待发货', '退款/退货'],
    orders: [],
    currentorders: []
  },
  onLoad() {
    this.getOrders(1)
  },
  // 根据type请求相应数据
  getOrders(e) {
    myreq({
      url: 'my/orders/all',
      type: e
    }).then(res => {
      let temp = res.orders || []

      function getDateDetail(second) {
        var date = new Date(second * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000,转换成毫秒
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      }
      temp.map(e => {
        e.create_time = getDateDetail(e.create_time)
      })
      console.log(temp)
      this.setData({
        orders: temp
      })
    })
  },
  // tab栏切换
  change(event) {
    this.setData({
      type: event.currentTarget.dataset.num
    })
    this.getOrders(this.data.type)
  },
})