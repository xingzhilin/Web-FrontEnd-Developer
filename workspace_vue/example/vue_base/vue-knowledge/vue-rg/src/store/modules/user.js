import Cookies from 'js-cookie';
import axios from 'axios'
import store from '../index';
const user = {
    state: {
        openUser: null,
        currentMenu: 'main',
        currentFolder: [],
        token: '',
        userName: '',
        uid: '',
        entId: '',
        entStatusCodes: 0,
        goLogin: false,
        tokenInfo: false,
        entType: 0,
        supplierId: 0,
        userType:0,
        entName: '',
        record: '',
        YBTstate: -1,
        LSDstate: -1,
        KDstate: -1,
        DHDstate: -1,
        authSeeShow: false,
        creditCode: '',
        limitAppId: '',
        entTypeLsd: '1',
        medicalInsurance: '',
        classification: 0,
        companySysteShow: false,
        isHouse: false,
        isCarShow: false,
        enterpriseName: ''
    },
    getters: {
        getUserName: state => {
            return state.userName
        },
        getToken: state => {
            return state.token
        },
        getUid: state => {
            return state.uid
        },
        getEntId: state => {
            return state.entId
        },
        getEntStatusCodes: state => {
            return state.entStatusCodes
        },
        getGoLogin: state => {
            return state.goLogin
        },
        getTokenInfo: state => {
            return state.tokenInfo
        },
        getEntType: state => {
            return state.entType
        },
        getSupplierId: state => {
            return state.supplierId
        },
        getUserType: state => {
            return state.userType
        },
        getEntName: state => {
            return state.entName
        },
        getRecord: state => {
            return state.record
        },
        getYBTstate: state => {
            return state.YBTstate
        },
        getLSDstate: state => {
            return state.LSDstate
        },
        getKDstate: state => {
            return state.KDstate
        },
        getDHDstate: state => {
            return state.DHDstate
        },
        getAuthSeeShow: state => {
            return state.authSeeShow
        },
        getCreditCode: state => {
            return state.creditCode
        },
        getLimitAppId: state => {
            return state.limitAppId
        },
        getEntTypeLsd: state=> {
            return state.entTypeLsd
        },
        getMedicalInsurance: state=> {
            return state.medicalInsurance
        },
        getClassification: state => {
            return state.classification
        },
        getCompanySysteShow: state => {
            return state.companySysteShow
        },
        getIsHouse: state => {
            return state.isHouse
        },
        getIsCarShow: state => {
            return state.isCarShow
        },
        getEnterpriseName: state => {
            return state.enterpriseName
        }
    },
    mutations: {
        setUser: function (state, user) {
            state.openUser = user;
        },
        setCurrentMenu (state, currentMenu) {
            state.currentMenu = currentMenu;
            localStorage.setItem('currentMenu', currentMenu)
        },
        setCurrentFolder (state, currentFolder) {
            state.currentFolder = currentFolder;
            localStorage.setItem('currentFolder', state.currentFolder)
        },
        setToken (state, tokens) {
            state.token = tokens
        },
        setUserName (state, name) {
            state.userName = name
        },
        setUid (state, id) {
            state.uid = id
        },
        setEntId (state, enid) {
            state.entId = enid
        },
        setEntStatusCodes (state, enidStatusCode) {
            state.entStatusCodes = enidStatusCode
        },
        setGoLogin (state,login) {
            state.goLogin = login
        },
        getTokenInfo (state, tokens) {
            state.tokenInfo = tokens
        },
        setEntType (state, type) {
            state.entType = type
        },
        setSupplierId (state, id) {
            state.supplierId = id
        },
        setUserType (state, type) {
            state.userType = type
        },
        setentName (state, name) {
            state.entName = name
        },
        setRecord (state, records) {
            state.record = records
        },
        setYBTstate (state, items) {
            state.YBTstate = items
        },
        setLSDstate (state, items) {
            state.LSDstate = items
        },
        setKDstate (state, items) {
            state.KDstate = items
        },
        setDHDstate (state, items) {
            state.DHDstate = items
        },
        setAuthSeeShow (state, isShow) {
            state.authSeeShow = isShow
        },
        setCreditCode (state, id) {
            state.creditCode = id
        },
        setLimitAppId (state, id) {
            state.limitAppId = id;
        },
        setEntTypeLsd: (state, type)=> {
            state.entTypeLsd = type
        },
        setMedicalInsurance: (state, type)=> {
            state.medicalInsurance = type
        },
        setClassification: (state, type)=> {
            state.classification = type
        },
        setCompanySysteShow: (state, boolean) => {
            state.companySysteShow= boolean
        },
        setIsHouse: (state, boolean) => {
            state.isHouse= boolean
        },
        setIsCarShow: (state, boolean) => {
            state.isCarShow= boolean
        },
        setEnterpriseName: (state, name) => {
            state.enterpriseName = name;
        }
    },
    actions: {
        getLimitCredits ({commit}, {_self}) {
            return _self.$https.get('/api-webbff/v1/limit/getLimitCredit')
                .then(res => {
                    if (res.data.success === 1) {
                        let arrStateOne = [-1,5,6,8];
                        let arrStateTwo = [1,3];
                        let arrStateThree = [0,2,4];
                        let arrStateDHDone = [-1,2,5,6,8]; // 单独跳转逻辑
                        let arrStateDHDthree= [0,4]; // 单独跳转逻辑
                        for (let item of res.data.data) {
                            if (item.btnType === 1) {
                                if (arrStateOne.includes(item.state)) {
                                    commit('setYBTstate', -1)
                                }
                                if (arrStateTwo.includes(item.state)) {
                                    commit('setYBTstate', 0)
                                }
                                if (arrStateThree.includes(item.state)) {
                                    commit('setYBTstate', 1)
                                }
                            } else if (item.btnType === 2) {
                                if (arrStateOne.includes(item.state)) {
                                    commit('setLSDstate', -1)
                                }
                                if (arrStateTwo.includes(item.state)) {
                                    commit('setLSDstate', 0)
                                }
                                if (arrStateThree.includes(item.state)) {
                                    commit('setLSDstate', 1)
                                }
                            } else if (item.btnType === 3) {
                                if (arrStateOne.includes(item.state)) {
                                    commit('setKDstate', -1)
                                }
                                if (arrStateTwo.includes(item.state)) {
                                    commit('setKDstate', 0)
                                }
                                if (arrStateThree.includes(item.state)) {
                                    commit('setKDstate', 1)
                                }
                            } else if (item.btnType === 4) {
                                if (arrStateDHDone.includes(item.state)) {
                                    commit('setDHDstate', -1)
                                }
                                if (arrStateTwo.includes(item.state)) {
                                    commit('setDHDstate', 0)
                                }
                                if (arrStateDHDthree.includes(item.state)) {
                                    commit('setDHDstate', 1)
                                }
                            }
                        }
                    } else {
                        console.log('信息获取失败！')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getAuth ({commit}, {_self, id}) {
            return _self.$https.post('/api-webbff/v1/member/getEntAuthAuditProgress2RGT',{
                entId: id
            }).then(res => {
                let entAuthInfo = res.data.data;
                if (res.data.success === 1) {
                    if (entAuthInfo.entStatusCode === undefined) {
                        commit('setEntStatusCodes', 0);
                    } else {
                        commit('setEntStatusCodes', entAuthInfo.entStatusCode);
                    }
                }
            }).catch(err => {
                window.console.log(err)
            })
        },
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
        getAdressInfo ({commit}, {_that,codes}) {
            return new Promise ((resolve, reject) => {
                _that.$https.post('/api-webbff/v1/common/getAddressByLcode', {
                    lcode: codes
                })
                    .then(res => {
                        resolve(res.data.data);
                    })
                    .catch(err => {
                        reject(1); //跳转到登录页
                    })
            })
        },
        /**
         * 登出清理缓存
         */
        clearLocalStorageWhenLogout (context) {
            localStorage.clear();
            context.commit('setToken', '');
        },
        /**
         * PC端联合登录
         */
        loginJointForMemberOnPC ({commit}, {token}) {
            return axios.post('/api-webbff-unauth/v1/member/loginJointForMemberOnPC',{
                token: token
            }).then(res => {
                if (res.data.success === 1) {
                    commit('setToken', res.data.data.token);
                    commit('setUid', res.data.data.userId);
                    commit('setEntId', res.data.data.entId);
                    commit('setEntType', res.data.data.entType);
                    commit('setSupplierId', res.data.data.supplierId);
                    commit('setUserType', res.data.data.userType);
                    commit('setUserName', res.data.data.userName);
                    commit('setentName', res.data.data.entName);

                    dispatch('getAuth',{_self: this, id: res.data.data.entId}).then(() => { }) // 获取企业认证状态
                    dispatch('getLimitCredits', {_self: this}) // 获取申请授信状态
                } else {
                    console.log('[联合登录]获取信息失败, token=' + token);
                }
            }).catch(err => {
                console.log('[联合登录]' + err);
            })
        }
    }
};

export default user;



// WEBPACK FOOTER //
// ./src/store/modules/user.js