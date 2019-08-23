let utilFinance = {};
/**
 * 公共提示框
**/
utilFinance.instance = function (vm, type, msg) {
    const title = '提示框';
    const content = '<p>'+ msg +'</p>';
    switch (type) {
        case 'info':// 信息提示
            vm.$Modal.info({
                title: title,
                content: content
            });
            break;
        case 'success': // 成功提示
            vm.$Modal.success({
                title: title,
                content: content
            });
            break;
        case 'warning': // 警告提示
            vm.$Modal.warning({
                title: title,
                content: content
            });
            break;
        case 'error': // 错误提示
            vm.$Modal.error({
                title: title,
                content: content
            });
            break;
    }
};
/**
 *按不同日期选择，生成startTime或endTime
 type为传入的日期选择类型1今天、2本周、3本月
 string为字符串，传入'startTime'或 'endTime'
*/
utilFinance.dateMultiChangeSearch = function (type, string) {
    let myDate = new Date();
    if (type == 1) { //今天
        if (string == 'startTime') return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' 00:00:00';
        if (string == 'endTime') return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' 23:59:59';
    };
    if (type == 2) { // 本周
        let MondayTime = new Date(myDate.getTime() - (myDate.getDay() - 1) * 24 * 60 * 60 * 1000);
        let SundayTime = new Date(myDate.getTime() + (7 - myDate.getDay()) * 24 * 60 * 60 * 1000);
        if (string == 'startTime') return MondayTime.getFullYear() + '-' + (MondayTime.getMonth() + 1) + '-' + MondayTime.getDate() + ' 00:00:00';
        if (string == 'endTime') return SundayTime.getFullYear() + '-' + (SundayTime.getMonth() + 1) + '-' + SundayTime.getDate() + ' 23:59:59';
    };
    if (type == 3) { // 本月
        function setDate (date) {
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            return y + '-' + m + '-' + d;
        }
        function getCurrentMonthFirst(){
            myDate.setDate(1);
            return myDate;
        }
        function getCurrentMonthLast(){
            var currentMonth = myDate.getMonth();
            var nextMonth = ++currentMonth;
            var nextMonthFirstDay = new Date(myDate.getFullYear(), nextMonth, 1);
            var oneDay = 1000 * 60 * 60 * 24;
            return new Date(nextMonthFirstDay - oneDay);
        }
        let FirstdayTime = getCurrentMonthFirst();
        let LastdayTime = getCurrentMonthLast();
        if (string == 'startTime') return FirstdayTime.getFullYear() + '-' + (FirstdayTime.getMonth() + 1) + '-' + FirstdayTime.getDate() + ' 00:00:00';
        if (string == 'endTime') return LastdayTime.getFullYear() + '-' + (LastdayTime.getMonth() + 1) + '-' + LastdayTime.getDate() + ' 23:59:59';
    };
};
/**
 * 千分位转换
 *参数说明：num 要格式化的数字 n 保留小数位
*/
utilFinance.formatNumThousands = function (num, n, formatStr) {
    n = n || 2;
    formatStr = formatStr || '';
    if (num == null || num === '') {
        num = formatStr;
    } else if (isNaN(num)) {
        num = '';
    } else {
        num = String(new Number(num).toFixed(n));
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) {
            num = num.replace(re, '$1,$2');
        }
    }
    return num;
}
/**
* 显示空占位符
*/
utilFinance.notNull = function (str, c) {
    c = c != undefined ? c : '';
    if ((str !== 0 && str == '') || str == null || str == 'null' || str == 'undefined') return c;
    return str;
}
/**
 * 千分位转换
 *参数说明：num 要格式化的数字 n 保留小数位
 */
utilFinance.formatNumThousands = function (num, n, formatStr) {
    n = n || 2;
    formatStr = formatStr || '';
    if (num == null || num === '') {
        num = formatStr;
    } else if (isNaN(num)) {
        num = '';
    } else {
        num = String(new Number(num).toFixed(n));
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) {
            num = num.replace(re, '$1,$2');
        }
    }
    return num;
}
/**
 * 移除数字中的千分位
 */
utilFinance.removeNumFormat = function (num) {
    if (String(num).indexOf(',') > -1) {
        num = num.replace(/,/gi, '');
        return num;
    } else {
        return num;
    }
}

/**
 * iview时间格式化
 * fmt yyyy-MM-dd
 */
utilFinance.dateFormat = function (value, fmt) {
    Date.prototype.Format = function (fmt) { // Date 转化为指定格式的String
        let o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    if (value) {
        return new Date(value).Format(fmt);
    }
    return '';
};

//查询省市县
utilFinance.provinceCityCode=function () {

}
window.utilFinance = utilFinance;
export default utilFinance;



// WEBPACK FOOTER //
// ./src/libs/utilFinance.js