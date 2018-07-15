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

        wx.request({
            url: app.data.API_HOST + 'getGamesEnrollItem.php',
            method: "POST",
            data: {
                athId: userInfo.AthID,
                gamesId: options.gamesID
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data.data);
                _this.setData({
                    gamesName: wx.getStorageSync("gamesName"),
                    itemList: res.data.data
                })
            }
        });
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    goBack: function() {
        wx.navigateBack({})
    }
})