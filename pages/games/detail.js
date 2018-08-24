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
        var startDate = wx.getStorageSync("gamesStartDate");

        if (startDate.indexOf("-") == -1) {
            var startYear = startDate.substr(0, 4);
            var startMonth = startDate.substr(4, 2);
            var startDay = startDate.substr(6, 2);
            var startDate = startYear + "-" + startMonth + "-" + startDay;
        } else if (startDate == "null") {
            startDate = "待定";
        }

        this.setData({
            venue: wx.getStorageSync("gamesVenue"),
            startDate: startDate,
            gamesName: wx.getStorageSync("gamesName")
        })
    },

    goBack: function() {
        wx.navigateBack({})
    }
})