import Vue from 'vue'
import iView from 'iview';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store';
import MuseUI from 'muse-ui'
import 'iview/dist/styles/iview.css';
import 'muse-ui/dist/muse-ui.css'
import App from './App.vue'
import {cssSrc} from './assets/css/reset.css'
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import "babel-polyfill"
/*引入公共样式*/
import {router} from './router/index'
import {filters} from './filter/filter'
import Cookies from "js-cookie";
import config from '../config/project';
import env from '../build/env';
import http from './service/http';
import utils from './libs/util';
import utilFinance from './libs/utilFinance';
Vue.prototype.$https = http;
Vue.prototype.$cookie = Cookies;
Vue.prototype.$server = config.server[env];
Vue.prototype.$utils = utils;
Vue.prototype.$utilFinance = utilFinance;
Vue.prototype.$echarts = echarts;
Vue.use(iView);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(MuseUI);
Vue.use(Vuex);
Vue.use(Loading);
Vue.use(ElementUI);
Vue.use(Toast, {
    position: 'bottom',
    close: false,
    errorIcon: false
});

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;    //  全局变量

const app = new Vue({
    el: '#app',
    router: router,
    src: cssSrc,
    store: store,
    filters: filters,
    render: h => h(App)
}).$mount('#app');

export default app



// WEBPACK FOOTER //
// ./src/main.js