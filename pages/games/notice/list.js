// pages/games/notice/list.js
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.showLoading({
            title: '数据加载中',
            mask: 'true',
            success: function (a) {
                wx.request({
                    url: app.data.API_HOST + 'getGamesNotice.php',
                    data: {
                        GamesID: options.gamesID
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        _this.setData({
                            noticeList: res.data.data
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

    },

    goBack: function () {
        wx.navigateBack({})
    }
})