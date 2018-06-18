// pages/games/info.js
Page({
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options){
        var userInfo=wx.getStorageSync('userInfo');
        this.setData({
            gamesID: options.gamesID,
            venue: options.venue,
            startDate: options.startDate,
            userInfo:userInfo
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

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
})