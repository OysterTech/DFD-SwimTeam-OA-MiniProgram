// pages/games/notice/list.js
var app = getApp()
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: "",
    gamesId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.showLoading({
      title: '数据加载中',
      mask: 'true',
      success: function(a) {
        wx.request({
          url: app.data.API_HOST + 'getGamesNotice.php',
          data: {
            GamesID: options.gamesId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            _this.setData({
              noticeList: res.data.data,
              gamesId: options.gamesId
            });
            wx.hideLoading();
            utils.setReadNotice(options.gamesId);
          }
        });
      }
    });
  },

  goBack: function() {
    var _this = this;
   
    wx.navigateBack({
      fail:function(){
        wx.redirectTo({
          url: "/pages/games/info?gamesID=" + _this.data.gamesId
        });
      }
    })
  }
})