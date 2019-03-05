// pages/user/logout.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.request({
      url: app.data.API_HOST + 'userLogout.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: wx.getStorageSync('openID')
      },
      success: function(res) {
        wx.clearStorageSync();
        wx.redirectTo({
          url: "/pages/user/login"
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

  }
})