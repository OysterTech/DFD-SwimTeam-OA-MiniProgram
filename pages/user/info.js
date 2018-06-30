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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
                    //wx.hideLoading();
                }
            });
        } else {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            });
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    nodev: function () {
        wx.showModal({
            title: '提示',
            content: '修改资料功能暂未开放！请登录网页端修改！',
            showCancel: false
        })
    },

    logout: function () {
        var _this=this;
        wx.request({
            url: app.data.API_HOST + 'userLogout.php',
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
                openId: wx.getStorageSync('openID')
            },
            success: function (res) {
                console.log(res.data);
                wx.clearStorageSync();
                wx.redirectTo({
                    url: "/pages/user/login"
                })
            }
        })
    }
})