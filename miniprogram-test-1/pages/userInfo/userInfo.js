// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex: [{
        name: '0',
        value: '男',
        checked: 'false'
      },
      {
        name: '1',
        value: '女',
        checked: 'false'
      }
    ],
    isSex: "0",
    information: [],
    userSex: '',
    modalHidden: true,
    userInfo: Object
  },
  //单选按钮发生变化
  radioChange(e) {
    console.log(e.detail.value);
    var sexName = this.data.isSex
    this.setData({
      isSex: e.detail.value
    })
  },

  //表单提交
  formSubmit(e) {
    console.log(e);
    var userSex = this.data.isSex == 0 ? '男' : '女';
    var information = e.detail.value;
    if (information.name != "" && information.phone != "" && information.idNumber != "") {
      this.setData({
        information: e.detail.value,
        userSex,
        modalHidden: false
      });
    } else {
      wx.showModal({
        content: '有信息尚未填写',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },

  //模态框取消
  modalCancel() {
    wx.showToast({
      title: '取消提交',
      icon: 'none'
    })
    this.setData({
      modalHidden: true,
    })
  },
  //模态框确定
  modalConfirm() {
    let nickname = wx.getStorageSync('username');
    var that = this;
    that.data.userInfo.id=wx.getStorageSync('uid');
    that.data.userInfo.signa="1";
    that.data.userInfo.mailbox = this.data.information.phone;
    that.data.userInfo.sex = this.data.userSex;
    that.data.userInfo.name = this.data.information.name;
    that.data.userInfo.studentnumber = this.data.information.idNumber
    console.log(that.data.userInfo.studentnumber)
    wx.request({
      url: 'http://localhost:8080/updatestuinfo' ,
      method: 'Put',
      data: that.data.userInfo,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        that.setData({
          modalHidden: true,
          userInfo: that.data.userInfo
        })
      }
    })

  },
  onLoad: function(options) {
    let uid = wx.getStorageSync('userID');
    var that = this;
    wx.request({
      url: 'http://localhost:8080/student?signature=' + wx.getStorageSync('openid'),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          userInfo: res.data,
          userSex: res.data.sex,
        })
        if (res.data.sex == '男') {
          that.setData({
            sex: [{
                name: '0',
                value: '男',
                checked: 'false'
              },
              {
                name: '1',
                value: '女',
              }
            ],
          })
        } else {
          that.setData({
            sex: [{
                name: '0',
                value: '男',
                checked: 'false'
              },
              {
                name: '1',
                value: '女',
              }
            ],
          })
        }
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
})