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
        this.setData({
            venue: wx.getStorageSync("gamesVenue"),
            startDate: wx.getStorageSync("gamesStartDate"),
            gamesName: wx.getStorageSync("gamesName")
        })
    },

    goBack: function() {
        wx.navigateBack({})
    }
})