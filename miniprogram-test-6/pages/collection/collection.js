// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    note: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  noteInput: function(e) {
    this.setData({
      note: e.detail.value
    })
  },

  save(e) {
    let uid = wx.getStorageSync('uid');
    let id = e.currentTarget.dataset['ix'];
    this.data.collect[id].note = this.data.note;
    var that = this;
    wx.request({
      url: 'http://52.91.208.255:8080/course/updatecollect',
      method: 'Put',
      data: that.data.collect[id],
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          collect: that.data.collect
        })
        wx.showModal({
          content: '修改成功',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    })
  },

  remove(e) {
   // let uid = wx.getStorageSync('userID');
    let id = e.currentTarget.dataset['ix'];
   
    var that = this;
    wx.request({
      url: 'http://52.91.208.255:8080/course/deletecollect?id='+that.data.collect[id].id,
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.data.collect.splice(id, 1);
        that.setData({
          collect: that.data.collect
        })
        wx.showModal({
          content: '删除成功',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
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
    let uid = wx.getStorageSync('uid');
    var that = this;
    wx.request({
      url: 'http://52.91.208.255:8080/course/getcollect?stu_id=' + uid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          collect: res.data,
          note: ''
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

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