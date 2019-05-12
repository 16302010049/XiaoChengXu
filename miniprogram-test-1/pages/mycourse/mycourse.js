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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lessonIds = [];
    var that = this;
    let uid = wx.getStorageSync('userID');
    wx.request({
      url: 'http://localhost:5300/student/'+uid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        lessonIds = res.data.take_course
        var lessons = [];
        wx.request({
          url: 'http://localhost:5300/courses',
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            lessons = res.data;
            for(var i=0;i<lessons.length;i++){
              if(lessonIds.indexOf(lessons[i].id)>=0){
                that.data.myLesson.push(lessons[i]);
              }
            }
            that.setData({
              myLesson:that.data.myLesson
            })
          }
        })
      }
    })
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