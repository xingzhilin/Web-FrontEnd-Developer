<template>
<div class="Login" @keydown.enter="handleSubmit">
    <Header-Bar-Login-Register ref="HeaderBarLoginRegister"></Header-Bar-Login-Register>
    <div class="Login-con" :style="{background:'url('+bg+')' +'center no-repeat',backgroundColor:bgColor}">
     <div class="login-wrap">
         <!--<div class="setText">-->
             <!--药金融&#45;&#45;&#45;&#45;专注医药产业链融资服务，为医药行业客户提供一站式融资解决方案-->
         <!--</div>-->
         <div class="login" >
         <div class="login-text-top">
             “我的医药网”账户可直接登录
         </div>
            <div class="Form-w" v-if="loginWay">
                <Form ref="loginForm" class="loginForm" :model="form" :rules="rules">
                <FormItem prop="userName">
                    <Input v-model="form.userName" autofocus placeholder="请输入用户名">
                    <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                    </Input>
                </FormItem>

                <FormItem prop="password">
                    <Input v-model="form.password" type="password" ref="focusChanges" placeholder="请输入密码">
                    <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                    </Input>
                </FormItem>

                <FormItem class="no-b">
                    <template>
                        <Checkbox  v-model="form.checkboxs" @on-change="checkBoxChange">记住用户名</Checkbox>
                    </template>
                    <!--<a class="ar gray" href="#">快捷登录</a>-->
                    <!--<a class="ar" href="#" @click="removePassword()">忘记密码</a>-->
                </FormItem>

                    <FormItem>
                        <Button @click="handleSubmit" type="primary" class="submit" long>登录</Button>
                        <router-link class="ar" to="/register">
                            <span>立即注册</span>
                        </router-link>
                    </FormItem>
                </Form>
            </div>
         </div>
     </div>
    </div>
    <copy-right ref="footer"></copy-right>
</div>
</template>

<script>
    import copyRight from '../components/copyRight';
    import HeaderBarLoginRegister from '../components/HeaderBarLoginRegister';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    let Base64 = require('js-base64').Base64;
    import util from '../libs/util';
    axios.defaults.withCredentials = true;
    let vm = null;
    export default {
        name: "login",
        components: {copyRight ,HeaderBarLoginRegister},
        data () {
            return {
                bg:require('../img/Login-bg.png'),
                bgColor:'#E2A54D',
                loginWay: true, // 登录方式的转换
                form: {
                    userName: '',
                    password: '',
                    checkboxs: false
                },
                rules: {
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            userName () {
                return this.$store.getters.getUserName
            },
            getTokenInfo () {
                return {Authorization: this.$store.getters.getToken}
            },
            getRecords () {
                return this.$store.getters.getRecord
            }
        },
        methods:{
            //
            checkBoxChange (val) {
                this.$refs.focusChanges.focus()
            },
            userLogin(){
                if(this.$store.getters.getToken && this.$store.getters.getUserName){
                    this.$router.push({path: '/user/'});
                }else {
                    this.$router.push({path: '/login/'});
                }
            },
            // 登陆时获取登陆信息
            getLoginInfo () {
              if (Cookies.get('loginInfo') !== undefined) {
                  let userinfo =Cookies.getJSON('loginInfo')
                  this.form.userName = Base64.decode(userinfo.userName)
                  // this.form.password =  Base64.decode(userinfo.userPwd)
                  this.form.checkboxs = userinfo.checkboxs
              }
            },
            // 忘记密码
            removePassword () {
                this.form.checkboxs = false
                let userInfo = {
                    userName: Base64.encode(''),
                    userPwd: Base64.encode(''),
                    checkboxs: false
                }
                Cookies.set('loginInfo', userInfo)
            },
            // 登录
            handleSubmit () {
                let self = this;
                self.$refs.loginForm.validate((valid) => {
                    if(valid){
                        self.$Loading.start();
                        let _params = {
                            userName: self.form.userName,
                            userPwd: self.form.password
                        }
                        axios.post('/api-webbff-unauth/v1/member/loginForMember', _params).then(res => {
                            if (res.data.success === 1) {
                                self.$store.commit('setToken', res.data.data.token);
                                self.$store.commit('setUid', res.data.data.userId);
                                self.$store.commit('setEntId', res.data.data.entId);
                                self.$store.commit('setEntType', res.data.data.entType);
                                self.$store.commit('setSupplierId', res.data.data.supplierId);
                                self.$store.commit('setUserType', res.data.data.userType);
                                self.$store.commit('setUserName', self.form.userName);
                                self.$store.commit('setentName', res.data.data.entName);

                                let domain = location.hostname.substr(location.hostname.indexOf('.'), location.hostname.length);
                                Cookies.set('mph_sess_id', res.data.data.sessionId, {expires: 24, domain: domain});
                                Cookies.set('ticket', res.data.data.token, {'expires': 24, domain: domain });
                                if (self.form.checkboxs) {
                                    let userInfo = {
                                        userName: Base64.encode(this.form.userName),
                                        userPwd: Base64.encode(this.form.password),
                                        checkboxs: self.form.checkboxs
                                    }
                                    Cookies.set('loginInfo', userInfo)
                                } else {
                                    self.removePassword()
                                }
                                self.$store.dispatch('getAuth',{_self: this, id: res.data.data.entId}).then(() => {
                                    self.$router.push({path: self.getRecords})
                                })
                                self.$store.dispatch('getLimitCredits', {_self: this}) // 获取申请授信状态
                            } else {
                                self.$Loading.finish();
                                self.$store.commit('setToken', '');
                                self.$store.commit('setUid', '');
                                self.$Message.error('登录失败，用户名/密码错误');
                            }
                        }).catch(e => {
                            self.$Loading.error(e);
                        });
                    }
                })
            }
        },
        mounted(){
            this.getLoginInfo()
            this.userLogin()
        },
        created: function () {
            vm = this;
        },
    }
</script>

<style lang="less">
.Login{
    .setText {
        line-height: 525px;
        margin-left: 50px;
        font-size: 20px;
        color: #ffffff;
    }
    .Login-con{
        background:#E2A54D url(../img/Login-bg.png) center no-repeat;
        height: 525px;
        .login-wrap{
            width: 1200px;
            height: 100%;
            position: relative;
            margin: 0 auto;
            .login{
                position: absolute;
                top: 60px;
                right: 43px;
                width: 364px;
                height: 357px;
                padding: 35px;
                background-color: #fff;
                overflow: hidden;
                .login-text-top{
                    text-align: center;
                    font-size: 16px;
                    color: #C77713;
                }
                .Form-w{
                    .ivu-input{
                        height: 40px;
                    }
                    .ivu-icon{
                        font-size: 23px !important;
                    }
                    .loginForm{
                        padding-top: 20px;
                    }
                    .ar{
                        float: right;
                        color: #666;
                        font-size: 14px;
                        span{
                            color: #E2A54D;
                        }
                    }
                    .gray{ padding-left: 6px;}
                    .no-b{
                        margin-bottom: 0;
                        label{
                            font-size: 14px;
                            color: #666;
                        }
                    }
                }
                .submit{
                    width: 100%;
                    height: 40px;
                    font-size: 16px;
                    font-weight: bold;
                    border: 0;
                    padding: 0;
                    color: #fff;
                    margin-top: 10px;
                    cursor: pointer;
                    background-color: #E9961E;
                }
            }
        }
    }
}
</style>



// WEBPACK FOOTER //
// src/views/Login.vue