<template>
    <div class="productLSD">
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

        <div class="productLSD-flow">
            <h4>办理流程</h4>
            <ul class="clearfix">
                <li><img src="../img/productLSD-flow-1.png">
                <div>填写资料</div>
                </li>
                <li><img src="../img/productLSD-flow-2.png">
                <div>初步审核</div>
                </li>
                <li><img src="../img/productLSD-flow-3.png">
                <div>补充资料</div>
                </li>
                <li><img src="../img/productLSD-flow-4.png">
                <div>获得授信</div>
                </li>
                <li><img src="../img/productLSD-flow-5.png">
                <div>在线用款</div>
                </li>
            </ul>
        </div>

        <div class="Flowing-loan">
            <h4>流水贷</h4>
            <p class="Flowing-loan-text">针对医保定点药店的专属信用融资产品，具备6个月以上医保回款流水的药店客户可申请</p>
            <div class="Flowing-loan-rule">
                <ul class="clearfix">
                    <li>
                        <span>申请方式：</span>
                        <p>线上申请+线下尽调</p>
                    </li>

                    <li>
                        <span>融资费率：</span>
                        <p>日息万分之2.5起</p>
                    </li>

                    <li>
                        <span>授信期限：</span>
                        <p>1年</p>
                    </li>

                    <li>
                        <span>单笔贷款期限：</span>
                        <p>最长4个月</p>
                    </li>

                    <li>
                        <span>还款方式：</span>
                        <p>等额本息、到期一次还本付息</p>
                    </li>
                </ul>
            </div>
            <div class="Flowing-loan-btn">
                <div @click="userbtn('/user/limitApplyLSD')">立即申请</div>
            </div>
        </div>

        <div class="problem-con-w">
            <div class="problem-con">
                <div class="problem-con-th">
                    <i></i> <strong>常见问题</strong>产品定位、申请条件、所需材料、还款方式等常见问题介绍
                </div>
                <div class="problem-con-qa">
                    <ul>
                        <li>
                            <div><p><span>Q：</span><strong>什么是流水贷？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>流水贷是“我的医药网”为终端药店推出的一款基于医保流水的融资产品，买家在“我的医药网”平台进行下单采购时可使用“流水贷”即可完成支付。
                            <br>还款付息方式：两种选择
                                <br>①每月还款，期初收取服务费2.86%（4个月），每月按比例归还本金，不可提前还款
                                <br>②一次性还本付息，期初下单后放款前支付预收保理费1%（可冲抵到期时需支付的保理费），120天保理费4.77%，按日计息，可提前还款，但使用时间不得少于1个月。
                                预收保理费可抵扣利息。
                            </p></div>
                        </li>

                        <li>
                            <div><p><span>Q：</span><strong>如何申请流水贷？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>
                                进入我的医药网【药金融】中，点击【申请流水贷】页面，按要求填写企业信息，等待后台审核，审核通过后使用微信扫描二维码按要求填写相关信息，等待金融机构确认。</p>
                            <br>
                                <p style="text-indent: 25px;">申请准入条件：</p>
                                <p style="text-indent: 25px;">1、取得GSP证书及药品许可证，GSP到期日大于1个月</p>
                                <p style="text-indent: 25px;">2、成立满1年以上</p>
                                <p style="text-indent: 25px;">3、医保回款满6个月</p>
                                <p style="text-indent: 25px;">4、最近半年医保回款10万以上（单体药店）</p>
                                <p style="text-indent: 25px;">5、最近半年医保回款150万-3500万（连锁药店）</p>
                                <p style="text-indent: 25px;">6、若经营场所为租赁，租赁合同到期日大于4个月</p>
                                <p style="text-indent: 25px;">7、加盟店不可并入连锁主体操作</p>
                            <br><p style="text-indent: 25px;">申请材料：</p>
                                <p style="text-indent: 25px;">1、法人身份证</p>
                                <p style="text-indent: 25px;">2、实际控制人身份证、结婚证、配偶身份证（需要配偶进行担保）</p>
                                <p style="text-indent: 25px;">3、股东身份证（法人股东提供营业执照、章程、可复印件）</p>
                                <p style="text-indent: 25px;">4、营业执照、GSP证���、药品经营许可证</p>
                                <p style="text-indent: 25px;">5、开户许可证（如为单体药房个体工商户无开户许可证，则提供个人账户）</p>
                                <p style="text-indent: 25px;">6、过去半年的医保回款账户流水（或医保系统截屏）</p>
                                <br>
                                <p style="text-indent: 25px;">a. 单体药店需外提供：</p>
                                <p style="text-indent: 25px;">1、经营场所房屋房产证/租房合同</p>
                                <p style="text-indent: 25px;">2、房产证正本（如有，则增加授信额度）</p>
                                <p style="text-indent: 25px;">3、车辆行驶证正本（如有，则增加授信额度）</p>
                                <p style="text-indent: 25px;">4、门店门头、货架、GSP照片各一张</p>
                                <br>
                                <p style="text-indent: 25px;">b. 连锁药店需额外提供：</p>
                                <p style="text-indent: 25px;">1、公司章程</p>
                                <p style="text-indent: 25px;">2、去年一年及最近1月的纳税申报系统截屏</p>
                                <p style="text-indent: 25px;">3、每家门店门头、货架、GSP照片各一张</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!--<Modal v-model="modalLogin" width="360" class="modalLogin-w">-->
            <!--<p slot="header" style="color:#0077cc;text-align:center">-->
                <!--<Icon type="ios-information-circle"></Icon>-->
                <!--<span>提示</span>-->
            <!--</p>-->
            <!--<div style="text-align:center">-->
                <!--<p>请先登录之后，申请！</p>-->
            <!--</div>-->
            <!--<div slot="footer">-->
                <!--<Button type="primary" size="large" long  >登录</Button>-->
            <!--</div>-->
        <!--</Modal>-->

    </div>
</template>
<script>
    import banner from '../components/banner';
    export default {
        name: "productLSD",
        components: {banner},

        data() {
            return {
                modalLogin:false,
                modal_loading: false,
                looptime: 4000, // 循环时间
                width: window.screenWidth,
                height:430,
                offApply:false,
                background: 'red',
                list: [{
                    url: require('../img/productLSD-banner.png'),
                }]
            }
        },
        computed: {
            getToken () {
                return this.$store.getters.getToken
            },
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getLSDstates () {
                return this.$store.getters.getLSDstate
            }
        },
        methods: {
            userbtn (val) {
                let that = this;
                if(that.getToken.length > 1){
                    that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                        that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                            if (that.getLSDstates === -1) {
                                that.$router.push({path: val});
                            }
                            if (that.getLSDstates === 0) {
                                that.$router.push({path: '/user/'});
                            }
                            if (that.getLSDstates === 1) {
                                that.$router.push({path: '/user/limitApplyLSDInfo'});
                            }
                        })
                    })
                }else {
                    that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                        if (that.getLSDstates === -1) {
                            that.$store.commit('setRecord', val);
                        }
                        if (that.getLSDstates === 0) {
                            that.$store.commit('setRecord', '/user/');
                        }
                        if (that.getLSDstates === 1) {
                            that.$store.commit('setRecord', '/user/limitApplyLSDInfo');
                        }
                        this.$router.push({path: '/login/'});
                    })
                }
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
            }
        },
        created() {

        },
        mounted() {
            // if (this.getEntIds !== 0) {
            //     this.$store.dispatch('getAuth',{_self: this, id: this.getEntIds})
            // }
        }
    }
</script>
<style lang="less">
    .modalLogin-w{
        .ivu-modal-footer{
            padding: 12px 120px 12px 120px;
        }
    }
    .productLSD {
        .colorRed{ color: #FF2F2F;}
        background: #F6F6F6;
        .productLSD-flow{
            width: 1200px;
            margin: 0 auto;
            background: #fff;
            margin-top: -35px;
            position: relative;
            z-index: 5;
            h4{
                font-size: 20px;
                color: #333;
                text-align: center;
                padding-top: 45px;
                padding-bottom: 25px;
                font-weight: inherit;
            }
            ul{
                padding-bottom: 45px;
                li{
                    text-align: center;
                    width: 20%;
                    float: left;
                    div{
                        color: #333;
                        font-size: 20px;
                    }
                }
            }
        }
        .Flowing-loan{
            width: 1200px;
            margin: 0 auto;
            margin-top: 45px;
            background: #fff;
            padding-bottom:30px;
            margin-bottom: 35px;
            h4{
                font-size: 24px;
                color: #333;
                text-align: center;
                padding-top: 35px;
                font-weight: inherit;
            }
            .Flowing-loan-text{
                font-size: 16px;
                color: #333;
                margin: 0 150px;
                text-align: center;
                padding: 20px;
                border-bottom: solid 1px #ddd;
                margin-bottom: 10px;
            }
            .Flowing-loan-rule{
                width: 900px;
                margin: 0 auto;
                ul{
                    padding: 30px 0 40px;
                    li{
                        width:16.66666666%;
                        float: left;
                        span{
                            font-size: 14px;
                            color: #888;
                            padding-left: 15px;
                        }
                        p{
                            padding-left: 15px;
                            padding-top: 10px;
                            font-size: 16px;
                        }
                        &:first-child {
                            width: 18%;
                        }
                        &:last-child {
                            width: 25%;
                        }
                    }
                }
            }
            .Flowing-loan-btn{
                text-align: center;
                div{
                    background: #E2A54D;
                    font-size: 16px;
                    color: #fff;
                    display: inline-block;
                    padding: 8px 60px;
                    cursor: pointer;
                }
            }
        }
        .problem-con-w{
            background: #fff;
            overflow: hidden;
            .problem-con{
                width: 1200px;
                margin: 0 auto;
                .problem-con-th{
                    height: 50px;
                    line-height: 50px;
                    font-size: 16px;
                    color: #666;
                    margin-top:20px;
                    i{
                        width: 6px;
                        height: 20px;
                        background:#E2A54D;
                        display: inline-block;
                        margin-right: 10px;
                    }
                    strong{
                        font-size: 24px;
                        color: #3B2821;
                        padding-right:20px;
                    }
                }
                .problem-con-qa{
                    border: solid 1px #ddd;
                    margin-bottom: 50px;
                    ul{
                        padding: 0px 60px 30px 60px;
                        li{
                            font-size: 16px;
                            color: #666;
                            padding-top: 30px;
                            p{
                                padding-left: 30px;
                            }
                            span{
                                margin-left: -28px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>



// WEBPACK FOOTER //
// src/views/productLSD.vue