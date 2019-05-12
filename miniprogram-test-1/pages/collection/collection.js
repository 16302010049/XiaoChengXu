// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: Object,
    note: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let uid = wx.getStorageSync('userID');
    var that = this;
    wx.request({
      url: 'http://localhost:5300/student/' + uid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        that.setData({
          student: res.data,
          note: ''
        })
      }
    })
  },

  noteInput: function(e) {
    this.setData({
      note: e.detail.value
    })
  },

  save(e) {
    let uid = wx.getStorageSync('userID');
    let id = e.currentTarget.dataset['ix'];
    this.data.student.collect[id].note = this.data.note;
    var that = this;
    wx.request({
      url: 'http://localhost:5300/student/' + uid,
      method: 'Put',
      data: that.data.student,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          student: that.data.student
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
    let uid = wx.getStorageSync('userID');
    let id = e.currentTarget.dataset['ix'];
    this.data.student.collect.splice(id, 1);
    var that = this;
    wx.request({
      url: 'http://localhost:5300/student/' + uid,
      method: 'Put',
      data: that.data.student,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          student: that.data.student,
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