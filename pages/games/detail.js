// pages/games/detail.js
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
    var startDate = wx.getStorageSync("gamesStartDate");

    if (startDate == "null") {
      var startDate = "待定";
    } else if (startDate.indexOf("-") == -1) {
      var startYear = startDate.substr(0, 4);
      var startMonth = startDate.substr(4, 2);
      var startDay = startDate.substr(6, 2);
      var startDate = startYear + "-" + startMonth + "-" + startDay;
    } else {
      var startDate = "待定";
    }

    this.setData({
      venue: wx.getStorageSync("gamesVenue"),
      startDate: startDate,
      gamesName: wx.getStorageSync("gamesName")
    })

    let interstitialAd = null

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-f5e74d4d400046ba'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  goBack: function() {
    wx.navigateBack({})
  }
})