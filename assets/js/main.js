
var SERVER_BASE_URL =  ''; // dev-开发环境 test-测试环境 pre-预生产环境 pro-生产环境
switchWinHost();
var processEnvObj = {
    dev: 'https://devminiapi.yangguangzhenxuan.com',
    test: 'https://mptest.yangguangzhenxuan.com',
    pre: 'https://preminiapi.yangguangzhenxuan.com',
    pro: 'https://mp.yangguangzhenxuan.com',
    personal: 'http://2f1684da.ngrok.io',
    h5: 'https://devminiapi.yangguangzhenxuan.com'
};
function switchWinHost(){
    var winHost = window.location.host;
    if(winHost == 'devminih5.yangguangzhenxuan.com'){
        SERVER_BASE_URL = 'https://devminiapi.yangguangzhenxuan.com';
    }else if(winHost == 'mptest.yangguangzhenxuan.com'){
        SERVER_BASE_URL = 'https://mptest.yangguangzhenxuan.com';
    }else if(winHost == 'preminih5.yangguangzhenxuan.com'){
        SERVER_BASE_URL = 'https://preminiapi.yangguangzhenxuan.com';
    }else if(winHost == 'minih5.yangguangzhenxuan.com'){
        SERVER_BASE_URL = 'https://mp.yangguangzhenxuan.com';
    }
}
console.log('SERVER_BASE_URL', SERVER_BASE_URL);
const utilsData = {
    globalData: {
        url: processEnvObj[SERVER_BASE_URL]
    }
}
