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
    var userInfo = wx.getStorageSync('userInfo');

    wx.setNavigationBarTitle({
      title: "查看报名项目 / " + wx.getStorageSync("gamesName")
    })

    wx.request({
      url: app.data.API_HOST + 'getGamesEnrollItem.php',
      method: "POST",
      data: {
        athId: userInfo.AthID,
        gamesId: options.gamesId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data.data);
        _this.setData({
          gamesName: wx.getStorageSync("gamesName"),
          gamesId: options.gamesId,
          itemList: res.data.data
        })
      }
    });
  },

  goBack: function() {
    var _this = this;
    wx.redirectTo({
      url: "/pages/games/info?gamesId=" + _this.data.gamesId
    });
  }
})