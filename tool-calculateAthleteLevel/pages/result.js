var app = getApp();
const man = require('../resources/man.js');
const woman = require('../resources/woman.js');
const manData = Object.freeze(man.data);
const womanData = Object.freeze(woman.data);

Page({
  data: {
    levelName: ['国际健将', '运动健将', '一级运动员', '二级运动员', '三级运动员'],
    scoreList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sex = wx.getStorageSync('athLevel-sex');
    var poolLength = wx.getStorageSync('athLevel-poolLength');
    var style = wx.getStorageSync('athLevel-style');
    var style_en = wx.getStorageSync('athLevel-style_en');
    var itemMeter = wx.getStorageSync('athLevel-itemMeter');
    var score = wx.getStorageSync('athLevel-score');
    var score_beauty = wx.getStorageSync('athLevel-score_beauty');
    var score2 = "";
    var level = -1;

    if (sex == "man") {
			var scoreList = manData[poolLength][style_en][itemMeter];
      sex = "男子";
    } else if (sex == "woman") {
      var scoreList = womanData[poolLength][style_en][itemMeter];
      sex = "女子";
    }

    var itemName = sex + itemMeter + "米" + style + "（" + poolLength + "米池）";

    // 成绩处理[BGN]
    if (score[0] >= 1) {
      score[0] = score[0].toString();
      score[1] = score[1].toString();
      score[2] = score[2].toString();
      if (score[1].length != 2) {
        score[1] = "0" + score[1];
      }
      if (score[2].length != 2) {
        score[2] = "0" + score[2];
      }
      score2 = score[0] + score[1] + score[2];
    } else if (score[1] >= 1) {
      score[1] = score[1].toString();
      score[2] = score[2].toString();
      if (score[2].length != 2) {
        score[2] = "0" + score[2];
      }
      score2 = score[1] + score[2];
    } else if (score[2] >= 1) {
      score[2] = score[2].toString();
      score2 = score[2];
    }
    // 成绩处理[END]

    // 等级判断[BGN]
    var score3 = parseInt(score2);
    for (var i = 0; i <= 4; i++) {
      var levelScore = parseInt(scoreList[i]);
      if (score3 <= levelScore) {
        level = i;
        break;
      }
    }

    if (level == -1) {
      level = 5;
    }
    // 等级判断[END]

    for (i in scoreList) {
			if(scoreList[i].length==8) continue;
      scoreList[i] = this.scoreFormat(scoreList[i].toString());
    }

    this.setData({
      scoreList: scoreList,
      score: this.scoreFormat(score2),
      score_beauty: score_beauty,
      level: level,
      itemName: itemName
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.removeStorage();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.removeStorage();
  },

  scoreFormat: function(score) {
    var minute = '00';
    var second = '00';
    var millSecond = '00';

    if (score.length >= 6) var minute = score.substr(-6, 2);
    else if (score.length >= 5) var minute = '0' + score.substr(-5, 1);
    if (score.length >= 4) var second = score.substr(-4, 2);
    else if (score.length >= 3) var second = '0' + score.substr(-3, 1);
    if (score.length >= 2) var millisecond = score.substr(-2, 2);
    else if (score.length >= 1) var millisecond = '0' + score.substr(-1, 1);

    return minute + ":" + second + "." + millisecond;
  },

  removeStorage: function() {
    wx.removeStorageSync('athLevel-sex');
    wx.removeStorageSync('athLevel-poolLength');
    wx.removeStorageSync('athLevel-style');
    wx.removeStorageSync('athLevel-style_en');
    wx.removeStorageSync('athLevel-itemMeter');
    wx.removeStorageSync('athLevel-score');
    wx.removeStorageSync('athLevel-score_beauty');
  }
})