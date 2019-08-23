import Vue from 'vue'
import utils from '../libs/util'

/*时间格式化*/
Vue.filter('formatDate', function (value,formatString) {
	formatString = formatString || 'yyyy-MM-dd hh:mm';
	if(value==null){
		return "";
	}
    let date = new Date(value)
    return utils.formatDate(date, formatString)
});
/**
 * 为空处理
 * @param str
 * @param c
 * @returns {*}
 */
Vue.filter('notNull',function (str, c) {
    c = c != undefined ? c : "";
    if ((str!==0 && str == "") || str == null || str == "null" || str == "undefined") return c;
    return str;
});

/**
* 不为空 并新增后缀
* @param str
* @param p
* @param c
* @returns {*}
*/
Vue.filter('notNullAddPix',function (str, p, c) {
     c = c != undefined ? c : "";
     p = p != undefined ? p : "";
     if ((str!==0 && str == "") || str == null || str == "null" || str == "undefined") return c;
     return str + p;
 });


export const filters = {};


// WEBPACK FOOTER //
// ./src/filter/filter.js