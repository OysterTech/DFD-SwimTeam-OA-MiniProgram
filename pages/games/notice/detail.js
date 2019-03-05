// pages/games/notice/detail.js
var app = getApp()
let wxparse = require("../../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dkheight: 300,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    let winPage = this;
    wx.getSystemInfo({
      success: function(res) {
        let winHeight = res.windowHeight;
        winPage.setData({
          dkheight: winHeight - winHeight * 0.05 - 80
        })
      }
    });

    wx.showLoading({
      title: '数据加载中',
      mask: 'true',
      success: function(a) {
        wx.request({
          url: app.data.API_HOST + 'getNoticeDetail.php',
          data: {
            NoticeID: options.noticeID
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var info = res.data.data;
            var fileJson = JSON.parse(info.FileJSON);

            for (var i in fileJson) {
              fileJson[i]['url'] = 'https://dfd.xshgzs.com/Download.php?Code=' + fileJson[i]['Code'];
            }
            console.log(fileJson);
            _this.setData({
              info: info,
              fileJson: fileJson,
              content: res.data.data.Content
            });
            wx.setNavigationBarTitle({
              title: res.data.data.Title
            })
            wx.hideLoading();
            wxparse.wxParse('content', 'html', _this.data.content, _this, 5);
          }
        });
      }
    });
  },

  goBack: function() {
    wx.navigateBack({})
  },

  showFile: function(e) {
    var fileUrl = e.currentTarget.dataset.url;

    wx.showLoading({
      title: '文件加载中',
      mask: 'true',
      success: function(a) {
        wx.downloadFile({
          url: fileUrl,
          success: function(res) {
            console.log(res);
            var filePath = res.tempFilePath;
            wx.hideLoading();
            wx.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log('打开文档成功')
              },
              fail: function(e) {
                console.log(e);
              }
            })
          },
          fail: function(e) {
            wx.hideLoading();
            wx.showModal({
              title: "提示",
              content: "文件加载失败！",
              showCancel: false
            })
            console.log(e);
          }
        })
      }
    })
  }
})