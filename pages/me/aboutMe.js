// pages/aboutMe.js
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

    },

    showZan: function () {
        wx.previewImage({
            urls: ["https://api.xshgzs.com/dfd/images/supportMe.jpg"]
        })
    },
    showITR: function () {
        wx.previewImage({
            urls: ["https://api.xshgzs.com/dfd/images/ITRClubWxCode.jpg"]
        })
    }
})