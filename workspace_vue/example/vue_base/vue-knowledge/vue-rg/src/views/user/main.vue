<template>
    <div class="user-main-index">
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
        <Row :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <Row v-show="titleAll">
                    <Col span="8" style="padding-right: 20px;">
                        <div class="vip-card">
                            <h4 class="title">{{enterpriseInfo.entName}}</h4>
                            <p class="entreprise-type">企业类型：{{enterpriseInfo.entTypeDesc}}</p>
                            <Row class="type-varies text-align-center">
                                <Col span="24"><span class="level1 finish">{{enterpriseInfo.entStatusDesc}}</span></Col>
                                <!--<Col span="8"><span class="level2 finish">白条会员</span></Col>-->
                                <!--<Col span="8"><span class="level3">VIP会员</span></Col>-->
                            </Row>
                        </div>
                    </Col>
                    <div v-show="showTitles">
                        <Col span="10">
                            <div class="main-top-middle">
                                <!--<div id="p-ybt" :style="{width: '200px', height: '190px'}"></div>-->
                                <div id="carousel" class="carousel-wrap">
                                    <div v-if="slideList.length > 0">
                                        <transition-group tag="ul" class='slide-ul' name="list">
                                            <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex">
                                                <p class="title">{{list.productName}}</p>
                                                <Row>
                                                    <Col span="17">
                                                        <div :id="list.productName" :style="{width: '270px', height: '140px'}"></div>
                                                    </Col>
                                                    <Col span="7">
                                                        <div class="txt-style">
                                                            <h4 class="tit-sx">授信总额: </h4>
                                                            <p><i class="count1">{{$utilFinance.formatNumThousands(list.creditLine, 2, '--')}}</i> 元</p>
                                                            <h4 class="mt20 tit-ky">可用额度: </h4>
                                                            <p><i class="count1">{{$utilFinance.formatNumThousands(list.residualCreditLines, 2, '--')}}</i> 元</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </li>
                                        </transition-group>
                                    </div>
                                    <div class="alignTextCenter" v-else>
                                        暂时还未获得授信
                                    </div>
                                    <div class="carousel-items">
                                <span v-for="(item,index) in slideList.length" v-if="slideList.length > 0" :class="{'active':index===currentIndex}"
                                      @mouseover="change(index)"></span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="main-top-right">
                                <dl>
                                    <dt>待还款金额</dt>
                                    <dd class="count">{{repayInfo.repayAmount}} 元</dd>
                                    <dd>待还款笔数 <span class="num">{{repayInfo.repayNumber}}</span> 笔</dd>
                                </dl>
                                <dl>
                                    <dt>已逾期金额</dt>
                                    <dd class="count">{{overdueInfo.overdueAmount}} 元</dd>
                                    <dd>已逾期笔数 <span class="num">{{overdueInfo.overdueNumber}}</span> 笔</dd>
                                </dl>
                            </div>
                        </Col>
                    </div>
                    <!--<div v-show="!showTitles">-->
                        <!--<Col span="15">-->
                            <!--<div class="main-top-large">-->
                                <!--<div class="txt">-->
                                    <!--<p class="fr">状态：<span class="red">{{productState}}</span></p>-->
                                    <!--<strong>{{productName}}申请进度</strong>-->
                                <!--</div>-->
                                <!--<div v-show="stepsShow">-->
                                    <!--<Steps :current="currentStep" class="mt30">-->
                                        <!--<Step title="填写资料" icon=""></Step>-->
                                        <!--<Step title="平台审批" icon=""></Step>-->
                                        <!--<Step title="资方审批" icon=""></Step>-->
                                        <!--<Step title="获得授信" icon=""></Step>-->
                                    <!--</Steps>-->
                                <!--</div>-->
                                <!--<div v-show="!stepsShow" class="err-info">-->
                                    <!--<div class="desc">原因：{{auditContent}}</div>-->
                                    <!--<div class="mt20 text-align-center"><Button type="warning" @click="goLinmit(productCodes)">重新提交</Button></div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</Col>-->
                    <!--</div>-->

                </Row>
                <div class="mt20" v-show="authInfo">
                    <!--<div class="banner" style="backgroundImage: '../../assets/images/banner1.png'"><a href="#"></a></div>-->
                    <p class="indexTh mt20">授信申请</p>
                    <Table :columns="columns3" :data="listData3" class="mt10"></Table>
                </div>
                <Row v-show="authInfo">
                    <div>
                        <p class="indexTh mt20">进行中的订单</p>
                        <Table :columns="columns1" :data="listData1" class="mt10"></Table>
                        <div class="tabWap clearfix">
                            <p class="indexTh mt20 fl">还款计划</p>
                            <div class="setLab mt20 fr">
                                <div :class="{setLabFloatColor: tableIndex===1? true : false, setLabFloat:tableIndex!==1? true : false}" class="fl" @click="returnPlanList(1)">一周</div>
                                <div :class="{setLabFloatColor: tableIndex===2? true : false, setLabFloat:tableIndex!==2? true : false}" class="fl" @click="returnPlanList(2)">一个月</div>
                                <div :class="{setLabFloatColor: tableIndex===3? true : false, setLabFloat:tableIndex!==3? true : false}" class="fl" @click="returnPlanList(3)">三个月</div>
                            </div>
                        </div>
                        <Table :columns="columns2" :data="listData2" class="mt10"></Table>
                    </div>
                </Row>

                <Row v-show="authInfo1">
                    <div class="product-con">
                        <div class="product-con-th-two">
                            <span class="th">推荐产品</span>
                        </div>
                        <div class="product-list-con">
                            <div class="product-list clearfix" v-for="item in productData">
                                <div class="float-l width-per-10"><div class="product-list-icon">{{item.name}}</div></div>
                                <div class="float-l width-per-20">
                                    <h4 class="th">{{item.depictTh}}</h4>
                                    <p class="depict">{{item.depict}}</p>
                                </div>
                                <div class="float-l width-per-14">
                                    <div class="th-rate">{{item.rateTh}}</div>
                                    <div class="rate">{{item.rate}}</div>
                                </div>
                                <div class="float-l width-per-10">
                                    <div class="quota-th">{{item.quotaTh}}</div>
                                    <div class="quota depict">{{item.quota}}</div>
                                </div>
                                <div class="float-l width-per-13">
                                    <div>
                                        {{item.loan}}
                                    </div>
                                    <div class="depict">
                                        {{item.loanDepict}}
                                    </div>
                                </div>
                                <div class="float-l width-per-13">
                                    <div>{{item.loanTime}}</div>
                                    <div class="depict">{{item.loanTimeDepict}}</div>
                                </div>
                                <div class="float-l width-per-20">
                                    <div class="btn">
                                        <Button type="warning" @click="loanApply(item.btnType, item.state)">立即申请</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Card>
            </Col>
        </Row>
        <Modal
                v-model="urlImg"
                title="扫描右方二维码，填写信息：">
            <div class="tips clearfix">
                <div class="qz-text">
                    1、制作电子签章<br/>
                    2、签署授权书<br/>
                    3、填写补充资料
                </div>
                <div class="qz-QR">
                    <img :src="bigImg">
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="imgShow">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    let vm = null;
    let colomns1 = [
        { key: 'id', title: '序号', width: 60, type: 'index', align: 'center', className: 'col-no-padding' },
        {key: 'orderNo', title: '订单号', align: 'center', className: 'col-no-padding'},
        {key: 'sellerName', title: '供应商',  align: 'center', className: 'col-no-padding'},
        {key: 'orderAmount', title: '贷款金额(元）',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.orderAmount, 2, '--'));
            }
        },
        {key: 'paymentMethodDesc', title: '付款方式',  align: 'center', className: 'col-no-padding'},
        {key: 'applyDate', title: '申请时间',  align: 'center', className: 'col-no-padding'},
        {key: 'orderStatusDes', title: '状态',  align: 'center', className: 'col-no-padding'}
    ];
    let colomns2 = [
        {key: 'id', title: '序号', width: 60, type: 'index', align: 'center', className: 'col-no-padding' },
        {key: 'loanNo', title: '货款编号', align: 'center', className: 'col-no-padding'},
        {key: 'loanAmount', title: '贷款金额',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.loanAmount, 2, '--'));
            }
        },
        {key: 'repayTotalAmount', title: '已还金额(元)',align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.repayTotalAmount, 2, '--'));
            }
        },
        {key: 'loanBalance', title: '贷款余额(元）',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.loanBalance, 2, '--'));
            }
        },
        {key: 'productName', title: '产品',  align: 'center', className: 'col-no-padding'},
        {key: 'payDate', title: '起始日',  align: 'center', className: 'col-no-padding'},
        {key: 'repayDate', title: '到期日',  align: 'center', className: 'col-no-padding'},
    ];
    let colomns3 = [
        {key: 'id', title: '序号', width: 60, type: 'index', align: 'center', className: 'col-no-padding' },
        {key: 'productName', title: '产品名称', align: 'center', className: 'col-no-padding'},
        {key: 'create_time', title: '申请时间',  align: 'center', className: 'col-no-padding'},
        {key: 'creditStatusDesc', title: '状态',align: 'center', className: 'col-no-padding'},
        {key: 'operationRemark', title: '备注',  align: 'center', className: 'col-no-padding'},
        {key: 'creditStatus', title: '操作',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
            // params.row.creditStatus
                let btn = h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            vm.showCorde(params.row.factoring_url)
                        }
                    }
                }, '显示二维码')
                let btn2 = h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginLeft: '10px'
                    },
                    on: {
                        click: () => {
                            vm.eidtProductInfo(2, params.row.productName)
                        }
                    }
                }, '查看详情信息')
                let btn3 = h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginLeft: '10px'
                    },
                    on: {
                        click: () => {
                            vm.eidtProductInfo(1, params.row.productName)
                        }
                    }
                }, '重新申请')
                if (params.row.creditStatus === 2) {
                    if (params.row.productName === '流水贷') {
                        return h('div', [
                            btn,btn2
                        ])
                    } else if (params.row.productName === '订货贷') {
                        return h('div', [
                            btn3
                        ])
                    } else {
                        return h('div', [
                            btn2
                        ])
                    }
                }
                if (params.row.creditStatus === 0) {
                    return h('div', [
                        btn2
                    ])
                }
                if (params.row.creditStatus === 1 || params.row.creditStatus === 3) {
                    return h('div', [
                        btn3
                    ])
                }
            }}
    ];
    export default {
        name: "usercenter",
        data () {
            return {
                bigImg: '',
                urlImg: false,
                modalFPD: false,
                authInfo: false,
                authInfo1: false,
                showTitles: false,
                titleAll: false,
                stepsShow: false,
                productState: '',
                auditContent: '',
                productName: '',
                productCodes: '',
                productData: [],
                columns1: colomns1,
                columns2: colomns2,
                columns3: colomns3,
                listData1: [],
                listData2: [],
                listData3: [],
                tableIndex: 1,
                enterpriseInfo: {
                    entType: '',
                    entTypeDesc: '',
                    entName: '',
                    entId: '',
                    entStatus: 0,
                    entStatusDesc: ''
                },
                currentIndex: 0, //比对图片索引的变量
                currentStep: 1,
                repayInfo: {},
                overdueInfo: {},
                slideList: [],
                timer: null, //定时器
            }
        },
        computed: {
            tokens () {
                return this.$store.getters.getToken
            },
            getEntIds () {
                return this.$store.getters.getEntId
            }
        },
        methods: {
            // 重新编辑
            showCorde (url) {
                this.urlImg = true;
                this.bigImg = url;
            },
            imgShow () {
                this.urlImg = false;
            },
            eidtProductInfo (num, val) {
                let that = this;
                that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                    if (num === 1) {
                        if (val === '快贷') {
                            that.$router.push({path: '/user/limitApplyKD'})
                        }
                        if (val === '流水贷') {
                            that.$router.push({path: '/user/limitApplyLSD'})
                        }
                        if (val === '药白条') {
                            that.$router.push({path: '/user/limitApplyYBT'})
                        }
                        if (val === '订货贷') {
                            that.$router.push({path: '/user/limitApplyDHD'})
                        }
                    } else {
                        if (val === '快贷') {
                            that.$router.push({path: '/user/limitApplyKDInfo'})
                        }
                        if (val === '流水贷') {
                            that.$router.push({path: '/user/limitApplyLSDInfo'})
                        }
                        if (val === '药白条') {
                            that.$router.push({path: '/user/limitApplyYBTInfo'})
                        }
                        if (val === '订货贷') {
                            that.$router.push({path: '/user/limitApplyDHDInfo'})
                        }
                    }
                })
            },
            // 分页查询授信申请信息
            selectCreditApplyInfoAll () {
                let self = this;
                this.$https.post('/api-webbff/v1/asset/selectCreditApplyInfo',{
                    pageNum: 0,
                    pageSize: 0
                })
                    .then(res => {
                        let applyInfos = res.data.data;
                        if (res.data.success === 1) {
                            self.listData3 = applyInfos.list;
                        } else {
                            if (res.data.error.code == 498) {
                                self.$router.push({path:'/login/'})
                            } else {
                                self.$message.error('服务器忙，请重试！');
                            }
                        }
                    })
                    .catch(err => {
                        self.$message.error('获取授信申请信息失败');
                    })
            },
            // 跳转 快贷 流水贷 药白条
            goLinmit (val) {
                if (val === 'LSD') {
                    this.$router.push({path: '/user/limitApply'})
                }
                if (val === 'YBT') {
                    this.$router.push({path: '/user/limitApply'})
                }
                if (val === 'QD') {
                    this.$router.push({path: '/user/limitApply'})
                }
            },
            // 获取客户授信、待还、逾期数据
            getCreditLimitRepayOverdue () {
                let that = this
                this.$https.get('/api-webbff/v1/limit/getCreditLimitAndRepayAndOverdueInfo')
                    .then(res => {
                        let getUserInfo = res.data.data
                        if (res.data.success === 1) {
                            that.slideList = getUserInfo.creditLimit
                            that.repayInfo = getUserInfo.repayInfo
                            that.overdueInfo = getUserInfo.overdueInfo
                            that.$nextTick(() => {
                                for (let list of that.slideList) {
                                    that.drawChart(list)
                                }
                            })
                        } else {
                            console.log(res.data.error.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            init () {
                this.spinShow = false;
                this.getOrderList();
                this.returnPlanList(this.tableIndex);
            },
            // 获取客户授信情况
            getLimitCredits () {
                let that = this;
                this.$https.get('/api-webbff/v1/limit/getLimitCredit')
                    .then(res => {
                        if (res.data.success === 1) {
                            let arr = []
                            for (let item of res.data.data) {
                                if (item.btnType === 1) {
                                    let infos = Object.assign({
                                        name: '药',
                                        depictTh: '药白条',
                                        depict: '在我的医药网上有交易记录的大型商业客户',
                                        rateTh:'融资费率',
                                        rate:'日息万分之2.5起',
                                        quotaTh:'额度上限',
                                        quota:'500万',
                                        loan:'贷款期限',
                                        loanDepict:'4个月以内',
                                        loanTime:'还款方式',
                                        loanTimeDepict:'按日计息、随借随还',
                                        btnType: 1,
                                        state: 0
                                    },item)
                                    arr.push(infos)
                                } else if (item.btnType === 2) {
                                    let infosTwo = Object.assign({
                                        name: '流',
                                        depictTh: '流水贷',
                                        depict: '有半年以上医保回款流水的医保定点药店',
                                        rateTh:'融资费率',
                                        rate:'日息万分之2.5起',
                                        quotaTh:'额度上限',
                                        quota:'300万',
                                        loan:'贷款期限',
                                        loanDepict:'4个月以内',
                                        loanTime:'还款方式',
                                        loanTimeDepict:'等额本息或到期一次还本付息',
                                        btnType: 2,
                                        state: 0
                                    },item)
                                    arr.push(infosTwo)
                                } else if (item.btnType === 3) {
                                    let infosThree = Object.assign({
                                        name: '快',
                                        depictTh: '快贷',
                                        depict: '有良好法人或大股东征信的商业或终端',
                                        rateTh:'融资费率',
                                        rate:'日息万分之3起',
                                        quotaTh:'额度上限',
                                        quota:'50万',
                                        loan:'贷款期限',
                                        loanDepict:'2个月以内',
                                        loanTime:'还款方式',
                                        loanTimeDepict:'到期一次还本付息，支持提前还款',
                                        btnType: 3,
                                        state: 0
                                    },item);
                                    arr.push(infosThree)
                                } else if (item.btnType === 4) {
                                    let infosFour = Object.assign({
                                        name: '订',
                                        depictTh: '订货贷',
                                        depict: '完整年度纳税记录，信用良好',
                                        rateTh:'融资费率',
                                        rate:'日息万分之3起',
                                        quotaTh:'额度上限',
                                        quota:'300万',
                                        loan:'贷款期限',
                                        loanDepict:'最长36个月',
                                        loanTime:'还款方式',
                                        loanTimeDepict:'分期还款，随借随还',
                                        btnType: 4,
                                        state: 0
                                    },item);
                                    arr.push(infosFour);
                                    arr.push({
                                        name: '发',
                                        depictTh: '发票贷',
                                        depict: '持续开票满18个月的商业公司',
                                        rateTh:'融资费率',
                                        rate:'日息万分之3起',
                                        quotaTh:'额度上限',
                                        quota:'100万',
                                        loan:'贷款期限',
                                        loanDepict:'3个月以内',
                                        loanTime:'还款方式',
                                        loanTimeDepict:'按日计息、随借随还',
                                        btnType: 5,
                                        state: -1
                                    })
                                }
                            }
                            that.productData = arr
                        } else {

                        }
                    })
                    .catch(err => {

                    })
            },
            // type: 点击按钮的类型，state: 当前用户是否授信当前产品 例：快贷 流水贷 药白条
            loanApply (type, state) {
                let that = this;
                let arrStateOne = [-1,5,6,8];
                let arrStateTwo = [1,3];
                let arrStateThree = [0,2,4];
                let arrStateDHDone = [-1,2,5,6,8]; // 单独跳转逻辑
                let arrStateDHDthree= [0,4]; // 单独跳转逻辑
                that.$store.dispatch('getAuth',{_self: this, id: this.getEntIds}).then(res => {
                    if (type === 1) {
                        if (arrStateOne.includes(state)) {
                            that.$router.push({path: '/user/limitApplyYBT'})
                        }
                        if (arrStateTwo.includes(state)) {
                            that.$router.push({path: '/user/'})
                        }
                        if (arrStateThree.includes(state)){
                            that.$router.push({path: '/user/limitApplyYBTInfo'})
                        }
                    } else if (type === 2) {
                        if (arrStateOne.includes(state)) {
                            that.$router.push({path: '/user/limitApplyLSD'})
                        }
                        if (arrStateTwo.includes(state)) {
                            that.$router.push({path: '/user/'})
                        }
                        if (arrStateThree.includes(state)){
                            that.$router.push({path: '/user/limitApplyLSDInfo'})
                        }
                    } else if (type === 3) {
                        if (arrStateOne.includes(state)) {
                            that.$router.push({path: '/user/limitApplyKD'})
                        }
                        if (arrStateTwo.includes(state)) {
                            that.$router.push({path: '/user/'})
                        }
                        if (arrStateThree.includes(state)){
                            that.$router.push({path: '/user/limitApplyKDInfo'})
                        }
                    } else if (type === 4) {
                        if (arrStateDHDone.includes(state)) {
                            that.$router.push({path: '/user/limitApplyDHD'})
                        }
                        if (arrStateTwo.includes(state)) {
                            that.$router.push({path: '/user/'})
                        }
                        if (arrStateDHDthree.includes(state)) {
                            that.$router.push({path: '/user/limitApplyDHDInfo'})
                        }
                    } else if (type === 5) {
                        that.modalFPD = true;
                    }
                })
            },
            // 获得金融产品申请进度
            getApplyFinProductProcessList () {
                let self = this;
                this.$https.get('/api-webbff/v1/limit/getApplyFinProductProcessList')
                    .then(res => {
                        let enterpriseInfo = res.data.data
                        self.enterpriseInfo.entType = enterpriseInfo.entType;
                        self.enterpriseInfo.entTypeDesc = enterpriseInfo.entTypeDesc;
                        self.enterpriseInfo.entName = enterpriseInfo.entName;
                        self.enterpriseInfo.entId = enterpriseInfo.entId;
                        self.enterpriseInfo.entStatus = enterpriseInfo.entStatus;
                        self.enterpriseInfo.entStatusDesc =  enterpriseInfo.entStatusDesc;
                        if (enterpriseInfo.applyFinProducts.length === 0) {// 未授信未申请
                            self.authInfo = false;
                            self.authInfo1 = true;
                            self.showTitles = false;
                            self.titleAll = false;
                        } else {
                            // for (let item of enterpriseInfo.applyFinProducts) {
                                // if (item.auditStatus === 0 || item.auditStatus === 1 || item.auditStatus === 2 || item.auditStatus === 3 ) {// 未授信 已申请
                                //     self.authInfo = false;
                                //     self.authInfo1 = true;
                                //     self.showTitles = false;
                                //     self.titleAll = true;
                                //     self.productCodes = item.productCode;
                                //     self.productName = item.productName;
                                //     if (item.auditStatus === 0) {
                                //         self.stepsShow = true;
                                //         self.currentStep = 1;
                                //         self.productState = '待初审';
                                //     }
                                //     if (item.auditStatus === 1 || item.auditStatus === 3) {
                                //         self.stepsShow = false;
                                //         self.productState = '被驳回';
                                //         self.auditContent = item.auditContent;
                                //     }
                                //     if (item.auditStatus === 2) {
                                //         self.stepsShow = true;
                                //         self.currentStep = 2;
                                //         self.productState = '待资方审核';
                                //     }
                                // }
                                // if (item.auditStatus === 4 ||item.auditStatus === 5 || item.auditStatus === 6) {// 显示已授信
                                    self.authInfo = true;
                                    self.authInfo1 = false;
                                    self.showTitles = true;
                                    self.titleAll = true;
                                // }
                            // }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 进行中的订单
            getOrderList () {
                this.$https.post('/api-webbff/v1/asset/queryOngoingOrders',{})
                    .then(res => {
                        if (res.data.success === 1) {
                            this.listData1 = res.data.data
                        } else {
                            this.listData1 = [];
                            console.log('未获得进行中订单信息')
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            // 工作台（已授信）-还款计划
            returnPlanList (index) {
                this.tableIndex = index;
                let dates = '';
                if (this.tableIndex === 1) {
                    dates = 'oneWeek';
                }
                if (this.tableIndex === 2) {
                    dates = 'oneMonth';
                }
                if (this.tableIndex === 3) {
                    dates = 'threeMonth';
                }
                let _params = {
                    date: dates
                };
                this.$https.post('/api-webbff/v1/asset/selectRepayPlan', _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            this.listData2 = res.data.data;
                        } else {
                            console.log('未获得还款计划信息');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            go() {
                this.timer = setInterval(() => {
                    this.autoPlay()
                }, 6000)
            },
            stop() {
                clearInterval(this.timer);
                this.timer = null
            },
            change(index) {
                this.currentIndex = index
            },
            autoPlay() {
                this.currentIndex++;
                if (this.currentIndex > this.slideList.length - 1) {
                    this.currentIndex = 0
                }
            },
            drawChart (data) {
                let myChart = this.$echarts.init(document.getElementById(data.productName));
                // 绘制图表
                myChart.setOption({
                    color: ['#9E630E','#EAB36C'],
                    tooltip: {
                        show:false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        /*selectedMode: false,
                        orient: 'vertical',
                        y: 'top',
                        x: 'left',
                        data:['授信金额','可用额度']*/
                    },
                    series: [
                        {
                            name:'数据结果',
                            type:'pie',
                            radius: ['40%', '60%'],
                            avoidLabelOverlap: true,
                            selectedMode: 'single',
                            selectedOffset: 0,
                            clockwise: true,
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: 14,
                                        color: '#DAA25B'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: '#DAA25B'
                                    }
                                }
                            },
                            data:[
                                {value:(data.creditLine - data.residualCreditLines), name:'已用额度'},
                                {value:data.residualCreditLines, name:'可用额度'}
                            ]
                        }
                    ]
                });
            }
        },
        created () {
            vm = this;
            this.init();
        },
        mounted () {
            this.getLimitCredits();
            this.getCreditLimitRepayOverdue();
            this.getApplyFinProductProcessList();
            this.selectCreditApplyInfoAll();
        }
    }
</script>

<style scoped lang="less">
    .setTips {
        font-size: 14px;
        text-align: center;
        font-weight: bold;
    }
    .tips {
        width: 300px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 30px;
        .qz-text {
            font-size: 14px;
            float: left;
        }
        .qz-QR {
            width: 140px;
            height: 140px;
            float: right;
            margin-left: 30px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .margin-top-5 {
        margin-top: 4px;
    }
    .alignTextCenter {
        text-align:center;
        line-height: 190px;
    }
    .classModalFPD{
        .ivu-modal{
            top: 10px;
        }
        .bg{position:relative;height:470px; background: url("../../img/main-page/popupFPD.jpg") no-repeat 0 0;}
    }
    .product-con{
        .product-con-th-two{
            margin-bottom: 15px;
            .th{
                color:#333;
                font-size: 14px;
                border-left: solid 4px #E2A54D;
                padding-left: 10px;
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
                    font-size: 14px;
                    font-weight: normal;
                }
                .th-rate{
                }
                .rate{
                    color: #FF4C4C;
                    font-size: 12px;
                    margin-top: 13px;
                }
                .quota-th{

                }
                /*.quota{*/
                    /*padding-top:20px;*/
                /*}*/
                .depict{
                    color: #333;
                    padding-top: 10px;
                }
                .btn{
                    margin:10px;
                    text-align: center;
                    button{
                        padding: 5px 40px;
                        backgroud: #E2A54D;
                        border-color: #E2A54D;
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .user-main-index{
        .vip-card{
            width:100%;
            height:220px;
            padding:17px;
            background-image: url("../../assets/images/bg-user-card.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color:#fff;
            .title{padding-bottom:10px; border-bottom:solid 1px #fff; font-size:18px;font-weight: normal;}
            .entreprise-type{padding-top:12px;font-size:14px;}
            .type-varies{margin-top:20px;
                span{display:block;padding-top:65px;position:relative;
                    &:before{content:'.';position:absolute;top:0;left:0;width:100%;height:60px; }
                }
                span.finish{color:#FDDFB9}
                span.level1{background: url("../../assets/images/certify-grey.png") no-repeat center 0;}
                span.level2{background: url("../../assets/images/silver-grey.png") no-repeat center 0;}
                span.level3{background: url("../../assets/images/VIP-grey.png") no-repeat center 0;}
                span.level1.finish{background: url("../../assets/images/certify.png") no-repeat center 0;}
                span.level2.finish{background: url("../../assets/images/silver.png") no-repeat center 0;}
                span.level3.finish{background: url("../../assets/images/VIP.png") no-repeat center 0;}
            }
        }
        .indexTh{border-left: solid 4px #E2A54D;padding-left: 10px;font-size: 14px;margin-bottom: 10px;}
        .tabWap {
            height: 50px;
            .setLab {
                border: 1px solid #E2A54D;
                .setLabFloat {
                    width: 80px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    border-right: 1px solid #E2A54D;
                }
                .setLabFloatColor {
                    width: 80px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    border-right: 1px solid #E2A54D;
                    color: #ffffff;
                    background-color: #E2A54D;
                }
                &:last-child {
                    border-right: 0;
                }
            }
        }
        .main-top-middle{height:220px;border:solid 1px #ddd;padding:15px;border-radius:10px;
            .slide-ul{
                li {
                    .title{color:#9E630E; font-size:18px;}
                    .txt-style{color:#999;padding:20px 0 0 20px;
                        h4{position:relative;
                            &:before {
                                content:''; position: absolute;width:6px;height:6px; left:-10px;top:8px; background: #9E630E;border-radius:4px
                            }
                        }
                        .tit-sx{color:#9E630E;font-size: 15px;}
                        .tit-ky{color:#EAB36C;font-size: 15px;
                            &:before{background: #EAB36C; }
                        }
                    }
                    .txt-style .count1{color:#333; font-style:normal; font-size: 15px;}
                }
            }
        }
        .main-top-right{height:220px;margin-left:20px;border:solid 1px #ddd;padding:15px;border-radius:10px;
            dl{color:#999; margin-bottom:27px; padding-left:10px;
                dt{position: relative;
                    &:before{content: ''; position: absolute;width:6px;height:6px; top:7px;left:-10px; background: #999; border-radius:3px;}
                }
                dd.count{margin-bottom:3px;font-size:18px; color:#333;}
                dd .num{color:#333;}
            }
        }
        .banner{height:100px; background: url("../../assets/images/banner1.png") no-repeat center 0;
            a{display:block;height:100px;}
        }
        .main-top-large{height:220px;border:solid 1px #ddd;padding:15px;border-radius:10px;
            .txt{padding-bottom:10px; border-bottom:solid 1px #ddd;
                strong{color:#9E630E; font-size:16px; font-weight: normal}
            }
            .err-info{margin-top:30px;}

        }

        .carousel-wrap {position: relative;height: 190px;width: 100%;overflow: hidden;background-color: #fff;float: left;}
        .carousel-wrap .slide-ul {width: 100%;height: 190px;margin: 0;}
        .carousel-wrap li {position: absolute;width: 100%;height: 190px;left: 0;top:0;}
        .carousel-wrap li a{display: block;}
        .carousel-items {position: absolute;z-index: 10;bottom: 0;width: 100%;margin: 0 auto;text-align: center;font-size: 0;}
        .carousel-wrap span {display: inline-block;height: 10px;width: 10px;border-radius:5px;margin: 0 6px;background-color: #b2b2b2;cursor: pointer;}
        .carousel-wrap .active {background-color: #0E92CE;}
    }

</style>



// WEBPACK FOOTER //
// src/views/user/main.vue