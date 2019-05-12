const app = getApp()
console.log(app.globalData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName:''
  },
  gotoUserInfoPage: function() {
    console.log(this.data.hasUserInfo);
    let userList = [];
    var that = this;
    wx.request({
      url: 'http://localhost:5300/student',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        userList = res.data;
        var hasRegister = false;
        for (var i = 0; i < userList.length; i++) {
          if (userList[i].weixinname == that.data.nickName) {
            hasRegister = true;
            wx.setStorageSync('userID', userList[i].id );
            break;
          }
        }
        if (that.data.hasUserInfo) {
          if (hasRegister) {
            wx.switchTab({
              url: '/pages/course/course'
            })
          } else {
            wx.setStorageSync('username', that.data.nickName)
            wx.navigateTo({
              url: '/pages/register/Register',
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请先微信授权',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                hasUserInfo: true,
                nickName:res.userInfo.nickName
              })
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    this.setData({
      hasUserInfo: true
    })
    wx.showModal({
      title: '提示',
      content: '已授权',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})