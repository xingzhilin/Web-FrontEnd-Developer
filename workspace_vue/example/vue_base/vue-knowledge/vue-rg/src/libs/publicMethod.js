/**
 * 用地址code,查询对应中文名称，并返回
 * @param {Array} arrayInfo [code对应数组]
 * @param {Number} code [地区对应code]
 * */
const addressName = (arrayInfo, code) => {
    let arrCode = arrayInfo.find((item,index,arr)=> item.lcode === code);
    let {lname:lnames} = arrCode;
    return lnames
};

export default { addressName }



// WEBPACK FOOTER //
// ./src/libs/publicMethod.js