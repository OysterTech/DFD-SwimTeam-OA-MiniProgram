// pages/user/updateAthleteInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolGradeList: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
    schoolClassList: ['（1）班', '（2）班', '（3）班', '（4）班', '（5）班', '（6）班', '（7）班', '（8）班', '（9）班', '（10）班', '（11）班', '（12）班', '（13）班'],
    idCardTypeList: ['大陆二代身份证', '香港居民身份证', '护照'],
    sexList: ['男', '女']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var startYear = year - 14;
    var YearGroupList = [];
    for (var i = startYear; i < year; i++) {
      YearGroupList.push(i);
    }

    this.setData({
      'schoolGrade': 1,
      'schoolClass': 1,
      'IDCardType': 1,
      'sex': 1,
      'YearGroup': i - 1,
      'YearGroupList': YearGroupList
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  gradeChange: function(e) {
    this.setData({
      schoolGrade: parseInt(e.detail.value) + 1
    })
  },
  classChange: function(e) {
    this.setData({
      schoolClass: parseInt(e.detail.value) + 1
    })
  },
  sexChange: function(e) {
    this.setData({
      sex: parseInt(e.detail.value) + 1
    })
  },
  typeChange: function(e) {
    this.setData({
      IDCardType: parseInt(e.detail.value) + 1
    })
  },
  YearGroupChange: function(e) {
    this.setData({
      YearGroup: parseInt(e.detail.value)
    })
  },

  toReg: function(e) {
    var _this = this;
    var value = e.detail.value;
    var reg = /[\u4e00-\u9fa5]/g;

    // 检查用户名是否为空
    if (value.userName == "") {
      wx.showModal({
        title: '提示',
        content: '注册失败！请填写用户名！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    // 检查用户名是否含有汉字
    if (reg.test(value.userName)) {
      wx.showModal({
        title: '提示',
        content: '注册失败！用户名不得含有汉字！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    // 检查用户名是否含有空格
    if (value.userName.indexOf(" ") != -1) {
      wx.showModal({
        title: '提示',
        content: '注册失败！用户名不得含有空格！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    // 检查真名是否为空
    if (value.password == "") {
      wx.showModal({
        title: '提示',
        content: '注册失败！请填写登录密码！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    // 检查真名是否为空
    if (value.RealName == "") {
      wx.showModal({
        title: '提示',
        content: '注册失败！请填写真实姓名！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    // 检查手机号长度
    if (value.Phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '注册失败！请正确填写手机号码！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    value.Sex = _this.data.sexList[value.Sex];
    value.SchoolGrade = parseInt(value.SchoolGrade) + 1;
    value.SchoolClass = parseInt(value.SchoolClass) + 1;
    value.IDCardType = parseInt(value.IDCardType) + 1;
    value.YearGroup = this.data.YearGroupList[parseInt(value.YearGroup)];

    // 检查大陆身份证是否为18位
    if (value.IDCardType == 1 && value.IDCard.length != 18) {
      wx.showModal({
        title: '提示',
        content: '注册失败！大陆二代身份证号码长度有误！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    if (value.YearGroup == null || value.YearGroup == 0 || value.YearGroup == "") {
      wx.showModal({
        title: '提示',
        content: '注册失败！请选择出生年份！',
        showCancel: false,
        success: function(res) {}
      });
      return;
    }

    value = JSON.stringify(value);
    wx.showLoading({
      title: '注册中',
      mask: 'true',
      success: function(a) {
        // 请求注册
        wx.request({
          url: app.data.API_HOST + 'toReg.php',
          method: "POST",
          data: {
            profile: value
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res.data);

            // 服务器无法正常响应
            if (res.statusCode != 200) {
              wx.hideLoading();
              wx.hideNavigationBarLoading()
              wx.showModal({
                title: '提示',
                content: '注册失败！请联系管理员并提交错误码：REG9！',
                showCancel: false,
                success: function(res) {}
              });
              return false;
            }

            var data = res.data;
            if (data.code == 200) {
              wx.hideLoading();
              wx.hideNavigationBarLoading()
              wx.showModal({
                title: '提示',
                content: '注册成功！请登录！',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    wx.navigateBack({})
                  }
                }
              });
            } else {
              wx.hideLoading();
              wx.hideNavigationBarLoading()
              wx.showModal({
                title: '提示',
                content: '注册失败！请联系管理员并提交错误码：REG' + data.code + '！',
                showCancel: false,
                success: function(res) {}
              });
              return false;
            }
          }
        });
      }
    });
  }
})