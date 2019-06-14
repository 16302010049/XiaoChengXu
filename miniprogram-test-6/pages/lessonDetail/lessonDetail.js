// pages/lessonDetail/lessonDetail.js
Page({
  data: {
    selectedFlag: [],
    lesson: Object,
    list: [],
    studySection: []
  },
  // 展开折叠选择  
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },

  onLoad: function(options) {
   
  },

  openLesson(e) {
    let ChaIndex = e.currentTarget.dataset['chaindex'];
    let SecIndex = e.currentTarget.dataset['secindex'];
    let hasStudied = e.currentTarget.dataset['hasstudied'];
    wx.setStorageSync('has', hasStudied);
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

  onShow: function () {
    this.data.list = [];
    this.data.selectedFlag = [];
    var that = this;
    this.data.lesson = wx.getStorageSync('lesson');
    this.setData({
      lesson: this.data.lesson
    })
    var requ = {
      course_id: this.data.lesson.id,
      student_id: wx.getStorageSync('uid')
    }
    wx.request({
      url: 'http://52.91.208.255:8080/course/getStudySection',
      method: 'Post',
      data: requ,
      headers: {
        'Content-Type': 'json'
      },
      success: function (res) {
        that.data.studySection = res.data;
        console.log(that.data.studySection);
        for (var i = 0; i < that.data.lesson.chapters.length; i++) {
          let temp = {
            id: i,
            name: 'Charpter' + (i + 1) + ' ' + that.data.lesson.chapters[i].chapter_name,
            open: false,
            options: []
          }
          for (var j = 0; j < that.data.lesson.chapters[i].section.length; j++) {
            let has = 0;
            for (var p = 0; p < that.data.studySection.length; p++) {
              console.log(that.data.studySection[p].sectionname);
              if (that.data.studySection[p].sectionname == that.data.lesson.chapters[i].section[j].sectionname) {
                has = 1;
                break;
              }
            }
            let IdO = {
              name: 'Section' + (j + 1) + ' ' + that.data.lesson.chapters[i].section[j].sectionname,
              cid: j,
              hasStudy: has
            }
            console.log(IdO.hasStudy);
            temp.options.push(IdO)
          }
          that.data.selectedFlag.push(false);
          that.data.list.push(temp);
        }
        that.setData({
          list: that.data.list
        });
      }
    });
  },

})