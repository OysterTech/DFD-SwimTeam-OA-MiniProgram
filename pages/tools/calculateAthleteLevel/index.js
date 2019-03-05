// pages/tools/calculateAthleteLevel/index.js
var app = getApp();

Page({
  data: {
    multiArray: [],
    score: [0, 0, 0],
    itemNum: 0,
    itemList: ['自由泳-50', '自由泳-100', '自由泳-200', '自由泳-400', '自由泳-800', '自由泳-1500', '蝶泳-50', '蝶泳-100', '蝶泳-200', '仰泳-50', '仰泳-100', '仰泳-200', '蛙泳-50', '蛙泳-100', '蛙泳-200', '混合泳-200', '混合泳-400']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var multiArray = [];
    var minuteArray = [];
    var secondArray = [];
    var millisecondArray = [];

    for (var i = 0; i < 60; i++) {
      var data = "";

      if (i < 10) {
        data = "0" + i;
      } else {
        data = i.toString();
      }

      minuteArray.push(data);
      secondArray.push(data);
    }

    for (var i = 0; i < 100; i++) {
      var data = "";

      if (i < 10) {
        data = "0" + i;
      } else {
        data = i.toString();
      }

      millisecondArray.push(data);
    }

    multiArray.push(minuteArray, secondArray, millisecondArray);

    this.setData({
      multiArray: multiArray,
      style: "自由泳",
      style_en: "freestyle",
      itemMeter: '50'
    });
  },

  scoreChange: function(e) {
    var value = e.detail.value;

    if (value[0] == 0 && value[1] == 0 && value[2] == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择成绩时间！',
        showCancel: false,
        success: function(res) {}
      });
      return false;
    }

    this.setData({
      score: value
    })

    var value2 = value;
    for (var i = 0; i <= 2; i++) {
      var score2 = value2[i].toString();
      if (score2.length < 2) {
        score2 = "0" + score2;
      }
      value2[i] = score2;
    }

    this.setData({
      score_beauty: value2[0] + ":" + value2[1] + "." + value2[2]
    })
  },

  itemChange: function(e) {
    var value = e.detail.value;

    var itemName = this.data.itemList[value];
    var itemData = itemName.split('-');
    var style = itemData[0];
    var meter = itemData[1];
    var style_en = "";

    switch (style) {
      case '自由泳':
        style_en = 'freestyle';
        break;
      case '蝶泳':
        style_en = 'butterfly';
        break;
      case '仰泳':
        style_en = 'backstroke';
        break;
      case '蛙泳':
        style_en = 'breaststroke';
        break;
      case '混合泳':
        style_en = 'medley';
        break;
    }

    this.setData({
      itemNum: parseInt(e.detail.value),
      style: style,
      style_en: style_en,
      itemMeter: meter
    })
  },

  search: function(e) {
    var _this = this;
    var value = e.detail.value;
    if (value.sex == "") {
      wx.showModal({
        title: '提示',
        content: '请选择性别！',
        showCancel: false,
        success: function(res) {}
      });
      return false;
    }
    if (value.poolLength == "") {
      wx.showModal({
        title: '提示',
        content: '请选择泳池长度！',
        showCancel: false,
        success: function(res) {}
      });
      return false;
    }

    wx.setStorageSync('athLevel-style', _this.data.style);
    wx.setStorageSync('athLevel-style_en', _this.data.style_en);
    wx.setStorageSync('athLevel-itemMeter', _this.data.itemMeter);
    wx.setStorageSync('athLevel-sex', value.sex);
    wx.setStorageSync('athLevel-poolLength', value.poolLength);
    wx.setStorageSync('athLevel-score', _this.data.score);
    wx.setStorageSync('athLevel-score_beauty', _this.data.score_beauty);

    wx.navigateTo({
      url: '/pages/tools/calculateAthleteLevel/result'
    })
  }
})