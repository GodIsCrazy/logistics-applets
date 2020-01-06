class Request {
  constructor(params){
    this.baseUrl = params.baseUrl
    this.withBaseUrl = params.withBaseUrl
    this.requestTask = null
  }
  get(url,data) {
    return this.request('GET',url,data)
  }
  put(url,data) {
    return this.request('PUT', url, data)
  }
  post(url,data){
    return this.request('POST', url, data)
  }

  request(method,url,data){
    const _this = this
    return new Promise((resolve,reject) => {
      // 这里怎么优化，这样request会被覆盖吧???
      _this.requestTask = wx.request({
        url: _this.withBaseUrl?_this.baseUrl+url:url,
        data,
        header: {
          'auth-token': wx.getStorageSync('token')
        },
        method,
        // method: 'GET',
        // dataType: 'json',
        // responseType: 'text',
        success: function(res) {
          if (res.data.status === 'C00001'){
            resolve(res.data.result)
          } else if (res.data.status === 'C00007'){ // token失效，退出登录
            if(wx.getStorageSync('token')){
              wx.removeStorageSync('token')
            }
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }else{
            reject(res.data)
          }
        },
        fail: function(res) {
          reject(res.data)
        },
        complete: function(res) {},
      })
    })
  }

  abort(){
    if(this.requestTask){
      this.requestTask.abort()
    }
  }
}

const request = new Request({
  baseUrl: 'http://localhost:3000',
  withBaseUrl: true
})

module.exports = request