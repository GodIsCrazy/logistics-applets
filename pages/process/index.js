//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    processList: [
      {
        state: 'pass',
        title: '湖北',
        date: '2019-10-23',
        items: [
          {
            state: 'pass',
            title: '武汉',
            admin: '朱金虎',
            date: '2019-10-23',
          },
          {
            state: 'reject',
            title: '武昌',
            admin: '朱金虎',
            date: '2019-10-23',
          }
        ]
      }, {
        state: 'reject',
        title: '江西',
        date: '2019-10-23',
        items: []
      }, {
        state: 'pass',
        title: '深圳',
        date: '2019-10-23',
        items: []
      },
      {
        state: 'pass',
        title: '海南',
        date: '2019-10-23',
        items: [
          {
            state: 'pass',
            title: '报单',
            admin: '炊事员',
            date: '2019-10-23',
          },
          {
            state: 'reject',
            title: '报单',
            admin: '煮多点',
            date: '2019-10-23',
          }
        ]
      },
      {
        state: 'pass',
        title: '香港',
        date: '2019-10-23',
        items: []
      }, {
        state: 'pass',
        title: '台湾',
        date: '2019-10-23',
        items: []
      },
      {
        state: 'pass',
        title: '法国',
        date: '2019-10-23',
        items: []
      },
      {
        state: 'pass',
        title: '美国',
        date: '2019-10-23',
        items: []
      }
    ]
  },
  swapStatus: function (e){
    let opt = e.currentTarget.dataset.opts[0]
    let key = `${opt[0]}[${opt[1]}].status`
    let value = this.data[opt[0]][opt[1]]['status']
    this.setData({
      [key]: !value
    })
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    
  }
})
