<template>
    <div class="myfooter" :class="{'myfooter-login': ifrouteLogin}">
        <div class="myfooter-top">
                <a href="/">首页</a>
                <a href="/productList">产品列表</a>
                <a href="/cooperation">商务合作</a>
                <a href="/aboutUs" class="bor-no">关于我们</a>
        </div>
        <p>
            <a href="http://www.miitbeian.gov.cn" target="_blank">京ICP备07504877号</a>|
            <a target="_blank" href="https://img.mypharma.com/mph/h5/drct/certificate.html?id=0">互联网药品交易服务资格证编号：国A20150007</a>|
            <a href="http://www.miitbeian.gov.cn" target="_blank">经营许可证编号：京ICP证151141号</a>|
            <a href="https://img.mypharma.com/mph/h5/drct/certificate.html?id=1" target="_blank">互联网药品信息服务资格证编号：(京)-经营性-2017-0019</a>
        <br>
            Copyright©2004-2016 Mypharma.com 北京融贯电子商务有限公司 版权所有
        </p>

    </div>
</template>

<script>
    let path = location.pathname;
    export default {
        name: 'copy-right',
        components: {},
        data() {
            return {
                ifrouteLogin: false,
            }
        },
        methods: {
            headerFooterShow () {
                if (this.$route.name) {
                    let routeLogin = this.$route.name.indexOf('login');
                    let routeregister = this.$route.name.indexOf('register');
                    if (routeLogin == 0 || routeregister == 0) {
                        this.ifrouteLogin = true;
                    } else {
                        this.ifrouteLogin = false;
                    }
                } else {
                    this.ifrouteLogin = false;
                }
            }
        },
        updated () {
            this.headerFooterShow()
        },
        mounted () {
            this.headerFooterShow()
        },
    }
</script>

<style scoped lang="less">
    .myfooter-login{
        background: #fff !important;
        .myfooter-top{
            background: #fff !important;
            margin-top: 20px !important;
            a{
                color: #A7A7A7 !important;
            }
        }
        p{
            color: #A7A7A7 !important;
            a{
             color: #A7A7A7 !important;
            }
        }
    }
    .myfooter,.myfooter-login{background: #777;
        text-align: center;
    .myfooter-top{
        height: 40px;
        line-height: 40px;
        background: #666;
        text-align: center;
        margin: 0 auto;
        .bor-no{
            border-right:none;
        }
            a{
                &:after{
                    border-right:none;
                     }
                border-right: solid 1px #D8D8D8;
                color: #fff;
                font-size: 14px;
                height: 15px;
                line-height: 15px;
                padding:0 10px;
        }
    }
        p{
            color: #fff;
            font-size: 12px;
            padding: 30px 0;
            a{
                color:#fff;
                padding: 0 5px;
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/components/copyRight.vue