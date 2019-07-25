// 在页面中定义插屏广告
var interstitialAd = null;

Page({
	onLoad: function (options) {
		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-dcc44e90accfd370'
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
  showZan: function() {
    wx.previewImage({
      urls: ["https://api.xshgzs.com/dfd/images/supportMe.jpg"]
    })
  }
})