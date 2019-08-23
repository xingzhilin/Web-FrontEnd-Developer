import Index from '@/views/Index'
import Login from '@/views/Login'
import register from '@/views/register'
import product from '@/views/product'
import productYBT from '@/views/productYBT'
import productLSD from '@/views/productLSD'
import productKD from '@/views/productKD'
import cooperation from '@/views/cooperation'
import aboutUs from '@/views/aboutUs'
import userCenter from '@/views/user/index'
import userCenterMain from '@/views/user/main'
import userCenterFinance from '@/views/user/myFinance/application'
// import userCenterFinanceLoan from '@/views/user/myFinance/myLoan'
import userCenterFinanceReturn from '@/views/user/myFinance/myReturn'
// import userCenterLimitApply from '@/views/user/limitApply/limitApply'
import userCenterLimitApplyYBT from '@/views/user/limitApply/limitApplyYBT'
import userCenterLimitApplyLSD from '@/views/user/limitApply/limitApplyLSD'
import userCenterLimitApplyKD from '@/views/user/limitApply/limitApplyKD'
import userCenterLimitApplyDHD from '@/views/user/limitApply/limitApplyDHD'
import userCenterLimitApplyYBTInfo from '@/views/user/limitApply/limitApplyYBTInfo'
import userCenterLimitApplyLSDInfo from '@/views/user/limitApply/limitApplyLSDInfo'
import userCenterLimitApplyKDInfo from '@/views/user/limitApply/limitApplyKDInfo'
import userCenterLimitApplyDHDInfo from '@/views/user/limitApply/limitApplyDHDInfo'
import userCenterLimitManage from '@/views/user/limitApply/limitManage'
import userCenterInfoAuthority from '@/views/user/myInfo/authority'
import userCenterInfoAuthoritySuccee from '@/views/user/myInfo/authoritySuccee'
import userCenterInfoAuthoritySee from '@/views/user/myInfo/authoritySee'

import Err404 from '@/views/error-page/Err404'
import Err403 from '@/views/error-page/Err403'
import Err500 from '@/views/error-page/Err500'

export const IndexRouter = {
    path: '/',
    name: 'index',
    meta: {
        title: '药金融－医药产业链金融平台'
    },
    component: Index
};
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: Login
};
export const registerRouter = {
    path: '/register',
    name: 'register',
    meta: {
        title: '注册'
    },
    component: register
};
export const productList = {
    path: '/productList',
    name: 'productList',
    meta: {
        title: '产品列表'
    },
    component: product
};
export const productRouterYBT = {
    path: '/productYBT',
    name: 'productYBT',
    meta: {
        title: '产品-药白条'
    },
    component: productYBT
};
export const productRouterLSD = {
    path: '/productLSD',
    name: 'productLSD',
    meta: {
        title: '产品-流水贷'
    },
    component: productLSD
};
export const productRouterKD = {
    path: '/productKD',
    name: 'productKD',
    meta: {
        title: '产品-快贷'
    },
    component: productKD
};
export const cooperationRouter = {
    path: '/cooperation',
    name: 'cooperation',
    meta: {
        title: '商务合作'
    },
    component: cooperation
};
export const aboutUsRouter = {
    path: '/aboutUs',
    name: 'aboutUs',
    meta: {
        title: '关于我们'
    },
    component: aboutUs
};
export const userCenterRouter = {
    path: '/user/',
    name: 'usercenter',
    meta: {
        title: '用户中心',
        requireAuth: true
    },
    component: userCenter,
    children: [
        {path: '/', name: 'user-center-main', title: '用户中心首页', component: userCenterMain},
        {path: 'application', name: 'user-center-application',meta:{title: '我的融资-贷款申请'}, component: userCenterFinance},
        // {path: 'myLoan', name: 'user-center-myLoan',meta:{title: '我的融资-我的贷款'}, component: userCenterFinanceLoan},
        {path: 'myReturn', name: 'user-center-myReturn',meta:{title: '我的融资-我的还款'}, component: userCenterFinanceReturn},
        // {path: 'limitApply', name: 'user-center-limitApply',meta:{title: '我的额度-我的申请'}, component: userCenterLimitApply},
        {path: 'limitApplyYBT', name: 'user-center-limitApplyYBT', meta:{title: '我的额度-我的申请-药白条'}, component: userCenterLimitApplyYBT},
        {path: 'limitApplyLSD', name: 'user-center-limitApplyLSD', meta:{title: '我的额度-我的申请-流水贷(企业信息)'}, component: userCenterLimitApplyLSD},
        {path: 'limitApplyKD', name: 'user-center-limitApplyKD',meta:{title: '我的额度-我的申请-快贷'}, component: userCenterLimitApplyKD},
        {path: 'limitApplyDHD', name: 'user-center-limitApplyDHD',meta:{title: '我的额度-我的申请-订货贷信息'}, component: userCenterLimitApplyDHD},
        {path: 'limitApplyYBTInfo', name: 'user-center-limitApplyYBTInfo', meta:{title: '我的额度-我的申请-药白条信息'}, component: userCenterLimitApplyYBTInfo},
        {path: 'limitApplyLSDInfo', name: 'user-center-limitApplyLSDInfo', meta:{title: '我的额度-我的申请-流水贷信息'}, component: userCenterLimitApplyLSDInfo},
        {path: 'limitApplyKDInfo', name: 'user-center-limitApplyKDInfo',meta:{title: '我的额度-我的申请-快贷信息'}, component: userCenterLimitApplyKDInfo},
        {path: 'limitApplyDHDInfo', name: 'user-center-limitApplyDHDInfo',meta:{title: '我的额度-我的申请-订货贷信息'}, component: userCenterLimitApplyDHDInfo},
        {path: 'limitManage', name: 'user-center-limitManage',meta:{title: '我的额度-额度管理'}, component: userCenterLimitManage},
        {path: 'authority', name: 'user-center-authority', meta:{title: '我的信息-企业认证'}, component: userCenterInfoAuthority},
        {path: 'authoritySuccee', name: 'user-center-authoritySuccee', meta:{title: '我的信息-企业认证申请成功'}, component: userCenterInfoAuthoritySuccee},
        {path: 'authoritySee', name: 'user-center-authoritySee',meta:{title: '我的信息-企业认证状态'}, component: userCenterInfoAuthoritySee}
    ]
};
export const page404 = {
    path: '/404',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: Err404
};
export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: Err403
};
export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: Err500
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    IndexRouter,
    productList,
    productRouterYBT,
    productRouterLSD,
    productRouterKD,
    cooperationRouter,
    aboutUsRouter,
    userCenterRouter,
    loginRouter,
    registerRouter,
    page500,
    page403,
    page404
];



// WEBPACK FOOTER //
// ./src/router/router.js