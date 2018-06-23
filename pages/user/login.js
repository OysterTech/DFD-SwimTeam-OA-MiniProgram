// pages/user/login.js
var app=getApp();

Page({
    
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    toLogin: function () {

    },
    toAuth: function () {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    }
})