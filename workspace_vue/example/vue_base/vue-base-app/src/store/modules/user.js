//import Cookies from 'js-cookie';
import axios from 'axios'
import store from '../index';
const user = {
    state: {
        token: '',
        authSeeShow: false,
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getAuthSeeShow: state => {
            return state.authSeeShow
        }
    },
    mutations: {
        setToken (state, tokens) {
            state.token = tokens
        },
        setAuthSeeShow (state, isShow) {
            state.authSeeShow = isShow
        },
        //修改状态数据
        setCurrencyData: function(state, data){
          state.currencyData = data;
        }
    },
    actions: {
        getTokenState ({commit}) {
            axios.post('/api-webbff-unauth/v1/member/getUserInfoByToen2RGT',{
                token: store.state.user.token
            }).then(res => {
            }).catch(err => {
                window.console.log(err)
            })
        },
        getTokenInfo ({commit}) {
            return new Promise ((resolve, reject) => {
                axios.get(`/api-webbff-unauth/v1/member/validateToken/${store.state.user.token}`)
                .then(res => {
                    if (res.data.success === 0) {
                        console.log(res.data.error.code);
                        if (Number(res.data.error.code) === 498) {
                            reject(1); //跳转到登录页
                        } else {
                            resolve(2); //停留在原地
                        }
                    } else {
                        resolve(3); //跳转到目的页
                    }
                })
            })
        },
        /**
         * 登出清理缓存
         */
        clearLocalStorageWhenLogout (context) {
            localStorage.clear();
            context.commit('setToken', '');
        }
    }
};

export default user;