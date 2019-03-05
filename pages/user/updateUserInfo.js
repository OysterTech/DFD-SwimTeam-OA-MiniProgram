// pages/user/updateUserInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  formSubmit: function(e) {
    var _this = this;
    var value = e.detail.value;

    if (value.oldPassword == "" || value.newPassword == "" || value.verifyPassword == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码！',
        showCancel: false,
        success: function(res) {}
      });
      return false;
    }
    if (value.newPassword != value.verifyPassword) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不相同！请重新输入！',
        showCancel: false,
        success: function(res) {}
      });
      return false;
    }

    value = JSON.stringify(value);

    wx.showLoading({
      title: '修改中',
      mask: 'true',
      success: function(a) {
        // 发送修改请求
        wx.request({
          url: app.data.API_HOST + 'updateProfile.php',
          method: "POST",
          data: {
            openId: wx.getStorageSync("openID"),
            profileType: "password",
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
                content: '修改失败！请联系管理员并提交错误码：UPU9！',
                showCancel: false,
                success: function(res) {}
              });
              return false;
            }

            var data = res.data;
            if (data.code == 1) {
              wx.hideLoading();
              wx.hideNavigationBarLoading() //////
              wx.showModal({
                title: '提示',
                content: '修改成功，请重新登录！',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/user/logout',
                    });
                  }
                }
              });
            } else if (data.code == 0) {
              wx.hideLoading();
              wx.hideNavigationBarLoading()
              wx.showModal({
                title: '提示',
                content: '修改失败！请联系管理员！',
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