var app = getApp();

Page({

    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    toLogin: function(e) {
        var userName = e.detail.value.userName;
        var password = e.detail.value.password;

        if (userName == "") {
            wx.showModal({
                title: '提示',
                content: '请输入用户名！',
                showCancel: false
            });
            return false;
        }
        if (password == "") {
            wx.showModal({
                title: '提示',
                content: '请输入密码！',
                showCancel: false
            });
            return false;
        }

        wx.showNavigationBarLoading();
        wx.showLoading({
            title: '登录中',
            mask: 'true',
            success: function(a) {
                wx.request({
                    url: app.data.API_HOST + 'userLogin.php',
                    method: "POST",
                    data: {
                        userName: userName,
                        password: password,
                        openId: wx.getStorageSync("openID")
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        console.log(res.data);

                        // 服务器无法正常响应
                        if (res.statusCode != 200) {
                            wx.hideLoading();
                            wx.hideNavigationBarLoading();
                            wx.showModal({
                                title: '提示',
                                content: '登录失败！请联系管理员并提交错误码：UL9！',
                                showCancel: false,
                                success: function(res) {}
                            });
                            return false;
                        }
                        wx.hideLoading();
                        wx.hideNavigationBarLoading();
                        var data = res.data;
                        if (data.code == 403 || data.code == 0) {
                            // 密码错误
                            wx.hideLoading();
                            wx.hideNavigationBarLoading();
                            wx.showModal({
                                title: '提示',
                                content: '密码错误！请重新输入！',
                                showCancel: false
                            });
                            return false;
                        } else if (data.code == 2) {
                            // 绑定微信失败
                            wx.hideLoading();
                            wx.hideNavigationBarLoading();
                            wx.showModal({
                                title: '提示',
                                content: '用户绑定微信失败！如已绑定，请点击“微信授权登录”！',
                                showCancel: false
                            });
                            return false;
                        } else if (data.code == 1) {
                            wx.redirectTo({
                                url: "/pages/auth/index?from=loginSuccess"
                            })
                        }
                    }
                });
            }
        });
    },
    toAuth: function() {
        wx.redirectTo({
            url: '/pages/auth/index?from=loginButton',
        })
    }
})