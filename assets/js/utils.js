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
function imgUrl() {
  var img1 = "https://zxyg.oss-cn-beijing.aliyuncs.com/";

  var imgUrl = img1 + "timage";
  return imgUrl;
}
function url() {//服务器的连接
  return app.globalData.url;
}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
//var storage = window.localStorage;
var util = {
  ajax_execute: function (sUrl, sParams, headers, fnCallback, fnCallbackErr) {
    $.ajax({
      url: sUrl,
      data: sParams,
      type: "POST",
      //contentType: "application/json",
      headers: headers,
      //dataType: "json",
      // 允许携带证书
      xhrFields: {
           withCredentials: true
      },
　　　　// 允许跨域
      crossDomain: true,
      success: function (oJson) {
        if ("function" == typeof (fnCallback)) {
          var iResp = fnCallback(oJson);
        }
      },
      error: function (oJson) {
        if ("function" == typeof (fnCallbackErr)) {
          fnCallbackErr(oJson);
        }
      },
      cache: false
    });
  },
  mylog: function (sMsg) {
    if ("object" == typeof(console) && "function" == typeof(console.log)) {
      console.log(sMsg);
    } else {
      //
    }
  },
  flag: "getComputedStyle" in window,
  formatJSON: function (jsonStr) {
    return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
  },
  listToArray: function (likeAry) {
    if (this.flag) {
      return Array.prototype.slice.call(likeAry, 0);
    }
    var ary = [];
    for (var i = 0; i < likeAry.length; i++) {
      ary[ary.length] = likeAry[i];
    }
    return ary;
  },
  getById: function (id) {
    return document.getElementById(id);
  },
  arraySort: function (arr) {
    arr.sort();
    var newArr = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] !== newArr[newArr.length - 1]) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },
  setStorage: function (key, value, duration) {
    var data = {
      value: value,
      expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
    };
    localStorage[key] = JSON.stringify(data);
  },
  getStorage: function (key) {
    var data = localStorage[key];
    if (!data || data === "null") {
      return null;
    }
    var now = this.getCurrentTimeStamp();
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }
    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj.value;
    }
    return null;
  },
  removeStorage: function (key) {
    localStorage.removeItem(key);
  },
  getCurrentTimeStamp: function () {
    return Date.parse(new Date());
  }
};
// exports = {
//   formatTime: formatTime,
//   imgUrl: imgUrl,
//   url: url
// }
