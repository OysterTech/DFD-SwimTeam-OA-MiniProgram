// pages/games/notice/detail.js
var app = getApp()
let wxparse = require("../../../wxParse/wxParse.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dkheight: 300,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        let winPage = this;
        wx.getSystemInfo({
            success: function (res) {
                let winHeight = res.windowHeight;
                winPage.setData({
                    dkheight: winHeight - winHeight * 0.05 - 80
                })
            }
        });

        wx.showLoading({
            title: '数据加载中',
            mask: 'true',
            success: function (a) {
                wx.request({
                    url: app.data.API_HOST + 'getNoticeDetail.php',
                    data: {
                        NoticeID: options.noticeID
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        _this.setData({
                            info: res.data.data,
                            content: res.data.data.Content
                        });
                        wx.hideLoading();
                        wxparse.wxParse('content', 'html', _this.data.content, _this, 5);
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

    goBack: function () {
        wx.navigateBack({})
    }
})