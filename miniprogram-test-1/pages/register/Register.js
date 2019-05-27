const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex: [
      { name: '0', value: '男', checked: 'true' },
      { name: '1', value: '女' }
    ],
    isSex: "0",
    information: [],
    userSex: '',
    modalHidden: true
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
    if(information.name!=""&&information.phone!=""&&information.idNumber!=""){
    this.setData({
      information: e.detail.value,
      userSex,
      modalHidden: false
    });
    }else{
      wx.showModal({
        content: '有信息尚未填写',
        showCancel: false,
        success: function (res) {
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
    var newStudent = {
      id:this.uuid(),
      signature:wx.getStorageSync('openid'),
      mailbox:this.data.information.phone,
      sex:this.data.userSex,
      name:this.data.information.name,
      studentnumber:this.data.information.idNumber
    }
    wx.request({
      url: 'http://localhost:8080/addstu',
      method: 'Post',
      data: newStudent,
      headers: {
        'Content-Type': 'json'
      },
      success: function (res) {
        wx.request({
          url: 'http://localhost:8080/student?signature=' + wx.getStorageSync('openid'),
          headers: {
        'Content-Type': 'json'
      },
      success:function(res){
        wx.setStorageSync('uid', res.data.id)
      }
        })
        wx.setStorageSync('userID', newStudent.id);
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        that.setData({
          modalHidden: true
        })
        wx.switchTab({
          url: '/pages/course/course'
        })
      }
    })
    
  },
  onLoad: function (options) {

  },

  uuid: function () {
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