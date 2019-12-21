// pages/me/updateHistory.js
var app = getApp();
const updateData = require('updateHistoryData.js');
const data = Object.freeze(updateData.data);

Page({
  data: {
    data: data
  },

})