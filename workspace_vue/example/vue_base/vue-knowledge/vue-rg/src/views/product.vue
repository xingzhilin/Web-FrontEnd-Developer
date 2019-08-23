<template>
    <div class="product">
        <banner
                :offApply="offApply"
                :list="list"
                :looptime="looptime"
                :width="width"
                :height="height"
                :background="background"
                @prev="prev"
                @next="next"
                @change="changeBanner"
                @click="bannerClick">
        </banner>
        <div class="product-con width-1200">
            <div class="product-con-th">
                <!--<a href="#" class="more">查看更多></a>-->
                <span class="th">金融产品分类</span>
            </div>
            <div class="product-list-con">
                <div class="product-list clearfix" v-for="item in productData">
                    <div class="float-l width-per-10"><div class="product-list-icon">{{item.name}}</div></div>
                    <div class="float-l width-per-20">
                        <h4 class="th">{{item.depictTh}}</h4>
                        <p class="depict">{{item.depict}}</p>
                    </div>
                    <div class="float-l width-per-10">
                        <div class="th-rate">{{item.rateTh}}</div>
                        <div class="rate">{{item.rate}}</div>
                    </div>
                    <div class="float-l width-per-10">
                    <div class="quota-th">{{item.quotaTh}}</div>
                    <div class="quota">{{item.quota}}</div>
                    </div>
                    <div class="float-l width-per-13">
                        <div>
                            {{item.loan}}
                        </div>
                        <div class="margin-top-5">
                            {{item.loanType}} &nbsp;
                        </div>
                        <div>
                            {{item.loanDepict}}
                        </div>
                    </div>
                    <div class="float-l width-per-14">
                        <div>{{item.loanTime}}</div>
                        <div class="margin-top-22">{{item.loanTimeDepict}}</div>
                    </div>
                    <div class="float-l width-per-20">
                        <div class="btn">
                            <Button type="warning" @click="loanApply(item.btnType)">立即申请</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal v-model="modalLogin" width="360" class="modalLogin-w">
            <p slot="header" style="color:#0077cc;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <p>请先登录之后，申请！</p>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long  @click="btnLogin">登录</Button>
            </div>
        </Modal>

        <Modal v-model="modalFPD" width="1020" class="classModalFPD"
               title="发票贷">
            <div class="bg">
                <ul style="position: absolute;left:383px;top:250px">
                    <li style="font-size:16px;line-height: 23px;">在开票电脑上安装'蜜蜂助手'<br>登录下载链接官网 <a href="https://dk.llschain.com" target="_blank" style="color:#289cff;">dk.llschain.com</a>，下载安装'蜜蜂助手'。<a href="http://branding.llschain.com/firststep1.pdf" target="_blank" style="color:#289cff;font-size:16px;">安装指引&gt;</a></li>
                    <li style="padding-top: 24px;line-height: 23px;font-size: 16px;">微信扫描左边二维码进入小程序发起融资申请。<a href="http://branding.llschain.com/secondstep2.zip" style="color:#289cff;font-size:16px;">申请流程视频指引&gt;</a></li>
                    <li style="padding-top: 24px;line-height: 23px;font-size: 16px;">融资额度激活及提款。<a href="http://branding.llschain.com/thirdstep3.zip" style="color:#289cff;font-size:16px;">额度激活视频指引&gt;</a></li>
                </ul>
            </div>
        </Modal>

    </div>
</template>
<script>
    import banner from '../components/banner';
    export default {
        name: "product",
        components: {banner},

        data() {
            return {
                modalLogin:false,
                modalFPD: false,
                looptime: 4000, // 循环时间
                width: window.screenWidth,
                height:430,
                offApply:true,
                background: 'red',
                list: [
                    {
                    id: 1,
                    href:'/user/limitApplyYBT',
                    url: require('../img/product-banner-1.png'),
                }, {
                    id: 2,
                    href:'/user/limitApplyLSD',
                    url: require('../img/productLSD-banner.png'),
                }, {
                    id: 3,
                    href:'/user/limitApplyKD',
                    url: require('../img/productKD-banner.png'),
                }],
                productData: [
                    {
                        name: '药',
                        depictTh: '药白条',
                        depict: '在我的医药网上有交易记录的大型商业客户',
                        rateTh:'融资费率',
                        rate:'日息万分之2.5起',
                        quotaTh:'额度上限',
                        quota:'500万',
                        loan:'贷款期限',
                        loanType:' ',
                        loanDepict:'4个月以内',
                        loanTime:'还款方式',
                        loanTimeDepict:'按日计息、随借随还',
                        btnType:'1'
                    },
                    {
                        name: '流',
                        depictTh: '流水贷',
                        depict: '有半年以上医保回款流水的医保定点药店',
                        rateTh:'融资费率',
                        rate:'日息万分之2.5起',
                        quotaTh:'额度上限',
                        quota:'300万',
                        loan:'贷款期限',
                        loanType:' ',
                        loanDepict:'4个月以内',
                        loanTime:'还款方式',
                        loanTimeDepict:'等额本息或到期一次还本付息',
                        btnType:'2'
                    },
                    {
                        name: '快',
                        depictTh: '快贷',
                        depict: '有良好法人或大股东征信的商业或终端',
                        rateTh:'融资费率',
                        rate:'日息万分之3起',
                        quotaTh:'额度上限',
                        quota:'50万',
                        loan:'贷款期限',
                        loanType:' ',
                        loanDepict:'2个月以内',
                        loanTime:'还款方式',
                        loanTimeDepict:'到期一次还本付息，支持提前还款',
                        btnType:'3'
                    },
                    {
                        name: '发',
                        depictTh: '发票贷',
                        depict: '持续开票满18个月的商业公司',
                        rateTh:'融资费率',
                        rate:'日息万分之3起',
                        quotaTh:'额度上限',
                        quota:'100万',
                        loan:'贷款期限',
                        loanType:' ',
                        loanDepict:'3个月以内',
                        loanTime:'还款方式',
                        loanTimeDepict:'按日计息、随借随还',
                        btnType:'4'
                    },
                    {
                        name: '订',
                        depictTh: '订货贷',
                        depict: '完整年度纳税记录，信用良好',
                        rateTh:'融资费率',
                        rate:'日息万分之3起',
                        quotaTh:'额度上限',
                        quota:'300万',
                        loan:'贷款期限',
                        loanType: ' ',
                        loanDepict:'最长36个月',
                        loanTime:'还款方式',
                        loanTimeDepict:'分期还款，随借随还',
                        btnType:'5'
                    }
                ]
            }
        },
        computed: {
            tokens () {
                return this.$store.getters.getToken
            },
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getYBTstates () {
                return this.$store.getters.getYBTstate
            },
            getLSDstates () {
                return this.$store.getters.getLSDstate
            },
            getKDstates () {
                return this.$store.getters.getKDstate
            },
            getDHDstates () {
                return this.$store.getters.getDHDstate
            }
        },
        methods: {
            btnLogin () {
                this.modalLogin = false;
                setTimeout(() => {
                    this.$router.push({path: '/login/'});
                }, );
            },
            loanApply(type){
                console.log('11', type)
                let that = this;
                if(that.tokens.length > 1){ // 判断是否跳登录页
                    that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                        that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                            if(type==1){
                                if (that.getYBTstates === -1) {
                                    that.$router.push({path: '/user/limitApplyYBT'});
                                }
                                if (that.getYBTstates === 0) {
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getYBTstates === 1) {
                                    that.$router.push({path: '/user/limitApplyYBTInfo'});
                                }
                            } else if (type==2) {
                                if (that.getLSDstates === -1) {
                                    that.$router.push({path: '/user/limitApplyLSD'});
                                }
                                if (that.getLSDstates === 0) {
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getLSDstates === 1) {
                                    that.$router.push({path: '/user/limitApplyLSDInfo'});
                                }
                            } else if (type==3) {
                                if (that.getKDstates === -1) { // -1,5,6,8
                                    that.$router.push({path: '/user/limitApplyKD'});
                                }
                                if (that.getKDstates === 0) { // 1, 3
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getKDstates === 1) { // 0, 2, 4
                                    that.$router.push({path: '/user/limitApplyKDInfo'});
                                }
                            } else if (type==4) {
                                that.linkToFPD();
                            } else if (type==5) {
                                if (that.getDHDstates === -1) {
                                    that.$router.push({path: '/user/limitApplyDHD'});
                                }
                                if (that.getDHDstates === 0) {
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getDHDstates === 1) {
                                    that.$router.push({path: '/user/limitApplyDHDInfo'});
                                }
                            }
                        })
                    })
                } else {
                    that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                        if (type==4){
                            that.linkToFPD();
                        } else {
                            if (type === 1) {
                                if (that.getYBTstates === -1) {
                                    that.$store.commit('setRecord', '/user/limitApplyYBT');
                                }
                                if (that.getYBTstates === 0) {
                                    that.$store.commit('setRecord', '/user/');
                                }
                                if (that.getYBTstates === 1) {
                                    that.$store.commit('setRecord', '/user/limitApplyYBTInfo');
                                }
                            } else if (type === 2) {
                                if (that.getLSDstates === -1) {
                                    that.$store.commit('setRecord', '/user/limitApplyLSD');
                                }
                                if (that.getLSDstates === 0) {
                                    that.$store.commit('setRecord', '/user/');
                                }
                                if (that.getLSDstates === 1) {
                                    that.$store.commit('setRecord', '/user/limitApplyLSDInfo');
                                }
                            } else if (type==3) {
                                if (that.getKDstates === -1) {
                                    that.$store.commit('setRecord', '/user/limitApplyKD');
                                }
                                if (that.getKDstates === 0) {
                                    that.$store.commit('setRecord', '/user/');
                                }
                                if (that.getKDstates === 1) {
                                    that.$store.commit('setRecord', '/user/limitApplyKDInfo');
                                }
                            } else if (type==5) {
                                if (that.getDHDstates === -1) {
                                    that.$store.commit('setRecord', '/user/limitApplyDHD');
                                }
                                if (that.getDHDstates === 0) {
                                    that.$store.commit('setRecord', '/user/');
                                }
                                if (that.getDHDstates === 1) {
                                    that.$store.commit('setRecord', '/user/limitApplyDHDInfo');
                                }
                            }
                            this.$router.push({path: '/login/'});
                        }
                    })
                }
            },
            linkToFPD () {
                //if (this.$store.getters.getUserName) {
                    this.modalFPD = true;
                /*} else {
                    this.$utilFinance.instance(this, 'warning', '请先登陆！')
                }*/
            },
            // 点击下一页回调
            prev (index, list) {
                //console.log('我点击了上一页');
            },
            // 点击下一页回调
            next () {
                //console.log('我点击了下一页');
            },
            // 鼠标移入状态点回调
            changeBanner (index) {
                //console.log('我移入了鼠标状态点了');
            },
            bannerClick (index, item) {
                //console.log('我点击了广告内容');
            },

        },
        created() {

        }
    }
</script>
<style lang="less">
    @import '../assets/css/common.less';
    @import '../assets/css/reset.css';
    .margin-top-5 {
        margin-top: 4px;
    }
    .modalLogin-w{
        .ivu-modal-footer{
            padding: 12px 120px 12px 120px;
        }
    }

    .classModalFPD{
        .ivu-modal{
            top: 10px;
        }
        .bg{position:relative;height:470px; background: url("../img/main-page/popupFPD.jpg") no-repeat 0 0;}
    }

    .product {
        .product-con{
            .product-con-th{
                height: 80px;
                line-height: 80px;
                .th{
                     color:#333;
                    font-size: 24px;
                    border-left: solid 6px #E2A54D;
                    padding-left: 20px;
                }
                .more{
                    float: right;
                    font-size: 12px;
                    color: #666;
                }
            }
            .product-list-con{
                border-left: solid 1px #ddd;
                border-top:  solid 1px #ddd;
                border-right:  solid 1px #ddd;
                margin-bottom: 60px;
                .product-list{
                    border-bottom:  solid 1px #ddd;
                    padding: 20px 0;
                    color: #333;
                    font-size: 12px;
                    &:hover{
                        background: #ebf7ff;
                    }
                    .product-list-icon{
                        width: 60px;
                        height: 60px;
                        line-height: 60px;
                        font-size: 24px;
                        color: #333;
                        border: solid 1px #ddd;
                        border-radius: 50%;
                        text-align: center;
                        margin: 0 auto;
                    }
                    .th{
                        color: #333;
                        font-size: 24px;
                        font-weight: normal;
                    }
                    .th-rate{
                    }
                    .rate{
                        color: #333;
                        margin-top: 21px;
                        /*font-size: 26px;*/
                        /*font-weight: 600;*/
                    }
                    .quota-th{

                    }
                    .quota{
                        padding-top:20px;
                    }
                    .depict{
                        color: #333;
                        padding-top: 3px;
                    }
                    .btn{
                        text-align: right;
                        margin:10px;
                        button{
                            padding: 5px 40px;
                            background: #E2A54D;
                            border-color: #E2A54D;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

</style>



// WEBPACK FOOTER //
// src/views/product.vue