<template>
    <div class="cooperation">
        <div class="cooperation-banner">
            <img src="../img/cooperation-banner.png">
        </div>
        <div class="cooperation-th">
            合作品牌
        </div>
        <div class="cooperation-list-w">
        <ul>
            <li class="clearfix" v-for="item in botlisth">
                <div class="img"><img :src="item.icon"></div>
                <div class="cooperation-list-text">
                <h3>{{item.texth}}</h3>
                    <p v-html="item.textdepict"></p>
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>

    export default {
        name: "cooperation",
        components: {},
        data() {
            return {
                botlisth: [
                    {
                        icon: require('../img/logo-1.png'),
                        texth:'平安租赁',
                        textdepict:'&nbsp &nbsp &nbsp &nbsp平安国际融资租赁有限公司成立于2013 年1月，注册资本132.4亿人民币，是平安集团下属专门从事融资租赁业务的全资子公司，是集团投资板块内的重要成员。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp公司总部设立在上海浦东新区陆家嘴金融中心，业务网络遍及全国各地，自成立以来，业务发展迅速，截止2017年12月 ，资产规模达1770亿 。公司的业务涉及行业主要包括平安保理、平安航空、健康卫生、能源冶金、工程建设、制造加工、城市发展、业务拓展、企业融资、结构融资、综合金融、个人金融、新行业等，并将持续探索新的行业方向和业务领域，持续创造贴合客户需求的多样化金融产品。公司主要业务模式包括设备租赁、售后回租赁、转租赁、杠杆租赁、委托租赁、项目租赁、经营租赁等。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp凭借平安集团雄厚的资金实力、卓越的品牌影响和全金融牌照的协同优势，在集团全力打造综合金融服务平台的基础上，平安租赁将致力于为客户提供更灵活多样的资金产品和更综合全面的增值服务，矢志于成为中国融资租赁行业具有独特商业生命力和延展力的中小客户领域和专业市场的专家型领导者。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp目前已经成立平安国际融资租赁（深圳）有限公司、平安国际融资租赁（天津）有限公司、平安商业保理有限公司、平安好医投资管理有限公司、平安航空租赁有限公司、平安网赢通信科技有限公司等多家子公司助力业务发展。'
                    },
                    {
                        icon: require('../img/logo-2.png'),
                        texth:'海尔租赁',
                        textdepict:'&nbsp &nbsp &nbsp &nbsp海尔融资租赁（中国）有限公司，2013年12月在上海自贸区成立。海尔产业金融以成为优秀的产业金融服务平台为使命，以开放交互创新共赢为企业精神，致力于以互联网思维提供创新金融服务，坚持与实体产业链的各方建立利益共同体，共建良性发展的产业金融生态圈。专注于大健康板块的金融服务团队，在医疗器械、移动医疗等多个领域布局，为客户提供包括融资、投资、咨询等多方位的金融整体解决方案。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp海尔产业金融在农业食品、医疗健康、绿色环保、智能制造、交通物流等多个领域，开展金融服务，以构建良性运转的产业生态圈为目标，提供综合金融、技术交流、管理咨询及多元资源整合服务，定位“积极的金融、生态的金融和合作的金融”。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp海尔产业金融始终坚持“重度垂直行业线、深度布局产业链、开放构建生态圈”战略方向，并与商业生态系统的各方结成利益共同体，努力构建“共创共赢新模式、共生共享新生态”。致力于成为中国领先的“产业生态金融”服务平台。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp智慧的资本，可靠的伙伴。海尔产业金融专注于产业金融服务，我们不仅仅解决企业融资需求，我们为产业合作伙伴共享海尔十多年产融结合的经验和智慧，我们与合作伙伴共建促进产业生态繁荣的金融服务平台。这就是我们的战略，“产业金融+”。'
                    },
                    {
                        icon: require('../img/logo-3.png'),
                        texth:'复星租赁',
                        textdepict:'&nbsp &nbsp &nbsp &nbsp复星于1992年成立，2007年复星国际有限公司（股份代号：00656）在香港联交所主板上市，其截止2018年6月30日的总资产超过人民币5,600亿元（约合850亿美元）。复星植根中国，深耕健康、快乐、富足领域，通过科技引领、持续创新，智造C2M（客户到智造端）幸福生态系统，为全球家庭客户提供高品质的产品和服务，位列2018福布斯全球上市���司 2000强榜单第416位。\n' +
                        '复星小贷自2014年成立以来，不断开拓在中国的普惠金融领域，以丰富的产品、创新的科技和完善的风控为广大小微型企业和个人客户提供优质的借款咨询服务。 经过快速发展，我们致力于成为金融行业的专业典范，我们拥有一流的团队、一流的技术、一流的产品、一流的服务。\n' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp拥有丰富的产品线，包括无抵押、有抵押、互联网借款产品，为借款人提供定制化服务，也为广大客户提供丰富优质的借款选择。' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp大数据、云风控、人工智能、区块链等先进、领先的金融科技正在积极被运用到我们产品、服务中，为客户提供一流的服务与体验' +
                        '<br/>&nbsp &nbsp &nbsp &nbsp我们拥有超过200人的强大线下销售与服务团队，分布于全国20个省(直辖市)，提供7×24小时为小微型企业和个人客户提供专业的借款咨询服务。我们拥有国际化管理团队，拥有丰富的管理经验。'
                    }
                ]
            }
        },
        methods: {
            //
        },
        created() {     //  vue实例被生成后调用这个函数
            //
        }
    }
</script>
<style lang="less">
    @import '../assets/css/common.less';
    @import '../assets/css/table.less';
    @import '../assets/css/risk.less';
    .cooperation{
        .cooperation-banner{
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .cooperation-th{
             height: 90px;
            line-height: 80px;
            text-align: center;
            border-bottom: solid 1px #D8D8D8;
            font-size: 24px;
            color: #333;
        }
        .cooperation-list-w{
            width: 1000px;
            margin: 0 auto;
            ul {
                padding-bottom: 30px;
            li {
                padding: 15px 0;
                border-bottom: solid 1px #ddd;
                .img{
                    width: 200px;
                    height: 200px;
                    border:solid 1px #ddd;
                     float: left;
                    margin-top: 55px;
                    img{
                        width: 200px;
                        height: 200px;
                    }
                }
                .cooperation-list-text{
                    margin-left: 220px;
                    h3{ font-size: 18px;
                    color: #333;
                    padding: 10px 0;
                    }
                    p{
                        font-size: 16px;
                        line-height: 27px;
                        color: #666;
                    }
                }
            }
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/cooperation.vue