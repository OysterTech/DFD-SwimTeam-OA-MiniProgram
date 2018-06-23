var app = getApp();
var util = require('../../utils/util.js');

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
        var _this = this;
        var userInfo = wx.getStorageSync('userInfo');
        _this.setData({
            gamesId: options.gamesID
        });

        wx.showLoading({
            title: '项目数据加载中',
            mask: 'true',
            success: function (a) {
                // 获取比赛项目
                wx.request({
                    url: app.data.API_HOST + 'getGamesItem.php',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: {
                        GamesID: options.gamesID,
                        YearGroup: userInfo.YearGroup
                    },
                    success: function (res) {
                        if (res.data.code == 0) {
                            wx.showModal({
                                title: '提示',
                                content: '当前比赛没有可以报名的项目！',
                                showCancel: false,
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateBack({});
                                    }
                                }
                            });
                        } else {
                            _this.setData({
                                itemList: res.data.data
                            });
                            wx.hideLoading();
                        }
                    }
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    formSubmit: function (e) {
        //console.log('form发生了submit事件，携带数据为：', e.detail.formId);
        var _this = this;
        var formId = e.detail.formId;
        var userInfo = wx.getStorageSync('userInfo');
        var gamesName = wx.getStorageSync('gamesName');
        var venue = wx.getStorageSync('gamesVenue');
        var startDate = wx.getStorageSync('gamesStartDate');
        var grade = this.parseGrade(userInfo.SchoolGrade) + '（' + userInfo.SchoolClass + '）班';

        if (_this.data.itemIds == "" || _this.data.itemIds == undefined) {
            wx.showModal({
                title: '提示',
                content: '请选择报名项目！',
                showCancel: false,
                success: function (res) { }
            });
            return false;
        }

        wx.showNavigationBarLoading();
        wx.showLoading({
            title: '报名提交中',
            mask: 'true',
            success: function (a) {
                // 提交报名数据
                wx.request({
                    url: app.data.API_HOST + 'toEnroll.php',
                    method: "POST",
                    data: {
                        athId: userInfo.AthID,
                        gamesId: _this.data.gamesId,
                        itemIds: _this.data.itemIds
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        console.log(res.data);

                        // 服务器无法正常响应
                        if (res.statusCode != 200) {
                            wx.hideLoading();
                            wx.hideNavigationBarLoading()
                            wx.showModal({
                                title: '提示',
                                content: '报名失败！请联系管理员并提交错误码：GE9！',
                                showCancel: false,
                                success: function (res) { }
                            });
                            return false;
                        }

                        var data = res.data;
                        if (data.code == 1) {
                            // 获取AccessToken
                            wx.request({
                                url: app.data.API_HOST + 'getAccessToken.php',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    //console.log(res.data.data);
                                    var accessToken = res.data.data.access_token;
                                    var templateData = {
                                        "keyword1": {
                                            "value": gamesName
                                        },
                                        "keyword2": {
                                            "value": startDate
                                        },
                                        "keyword3": {
                                            "value": venue
                                        },
                                        "keyword4": {
                                            "value": userInfo.RealName
                                        },
                                        "keyword5": {
                                            "value": "项目"
                                        },
                                        "keyword6": {
                                            "value": grade
                                        },
                                        "keyword7": {
                                            "value": util.formatTime(new Date())
                                        },
                                        "keyword8": {
                                            "value": "报名成功，请等待领队通知！"
                                        }
                                    };
                                    var templateData = JSON.stringify(templateData);

                                    // 发送报名成功的模板消息
                                    wx.request({
                                        url: app.data.API_HOST + 'sendTemplateMessage.php',
                                        method: "POST",
                                        data: {
                                            'accessToken': accessToken,
                                            'openId': wx.getStorageSync('openID'),
                                            'templateId': 'zEQbEBTop_Gj5RMUkoX4kOBF9fqqZNrKl8QmWXeH_zk',
                                            'formId': formId,
                                            'data': templateData
                                        },
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        success: function (res) {
                                            wx.hideLoading();
                                            wx.hideNavigationBarLoading()
                                            console.log(res.data);
                                            wx.showModal({
                                                title: '提示',
                                                content: '报名成功！请等待领队通知！',
                                                showCancel: false,
                                                success: function (res) {
                                                    if(res.confirm){
                                                        wx.navigateBack({});
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else if (data.code == 0) {
                            wx.hideLoading();
                            wx.hideNavigationBarLoading()
                            wx.showModal({
                                title: '提示',
                                content: '报名失败！请联系管理员！',
                                showCancel: false,
                                success: function (res) { }
                            });
                            return false;
                        }
                    }
                });
            }
        });
    },

    checkboxChange: function (e) {
        console.log(e.detail.value)
        this.setData({
            itemIds: e.detail.value
        });
    },

    goBack: function () {
        wx.navigateBack({})
    },

    parseGrade: function (grade) {
        switch (grade) {
            case '1':
                var grade = "一年";
                break;
            case '2':
                var grade = "二年";
                break;
            case '3':
                var grade = "三年";
                break;
            case '4':
                var grade = "四年";
                break;
            case '5':
                var grade = "五年";
                break;
            case '6':
                var grade = "六年";
                break;
        }

        return grade;
    }
})