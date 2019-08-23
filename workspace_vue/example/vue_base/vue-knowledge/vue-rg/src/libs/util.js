const config = require('../../config/project');
import env from '../../build/env';
const utils = {
	formatDate:function (date, fmt) {  //date格式化  组件
	  if (/(y+)/.test(fmt)) {
	    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	  }
	  let o = {
	    'M+': date.getMonth() + 1,
	    'd+': date.getDate(),
	    'h+': date.getHours(),
	    'm+': date.getMinutes(),
	    's+': date.getSeconds()
	  }
	  for (let k in o) {
	  if (new RegExp(`(${k})`).test(fmt)) {
	      let str = o[k] + '';
	      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : utils.padLeftZero(str))
	    }
	  }


	  if(fmt.indexOf("NaN") > -1)  fmt = '--';

	  return fmt
	},
	padLeftZero:function  (str) {
	  return ('00' + str).substr(str.length)
	}

}
utils.servers = config.server[env];
utils.getSysApi = function () {
    return utils.servers.protocol + utils.servers.yjrgw;  //需要单独配置后端接口
};
utils.routeMode = "history"
utils.sysname = config.project.key;
utils.sysTitle = config.project.name;

utils.title = function (title) {
    title = title || "用户中心";
    document.title = title + "";
}


export default utils;



// WEBPACK FOOTER //
// ./src/libs/util.js