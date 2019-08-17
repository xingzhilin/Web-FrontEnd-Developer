import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './router';
Vue.use(VueRouter);
// 路由配置
const RouterConfig = {
    //mode: util.routeMode,
    base: '/',
    routes: routers,
    linkExactActiveClass: 'active',
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
router.afterEach((to,from,next) => {

});



// WEBPACK FOOTER //
// ./src/router/index.js
