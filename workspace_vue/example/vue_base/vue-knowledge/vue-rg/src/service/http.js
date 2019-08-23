//引入axios
import axios from 'axios'
import store from '../store';
import {router} from '../router/index'
//请求拦截器
const servers = axios.create({
    timeout: 100000
});
//响应拦截器即异常处理

servers.defaults.headers.common['Authorization'] = store.state.user.token;
// 添加请求拦截器
servers.interceptors.request.use(config => {
// 在发送请求之前做些什么
// 判断是否存在token，如果存在将每个页面header都添加token
    if (store.state.user.token) {
        config.headers.common['Authorization'] = store.state.user.token;
    }
    if (config.method === 'get') {
        config.url = config.url.includes('?') ? `${config.url}&_timestamp=${new Date().getTime()}` : `${config.url}?_timestamp=${new Date().getTime()}`;
    }
    return config;
}, error => {
// 对请求错误做些什么
    return Promise.reject(error);
});
// http response 拦截器
servers.interceptors.response.use(
    response => {
        if (response.data.success === 0) {
            switch (Number(response.data.error.code)) {
                case 498:
                    if (store.state.user.goLogin) {
                        store.commit('setToken', '');
                        store.commit('setUserName', '');
                        store.commit('setGoLogin', false)
                    } else {
                        store.commit('setToken', '');
                        store.commit('setUserName', '');
                        store.commit('setGoLogin', true)
                    }
                    break;
                case 598:
                    store.dispatch('getTokenState'); // 调用此接口后，后端回拿token判断是不是融贯通错误，如果是返回597
                    store.commit('setToken', '');
                    store.commit('setUserName', '');
                    break;
                case 597:
                    store.commit('setUserName', '');
                    store.commit('setToken', '');
                    store.commit('setUid', '');
                    router.push({path:'/login/'})
                    break;
                }
        }
        return response;
    },
    error => {
        return Promise.reject(error.message);
    });

export default servers;



// WEBPACK FOOTER //
// ./src/service/http.js