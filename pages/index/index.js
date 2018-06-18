//index.js
const app = getApp()

Page({
    data: {},

    onLoad: function () {
        var _this = this;
        wx.showLoading({
            title: '登录中',
            mask: 'true',
            success: function (a) {
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            // 请求获取openID
                            wx.request({
                                url: app.data.API_HOST + '/wxLogin.php',
                                header: {
                                    'content-type': 'application/json'
                                },
                                data: {
                                    code: res.code
                                },
                                success: function (data) {
                                    var info = data.data;
                                    wx.setStorageSync('openID', info.data.openID);
                                    wx.setStorageSync('userCode', res.code);
                                }
                            });
                            // 若数据缓存内没有用户数据，请求获取
                            if (wx.getStorageSync('userInfo') == "") {
                                wx.request({
                                    url: app.data.API_HOST + 'getProfile.php',
                                    header: {
                                        'content-type': 'application/json'
                                    },
                                    data: {
                                        openID: wx.getStorageSync('openID')
                                    },
                                    success: function (res) {
                                        console.log(res.data);
                                        if (res.data.code == 1) {
                                            wx.setStorageSync('userInfo', res.data.data);
                                            _this.setData({
                                                userInfo: res.data.data
                                            });
                                            wx.switchTab({
                                                url: '/pages/games/index'
                                            })
                                        }else{
                                            wx.redirectTo({
                                                url:"/pages/user/login"
                                            })
                                        }
                                    }
                                });
                            }else{
                                wx.switchTab({
                                    url: '/pages/games/index'
                                })
                            }
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            }
        })
    }
})
