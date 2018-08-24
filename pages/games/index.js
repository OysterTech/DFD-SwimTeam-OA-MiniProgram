const app = getApp();

Page({
    data: {},

    onLoad: function() {
        this.getAllGames();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    onPullDownRefresh: function() {
        var _this = this;
        _this.data.gamesList = []
        var status = _this.getAllGames();
        if (status == true) {
            wx.stopPullDownRefresh();
        }
    },

    getAllGames: function() {
        var _this = this;
        wx.showLoading({
            title: '比赛数据加载中',
            mask: 'true',
            success: function(a) {
                wx.request({
                    url: app.data.API_HOST + 'getAllGames.php',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        // console.log(res.data.data);
                        _this.setData({
                            gamesList: res.data.data
                        });
                        wx.hideLoading();
                        wx.stopPullDownRefresh();
                        return true;
                    }
                })
            }
        })
    },

    onShareAppMessage: function (res) {
        return {
            title: '东风东游泳队报名系统',
            path: '/pages/games/index'
        }
    }
})