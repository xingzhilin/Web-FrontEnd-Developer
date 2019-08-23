module.exports = {
    project: {
        name: '药金融－医药产业链金融平台',
        key: 'finance'
    },
    buildDir: 'yjr.web.mypharma',
    server: {//服务API环境配置
        development: { //本地开发环境
            protocol: 'http://'
            , finance: "yjr.test.wdyy.com.cn" //站点域名
            , userWeb: 'https://user.test.wdyy.com.cn' //user
            , yjrgw: 'commonservice-gateway.dev.wdyy.com.cn' //接口域名
        },
        develop:{//武汉开发环境 [因无域名，绑定HOST使用]
            protocol: 'http://'
            , finance: "yjr.dev.wdyy.com.cn"
            , userWeb: 'https://user.test.wdyy.com.cn'
            , yjrgw: 'yjrgw.dev.wdyy.com.cn'
        },
        test: { //测试环境
            protocol: 'https://'
            , finance: "yjr.test.wdyy.com.cn"
            , userWeb: 'https://user.test.wdyy.com.cn'
            , yjrgw: 'yjrgw.test.wdyy.com.cn'
        },
        test2: { //测试环境2
            protocol: 'https://'
            , finance: "yjr.test2.wdyy.com.cn"
            , userWeb: 'https://user.test.wdyy.com.cn'
            , yjrgw: 'yjrgw.test2.wdyy.com.cn'
        },
        prev: { //预上线环境
            protocol: 'http://'
            , finance: "yjr.prev.wdyy.com.cn"
            , userWeb: 'https://user.test.wdyy.com.cn'
            , yjrgw: 'yjrgw.test.wdyy.com.cn'
        },
        production: { //线上环境
            protocol: 'https://'
            , finance: "yjr.mypharma.com"
            , userWeb: 'https://user.test.wdyy.com.cn'
            , yjrgw: 'yjrgw.mypharma.com'
        }
    }
};
