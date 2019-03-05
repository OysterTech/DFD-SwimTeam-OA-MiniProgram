const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const checkHaveReadNotice = id => {
  let haveReadNotice = wx.getStorageSync('haveReadNoticeList');

  if (haveReadNotice.indexOf(id) >= 0) {
    return true;
  } else {
    return false;
  }
}

const setReadNotice = id => {
  let haveReadNotice = wx.getStorageSync('haveReadNoticeList');

  if (haveReadNotice != '') {
    haveReadNotice.push(id);
  } else {
    haveReadNotice = [id];
  }
  wx.setStorageSync('haveReadNoticeList', haveReadNotice);
  return true;
}

module.exports = {
  formatTime: formatTime,
  checkHaveReadNotice: checkHaveReadNotice,
  setReadNotice: setReadNotice
}