// pages/games/info.js
var app = getApp();

Page({
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        var userInfo = wx.getStorageSync('userInfo');
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

        wx.setNavigationBarTitle({
            title: options.gamesName
        })

        wx.showLoading({
            title: '赛事数据加载中',
            mask: 'true',
            success: function (a) {
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
                    success: function (res) {
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
                    }
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
})