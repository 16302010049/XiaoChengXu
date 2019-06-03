// pages/mycourse/mycourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLesson:[]
  },

  openDetail(e){
    let les = e.currentTarget.dataset['les'];
    wx.setStorage({
      key: 'lesson',
      data: les
    })
    wx.navigateTo({
      url: '/pages/lessonDetail/lessonDetail',
    })
  },

  delCourse(e){
    let uid = wx.getStorageSync('uid');
    let les = e.currentTarget.dataset['les'];
    let inx = e.currentTarget.dataset['inx'];
    console.log(inx);
    var req = {
      course_id :les.id,
      student_id : uid
    }
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/deleteCourse',
      method:'Post',
      data:req,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.data.myLesson.splice(inx,1);
        that.setData({
          myLesson: that.data.myLesson
        })
        wx.showModal({
          content: '删除成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var lessonIds = [];
    var that = this;
    let uid = wx.getStorageSync('uid');
    wx.request({
      url: 'http://localhost:8080/course/getmycourse?stuid=' + uid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          myLesson: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})