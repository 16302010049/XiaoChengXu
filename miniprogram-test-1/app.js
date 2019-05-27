//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        this.getOpenid(code);
        
        console.log(wx.getStorageSync('openid'))
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
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
  getOpenid: function (code) {
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.appid + '&secret=' + that.globalData.secret + '&js_code=' + code + '&grant_type=authorization_code',
      data: {},
      method: 'GET',
      success: function (res) {
        var obj = {};
        obj.openid = res.data.openid;
        console.log(res.data.openid)
        obj.expires_in = Date.now() + res.data.expires_in;
        obj.session_key = res.data.session_key;
        wx.setStorageSync('openid', obj.openid);// 存储openid  
      }
    });
  },
  globalData: {
    appid:'wxdf51a63f0d9b6be6',
    secret:'0b6c9224b266402ef165a90f57bd69bf',
    userInfo: null
  },
  usersignature:''
})