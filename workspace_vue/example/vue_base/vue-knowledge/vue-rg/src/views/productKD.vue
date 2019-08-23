<template>
    <div class="productKD">
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

        <div class="productKD-flow">
            <h4>简单申请方式仅需三步</h4>
            <ul class="clearfix">
                <li><img src="../img/productKD-flow-1.png">
                <div class="">填写资料</div>
                </li>
                <li><img src="../img/productKD-flow-2.png">
                <div>获得授信</div>
                </li>
                <li><img src="../img/productKD-flow-3.png">
                <div>在线用款</div>
                </li>
            </ul>
        </div>

        <div class="Flowing-loan">
            <h4>快贷</h4>
            <p class="Flowing-loan-text">针对小B端的纯信用贷款产品，药店、诊所以及小型商业企业可发起申请</p>
            <div class="Flowing-loan-rule">
                <ul class="clearfix">
                    <li>
                        <span>申请方式：</span>
                        <p>线上申请</p>
                    </li>

                    <li>
                        <span>融资费率：</span>
                        <p>日息万分之3起</p>
                    </li>

                    <li>
                        <span>授信期限：</span>
                        <p>1年</p>
                    </li>

                    <li>
                        <span>单笔贷款期限：</span>
                        <p>最长60天</p>
                    </li>

                    <li>
                        <span>还款方式：</span>
                        <p>随借随还</p>
                    </li>

                    <li>
                        <span>放款时效：</span>
                        <p>最快T+1放款</p>
                    </li>
                </ul>
            </div>
            <div class="Flowing-loan-btn">
                <div @click="userbtn('/user/limitApplyKD')">立即申请</div>
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
                            <div><p><span>Q：</span><strong>什么是快贷？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>快贷是一款针对小B端的纯信用授信金融产品。
                                单体药店、小型连锁药店、诊所，以及小型商业企业，可以使用该款产品，在融贯我的医药网平台向上游采购付款。
                            </p></div>
                        </li>

                        <li>
                            <div><p><span>Q：</span><strong>如何申请快贷？</strong></p></div>
                            <div class="margin-top-5"><p>
                                <p><span>A：</span>进入我的医药网【药金融】中，点击【申请快贷】页面，按要求填写和上传资质证明，等待审批通过。</p>
                                <br>
                                <p style="text-indent: 25px;">申请准入条件：</p>
                                <br>
                                <p style="text-indent: 25px;">a. 连锁药店（以连锁总店名义申请）：</p>
                                <p style="text-indent: 25px;">1、连锁店定义为：旗下有10家（含）以上连锁分店（定义上不区分分店是否为加盟店）
                                <p style="text-indent: 25px;">2、连锁总店需是“我的医药网”注册用户</p>
                                <p style="text-indent: 25px;">3、连锁总店工商在营满1年及以上，且为连锁店（如工商注册不满1年按照最低额度5000元）</p>
                                <p style="text-indent: 25px;">4、具备特许经营资质且无异常</p>
                                <br>
                                <p style="text-indent: 25px;">b.连锁分店：</p>
                                <p style="text-indent: 25px;">1、“我的医药网”注册用户</p>
                                <p style="text-indent: 25px;">2、工商注册大于等于6个月</p>
                                <p style="text-indent: 25px;">3、申请进件可接受企业负责人单独申请，申请要求等同于单体进件</p>
                                <p style="text-indent: 25px;">4、连锁分店允许单独进件，且额度与总店额度相互独立核算，但需提供《加盟协议》等证明为独立经营、自负盈亏</p>
                                <br>
                                <p style="text-indent: 25px;">c.单体药店、诊所、商业：</p>
                                <p style="text-indent: 25px;">1、药店完成工商注册（单体药店）</p>
                                <p style="text-indent: 25px;">2、“我的医药���”注册用户</p>
                                <p style="text-indent: 25px;">3、具备特许经营资质且无异常</p>
                                <br>
                                <p style="text-indent: 25px;">申请人要求：</p>
                                <p style="text-indent: 25px;">1、年龄22-60周岁</p>
                                <p style="text-indent: 25px;">2、申请人需为中国大陆公民</p>
                                <p style="text-indent: 25px;">3、申请人为企业法定代表人/持股（间接或直接控股&股权比例大于等于20%股份的股东）</p>
                                <p style="text-indent: 25px;">4、申请人银行征信无不良记录且无重大涉诉记录</p>
                                <br>
                                <p style="text-indent: 25px;">申请材料：</p>
                                <br>
                                <p style="text-indent: 25px;">a. 药店、商业：</p>
                                <p style="text-indent: 25px;">营业执照、GSP证书、法人身份证、药品经营许可证、其他资质证明材料（如客户采购医疗器械的，需具备医疗器械经营许可证）</p>
                                <p style="text-indent: 25px;">连锁药店提交资料相关要求：</p>
                                <p style="text-indent: 25px;">1、分店名录（至少包括分店全称、负责人名称）</p>
                                <p style="text-indent: 25px;">2、总店法人代表或借款人身份证复印件（正反面）</p>
                                <p style="text-indent: 25px;">3、提供至少两个及以上联系人姓名、关系、手机号</p>
                                <p style="text-indent: 25px;">4、总店营业执照正本复印件</p>
                                <p style="text-indent: 25px;">5、药品经营许可证-有效期超6个月</p>
                                <p style="text-indent: 25px;">6、药品经营质量管理规范认证书（GSP）-有效期超6个月</p>
                                <p style="text-indent: 25px;">7、我的医药网近6个月的交易流水（如有需提供，新注册客户无需提供）</p>
                                <br>
                                <p style="text-indent: 25px;">b.诊所</p>
                                <p style="text-indent: 25px;">1、医疗机构执业许可证、医师执业证</p>
                                <p style="text-indent: 25px;">2、申请人为负责人时需要上传加盟协议</p>
                            </div>
                        </li>

                        <li>
                            <div><p><span>Q：</span><strong>快贷如何还款？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>快贷还款说明
                            <br>1、还款方式
                                <br>用户在获得授信时不计利息，仅当下订单使用授信付款之日起计息，借款周期为固定的60天，到期还本付息，资金方将从提交并绑定的银行卡中代扣。若卡内余额不足以还款，需要沟通线下转账还款。
                                <br>2、是否可以提前还款
                                <br>提前还款：用款时间超过15天后允许提前还款，需要客户与资方沟通确认实际用款天数，按日计息确认需还款本息金额，线下转账还款。还款成功后额度恢复。
                                <br>3、是否可以提前部分还款：不能。
                            </p></div>
                        </li>
                    </ul>
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
                <Button type="primary" size="large" long >登录</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import banner from '../components/banner';
    export default {
        name: "productKD",
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
                    url: require('../img/productKD-banner.png'),
                }]
            }
        },
        computed: {
            tokens () {
                return this.$store.getters.getToken
            },
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getKDstates () {
                return this.$store.getters.getKDstate
            }
        },
        methods: {
            userbtn(val){
                let that = this;
                if(that.tokens.length > 1){
                    that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                        that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                            if (that.getKDstates === -1) {
                                that.$router.push({path: val});
                            }
                            if (that.getKDstates === 0) {
                                that.$router.push({path: '/user/'});
                            }
                            if (that.getKDstates === 1) {
                                that.$router.push({path: '/user/limitApplyKDInfo'});
                            }
                        })
                    })
                }else {
                    that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                        if (that.getKDstates === -1) {
                            that.$store.commit('setRecord', val);
                        }
                        if (that.getKDstates === 0) {
                            that.$store.commit('setRecord', '/user/');
                        }
                        if (that.getKDstates === 1) {
                            that.$store.commit('setRecord', '/user/limitApplyKDInfo');
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

        }
    }
</script>
<style lang="less">
    .modalLogin-w{
        .ivu-modal-footer{
            padding: 12px 120px 12px 120px;
        }
    }
    .productKD {
        .colorRed{ color: #FF2F2F;}
        background: #F6F6F6;
        .productKD-flow{
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
                padding-top: 43px;
                padding-bottom: 20px;
                font-weight: inherit;
            }
            ul{
                padding-bottom: 50px;
                li{
                    text-align: center;
                    width: 33.3333%;
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
// src/views/productKD.vue