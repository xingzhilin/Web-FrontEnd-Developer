<template>
    <div class="aboutUs">

        <div class="aboutUs-ban">
            <img src="../img/About-banner.png">
        </div>

        <div class="aboutUs-th">
         公司介绍
        </div>
        <div class="aboutUs-text-w">
            <h2>关于“融贯电商”</h2>
            <p>
                北京融贯电子商务有限公司成立于2012年，是国内领先的提供医药电子商务综合性服务的专业公司。公司技术力量雄厚，研发人员超过百人，在医药互联网应用方面有着深厚的技术底蕴和丰富的平台研发、整体规划与服务创新经验。 主营产品"我的医药网"和"我的康康"简单易用，医药工业、商业公司、终端与公司对接系统后，即可开启在线经营与管理。终端既可以在B2B平台上进行药品采购，亦可通过O2O平台实现基于移动互联网的本地化经营和会员管理。公司将充分发挥互联网的特点和优势，不断进行产品升级换代，使平台易用性更高，在线商家的经营效率更高。
            </p>
            <div class="img">
                <img src="../img/About-con.png">
            </div>
            <h2>关于“药金融”</h2>
            <p>
                药金融由融贯设计开发，实现“我的医药网”电子商务平台与资金方系统的互联。该平台的主要功能为：在医药网上进行网上交易的客户提出融资需求时，资金方可以通过药金融在线查询合同、订单、发票、资信记录等信息，进行在线审核，向客户提供“无抵押担保、随借随还、跨区域、低成本”的贷款。
            </p>
            <p>融贯供应链金融服务特点为：无需担保、抵押；便捷、灵活、随借随还；融资成本低；突破服务区域限制，主要作用如下：
                拓展更多医药供应链核心企业：建立合作关系——目前主要以“我的医药网”为核心企业、商业流通公司、零售终端；未来可对接更多行业内的优质企业；
                与更多金融机构（包括各类商业银行、小贷公司等）开展合作，提供种类更丰富、形式多样化、操作更便捷、成本更优惠的金融产品，更好地满足核心企业、商业公司、终端零售的融资需求。
            </p>
            <p>我的医药网以现代医药物流配送体系为支撑，为上下游用户提供信息共享、网络营销、数据分析、软件和技术等多重增值服务。一方面服务于全国二、三终端提供药品配送，一方面基于云计算提供数据信息等增值服务。</p>
        <p>医药网在线平台连接上游供应商会员和下游终端客户会员。上游供应商会员和下游终端会员可以享受医药网药金融提供的融资服务。下游终端客户主要为第二终端药品零售企业和第三终端基础医疗机构，这些机构或企业通过我的医药网平台进行询货、询价、下订单以及完成在线支付。</p>
        <p>“药金融”为了更好的打造面向全国医药健康产品直销终端的金融服务；以医药流通数据为核心的医药供应链金融服务平台。</p>
        </div>
        <div id="allmap">
            <div class="main-map" v-if="off">
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
        </div>
    </div>
</template>

<script>
    import {MP} from '../../config/map.js'
    export default {
        name: "aboutUs",
        components: {},
        data() {
            return {
                ak:'DBa6ccea1e873a6f7821c50de4e2ad77',
                off:true
            }
        },
        methods: {
            // 百度地图API功能
            setMap () {
                 /* global BMap*/
                let map = new BMap.Map("allmapC");
                let point = new BMap.Point(116.47966,39.919034);
                let marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            map.centerAndZoom(point, 15);
            //map.enableScrollWheelZoom();
                let opts = {
                width : 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title : "联系我们" , // 信息窗口标题
            }
                let infoWindow = new BMap.InfoWindow("联系电话：400-060-3351<br>地址：北京市朝阳区光华路4号东方梅地亚中心A座8层", opts); // 创建信息窗口对象
            marker.addEventListener("click", function(){
                map.openInfoWindow(infoWindow,point); //开启信息窗口
            });
            map.openInfoWindow(infoWindow,point); //开启信息窗口
            }
        },
        mounted(){
            /*window.addEventListener('scroll',
            )*/
            /*this.$nextTick(function() {
                var _this = this;
                MP(_this.ak).then(BMap => {
                    this.off=false
                    // 百度地图API功能
                    this.setMap();
                })
            })*/

           },
        created() {
            //vue实例被生成后调用这个函数
            //
        }
    }
</script>
<style lang="less">
    @import '../assets/css/common.less';
    @import '../assets/css/table.less';
    @import '../assets/css/risk.less';
    .aboutUs{
        .aboutUs-ban{
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .aboutUs-th{
            text-align: center;
            height: 90px;
            line-height: 80px;
            text-align: center;
            border-bottom: solid 1px #D8D8D8;
            font-size: 24px;
            color: #333;
        }
        .aboutUs-text-w{
            width: 1040px;
            margin: 0 auto;
            padding-bottom: 30px;
            line-height: 27px;
            h2{
                font-size: 18px;
                padding: 10px 0 10px 0;
            }
            p{
                font-size: 16px;
                color: #666;
                text-indent: 2em;
            }
            .img{
                padding: 20px 0 10px 0;
                img{
                    width: 100%;
                }
            }
        }
        #allmapC{
            width:100%;
            height:450px;
        }
        .main-map{position:relative;height:450px;  padding-top:150px; background: url("../img/main-page/map.png") center 0;
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
    }
</style>



// WEBPACK FOOTER //
// src/views/aboutUs.vue