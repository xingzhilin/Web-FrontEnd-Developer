<template>
    <div class="min-height-100 Workbench" ref="Workbench">
        <Row   :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <p class="indexTh"  ref="ivu-card-head">
                    还款记录
                </p>

                <Form type="flex" ref="ive-row-flex" inline class="borderForm">
                    <FormItem>
                        <span>贷款编号：</span>
                        <Input  clearable v-model="searchItem.roleName" placeholder="请输入角色名称..." style="width: 145px;"/>
                    </FormItem>
                    <FormItem>
                        <span>请选择产品：</span>
                        <Select  style="width: 110px;" v-model="searchItem.productType" value="全部" >
                            <Option value="">全部</Option>
                            <Option v-for="item in productList"  :value="item.value"  :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <span>申请日期：</span>
                        <Date-picker style="width: 120px;" type="date" v-model="searchItem.createTimeBegin" :options="start_options" placeholder="选择日期"></Date-picker>
                        <span>至</span>
                        <Date-picker style="width: 120px;" type="date" v-model="searchItem.createTimeEnd" :options="end_options" placeholder="选择日期"></Date-picker>
                    </FormItem>

                    <FormItem  style="color:blue; cursor: pointer">
                        <span><Button @click="handleSearch" type="text" class="queryBtn">查询</Button></span>
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

    </div>
</template>

<script>
    import axios from 'axios';
    import util from '../../../libs/util';
    let vm = null;
    let colomns = [
        { key: 'id', title: '序号', width: 60, type: 'index', align: 'center', className: 'col-no-padding' },
        {key: 'userNumber', title: '货款编号', align: 'center', className: 'col-no-padding'},
        {key: 'userName', title: '产品名称',  align: 'center', className: 'col-no-padding'},
        {key: 'projectManager', title: '资金方',align: 'center', className: 'col-no-padding'},
        {key: 'statusDesc', title: '贷款金额(元）',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.statusDesc, 2, '--'));
            }
        },
        {key: 'creatTime2', title: '还款日期',  align: 'center', className: 'col-no-padding'}
    ];

    let arraycs = [
        {
            key:"platform",
            icon:"",
            rank:1,
            title:"工作台",
        },
        {
            key:"unregistryUser",
            icon:"",
            rank:1,
            title:"未注册客户管理",
        },{
            key:"cooperation",
            icon:"",
            rank:4,
            title:"合作方管理",
            children: [
                {
                    key:"corporation-certify",
                    icon:"",
                    rank:5,
                    title:"客户企业认证"
                },
                {
                    key:"corporation-info",
                    icon:"",
                    rank:6,
                    title:"客户管理"
                },
                {
                    key:"finance-manage",
                    icon:"",
                    rank:7,
                    title:"资金方管理"
                }
            ]
        },
        {
            key:"userManage",
            icon:"",
            rank:3,
            title:"用户管理",
            children: [
                {
                    key:"entreprise",
                    icon:"",
                    rank:1,
                    title:"企业用户管理"
                },
                {
                    key:"operation",
                    icon:"",
                    rank:2,
                    title:"运营用户管理"
                },
                {
                    key:"role",
                    icon:"",
                    rank:3,
                    title:"角色管理"
                }
            ]
        },
        {
            key:"getFinanceManage",
            icon:"",
            rank:4,
            title:"融资管理",
            children: [
                {
                    key:"loanRecord",
                    icon:"",
                    rank:1,
                    title:"授信记录"
                },
                {
                    key:"returnRecord",
                    icon:"",
                    rank:2,
                    title:"贷款记录"
                }
            ]
        }
    ];

    let cs=[
        {
            title: '工作台',
            //expand: false,
        },
        {
            title: '未注册客户管理',
            //checked: false
        },
        {
            title: '合作方管理',
            expand: false,
            children: [
                {
                    title: '客户企业认证',
                    //checked: false
                },
                {
                    title: '客户企业信息管理',
                    //checked: false
                },
                {
                    title: '资金方管理',
                    checked: false
                }
            ]
        },
        {
            title: '用户管理',
            expand: false,
            children: [
                {
                    title: '企业用户管理',
                    checked: false
                },
                {
                    title: '运营用户管理',
                    checked: false
                },
                {
                    title: '角色管理',
                    checked: false
                }
            ]
        },
        {
            title: '融资管理',
            expand: false,
            children: [
                {
                    title: '贷款记录',
                    checked: false
                },
                {
                    title: '还款记录',
                    checked: false
                }
            ]
        }
    ];

    export default {
        name: "application",
        data(){
            return{
                isEdit: false,
                searchItem: {
                    roleName:'', //角色名称
                    productType: '',
                    createTimeBegin: null,//查询条件-开始时间
                    createTimeEnd: null,//查询条件-结束时间
                },
                productList: [
                    {
                        label: '药白条',
                        value: 1
                    }, {
                        label: '流水贷',
                        value: 2
                    }, {
                        label: '快贷',
                        value: 3
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
                columns: colomns,
                currentPage: 1,
                selectDatas: [],
                pageInfo: {},
                loading: true,
                tableMaxHeight: null,
            }
        },
        methods: {
            init () {
                this.spinShow = false;
                this.pageInfo = {
                    total: vm.listData.length,
                    sizeArr: [1, 3, 5, 10, 20, 30],
                    pageSize: 1,
                    datas: vm.listData
                };
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
                    roleName:vm.searchItem.roleName,
                    createTimeBegin: vm.searchItem.createTimeBegin,
                    createTimeEnd: vm.searchItem.createTimeEnd
                };
                vm.$Loading.start();
                vm.currentPage = pi;
                axios.post(util.getSysApi() + '/api-webbff/v1/member/getSysUserPageList' , _params).then(res => {
                    if (res.data.success && res.data.body && res.data.body.list) {
                        this.listData = this.initTable = res.data.body.list;
                        this.pageInfo.total = res.data.data.total;
                    } else {
                        this.listData = this.initTable = [];
                        this.pageInfo.total = 0;
                    }
                    this.$Loading.finish();
                }).catch(e => {
                    //vm.listData = listData;
                    //this.$Loading.error();
                    vm.listData=[
                        {
                            userNumber: "DM219832918213",
                            userName: "药白条",
                            projectManager: "平安租赁",
                            statusDesc: "5000000",
                            creatTime2: "2017-12-30",
                            id: 'DDDDDD1'
                        }
                    ];
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
            this.init();
            this.getListPage();
        },
        updated () {
            let _pageHeight = 0;
            let _navHeight=0;
            if (this.listData.length) {
                _pageHeight = this.$refs['page-bar'].offsetHeight;
            }
            _navHeight=this.$refs['Workbench'].getBoundingClientRect().top;
            let _maxHeight = window.innerHeight - _navHeight - this.$refs['ivu-card-head'].offsetHeight - this.$refs['ive-row-flex'].$el.offsetHeight - _pageHeight - 135;
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
    .Workbench{
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
// src/views/user/myFinance/myReturn.vue