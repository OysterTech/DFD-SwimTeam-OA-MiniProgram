// pages/user/index.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openID: ""
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this;
        this.setData({
            openID: wx.getStorageSync('openID')
        });
        if (wx.getStorageSync('userInfo') == "") {
            wx.request({
                url: app.data.API_HOST + 'getProfile.php',
                header: {
                    'content-type': 'application/json'
                },
                data: {
                    openID: _this.data.openID
                },
                success: function (res) {
                    console.log(res.data);
                    wx.setStorageSync('userInfo', res.data.data);
                    _this.setData({
                        userInfo: res.data.data
                    });
                }
            });
        } else {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            });
        }
    },

    logout:function(){
        wx.redirectTo({
            url: '/pages/user/logout',
        })
    }
})