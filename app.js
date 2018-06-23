// app.js
// 开工日期：2018-06-08
App({
    data:{
        HOST: 'https://dfd.xshgzs.com',
        API_HOST:'https://api.xshgzs.com/dfd/'
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    }
})
