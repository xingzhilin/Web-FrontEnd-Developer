@import '@/assets/layout.less';
<template>
    <div class="header-w">
        <div class="header-top-box">
            <div class="header-top-con">
                <div class="header-Slogan">欢迎来到我的药金融</div>
                <div class="header-login" v-if="!userName">
                    <a href="/login" @click="recordState('/')">请登录</a><span class="mtb-line">|</span><a href="/register">免费注册</a>
                </div>
                <div class="login-user" v-if="userName"><div class="user-con">
                    <span v-if="entNames === '' || entNames === null">{{userName}}</span>
                    <span v-else>{{entNames}}</span>
                </div><a href="javascript:void(0);" @click="logout">退出</a></div>
                <div class="header-r-nav">
                    <a href="javascript:void(0)"  @click="userbtn('/user/')">个人中心</a><span class="mtb-line">|</span>
                    <a href="javascript:void(0)" @click="toMph('/user/')" target="_blank">我的医药网</a>

                </div>
                </div>
        </div>
        <div class="header" ref="main-header-con">
        <div class="width-1200">
        <div class="logo">
            <a href="/"><img src="../img/logo-white.png"></a>
        </div>

            <Menu class="nav" mode="horizontal" :active-name="currentMenu" @on-select="changeMenu">
                <MenuItem name="index">
                    首页
                </MenuItem>
                <Submenu name="views">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        产品列表
                    </template>
                        <MenuItem name="productList">金融产品</MenuItem>
                        <MenuItem name="productYBT">药白条</MenuItem>
                        <MenuItem name="productLSD">流水贷</MenuItem>
                        <MenuItem name="productKD">快贷</MenuItem>
                </Submenu>

                <MenuItem name="cooperation">
                    商务合作
                </MenuItem>

                <MenuItem name="aboutUs">
                    关于我们
                </MenuItem>
            </Menu>

        <!--<template v-if="ajaxLogin">
            <div class="nav-right" v-if="user">
                <i class=" iconfont icon-yonghu3">&#xe601;</i>
                <a class='login-status' href='javascript:void(0);'>{{user.ename || user.mname}}</a>
                <a class='login-status-t' href='javascript:void(0);' @click="logout">登出</a>
            </div>
            <div class="nav-right" v-else>
                <mu-button flat class="login-btn" :to="{path:'/login'}">登录</mu-button>
                <mu-button flat class="register-btn" :to="{path:'/register'}">注册</mu-button>
            </div>
        </template>-->

    </div>
        </div>
    </div>
</template>

<script>
    let path = location.pathname;
    import Cookies from 'js-cookie';
    let vm = null;
    export default {
        name: 'header-bar',
        inject: ['reload'],
        components: {},
        data() {
            return {
                user: null,
                ajaxLogin: false,
                currentMenu: this.currentMenuCpt(),
            }
        },
        created: function () {
            vm = this;
            //this.getOpenUser();
        },
        computed: {
            userName () {
                return this.$store.getters.getUserName
            },
            entNames () {
                return this.$store.getters.getEntName
            },
            tokens () {
                return this.$store.getters.getToken
            }
        },
        methods: {
            // 记录登录前的状态
            recordState (val) {
                this.$store.commit('setRecord', val)
            },
            userbtn (val) {
                if (this.tokens.length > 1) {
                    this.$store.dispatch('getTokenInfo').then(res =>{
                        if (res === 3) {//1-跳转到登录页、2-停留在原地、3-跳转到目的页（从哪来回哪去）
                            this.$router.push({path: '/user/'});
                        }
                    })
                    .catch( err => {
                        this.$store.dispatch('clearLocalStorageWhenLogout').then(() => {
                            this.$router.push({path: '/login/'});
                        });

                    });
                } else {
                    this.$store.commit('setRecord', val)
                    this.$router.push({path: '/login/'});
                }
            },
            changeMenu (active) {
                let subMenu = active;
                // this.$store.commit('setCurrentMenu', active);
                if(subMenu == 'index'){
                    this.$router.push({path: '/'});
                } else {
                    this.$router.push({path: '/'+ subMenu});
                }
            },
            /**
             * 当前选中菜单
             * */
            currentMenuCpt: function() {
                // let history = localStorage.getItem('currentMenu') || '';
                let history = this.$route.name;
                let path = this.$route.path;
                if (path == '/') {
                    history = 'index';
                }
                return history;
            },

            getOpenUser: function () {
                let _this = this;
                if (this.$cookie.get('ticket')) {
                    this.$axios.get(vm.$utils.getSysApi()+ '/admin/user/get').then(function (res) {
                        _this.ajaxLogin = true;
                        _this.$store.commit('setUser', res);
                        _this.user = res;
                    }).catch(function () {
                        _this.$toast.error("服务器错误，请稍后重试");
                    })
                }else{
                    this.ajaxLogin = true;
                }
            },
            logout () {
                let domain = location.hostname.substr(location.hostname.indexOf('.'), location.hostname.length);
                this.$store.commit('setLimitAppId', '');
                this.$store.commit('setToken', '');
                this.$store.commit('setUid', '');
                this.$store.commit('setUserName', '');
                Cookies.remove('mph_sess_id',{domain: domain});
                Cookies.remove('ticket',{domain: domain });
                this.$router.push({path: '/'});
            },
            toMph: function () {
                let domain = location.hostname.substr(location.hostname.indexOf('.'), location.hostname.length);
                let url = location.protocol + '//www' + domain;
                window.open(url);
            }
        },
        watch: {
            '$route': function (to, from) {
                vm.currentMenu = vm.currentMenuCpt()
            }
        }

    }
</script>

<style lang="less">
    @import '../assets/css/common.less';
    .header-w{
        .header-top-box{
            height: 36px;
            line-height: 36px;
            background: #000;
            .mtb-line{
                margin: 0 5px;
            }
         .header-top-con{
             width: 1200px;
             margin: 0 auto;
             color: #999;
             font-size: 14px;
             .header-Slogan{
                 float: left;
             }
             .header-login{
                 float: left;
                 padding-left: 15px;
                 a{
                     color: #999;
                 }
             }
             .login-user{
                 float: left;
                 margin-left: 15px;
                 .user-con{
                     max-width: 300px;
                     height: 36px;
                     overflow: hidden;
                     float: left;
                 }
                 a{
                     margin-left: 15px;
                     color: #999;
                 }
             }
             .header-r-nav{
                 float: right;
                 a{
                     color: #999;
                 }
             }
         }
        }
    .header {
        background-color: rgba(25, 14, 8, 0.7);
        height:100px;
        position: absolute;
        top:36px;
        width:100%;
        z-index: 100;
    .mu-tab-wrapper{
        min-height: 100px;
        padding: 0;
    }
        .ivu-menu-light{
            background: transparent;
        }
        .ivu-menu-horizontal{
            height: 100px;
            line-height: 100px;
            border-bottom: none;
        }
        .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item{
            color: #AFAFAF;
            padding: 16px;
            text-align: center;
        }
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item,.ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu{
            color:#AFAFAF;
            border-bottom: none;
            font-size: 20px;
        }
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu .ivu-menu-item-active{
            border-bottom: none;
        }
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active{
            border-bottom: 4px solid #fff;
            color: #fff;
        }
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu{
            padding: 0;
            font-size: 20px;
        }
        .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected{
            background: #f3f3f3;
        }
        .ivu-menu-horizontal.ivu-menu-light:after{
            background: transparent;
        }
        .ivu-select-dropdown{
            border-radius: 0;
            background-color: rgba(25, 14, 8, 0.7);
            padding: 0;
        }
    }
    }
.main-header-con{
    height:60px;
}
    .header .nav-right {
        position: absolute;
        right: 0;
        top: 13px;
        color: #fff;
    }

    .header .nav-right .login-status {
        color: #fff;
        vertical-align: middle;
    }

    .header .nav-right .login-status-t {
        color: #ccc;
        vertical-align: middle;
        margin: 0 10px;
    }

    .header .nav-right .iconfont {
        font-size: 22px;
        vertical-align: middle;
    }

    .header .mu-tab-link {
        position: relative;
    }

    .header .mu-tab-link .mu-tab-link-highlight {
        width: 100%;
        background: none;
    }

    .header .mu-tab-link.router-link-active .mu-tab-link-highlight {
        background: #ff4081;
    }

    .ivu-select-dropdown{
        margin: 0;
    }

    .logo {
        font-size: 24px;
        color: white;
        float: left;
        height: 100px;
        line-height: 100px;
        margin-right: 20px;
        img{
            margin-top:25px;
        }
    }

    .nav {
        float: right;
        /*width: calc(100% - 150px);*/
        margin: 0 auto;
        max-width: 600px;
    }

    .tab {
        background-color: rgba(0, 0, 0, 0);
    }
    .tab .mu-tab{
        min-width: 80px;
    }
    .login-btn {
        color: white;
        min-width: 50px;
    }

    .register-btn {
        color: #4caf50;
        min-width: 50px;
    }
    .mu-tab-diy{
        margin: 0 10px;
    }
</style>



// WEBPACK FOOTER //
// src/components/HeaderBar.vue