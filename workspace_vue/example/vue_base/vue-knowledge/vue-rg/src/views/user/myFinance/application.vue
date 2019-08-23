<template>
    <div class="min-height-100 Workbench" ref="Workbench">
        <Row   :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <p class="indexTh"  ref="ivu-card-head">
                    我的贷款
                </p>
                <Form type="flex" ref="ive-row-flex" inline class="borderForm">
                    <FormItem>
                        <div class="formStyle">
                            <span>订单编号：</span>
                            <Input  clearable v-model="searchItem.loanNo" placeholder="请输入订单编号..." style="width: 145px;"/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div class="formStyle">
                            <span>请选择产品：</span>
                            <Select  style="width: 110px;" v-model="searchItem.productType" value="全部" >
                                <Option value="">全部</Option>
                                <Option v-for="item in productList"  :value="item.value"  :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem >
                        <div class="formStyle">
                            <span>放款状态：</span>
                            <Select  style="width: 110px;" v-model="searchItem.stateType">
                                <Option value="">全部</Option>
                                <Option v-for="item in stateList"  :value="item.value"  :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div class="formStyle">
                            <span>逾期状态：</span>
                            <Select  style="width: 110px;" v-model="searchItem.stateLoan">
                                <Option value="">全部</Option>
                                <Option v-for="item in stateApply"  :value="item.value"  :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div class="formStyle">
                            <span>贷款状态：</span>
                            <Select  style="width: 110px;" v-model="searchItem.stateRepayment">
                                <Option value="">全部</Option>
                                <Option v-for="item in stateTrun"  :value="item.value"  :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem >
                        <div class="formStyle">
                            <span>申请日期：</span>
                            <Date-picker style="width: 120px;"
                                         type="date"
                                         v-model="searchItem.createTimeBegin"
                                         :options="start_options"
                                         @on-change="searchItem.createTimeBegin=$event"
                                         placeholder="选择日期">
                            </Date-picker>
                            <span>至</span>
                            <Date-picker
                                    style="width: 120px;"
                                    type="date"
                                    v-model="searchItem.createTimeEnd"
                                    :options="end_options"
                                    @on-change="searchItem.createTimeEnd=$event"
                                    placeholder="选择日期">
                            </Date-picker>
                        </div>
                    </FormItem>

                    <FormItem  style="color:blue; cursor: pointer">
                        <div class="formStyle">
                            <span><Button @click="handleSearch" type="text" class="queryBtn">查询</Button></span>
                        </div>
                    </FormItem>
                </Form>


                <Row class="searchable-table-con1 margin-top-10">
                    <Table ref="table"  :columns="columns" :data="listData" :height="tableMaxHeight"></Table>
                </Row>

                <Row>
                    <div style="margin: 10px;overflow: hidden"
                         v-if="listData.length" ref="page-bar">
                        <div style="float: right;">
                            <Page  show-sizer show-elevator show-total :total='pageInfo.total' :current="currentPage"  :pageSize="pageInfo.pageSize"
                                   :pageSizeOpts="pageInfo.sizeArr" placement="top"
                                   @on-change="changePage"
                                   @on-page-size-change="pageSizeChange" >
                            </Page>
                        </div>
                    </div>
                </Row>
            </Card>
            </Col>
        </Row>
        <!-- 弹出框 -->
        <Modal :width="1000"
                v-model="modalAll"
                @on-ok="isOk"
                @on-cancel="isCancel">
            <p slot="header" style="text-align:center">
                <span>订单详情</span>
            </p>
            <h1 class="titleHead">交易信息：</h1>
            <Table ref="table"  :columns="orderColumns" :data="orderData"></Table>
            <h1 class="titleHead">商品信息：</h1>
            <Table ref="table"  :columns="orderColumnsInfo" :data="orderInfo"></Table>
            <div class="totalAll">合计：{{totalAlls}} 元</div>
        </Modal>
        <!-- 还款确认 -->
        <Modal :width="600"
               v-model="repaymentInfo">
            <p slot="header" style="text-align:center">
                <span>还款确认</span>
            </p>
            <Row>
                <Col span="12" class="text-align-center margin-bottom-10">
                    <div class="width-repayment-left">应还总额：</div><div class="width-repayment">{{blanLoanInfo.totalSum}}元</div>
                </Col>
                <Col span="12" class="text-align-center margin-bottom-10">
                    <div class="width-repayment-left">应还本金：</div><div class="width-repayment">{{blanLoanInfo.totalPri}}元</div>
                </Col>
            </Row>
            <Row>
                <Col span="12" class="text-align-center margin-bottom-10">
                    <div class="width-repayment-left">应还利息：</div><div class="width-repayment">{{blanLoanInfo.totalInt}}元</div>
                </Col>
                <Col span="12" class="text-align-center margin-bottom-10">
                    <div class="width-repayment-left">应还罚息：</div><div class="width-repayment">{{blanLoanInfo.totalPint}}元</div>
                </Col>
            </Row>
            <Row>
                <Col span="12" class="text-align-center margin-bottom-10">
                    <div class="width-repayment-left">违约金：</div><div class="width-repayment">{{blanLoanInfo.totalDam}}元</div>
                </Col>
                <Col span="12" class="text-align-center margin-bottom-10">
                    <div class="width-repayment-left">费用：</div><div class="width-repayment">{{blanLoanInfo.totalFee}}元</div>
                </Col>
            </Row>
            <Row>
                <Col class="text-align-center"><span style="color: red;">注：请确保应还总额已存入还款卡，再点击确认还款按钮</span></Col>
            </Row>
            <div slot="footer" class="text-align-center">
                <Button type="primary" size="large" @click="repayment()">确认还款</Button>
                <Button type="primary" size="large" @click="repaymentCancle">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    let vm = null;
    let orderColumnsInfo = [
        {key: 'goodsName', title: '商品名称', align: 'center', className: 'col-no-padding'},
        {key: 'goodsSpecification', title: '商品规格', align: 'center', className: 'col-no-padding'},
        {key: 'goodsCount', title: '购买数量', align: 'center', className: 'col-no-padding'},
        {key: 'goodsUnit', title: '商品单位', align: 'center', className: 'col-no-padding'},
        {key: 'goodsUnitPrice', title: '购买单价（元）', align: 'center', className: 'col-no-padding'},
        {key: 'goodsTotal', title: '商品小计（元）', align: 'center', className: 'col-no-padding'},
    ];
    let orderColumns = [
        {key: 'orderSn', title: '订单编号', align: 'center', className: 'col-no-padding'},
        {key: 'sellerName', title: '供应商', align: 'center', className: 'col-no-padding'},
        {key: 'orderAmount', title: '订单金额（元）', align: 'center', className: 'col-no-padding'},
        {key: 'orderDate', title: '申请日期', align: 'center', className: 'col-no-padding'},
        {key: 'orderStatusDes', title: '状态', align: 'center', className: 'col-no-padding'}
    ]
    let colomns = [
        // {key: 'id', title: '操作', width: 100, align: 'center', className: 'col-no-padding',
        //     render: (h, params) => {
        //         let btn = h('div', {
        //             style: {
        //                 color: '#3483CC',
        //                 cursor: 'pointer'
        //             },
        //             on: {
        //                 click: () => {
        //                     vm.blankLoan(params.row.orderSn)
        //                 }
        //             }
        //         }, '还款')
        //         if (params.row.applyStatus === 2) {
        //             return h('div', [
        //                 btn
        //             ])
        //         }
        //     }
        // },
        {key: 'loanNo', title: '贷款编号', width: 170, align: 'center', className: 'col-no-padding'},
        {key: 'orderSn', title: '订单编号', width: 170, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                let btn = h('div', {
                    style: {
                        color: '#3483CC',
                        cursor: 'pointer'
                    },
                    on: {
                        click: () => {
                            vm.mobileShow(params.row.orderSn)
                        }
                    }
                }, params.row.orderSn)
                return h('div', [
                    btn
                ])
            }
        },
        {key: 'productName', title: '产品名称', width: 80,  align: 'center', className: 'col-no-padding'},
        {key: 'importFactorName', title: '资方名称', width: 180, align: 'center', className: 'col-no-padding'},
        {key: 'loanAmount', title: '贷款金额(元）', width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.loanAmount, 2, '--'));
            }
        },
        {key: 'loanRate', title: '利率',  width: 100, align: 'center', className: 'col-no-padding'},
        {key: 'payInteresteAmt', title: '应付利息(元)',  width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.payInteresteAmt === ''|| params.row.payInteresteAmt === null) {
                    return h('div', '--');
                } else {
                    return h('div', params.row.payInteresteAmt);
                }
            }},
        {key: 'applyDate', title: '申请日期',  width: 100, align: 'center', className: 'col-no-padding'},
        // {key: 'applyStatus', title: '状态',  align: 'center', className: 'col-no-padding',
        //     render: (h, params) => {
        //         let btn1= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '待申请放款');
        //         let btn2= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '待放款');
        //         let btn3= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '已放款');
        //         let btn4= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '已驳回');
        //         let btn5= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '已还款');
        //         let btn6= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '待申请放款');
        //         // let btn7= h('span', { 未还款改为已放款
        //         //     style: {
        //         //         color: '#333'
        //         //     }
        //         // }, '未还款');
        //         let btn7= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '已放款');
        //         let btn8= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '部分还款');
        //         let btn9= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '已取消');
        //         let btn10= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '');
        //         let btn11= h('span', {
        //             style: {
        //                 color: '#333'
        //             }
        //         }, '待发送');
        //         if (params.row.applyStatus === null) {
        //             return h('div', [
        //                 btn10
        //             ]);
        //         } else {
        //             if(Number(params.row.applyStatus) === 0){
        //                 return h('div', [
        //                     btn1
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 11) {
        //                 return h('div', [
        //                     btn2
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 2) {
        //                 return h('div', [
        //                     btn3
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 31) {
        //                 return h('div', [
        //                     btn4
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 6) {
        //                 return h('div', [
        //                     btn5
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 1) {
        //                 return h('div', [
        //                     btn6
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 4) {
        //                 return h('div', [
        //                     btn7
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 5) {
        //                 return h('div', [
        //                     btn8
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 30) {
        //                 return h('div', [
        //                     btn9
        //                 ]);
        //             }else if(Number(params.row.applyStatus) === 7) {
        //                 return h('div', [
        //                     btn11
        //                 ]);
        //             }
        //         }
        //     }
        // },
        {key: 'loanDate', title: '贷款起始日',  width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.loanDate === ''|| params.row.loanDate === null) {
                    return h('div', '--');
                } else {
                    return h('div', params.row.loanDate);
                }
            }
        },
        {key: 'repayDate', title: '贷款到期日',  width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.repayDate === ''|| params.row.repayDate === null) {
                    return h('div', '--');
                } else {
                    return h('div', params.row.repayDate);
                }
            }
        },
        {key: 'finishDate', title: '实际还款日期',  width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.finishDate === ''|| params.row.finishDate === null) {
                    return h('div', '--');
                } else {
                    return h('div', params.row.finishDate);
                }
            }
        },
        {key: 'applyStatusDesc', title: '放款状态', width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.applyStatusDesc === ''|| params.row.applyStatusDesc === null) {
                    return h('div', '--');
                } else {
                    if (params.row.applyStatus === 30 || params.row.applyStatus === 31) {
                        let btn = h('div', {
                            style: {
                                color: 'red'
                            }
                        }, params.row.applyStatusDesc)
                        return h('div',[btn]);
                    } else {
                        return h('div', params.row.applyStatusDesc);
                    }
                }
            }
        },
        {key: 'overStatusDesc', title: '逾期状态', width: 100, align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.overStatusDesc === ''|| params.row.overStatusDesc === null) {
                    return h('div', '--');
                } else {
                    return h('div', params.row.overStatusDesc);
                }
            }
        },
        {key: 'repaymentStatusDesc', title: '贷款状态',width: 100,  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.repaymentStatusDesc === ''|| params.row.repaymentStatusDesc === null) {
                    return h('div', '--');
                } else {
                    return h('div', params.row.repaymentStatusDesc);
                }
            }
        }
    ];
    export default {
        name: "application",
        data(){
            return{
                blanLoanInfo: {
                    totalSum: 0,
                    totalPri: 0,
                    totalFee: 0,
                    totalPint: 0,
                    cino: '',
                    totalDam: 0,
                    totalInt: 0
                },
                orderSn: '',
                repaymentInfo: false,
                totalAlls: 0,
                modalAll: false,
                isEdit: false,
                searchItem: {
                    loanNo:'', // 贷款编号
                    stateType: '',
                    stateLoan: '',
                    productType: '',
                    stateRepayment: '',
                    createTimeBegin: null,//查询条件-开始时间
                    createTimeEnd: null,//查询条件-结束时间
                },
                productList: [
                    {
                        label: '药白条',
                        value: 'YBT'
                    }, {
                        label: '流水贷',
                        value: 'LSD'
                    }, {
                        label: '快贷',
                        value: 'KD'
                    }
                ],
                stateList:[
                    {
                        label: '待申请放款',
                        value: '0,1'
                    }, {
                        label: '待放款',
                        value: '11'
                    }, {
                        label: '已放款',
                        value: '2,4,5,6'
                    },{
                        label: '已取消',
                        value: '30'
                    },
                    {
                        label: '被驳回',
                        value: '31'
                    }
                ],
                stateApply: [
                    {
                        label: '未逾期',
                        value: 0
                    }, {
                        label: '已逾期',
                        value: 1
                    }
                ],
                stateTrun: [
                    {
                        label: '未结清',
                        value: 0
                    },{
                        label: '已结清',
                        value: 1
                    }
                ],
                start_options: {
                    disabledDate (date) {
                        let end = vm.searchItem.createTimeEnd;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_options: {
                    disabledDate (date) {
                        let start = vm.searchItem.createTimeBegin;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
                listData: [],
                orderData: [],
                orderInfo: [],
                columns: colomns,
                orderColumns: orderColumns,
                orderColumnsInfo: orderColumnsInfo,
                currentPage: 1,
                selectDatas: [],
                pageInfo: {},
                loading: true,
                tableMaxHeight: null,
            }
        },
        computed: {
            getEntIds () {
                return this.$store.getters.getEntId
            }
        },
        methods: {
            /**
             * 获取还款信息
             * @param {String}   orderSn  [订单编号]
             *
             * */
            blankLoan (orderSn) {
                let self = this;
                this.initBlankLoan();
                this.$https.get(`/api-webbff/v1/limit/getBlankLoan?orderSn=${orderSn}`).then(res => {
                    self.orderSn = orderSn;
                    self.repaymentInfo = true;
                    if (res.data.resultCode === 1) { // 询问后端以哪个返回字段判断成功，后端答复什么都行，已resultCode为标准，resultCode：1 成功。
                        self.blanLoanInfo.totalSum = res.data.data.fee.totalSum; // 还款总金额
                        self.blanLoanInfo.totalPri = res.data.data.fee.totalPri; // 还款本金
                        self.blanLoanInfo.totalFee = res.data.data.fee.totalFee; // 费用
                        self.blanLoanInfo.totalPint = res.data.data.fee.totalPint; // 罚息
                        self.blanLoanInfo.cino = res.data.data.fee.cino; // 借据编号
                        self.blanLoanInfo.totalDam = res.data.data.fee.totalDam; // 违约金
                        self.blanLoanInfo.totalInt = res.data.data.fee.totalInt; // 利息
                    } else {
                        self.$message.error('获取还款信息失败');
                    }
                }).catch(e => {
                    self.$message.error('获取还款信息失败');
                })
            },
            /**
             * 初始化还款信息
             * */
            initBlankLoan () {
                this.orderSn = ''; // 订单编号
                this.blanLoanInfo.totalSum = 0; // 还款总金额
                this.blanLoanInfo.totalPri = 0; // 还款本金
                this.blanLoanInfo.totalFee = 0; // 费用
                this.blanLoanInfo.totalPint = 0; // 罚息
                this.blanLoanInfo.cino = ''; // 借据编号
                this.blanLoanInfo.totalDam = 0; // 违约金
                this.blanLoanInfo.totalInt = 0; // 利息
            },
            /**
             * 还款
             * @param {String}  orderSn  [订单编号]
             * */
            repayment () {
                let that = this;
                this.$https.get(`/api-webbff/v1/limit/repayOnline?orderSn=${that.orderSn}`).then(res => {
                    if (res.data.resultCode === 1) {
                        that.repaymentCancle();
                        that.$message.success('还款成功');
                    } else {
                        that.$message.error(res.data.msg);
                    }
                }).catch(e => {
                    that.$message.error('还款失败');
                })
            },
            /**
             * 取消还款
             *
             * */
            repaymentCancle () {
                this.repaymentInfo = false;
            },
            isOk () {
                this.modalAll = false;
            },
            isCancel () {
                this.isOk()
            },
            mobileShow (val) {
                let self = this;
                this.$https.get('/api-webbff/v1/asset/getOrderInfo', {
                    params: {
                        orderSn: val
                    }
                }).then(res => {
                    self.modalAll = true;
                    if (res.data.success === 1) {
                        let {
                            goodsAllTotal: goodsAllTotals,
                            goodsInfoList: goodsInfoLists,
                            orderAmount: orderAmounts,
                            orderDate: orderDates,
                            orderSn: orderSns,
                            orderStatusDes: orderStatusDess,
                            sellerName: sellerNames
                        } = res.data.data
                        let arr = [{orderAmount:orderAmounts,orderDate:orderDates,orderSn:orderSns,orderStatusDes: orderStatusDess,
                            sellerName:sellerNames}]
                        let arrInfo = goodsInfoLists;
                        self.totalAlls = goodsAllTotals;
                        self.orderData = arr;
                        self.orderInfo = arrInfo;

                    }
                }).catch(e => {
                    self.$message.error('获取列表失败！');
                })
            },
            handleSearch (data, argumentObj) {
                this.getListPage(1);
            },
            /**
             * 获取列表
             * @param pi
             */
            getListPage (pi) {
                pi = pi || 1;
                let _params = {
                    overStatus: this.searchItem.stateLoan,
                    applyStatus: this.searchItem.stateType,
                    repaymentStatus: this.searchItem.stateRepayment,
                    applyEndDate: this.searchItem.createTimeEnd,
                    orderSn: this.searchItem.loanNo,
                    pageNum: pi,
                    pageSize: this.pageInfo.pageSize,
                    productCode: this.searchItem.productType,
                    applyStartDate: this.searchItem.createTimeBegin
                };
                vm.$Loading.start();
                vm.currentPage = pi;
                this.$https.post('/api-webbff/v1/asset/selectLoanInfoPageList', _params).then(res => {
                    if (res.data.success === 1) {
                        this.listData = res.data.data.list;
                        this.pageInfo.total = res.data.data.total;
                    } else {
                        this.listData = this.initTable = [];
                        this.pageInfo.total = 0;
                    }
                    this.$Loading.finish();
                }).catch(e => {
                   this.$message.error('列表获取失败！');
                })
            },

            changePage (pi) {
                this.getListPage(pi);
            },
            pageSizeChange (ps) {
                this.pageInfo.pageSize = ps;
                this.getListPage(1);
            },
        },
        mounted () {
            this.getListPage();
        },
        updated () {
            let _pageHeight = 0;
            let _navHeight=0;
            if (this.listData.length) {
                _pageHeight = this.$refs['page-bar'].offsetHeight;
            }
            _navHeight=this.$refs['Workbench'].getBoundingClientRect().top;
            let _maxHeight = window.innerHeight - _navHeight - this.$refs['ivu-card-head'].offsetHeight - this.$refs['ive-row-flex'].$el.offsetHeight - _pageHeight - 75;
            this.tableMaxHeight = _maxHeight;

        },
        created: function () {
            vm = this;
        },
    }
</script>

<style lang="less">
    @import '../../../assets/css/common.less';
    @import '../../../assets/css/table.less';
    @import '../../../assets/css/risk.less';
    .formStyle {
        margin: 10px 0;
    }
    .totalAll {
        padding: 15px 45px;
        border-left: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
        text-align: right;
    }
    .titleHead{
        margin: 10px 0;
        font-size: 12px;
    }
    .width-repayment-left {
        text-align: right;
        width: 80px;
        display: inline-block;

    }
    .width-repayment {
        text-align: left;
        width: 110px;
        display: inline-block;
    }
    .Workbench{
        .setFontColor {
            color: #2d8cf0;
        }
        .business{
            width:33.33%; display: inline-block;
            span{
                color:#2d8cf0; font-size: 26px; font-weight: bold;
            }
        }
        .align-right{text-align: right;}
        .indexTh{
            border-left: solid 4px #E2A54D;
            padding-left: 10px;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .borderForm{
            border: solid 1px #ddd;
            padding: 8px;
            .ivu-form-item{ margin-bottom: 0;}
        }
        .queryBtn{ background: #E2A54D; color: #fff; padding: 6px 20px;}
    }
    .communicate{
        .ivu-modal-footer{
            .ivu-btn-text {
                display: none;
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/user/myFinance/application.vue