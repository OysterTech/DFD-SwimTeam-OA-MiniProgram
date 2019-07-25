var app = getApp();
// 在页面中定义插屏广告
var interstitialAd = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactTypeList: ['QQ', '邮箱'],
    contactType: 1
  },

	onLoad: function (options) {
		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-f25915ecf4536bff'
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
	
	submit: function(e) {
    var realName = e.detail.value.realName;
    var content = e.detail.value.content;
    var contactType = this.data.contactType;
    var contactNum = e.detail.value.contactNum;

    if (realName == "") {
      wx.showModal({
        title: '提示',
        content: '请输入运动员姓名！',
        showCancel: false
      });
      return false;
    }
    if (content == "") {
      wx.showModal({
        title: '提示',
        content: '请输入内容！',
        showCancel: false
      });
      return false;
    }
    if (contactType < 1 || contactType > 3) {
      wx.showModal({
        title: '提示',
        content: '请选择联系方式！',
        showCancel: false
      });
      return false;
    }
    if (contactNum == "") {
      wx.showModal({
        title: '提示',
        content: '请输入联系号码！',
        showCancel: false
      });
      return false;
    }

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '提交中',
      mask: 'true',
      success: function(a) {
        wx.request({
          url: app.data.API_HOST + 'toContact.php',
          method: "POST",
          data: {
            realName: realName,
            content: content,
            contactType: contactType,
            contactNum: contactNum,
            openId: wx.getStorageSync("openID")
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res.data);
            wx.hideLoading();
            wx.hideNavigationBarLoading();

            // 服务器无法正常响应
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '提交失败！',
                showCancel: false,
                success: function(res) {}
              });
              return false;
            }

            var data = res.data;
            if (data.code == 1) {
              wx.showModal({
                title: '提示',
                content: '提交成功！管理员将会在1-3日内回复您，感谢支持与配合！',
                showCancel: false,
                success: function() {
                  wx.navigateBack({})
                }
              });
              return false;
            } else {
              wx.showModal({
                title: '提示',
                content: '提交失败！错误码：CTU' + data.code,
                showCancel: false
              });
              return false;
            }
          }
        });
      }
    });
  },

  contactTypeChange: function(e) {
    this.setData({
      contactType: parseInt(e.detail.value) + 1
    })
  }
})