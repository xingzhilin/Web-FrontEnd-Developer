import Vue from 'vue';
import util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';
import store from '../store';
import http from '../service/http';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    mode: util.routeMode,
    base: '/',
    routes: routers,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            const position = {};
            if (to.hash) {
                position.selector = to.hash;
            }
            if (to.matched.some(m => m.meta.scrollToTop)) {
                position.x = 0;
                position.y = 0;
            }
            return position;
        }
    }
};


export const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    let token = Cookies.get('ticket');
    let tokenYJR = store.state.user.token;
    if (tokenYJR.length <= 2 && (token != null && token.length > 2)) {
        store.dispatch('loginJointForMemberOnPC',{token: token}).then(() => {
            toNext(to, from, next);
        })
    } else {
        toNext(to, from, next);
    }


});

let toNext = function (to, from, next) {
    if (to.matched[0].meta.requireAuth) {
        // 通过vuex state获取当前的token是否存在
        if ((store.state.user.token).length > 1) {
            let authState = store.state.user.entStatusCodes;
            let authArr = [];
            let authority = ['/user/authority'];
            if (authority.includes(to.path)) {
                if (authState === 0) { // 0 未认证,1 已认证,2 待审核中,3 禁用，-1 驳回
                    next()
                } else {
                    next({
                        path: '/user/authoritySee'
                    })
                }
            } else {
                next()
            }
            next()
        } else {
            next({
                path: '/',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
}

router.afterEach((to,from,next) => {

});



// WEBPACK FOOTER //
// ./src/router/index.js