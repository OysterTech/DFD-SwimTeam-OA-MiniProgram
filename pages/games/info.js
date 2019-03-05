// pages/games/info.js
var app = getApp();
var utils = require('../../utils/util.js');

Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');

    if (wx.getStorageSync('gamesVenue') != "") {
      this.setData({
        gamesID: options.gamesID,
        gamesName: wx.getStorageSync('gamesName'),
        venue: wx.getStorageSync('gamesVenue'),
        startDate: wx.getStorageSync('gamesStartDate'),
        userInfo: userInfo
      });
    } else {
      this.setData({
        gamesID: options.gamesID,
        gamesName: options.gamesName,
        venue: options.venue,
        startDate: options.startDate,
        userInfo: userInfo
      });
      wx.setStorageSync('gamesVenue', options.venue);
      wx.setStorageSync('gamesStartDate', options.startDate);
      wx.setStorageSync('gamesName', options.gamesName);
    }


    wx.setNavigationBarTitle({
      title: wx.getStorageSync('gamesName')
    })

    wx.showLoading({
      title: '赛事数据加载中',
      mask: 'true',
      success: function(a) {
        wx.request({
          url: app.data.API_HOST + 'getGamesEnrollItem.php',
          method: "POST",
          data: {
            athId: userInfo.AthID,
            gamesId: _this.data.gamesID
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res.data);

            if (res.data.data == "") {
              var haveEnroll = 0;
            } else {
              var haveEnroll = 1;
            }

            _this.setData({
              haveEnroll: haveEnroll
            });
            wx.hideLoading();

            if (utils.checkHaveReadNotice(options.gamesID) != true) {
              wx.showModal({
                title: "提示",
                content: "请先阅读规程，再进行报名哦~",
                showCancel: false
              });
            }
          }
        });
      }
    });
  }
})