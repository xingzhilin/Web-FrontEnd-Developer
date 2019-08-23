<template>
    <div class="index finance-index">
        <div class="product">
            <banner
                    :offApply="offApply"
                    :list="bannerList"
                    :looptime="looptime"
                    :width="width"
                    :height="height">
            </banner>
        </div>
        <div class="finance-service">
            <div>
                <div class="fr" @click="moreProduct" style="cursor: pointer">查看更多></div>
                <div class="main-title"><strong>金融服务</strong><span class="margin-left-10">丰富产品满足医药供应链各环节需要</span></div>
            </div>
            <Row style="padding:20px 0 0">
                <Col span="6">
                <Card :dis-hover="true" :bordered="false">
                    <div class="bg-card">
                        <div class="title">
                            <strong>药白条</strong>
                            <p>先采购后还款缓解资金压力</p>
                        </div>
                        <div class="desc-info">
                            <ul>
                                <li><span>适用对象：</span>商业公司</li>
                                <li><span>授信金额：</span>最高500万</li>
                                <li><span>费率：</span>日息万分之2.5起</li>
                                <li><span>期限：</span>120天以内</li>
                            </ul>
                            <div class="margin-top-10 btn"><Button type="default" @click="linkToYBT">了解详情></Button></div>
                        </div>
                    </div>
                </Card>
                </Col>
                <Col span="6">
                <Card :dis-hover="true" :bordered="false">
                    <div class="bg-card">
                        <div class="title">
                            <strong>流水贷</strong>
                            <p>有医保回款流水就能融资</p>
                        </div>
                        <div class="desc-info">
                            <ul>
                                <li><span>适用对象：</span>医保定点药店</li>
                                <li><span>授信金额：</span>最高300万</li>
                                <li><span>费率：</span>日息万分之2.5起</li>
                                <li><span>期限：</span>120天以内</li>
                            </ul>
                            <div class="margin-top-10 btn"><Button type="default" @click="linkToLSD">了解详情></Button></div>
                        </div>
                    </div>
                </Card>
                </Col>
                <Col span="6">
                <Card :dis-hover="true" :bordered="false">
                    <div class="bg-card">
                        <div class="title">
                            <strong>快贷</strong>
                            <p>纯信用小额周转</p>
                        </div>
                        <div class="desc-info">
                            <ul>
                                <li><span>适用对象：</span>药店、诊所、商业</li>
                                <li><span>授信金额：</span>最高50万</li>
                                <li><span>费率：</span>日息万分之3起</li>
                                <li><span>期限：</span>60天以内</li>
                            </ul>
                            <div class="margin-top-10 btn"><Button type="default" @click="linkToKD">了解详情></Button></div>
                        </div>
                    </div>
                </Card>
                </Col>
                <Col span="6">
                <Card :dis-hover="true" :bordered="false">
                    <div class="bg-card">
                        <div class="title">
                            <strong>订货贷</strong>
                            <p>纯信用贷款</p>
                        </div>
                        <div class="desc-info">
                            <ul>
                                <li><span>适用对象：</span>商业公司、药店</li>
                                <li><span>授信金额：</span>300万以内</li>
                                <li><span>费率：</span>日息万分之3起</li>
                                <li><span>期限：</span>最长36个月</li>
                            </ul>
                            <div class="margin-top-10 btn"><Button type="default" class="c1" @click="loanApply">立即申请</Button></div>
                        </div>
                    </div>
                </Card>
                </Col>
            </Row>
        </div>
        <div class="bg-blue-tec"><img src="../img/main-page/plat.jpg" alt="金融科技 医药产为链的金融科技平台" /> </div>
        <div class="title-partner"><img src="../img/main-page/title-partner.jpg" alt="合作伙伴 汇聚力量，突破创新" /> </div>
        <div class="zone-partner">
            <div class="wrap">
                <Carousel
                        v-model="partnerValue"
                        :autoplay="setting.autoplay"
                        :autoplay-speed="setting.autoplaySpeed"
                        :dots="setting.dots"
                        :radius-dot="setting.radiusDot"
                        :trigger="setting.trigger"
                        :arrow="setting.arrow">
                    <CarouselItem>
                        <div class="partner-carouse">
                            <ul>
                                <li><img src="../img/main-page/logoPingAn-1.png" alt="" /></li>
                                <li><img src="../img/main-page/logoHaiEr-2.png" alt="" /></li>
                                <li><img src="../img/main-page/logoFuXing-3.png" alt="" /></li>
                                <li><img src="../img/main-page/logoLiaoYiRong-4.png" alt="" /></li>
                            </ul>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="partner-carouse">
                            <ul>
                                <li><img src="../img/main-page/logoPingAn-1.png" alt="" /></li>
                                <li><img src="../img/main-page/logoHaiEr-2.png" alt="" /></li>
                                <li><img src="../img/main-page/logoFuXing-3.png" alt="" /></li>
                                <li><img src="../img/main-page/logoLiaoYiRong-4.png" alt="" /></li>
                            </ul>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>
        <div class="main-map">
            <div class="cnt-map">
                <div class="info">
                    <Card :bordered="false" style="padding:10px;background: rgba(0,0,0,.4); color:#fff;font-size:16px">
                        <div slot="title" style="font-size:24px;">联系我们</div>
                        <div>
                            <div class="qrcode"><img src="../img/twoCode.png" alt=""></div>
                            <p>联系邮箱：<br>finance@rograndec.com</p>
                            <p class="margin-top-20">联系地址：<br>北京市朝阳区光华路4号东方梅地亚中心A座8层</p>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
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
        name: "Index",
        components: {banner},
        data() {
            return {
                getUserName: '',
                partnerValue: 0,
                modalFPD: false,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'none',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'always'
                },
                offApply:true,
                looptime: 4000, // 循环时间
                width: window.screenWidth,
                height:430,
                bannerList: [{
                    id: 1,
                    url: require('../img/main-page/top-bannerYBT.png'),
                    href: '/productYBT'
                }, {
                    id: 2,
                    url: require('../img/main-page/top-bannerLSD.png'),
                    href: '/productLSD'
                }, {
                    id: 3,
                    url: require('../img/main-page/top-bannerKD.png'),
                    href: '/productKD'
                }]
            }
        },
        methods: {
            moreProduct () {
                this.$router.push({path: '/productList'})
            },
            linkToYBT () {
                this.$router.push({path: '/productYBT'});
                this.$store.commit('setCurrentMenu', this.$route.name);
            },
            linkToLSD () {
                this.$router.push({path: '/productLSD'})
            },
            linkToKD () {
                this.$router.push({path: '/productKD'})
            },
            linkToFPD () {
                // this.modalFPD = true;
            },
            /**
             * 是否登录,登录后跳入点击按钮对应页面
             * */
            loanApply(){
                let that = this;
                if(that.tokens.length > 1){ // 判断是否跳登录页
                    that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                        that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                            if (that.getDHDstates === -1) {
                                that.$router.push({path: '/user/limitApplyDHD'});
                            }
                            if (that.getDHDstates === 0) {
                                that.$router.push({path: '/user/'});
                            }
                            if (that.getDHDstates === 1) {
                                that.$router.push({path: '/user/limitApplyDHDInfo'});
                            }
                        })
                    })
                } else {
                    that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                        if (that.getDHDstates === -1) {
                            that.$store.commit('setRecord', '/user/limitApplyDHD');
                        }
                        if (that.getDHDstates === 0) {
                            that.$store.commit('setRecord', '/user/');
                        }
                        if (that.getDHDstates === 1) {
                            that.$store.commit('setRecord', '/user/limitApplyDHDInfo');
                        }
                        this.$router.push({path: '/login/'});
                    })
                }
            }
        },
        computed: {
            tokens () {
                return this.$store.getters.getToken
            },
            getDHDstates () {
                return this.$store.getters.getDHDstate
            }
        },
        created() {
            //
        },
        mounted () {
            //
        }
    }
</script>
<style lang="less">
.finance-index{width:100%; overflow: hidden;
    .fr {float:right}
    .margin-left-10{}
    .finance-service{width:1200px;margin:0 auto;padding: 60px 0;
        .main-title{
            strong{font-size:24px; font-weight: normal}
            span{font-size:16px;color:#666}
        }
        .bg-card{padding:10px;background: #714C12;
            .title{padding:17px 0 25px;color:#fff; text-align: center;
                strong{display:block;font-size:24px; font-weight: normal}
                p{margin-top:6px;font-size:14px;}
            }
            .desc-info{height:230px;padding:20px; background: #fff; border-radius:5px;
                ul{
                    li {
                        margin:10px 0;font-size:16px;
                    }
                }
                .btn{ margin-top:20px;text-align: center;
                    button{width:160px;border:solid 1px #E2A54D; background: #fff; color:#E2A54D; font-size:14px}
                    button.c1{background: #E2A54D; color:#fff}
                }
            }
        }
    }
    .bg-blue-tec{background: #000257; text-align: center;
        img{display:block;width:1200px; margin:0 auto;}
    }
    .title-partner{position:relative; height:146px; background: #ddd; overflow: hidden;
        img{position: absolute;left:50%;top:0;margin-left:-960px;}
    }
    .zone-partner{position:relative;z-index:999;height:200px; width:1200px;margin:0 auto;
        .wrap{margin:0 32px;border:solid 1px #ddd; height:200px; box-shadow:0 2px 3px 2px rgba(0,0,0,.1);background: #fff;}
        .partner-carouse{height:200px;
            ul {padding:60px 50px 0;
                li{
                    float:left;
                    width:200px;
                    height:80px;
                    background: #eee;
                    margin:0 26px;
                    img {
                        border: 0;
                    }
                }
            }
        }
    }
    .main-map{position:relative;height:500px; margin-top:-74px;padding-top:150px; background: url("../img/main-page/map.png") center 0;
        .cnt-map{width:1200px; margin: 0 auto;
            .info{width:450px;float:right;margin-right:300px; position: relative;
                .ivu-card-head{border-bottom:0}
                .qrcode{
                    position: absolute;
                    right:20px;
                    top:20px;
                    width:120px;
                    height:120px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    .ivu-carousel-arrow{width:50px;height:50px; border-radius:0}
    .ivu-carousel-arrow.left{background: url("../img/main-page/carouse-left.png") 0 0 !important; left:-25px}
    .ivu-carousel-arrow.right{background: url("../img/main-page/carouse-right.png") 0 0 !important;right:-25px}
    .ivu-carousel-arrow i{display:none;}

}
.classModalFPD{
    .ivu-modal{
        top: 10px;
    }
    .bg{position:relative;height:470px; background: url("../img/main-page/popupFPD.jpg") no-repeat 0 0;}
}
</style>



// WEBPACK FOOTER //
// src/views/Index.vue