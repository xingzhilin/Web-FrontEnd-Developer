<template>
    <div class="Login-register-top-w">
        <div class="Login-top clearfix">
            <div class="Login-top-r">
                <img src="../img/Tele-icon.png"> 400-060-3351
            </div>
            <div class="Login-top-l">
                <div class="middleLine">
                    <img src="../img/Login-logo.png">
                </div>
                <div class="Login-top-text" v-if="ifLoginRegister">用户登录</div>
                <div class="Login-top-text" v-if="!ifLoginRegister">用户注册</div>
            </div>
        </div>
    </div>
</template>

<script>
    let vm = null;
    export default {
        name: 'HeaderBarLoginRegister',
        components: {},
        data() {
            return {
                ifLoginRegister: false
            }
        },
        created: function () {
            vm = this;
        },
        methods: {
            headerShow() {
                let routeLogin = this.$route.name.indexOf('login');
                let routeregister = this.$route.name.indexOf('register');
                if (routeLogin == 0) {
                    this.ifLoginRegister = true;
                } else if (routeregister == 0) {
                    this.ifLoginRegister = false;
                } else {
                    this.ifLoginRegister = false;
                }
            }
        },
        updated() {
            this.headerShow()
        },
        mounted() {
            this.headerShow()
        },

    }
</script>

<style lang="less">
    .Login-register-top-w {
        line-height: 94px;
        background: #fff;
        border-bottom: solid 1px #979797;

        .Login-top {
            width: 1200px;
            margin: 0 auto;

            .Login-top-l {
                float: left;
                position: relative;
                .middleLine {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    margin-top: -18px;
                    height: 36px;
                    line-height: 36px;
                    float: left;
                    border-right: 1px solid #DDDDDD;
                    img {
                        margin-right: 20px;
                        height: 36px;
                    }
                }
                .Login-top-text {
                    margin-left: 234px;
                    padding-left: 20px;
                    display: inline-block;
                    color: #E2A54D;
                    font-size: 28px;
                }
            }

            .Login-top-r {
                float: right;
                color: #E2A54D;
                font-size: 34px;
                img {
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/components/HeaderBarLoginRegister.vue