// pages/user/updateAthleteInfo.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        schoolGradeList: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        schoolClassList: ['（1）班', '（2）班', '（3）班', '（4）班', '（5）班', '（6）班', '（7）班', '（8）班', '（9）班', '（10）班', '（11）班', '（12）班', '（13）班'],
        idCardTypeList: ['大陆二代身份证', '香港居民身份证', '护照'],
        sexList: ['男', '女']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = wx.getStorageSync("userInfo");
        var schoolGrade = userInfo.SchoolGrade;
        var schoolClass = userInfo.SchoolClass;
        var IDCardType = userInfo.IDCardType;
        var sex = userInfo.Sex;

        if (sex == "男") {
            var sexNum = 1;
        } else if (sex == "女") {
            var sexNum = 2;
        }

        this.setData({
            'userInfo': userInfo,
            'schoolGrade': schoolGrade,
            'schoolClass': schoolClass,
            'IDCardType': IDCardType,
            'sex': sexNum
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    gradeChange: function(e) {
        this.setData({
            schoolGrade: parseInt(e.detail.value) + 1
        })
    },
    classChange: function(e) {
        this.setData({
            schoolClass: parseInt(e.detail.value) + 1
        })
    },
    sexChange: function(e) {
        this.setData({
            sex: parseInt(e.detail.value) + 1
        })
    },
    typeChange: function(e) {
        this.setData({
            IDCardType: parseInt(e.detail.value) + 1
        })
    },

    formSubmit: function(e) {
        var _this = this;
        var value = e.detail.value;
        var reg = /[\u4e00-\u9fa5]/g;

        // 检查真实姓名是否含有非汉字字符
        if (!reg.test(value.RealName)) {
            wx.showModal({
                title: '提示',
                content: '注册失败！真实姓名不得含有非汉字字符！',
                showCancel: false,
                success: function(res) {}
            });
            return;
        }

        // 检查真实姓名是否含有空格
        if (value.RealName.indexOf(" ") != -1) {
            wx.showModal({
                title: '提示',
                content: '注册失败！用户名不得含有空格！',
                showCancel: false,
                success: function(res) {}
            });
            return;
        }

        value.Sex = _this.data.sexList[value.Sex];
        value.SchoolGrade = parseInt(value.SchoolGrade) + 1;
        value.SchoolClass = parseInt(value.SchoolClass) + 1;
        value.IDCardType = parseInt(value.IDCardType) + 1;

        // 检查大陆身份证是否为18位
        if (value.IDCardType == 1 && value.IDCard.length != 18) {
            wx.showModal({
                title: '提示',
                content: '注册失败！大陆二代身份证号码长度有误！',
                showCancel: false,
                success: function (res) { }
            });
            return;
        }
        
        value = JSON.stringify(value);
        wx.showLoading({
            title: '修改中',
            mask: 'true',
            success: function(a) {
                // 提交报名数据
                wx.request({
                    url: app.data.API_HOST + 'updateProfile.php',
                    method: "POST",
                    data: {
                        openId: wx.getStorageSync("openID"),
                        profileType: "ath",
                        profile: value
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        console.log(res.data);

                        // 服务器无法正常响应
                        if (res.statusCode != 200) {
                            wx.hideLoading();
                            wx.hideNavigationBarLoading()
                            wx.showModal({
                                title: '提示',
                                content: '修改失败！请联系管理员并提交错误码：APU9！',
                                showCancel: false,
                                success: function(res) {}
                            });
                            return false;
                        }

                        var data = res.data;
                        if (data.code == 1) {
                            wx.hideLoading();
                            wx.hideNavigationBarLoading()
                            console.log(res.data);
                            wx.showModal({
                                title: '提示',
                                content: '修改成功',
                                showCancel: false,
                                success: function(res) {
                                    if (res.confirm) {
                                        wx.redirectTo({
                                            url: '/pages/auth/index',
                                        });
                                    }
                                }
                            });
                        } else if (data.code == 0) {
                            wx.hideLoading();
                            wx.hideNavigationBarLoading()
                            wx.showModal({
                                title: '提示',
                                content: '修改失败！请联系管理员！',
                                showCancel: false,
                                success: function(res) {}
                            });
                            return false;
                        }
                    }
                });
            }
        });
    }
})