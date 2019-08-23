<template>
        <div id="app" class="layout-app" style='min-width:1000px;'>
            <header-bar @callFixedCr="fixedCr" ref="headerBar" v-if="!userCenter"></header-bar>
            <header-bar-user v-if="headerif"></header-bar-user>
            <div :class="{'main-page':headerif}" :style="{minHeight: mainPageHeight + 'px'}">
                <router-view @callFixedCr="fixedCr" v-if="isRouterAlive"></router-view>
            </div>
    
            <div class="main-footer" :class="{'cr-none': userCenter, 'cr-normal': !userCenter}">
                <copy-right ref="footer"></copy-right>
            </div>
            <!-- 超时提示 需退出登录 -->
            <!--<Modal-->
                    <!--v-model="logouts"-->
                    <!--title="提示"-->
                    <!--@on-ok="goLogin"-->
                    <!--@on-cancel="cancel">-->
                <!--<p class="setTips">会话超时,请重新登录</p>-->
            <!--</Modal>-->
            <!-- 超时提示 需退出登录 -->
            <!--<Modal-->
                    <!--v-model="logoutToken"-->
                    <!--title="提示"-->
                    <!--@on-ok="goLogin"-->
                    <!--@on-cancel="cancel">-->
                <!--<p class="setTips"></p>-->
            <!--</Modal>-->
        </div>
    </template>
    <script>
        let vm = null;
        import HeaderBar from './components/HeaderBar'
        import HeaderBarUser from './components/HeaderBarUser'
        import copyRight from './components/copyRight'
        export default {
            name: 'app',
            components: {HeaderBar, HeaderBarUser, copyRight},
            data() {
                return {
                    logoutToken: false,
                    logouts: false,
                    userCenter: false,
                    headerif:false,
                    isRouterAlive: true,
                    mainPageHeight: null
                }
            },
            provide() {
                return {
                    reload: this.reload
                }
            },
            computed: {
                loginChange () {
                    return this.$store.getters.getGoLogin;
                },
                tokenChange () {
                    return this.$store.getters.getTokenInfo;
                }
            },
            watch:{
                $route(to,from){
                    let _this = this;
                    setTimeout(function () {
                        _this.fixedCr();
                    },300)
                },
                loginChange (val) {
                    if (!this.logouts) {
                        // this.logouts = true;
                        this.goLogin()
                    }
                },
                tokenChange (val) {
                    if (!this.logoutToken) {
                        // this.logoutToken = true;
                        this.goLogin()
                    }
                }
            },
            methods: {
                goLogin () {
                    this.$store.commit('setToken', '');
                    this.$store.commit('setUid', '');
                    this.$router.push({path:'/login/'})
                },
                cancel () {
                    this.logouts = false;
                },
                fixedCr: function () {
                    let _this = this;
                    var _wh = window.innerHeight;
                    var _bh = document.body.offsetHeight;
                    // if (_bh < _wh) {
                    //     this.fixed = true;
                    // } else {
                    //     this.fixed = false;
                    // }
                    //
                    // window.onload = function () {
                    //     _this.fixedCr();
                    // }
                },
                reload() {
                    this.isRouterAlive = false;
                    this.$nextTick(function () {
                        this.isRouterAlive = true;
                    })
                },
                headerFooterShow () {
                    //用户中心footer hidden
                    if (this.$route.name) {
                        let routePosi = this.$route.name.indexOf('user-center');
                        let routeLogin = this.$route.name.indexOf('login');
                        let routeRegister = this.$route.name.indexOf('register');
    
                        if (routePosi == 0) {
                            this.userCenter = true;
                            this.headerif=true;
                        }else if(routeLogin==0) {
                            this.userCenter = true;
                            this.headerif=false;
                        }else if(routeRegister==0) {
                            this.userCenter = true;
                            this.headerif=false;
                        } else {
                            this.userCenter = false;
                            this.headerif=false;
                        }
                    } else {
                        this.userCenter = false;
                        this.headerif=false;
                    }
                    //用户中心header改变
    
                }
            },
            created: function () {
                vm = this;
                //this.mainPageHeight=window.innerHeight-(this.$refs['headerBar'].$el.offsetHeight+this.$refs['footer'].$el.offsetHeight)
                this.mainPageHeight = window.innerHeight - 121;
    
            },
            updated () {
                vm.headerFooterShow()
            },
            mounted () {
                vm.headerFooterShow()
            },
        }
    </script>
    <style scoped lang="less">
        .footer{}
        .cr-fixed{
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
        }
        .cr-none{display: none}
        .cr-normal{
            position: static;
            bottom: auto;
            left: auto;
        }
        .main-page{margin-top:60px}
        .main-footer{height:60px;}
        .layout-app{background: #fff;}
        .setTips {
            text-align: center;
            font-size: 14px;
        }
    </style>
 