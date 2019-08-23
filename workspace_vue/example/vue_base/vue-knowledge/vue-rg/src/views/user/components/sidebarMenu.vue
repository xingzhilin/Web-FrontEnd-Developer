<template>
    <Menu class="left-menu-sin" width="100%" :active-name="currentMenu" :open-names="currentFolder" :accordion="isAccordion" @on-open-change="openChangeMenu" @on-select="changeMenu">
        <MenuItem name="main">
            <Icon type="ios-home"></Icon>
            用户首页
        </MenuItem>
        <Submenu name="myFinance">
            <template slot="title">
                <Icon type="ios-folder" />
                我的融资
            </template>
            <MenuItem name="application"><Icon type="ios-paper" />我的贷款</MenuItem>
            <!--<MenuItem name="myLoan"><Icon type="ios-paper" />我的贷款</MenuItem>-->
            <!--<MenuItem name="myReturn"><Icon type="ios-paper" />我的还款</MenuItem>-->
        </Submenu>
        <Submenu name="limitApply">
            <template slot="title">
                <Icon type="ios-folder" />
                我的额度
            </template>
            <!--<MenuItem name="limitApply"><Icon type="ios-paper" />我的申请</MenuItem>-->
            <MenuItem name="limitManage"><Icon type="ios-paper" />额度管理</MenuItem>
        </Submenu>
        <Submenu name="myInfo">
            <template slot="title">
                <Icon type="ios-folder" />
                我的信息
            </template>
            <MenuItem name="authoritySee" v-if="getAuthSeeShows"><Icon type="ios-paper" />企业认证</MenuItem>
            <MenuItem name="authority" v-else><Icon type="ios-paper" />企业认证</MenuItem>
        </Submenu>
    </Menu>
</template>

<script>
    let vm = null;
    export default {
        name: "sidebarMenu",
        props: {
            menuList: Array,
        },
        data () {
            return {
                folder: '',
                isAccordion: false,
                currentMenu: this.currentMenuCpt(),
                currentFolder: this.currentFolderCpt(),
            }
        },
        methods: {
            changeMenu (active) {
                let subMenu = active;
                this.$store.commit('setCurrentMenu', active);
                if(subMenu == 'main'){
                    this.$router.push({path: '/user/'});
                } else {
                    this.$router.push({path: '/user/'+ subMenu});
                }
            },
            openChangeMenu (active) {
                this.folder = active;
                this.$store.commit('setCurrentFolder', this.folder);
            },
            /**
             * 当前选中菜单
             * */
            currentMenuCpt: function() {
                let history = localStorage.getItem('currentMenu') || '';
                let path = this.$route.path;
                if (path == '/user/') {
                    history = 'main';
                }
                return history;
            },
            /**
             * 当前选中菜单目录
             * */
            currentFolderCpt: function() {
                let history = localStorage.getItem('currentFolder') || '';
                let path = this.$route.path;
                if (path == '/user/') {
                    history = '';
                }
                return history.split(',');
            },
        },
        created () {
            //console.log(this.menuList)
        },
        mounted () {
            vm = this;
        },
        computed : {
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getAuthSeeShows (){
                return this.$store.getters.getAuthSeeShow
            }
        }
    }
</script>

<style lang="less">
.left-menu-sin{width:200px; height:100%; background: transparent !important;color:#fff; padding-top:15px;
    .ivu-menu-item{color:#fff}
    .ivu-menu-item:hover{background: transparent !important;}
    .ivu-menu-submenu-title:hover{background: transparent !important;}
    .ivu-menu-item-active:not(.ivu-menu-submenu){color:#fff !important;background: #22ACEB !important;}
}

</style>



// WEBPACK FOOTER //
// src/views/user/components/sidebarMenu.vue