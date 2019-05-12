// pages/dialog/dialog.js
// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '我是老师，欢迎来到课堂，请点击下面按钮开始学习'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我是学生哦'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

Page({


  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    hasListAll: false,
    hasDoAll: false,
    lesson: Object,
    ChaIndex: 0,
    SecIndex: 0,
    QAIndex: 0,
    SingleIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
    var that = this;
    wx.getStorage({
      key: 'lesson',
      success: function(res) {
        console.log(res)
        that.setData({
          lesson: res.data
        });
        wx.getStorage({
          key: 'ChaIndex',
          success: function(res) {
            console.log(res)
            that.setData({
              ChaIndex: res.data
            });
            wx.getStorage({
              key: 'SecIndex',
              success: function(res) {
                console.log(res)
                that.setData({
                  SecIndex: res.data,
                  QAIndex: 0
                });
              }
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

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  addContent(e) {
    if (this.data.QAIndex < this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].QA.length) {
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].QA[this.data.QAIndex].question,
        canShou:true
      })
      msgList.push({
        speaker: 'costomer',
        contentType: 'text',
        content: this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].QA[this.data.QAIndex].answer
      })
      this.data.QAIndex++;
      this.setData({
        msgList,
        QAIndex: this.data.QAIndex
      });
    } else {
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: '你已学完所有内容，下面进入作业阶段'
      })
      this.setData({
        msgList,
        hasListAll: true
      });
      this.makeSingle();
    }
  },

  makeSingle() {
    if (this.data.SingleIndex < this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice.length) {
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice[this.data.SingleIndex].question
      })
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: 'A.' + this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice[this.data.SingleIndex].choiceA
      })
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: 'B.' + this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice[this.data.SingleIndex].choiceB
      })
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: 'C.' + this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice[this.data.SingleIndex].choiceC
      })
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: 'D.' + this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice[this.data.SingleIndex].choiceD
      })
      this.setData({
        msgList
      });
    } else {
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        content: '你已做完所有作业，请自由表达'
      })
      this.setData({
        msgList,
        hasListAll: true
      });
    }
  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
    if (!this.data.hasDoAll) {
      let uid = wx.getStorageSync('userID');
      var choice = ['A', 'B', 'C', 'D'];
      if (choice.indexOf(e.detail.value) >= 0) {
        var record = {
          id:this.uuid(),
          student_id: uid,
          course_id: this.data.lesson.id,
          chapter: this.data.lesson.chapters[this.data.ChaIndex].chapter_name,
          section: this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].sectionname,
          question: this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice[this.data.SingleIndex].question,
          choice: e.detail.value
        }
        wx.request({
          url: 'http://localhost:5300/answer_record',
          method: 'Post',
          data: record,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {}
        })
        this.data.SingleIndex++;
        if (this.data.SingleIndex < this.data.lesson.chapters[this.data.ChaIndex].section[this.data.SecIndex].singleChoice.length) {
          this.makeSingle()
        } else {
          msgList.push({
            speaker: 'server',
            contentType: 'text',
            content: '你已做完所有作业，请自由表达'
          })
          this.setData({
            msgList,
            hasDoAll: true
          });
        }
        this.setData({
          SingleIndex: this.data.SingleIndex,
          hasDoAll: this.data.hasDoAll
        })
      } else {
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          content: '请输入选项ABCD序号'
        })
        this.setData({
          msgList
        });
      }
    }
  },

  addShou(e){
    let id = e.currentTarget.dataset['index'];
    let uid = wx.getStorageSync('userID');
    var stu;
    wx.request({
      url: 'http://localhost:5300/student/' + uid,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        stu = res.data;
        var qa = {
          question:msgList[id].content,
          answer: msgList[id+1].content,
          note:""
        }
        stu.collect.push(qa);
        wx.request({
          url: 'http://localhost:5300/student/' + uid,
          method:'Put',
          data:stu,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            wx.showModal({
              content: '收藏成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
          }
        })
      }
    })
  },

  uuid: function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})