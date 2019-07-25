// 在页面中定义插屏广告
var interstitialAd = null;

Page({
  onLoad: function(options) {
		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-41bc0684384985d9'
			})
			interstitialAd.onLoad(() => {
				console.log('onLoad event emit')
			})
			interstitialAd.onError((err) => {
				console.log('onError event emit', err)
			})

			// 在适合的场景显示插屏广告
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
		}
  },

	
	/**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
		return {
			title: '东风东游泳队小程序-计算运动员等级',
			path: '/pages/games/index'
		}
  },

  nodev: function() {
    wx.showModal({
      title: '提示',
      content: '此功能暂未开放！敬请期待！',
      showCancel: false
    })
  },

	goto:function(){
		wx.navigateTo({
			url: '/tool-calculateAthleteLevel/pages/index',
		})
	}
})