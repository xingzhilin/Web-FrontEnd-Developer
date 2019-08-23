<template>
    <div class="layout">
        <div class="leftMenu">
            <sidebar-menu
                :menu-list="menuList"></sidebar-menu>
        </div>

        <div class="right-main-cnt">
            <router-view></router-view>
        </div>
        <div style="clear:both;overflow: hidden"></div>
    </div>
</template>

<script>
    import sidebarMenu from './components/sidebarMenu.vue';
    export default {
        name: "usercenter",
        components: {
            sidebarMenu,
        },
        data () {
            return {
                mainPageHeight: null
            }
        },
        methods: {
            //
        },
        computed: {
            menuList () {
                return [
                    /*{key: "main", icon: "", rank: 1, title: "首页",},
                    {
                        key: "myFinance",
                        icon: "",
                        rank: 1,
                        title: "我的融资",
                        children: [
                            {key: "application", icon: "", rank: 1, title: "贷款申请"},
                            {key: "myLoan", icon: "", rank: 1, title: "我的贷款"},
                            {key: "myReturn", icon: "", rank: 1, title: "我的还款"}
                        ]
                    },*/
                ]
            },
        },
        created () {
            //
            this.mainPageHeight = window.innerHeight  - 120;
        },
        updated () {
            //

        },
        mounted(){
            //
        }
    }
</script>

<style scoped lang="less">
    .layout {}
    .leftMenu{
        float:left;
        position:fixed;
        top:60px;
        left:0;
        width:200px;
        height:100%;
        background: #0E92CE;
        z-index: 99;
    }
    .ivu-menu-item-active{
        color:#000;
    }
    .right-main-cnt{
        margin-left:200px;
        overflow: hidden;
        /*min-width:1140px;*/
    }
</style>



// WEBPACK FOOTER //
// src/views/user/index.vue