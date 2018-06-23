const app = getApp();

Page({
    data: {
    },

    onLoad: function () {
        
        this.getAllGames();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    onPullDownRefresh: function () {
        wx.startPullDownRefresh({
            success: function () {
                _this.getAllGames();
            }
        });
    },

    getAllGames: function () {
        var _this = this;
        wx.showLoading({
            title: '比赛数据加载中',
            mask: 'true',
            success: function (a) {
                wx.request({
                    url: app.data.API_HOST + 'getAllGames.php',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.data);
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
    }
})
