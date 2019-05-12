// pages/lessonDetail/lessonDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: Object,
    list: []
  },

  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;

    // 使用id获取打开的子列表
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'lesson',
      success: function(res) {
        console.log(res)
        that.setData({
          lesson: res.data
        });
        for (var i = 0; i < that.data.lesson.chapters.length; i++) {
          let temp = {
            id: i,
            name: 'Charpter' + (i + 1) + ' ' + that.data.lesson.chapters[i].chapter_name,
            open: false,
            options: []
          }
          for (var j = 0; j < that.data.lesson.chapters[i].section.length; j++) {
            let IdO ={
              name: 'Section' + (j + 1) + ' ' + that.data.lesson.chapters[i].section[j].sectionname,
              cid : j
            }
            temp.options.push(IdO)
          }
          that.data.list.push(temp);
        }
        that.setData({
          list: that.data.list
        });
      }
    })
  },

  openLesson(e) {
    let ChaIndex = e.currentTarget.dataset['chaindex'];
    let SecIndex = e.currentTarget.dataset['secindex'];
    console.log(e.currentTarget.dataset);
    wx.setStorage({
      key: 'ChaIndex',
      data: ChaIndex,
      success: function(res) {
        wx.setStorage({
          key: 'SecIndex',
          data: SecIndex,
          success: function(res) {
            wx.navigateTo({
              url: '/pages/dialog/dialog',
            })
          }
        })
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