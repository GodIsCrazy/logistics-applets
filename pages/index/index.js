//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    activeTab: '',
    userPwd: '',
    userName: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //账号聚焦
  accountFocus: function(e) {
    this.setData({
      activeTab: 'Account'
    })
  },
  accountBlur: function () {
    this.setData({
      activeTab: ''
    })
  },
  pswFocus: function(e) {
    this.setData({
      activeTab: 'Psw'
    })
  },
  pswBlur: function(e){
    this.setData({
      activeTab: ''
    })
  },
  getAccount: function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  getPsw: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  // 登录
  login: function(){
    console.log(this.data.userName)
    if (!this.data.userName){
      wx.showToast({
        title: '请填写用户名！',
        icon: 'none'
      })
      return
    }
    if (!this.data.userPwd) {
      wx.showToast({
        title: '请填写密码！',
        icon: 'none'
      })
      return
    }
    wx.$http.post('/logistics/login', {
      userPwd: this.data.userPwd,
      userName: this.data.userName
    }).then(res=>{
      wx.setStorageSync('token', res.token)
      wx.navigateTo({
        url: '/pages/process/index',
        })
    })
    // wx.request({
    //   url: 'http://localhost:3000/logistics/login',
    //   method: 'POST',
    //   data: {
    //     userPwd: this.data.userPwd ,
    //     userName: this.data.userName
    //   },
    //   success: function(){
    //     wx.navigateTo({
    //       url: '/pages/logs/logs',
    //     })
    //   },
    //   fail: function(e){
    //     wx.showToast({
    //       title: e.errMsg,
    //       icon: 'none'
    //     })
    //   }
    // })
    // wx.navigateTo({
    //   url: '/pages/logs/logs',
    // })
  },
  onShow: function () {
  },
  onLoad: function () {
    console.log(wx.getStorageSync('token'), '1')
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/process/index',
      })
    }
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
