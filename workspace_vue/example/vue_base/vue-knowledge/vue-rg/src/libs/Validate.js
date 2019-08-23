/**
 * 公共验证信息
 **/
// 验证 是否为数字
const isNumberAll = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(rule.name));
    } else if (!Number.isFinite(Number(value))) {
        callback(new Error('请输入数字'));
    } else {
        callback();
    }
};
// 数字验证和股东占比
const isNumberShareholdingPer = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(rule.name));
    } else if (!Number.isFinite(Number(value))) {
        callback(new Error('请输入数字'));
    } else {
        if (Number(value) > 100) {
            callback(new Error('股份占比不能超过100%'));
        } else {
            callback();
        }
    }
};
// 验证 手机号
const isPhone = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(rule.name + '不能为空'));
    } else if(!/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(Number(value))){
        callback(new Error('请输入正确的'+ rule.name));
    }else {
        callback();
    }
}
// 身份证号
const idCardPass = (rule, value, callback) => { // 身份证号验证
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value === '') {
        callback(new Error('身份证号不能为空'));
    }else if(!reg.test(value)){
        callback(new Error('请输入正确的身份证号'));
    } else {
        callback();
    }
};
// 社会统一代码长度校验
const isNumLength = (rule, value, callback) => {
    let reg = /^[A-Za-z0-9]{18}/;
    if (value === '') {
        callback(new Error('请填写' + rule.name));
    } else if(!reg.test(value)) {
        callback(new Error(rule.name + '格式不正确'));
    } else {
        callback();
    }
};
// 企业电话验证
const isEntIphone = (rule, value, callback) => {
    let mobile = /^1[3|5|8]\d{9}$/
    let phone = /^0\d{2,3}-?\d{7,8}$/;
    if (value === '') {
        callback(new Error(rule.name + '不能为空'));
    } else if(!mobile.test(value) && !phone.test(value)){
        callback(new Error('格式错误，例：010-12344321或11位手机'));
    } else {
        callback();
    }
}
// 企业传真
const isEntFax = (rule, value, callback) => {
    let phone = /^(\d{3,4}-)?\d{7,8}$/;
    if (value === '') {
        callback(new Error(rule.name + '不能为空'));
    } else if(!phone.test(value)){
        callback(new Error('请输入正确的传真号码'));
    } else {
        callback();
    }
}
// 邮编验证
const isPostcode = (rule, value, callback) => {
    let pattern = /^[0-9]{6}$/;
    if (value === '') {
        callback(new Error(rule.name + '不能为空'));
    } else if(!pattern.test(value)){
        callback(new Error('请输入正确的'+ rule.name));
    } else {
        callback();
    }
}
export default {isNumberAll ,isPhone, idCardPass, isNumLength, isEntIphone,isPostcode,isEntFax,isNumberShareholdingPer};



// WEBPACK FOOTER //
// ./src/libs/Validate.js