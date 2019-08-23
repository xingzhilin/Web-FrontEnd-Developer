<template>
    <div class="productYBT">
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
        <div class="productYBT-con">
        <div class="flow-th">
            <ul class="clearfix">
                <li>
                    <span><img src="../img/product-flow-th-icon-01.png"> 额度高</span>
                    <h4>最高可达500万</h4>
                </li>

                <li>
                    <span><img src="../img/product-flow-th-icon-02.png"> 利率低</span>
                    <h4>日息万分之2.5起</h4>
                </li>

                <li>
                    <span><img src="../img/product-flow-th-icon-03.png"> 放款快</span>
                    <h4>48小时完成放款</h4>
                </li>

                <li class="border-no">
                    <span><img src="../img/product-flow-th-icon-04.png"> 随心还</span>
                    <h4>随借随还 灵活管理</h4>
                </li>
            </ul>
        </div>
        <div class="productYBT-con-bar">
            <div class="productLSD-flow">
                <h4>办理流程</h4>
                <ul class="clearfix">
                    <li><img src="../img/productLSD-flow-1.png">
                        <div>提交申请</div>
                    </li>
                    <li><img src="../img/productLSD-flow-2.png">
                        <div>初步审核</div>
                    </li>
                    <li><img src="../img/productLSD-flow-3.png">
                        <div>线下走访</div>
                    </li>
                    <li><img src="../img/productLSD-flow-4.png">
                        <div>签订合同</div>
                    </li>
                    <li><img src="../img/productLSD-flow-5.png">
                        <div>使用白条</div>
                    </li>
                </ul>
            </div>
            <div class="Flowing-loan-btn">
                <div @click="userbtn('/user/limitApplyYBT')">立即申请</div>
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
                            <div><p><span>Q：</span><strong>什么是药白条？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>药白条是“我的医药网”为买家商户推出的一款基于订单的融资产品，买家在“我的医药网”平台进行下单采购时可使用“药白条”。
                            </p>
                            </div>
                        </li>

                        <li>
                            <div><p><span>Q：</span><strong>如何申请药白条？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>进入我的医药网【药金融】中，点击【申请药白条】页面，填写相关信息，等待业务人员与您联系。</p>
                                <br><p style="text-indent: 25px;">申请准入条件：</p>
                                <p style="text-indent: 25px;">1、用户是我的医药网注册用户</p>
                                <p style="text-indent: 25px;">2、 取得GSP证书及药品经营许可证，且GSP到期日大于1个月</p>
                                <p style="text-indent: 25px;">3、经营期限1年以上</p>
                                <p style="text-indent: 25px;">4、没有正在涉及关键的股权纠纷等影响企业正常经营的诉讼</p>
                                <p style="text-indent: 25px;">5、合计持股超过51%的股东提供担保</p>
                            <br><p style="text-indent: 25px;">申请材料：</p>
                                <br>
                                <p style="text-indent: 25px;">a.下游买方药商:</p>
                                <p style="text-indent: 25px;">1、企业营业执照复印件</p>
                                <p style="text-indent: 25px;">2、药品经营许可证及GSP复印件</p>
                                <p style="text-indent: 25px;">3、公司章程复印件</p>
                                <p style="text-indent: 25px;">4、股东名册复印件</p>
                                <p style="text-indent: 25px;">5、公司法定代表人、实际控制人、保证人身份证复印件等</p>
                                <br>
                                <p style="text-indent: 25px;">b.上游卖方:</p>
                                <p style="text-indent: 25px;">1、企业营业执照复印件</p>
                                <p style="text-indent: 25px;">2、银行账户信息</p>
                                <p style="text-indent: 25px;">3、联系人及联系电话</p>
                            </div>
                        </li>

                        <li>
                            <div><p><span>Q：</span><strong>药白条如何还款？</strong></p></div>
                            <div class="margin-top-5"><p><span>A：</span>药白条还款说明
                            <br>平安租赁授信有效期限1年，在授信有效期内可以随时使用，还款后额度恢复。融资成本根据审核情况，年化成本约10.48%-13%。单次借款期限为4个月（授信获得后，首次使用必须在3个月内完成，否则需要重新审核）。其中，放款之初平安租赁将收取放款额1%的预付保理费，也即流程中的“前期款”。预付保理费不退还，可冲抵最后一笔本息。
                            <br>单笔应收账款转让后，融资方需到期一次性还本付息。若提前还款，需提前告知资金方，实际付息方式为按日计息。
                            </p></div>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
    import banner from '../components/banner';
    export default {
        name: "productYBT",
        components: {banner},

        data() {
            return {
                looptime: 4000, // 循环时间
                width: window.screenWidth,
                height:430,
                offApply:false,
                background: 'red',
                list: [{
                    id: 1,
                    url: require('../img/productYBT-banner.png'),
                    href: 1
                }],
                currents: 0, // 当前索引
                flowlist:[
                    {
                        url: require('../img/About-con.png'),
                        text:'——— 第一步 提交申请'
                    },
                    {
                        url: require('../img/productYBT-con-img-1.png'),
                        text:'——— 第二步 初步审核'
                    },
                    {
                        url: require('../img/About-con.png'),
                        text:'——— 第三步 线下走访'
                    },
                    {
                        url: require('../img/productYBT-con-img-1.png'),
                        text:'———第四步 签订合同'
                    },
                    {
                        url: require('../img/About-con.png'),
                        text:'——— 第五步 使用白条'
                    }
                ]
            }
        },
        computed: {
            getToken () {
                return this.$store.getters.getToken
            },
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getYBTstates () {
                return this.$store.getters.getYBTstate
            }
        },
        methods: {
            productBanner (index) {
                //this.$emit('change', this.currents);
                // this.currents = index;
            },
            userbtn(val){
                let that = this;
                if(that.getToken.length > 1){
                    that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                        that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                            if (that.getYBTstates === -1) {
                                that.$router.push({path: val});
                            }
                            if (that.getYBTstates === 0) {
                                that.$router.push({path: '/user/'});
                            }
                            if (that.getYBTstates === 1) {
                                that.$router.push({path: '/user/limitApplyYBTInfo'});
                            }
                        })
                    })
                }else {
                    that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                        if (that.getYBTstates === -1) {
                            that.$store.commit('setRecord', val);
                        }
                        if (that.getYBTstates === 0) {
                            that.$store.commit('setRecord', '/user/');
                        }
                        if (that.getYBTstates === 1) {
                            that.$store.commit('setRecord', '/user/limitApplyYBTInfo');
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
    @import '../assets/css/common.less';
    .productYBT {
        .border-no{
            border:none;
        }
        .Flowing-loan-btn{
            text-align: center;
            div{
                margin-top: 40px;
                background: #E2A54D;
                font-size: 16px;
                color: #fff;
                display: inline-block;
                padding: 8px 60px;
                cursor: pointer;
            }
        }
        .productYBT-con{
            background: #F6F6F6;
            .flow-th{
                width: 1100px;
                margin: 0 auto;
                background: #fff;
                border-radius: 6px;
                margin-top: -45px;
                position: relative;
                z-index: 5;
                box-shadow: 0px 0px 15px 0px #838383;
                ul{ height: 90px;
                    li{
                        text-align: center;
                        float: left;
                        width: 25%;
                        margin-top:20px;
                        border-right: solid 1px #ddd;
                        span{
                            color: #666;
                            font-size: 14px;
                            img{
                                 padding-right:6px;
                                vertical-align: middle;
                            }
                        }
                        h4{
                            color: #333;
                            font-size: 18px;
                            padding-top: 6px;
                            font-weight: normal;
                        }
                    }
                }
            }
            .productYBT-con-bar{
                background: url(../img/productYBT-con-bg.png) center;
                height:368px;
                h3{
                    color: #333;
                    font-size: 24px;
                    text-align: center;
                    font-weight: inherit;
                    padding-top: 40px;
                }
                .productLSD-flow{
                    width: 1200px;
                    margin: 0 auto;
                    margin-top: 100px;
                    background: #fff;
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
                .productYBT-con-img{
                    width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    margin-top: 40px;
                    .productYBT-flow-img{
                        padding-left: 130px;
                        ul{
                            li{
                                display: none;
                                opacity:0;
                                transition: all 1.5s;
                                img{
                                    width: 568px;
                                    height: 299px;
                                }
                            }
                            .active{
                                opacity:1;
                                transition: all 1.5s;
                                display: block;
                            }
                        }
                    }
                    .productYBT-flow-btn{
                        position: absolute;
                        right:160px;
                        top:10px;
                        ul {
                            li{
                                height: 50px;
                                line-height: 50px;
                                font-size: 20px;
                                margin-bottom: 8px;
                                a{
                                    color: #999;
                                    display: block;
                                    padding-right: 60px;
                                }
                            }
                            .active{
                                background:#E9961E;
                                background: linear-gradient(top ,  rgb(#FFDB77) , rgb(#E8A100) 60%);
                                background: -o-linear-gradient(top ,  rgb(#FFDB77) , rgb(#E8A100) 60%);
                                background: -ms-linear-gradient(top ,  rgb(#FFDB77) , rgb(#E8A100) 60%);
                                background: -moz-linear-gradient(top ,  rgb(#FFDB77) , rgb(#E8A100) 60%);
                                background: -webkit-linear-gradient(top , rgb(#FFDB77) , rgb(#E8A100) 60%);
                                a{
                                    color: #fff;
                                }
                            }
                        }
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
    }

</style>



// WEBPACK FOOTER //
// src/views/productYBT.vue