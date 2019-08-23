<template>
    <div class="header" ref="main-header-con">
        <div class="logos">
            <router-link to="/"><img src="../img/logo-white.png" class="top-logo" /></router-link>
        </div>
        <div class="nav-right">
            <i class=" iconfont icon-yonghu3">&#xe601;</i>
            <a class='login-status' href='javascript:void(0);' v-if="entNames === '' || entNames === null">{{userName}}</a>
            <a class='login-status' href='javascript:void(0);' v-else>{{entNames}}</a>
            <a class='login-status-t' href='javascript:void(0);' @click="logout">退出</a>
        </div>
    </div>
</template>

<script>
    let vm = null;
    import Cookies from 'js-cookie';
    export default {
        name: 'header-bar',
        components: {},
        data() {
            return {
                //
            }
        },
        created: function () {
            vm = this;
        },
        computed: {
            userName () {
                return this.$store.getters.getUserName
            },
            entNames () {
                return this.$store.getters.getEntName
            }
        },
        methods: {
            logout () {
                let domain = location.hostname.substr(location.hostname.indexOf('.'), location.hostname.length);
                this.$store.commit('setLimitAppId', '');
                this.$store.commit('setToken', '');
                this.$store.commit('setUserName', '');
                this.$store.commit('setUid', '');
                Cookies.remove('mph_sess_id',{domain: domain});
                Cookies.remove('ticket',{domain: domain });
                this.$router.push({path: '/'});
            }
        }

    }
</script>

<style scoped lang="less">
    @import '../assets/css/reset.css';
    .header {
        background-color: #333;
        position: relative;
        height:60px;
        position: fixed;
        top:0;
        width:100%;
        z-index: 88;
        .logos {
            font-size: 24px;
            color: white;
            display: inline-block;
            padding: 10px 20px;
            margin-right: 20px;
        }
        .nav-right {
            position: absolute;
            right: 20px;
            top: 13px;
            color: #fff;
            a{
                color:#fff
            }
            .login-status-t{margin-left:10px}
        }
        .top-logo{height:35px;}
    }
</style>



// WEBPACK FOOTER //
// src/components/HeaderBarUser.vue