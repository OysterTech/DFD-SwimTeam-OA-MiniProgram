// pages/enroll/chooseItem.js
var app=getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this;
        wx.request({
            url: app.data.API_HOST + 'getGamesItem.php',
            header: {
                'content-type': 'application/json'
            },
            data: {
                GamesID:options.gamesID
            },
            success: function (res) {
                console.log(res.data);
                _this.setData({
                    itemList:res.data.data
                })
            }
        })
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

    checkboxChange: function (e) {
        console.log(e.detail.value)
    }
})