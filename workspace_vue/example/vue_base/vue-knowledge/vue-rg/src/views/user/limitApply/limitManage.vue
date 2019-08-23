<template>
    <div class="min-height-100 limitManage" ref="limitManage">
        <Row   :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <p class="indexTh"  ref="ivu-card-head">
                    额度管理
                </p>
                <div class="mt10">
                    <Tabs v-bind:style="{ width: '100%'}" @on-click="tabChange" :value="activeTab" :animated="true" ref="d" style="margin-top: 15px;">
                        <TabPane border label="正在使用" name="4">
                            <Table ref="table" :columns="columnsUse" :data="listData" :height="tableMaxHeight"></Table>
                        </TabPane>
                        <TabPane  border label="已失效" name="5">
                            <Table ref="table" :columns="columnsUse" :data="listData" :height="tableMaxHeight"></Table>
                        </TabPane>
                    </Tabs>
                    <Row>
                        <div style="margin: 10px;overflow: hidden" v-if="listData.length" ref="page-bar">
                            <div style="float: right;">
                                <Page  show-sizer show-elevator show-total :total='pageInfo.total' :current="currentPage"  :pageSize="pageInfo.pageSize"
                                       :pageSizeOpts="pageInfo.sizeArr" placement="top"
                                       @on-change="changePage"
                                       @on-page-size-change="pageSizeChange">
                                </Page>
                            </div>
                        </div>

                    </Row>
                </div>
            </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    let vm = null;
    let colomnsU = [
        { key: 'id', title: '序号', width: 60, type: 'index', align: 'center', className: 'col-no-padding' },
        {key: 'product_name', title: '产品名称',  align: 'center', className: 'col-no-padding'},
        {key: 'import_factor_name', title: '资方名称',align: 'center', className: 'col-no-padding'},
        {key: 'credit_line', title: '授信额���(元）',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.credit_line, 2, '--'));
            }
        },
        {key: 'used_credit_lines', title: '已用额度(元）',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.used_credit_lines, 2, '--'));
            }
        },
        {key: 'residual_credit_lines', title: '剩余额度(元）',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                return h('div', vm.$utilFinance.formatNumThousands(params.row.residual_credit_lines, 2, '--'));
            }
        },
        {key: 'credit_start_time', title: '起始日',  align: 'center', className: 'col-no-padding'},
        {key: 'credit_end_time', title: '到期日',  align: 'center', className: 'col-no-padding'},
        {key: 'limit_app_id', title: '操作',  align: 'center', className: 'col-no-padding',
            render: (h, params) => {
                let btn = h('div', {
                    style: {
                        color: '#3483CC',
                        cursor: 'pointer'
                    },
                    on: {
                        click: () => {
                            vm.BankCardChange(params.row.limit_app_id)
                        }
                    }
                }, '变更还款卡')
                if (params.row.limit_app_id.length > 1) {
                    if (params.row.product_name === '快贷') {
                        return h('div', [
                            btn
                        ])
                    } else {
                        return h('div', '--')
                    }
                } else {
                    return h('div', '--')
                }

            }
        }
    ];

    export default {
        name: "limitManage",
        data () {
            return {
                activeTab: '4',
                listData: [],
                columnsUse: colomnsU,
                currentPage: 1,
                pageInfo: {},
                tableMaxHeight: null
            }
        },
        methods: {
            init () {
                this.spinShow = false;
                this.pageInfo = {
                    total: 0,
                    sizeArr: [1, 3, 5, 10, 20, 30],
                    pageSize: 10,
                    datas:[]
                };
            },
            /**
             * 获取列表
             * @param pi
             */
            getListPage (pi) {
                pi = pi || 1;
                let _params = {
                    limitStatus: vm.activeTab,
                    pageNum: pi,
                    pageSize: vm.pageInfo.pageSize,
                };
                vm.$Loading.start();
                vm.currentPage = pi;
                this.$https.post( '/api-webbff/v1/limit/limitManagerList' , _params).then(res => {
                    if (res.data.success ===1 && res.data.data.list) {
                        this.listData = res.data.data.list;
                        console.log(this.listData)
                        this.pageInfo.total = res.data.data.total;
                    } else {
                        this.listData = [];
                        this.pageInfo.total = 0;
                    }
                    this.$Loading.finish();
                }).catch(e => {
                    vm.listData = listData;
                    this.$Loading.error();
                })
            },
            /**
            *还款卡号变更获取URL申请
            * */
            BankCardChange (id) {
                this.$https.get('/api-webbff/v1/asset/queryChangeCardUrl', {
                    params: {
                        limitAppId: id
                    }
                }).then(res => {
                    if(res.data.data && res.data.success === 1){
                        if(res.data.data.returnUrl){
                            window.open(res.data.data.returnUrl)
                        }else {
                            this.$Message.error(res.data.data.respMsg);
                        }
                    }else {
                        this.$Message.error(res.data.error.msg);
                    }
                }).catch(e => {
                    this.$Message.error('请求接口失败！');
                });
            },
            /**
             * 获取已失效
             * */
            changePage (pi) {
                this.getListPage(pi);
            },
            pageSizeChange (ps) {
                this.pageInfo.pageSize = ps;
                this.getListPage(1);
            },

            /**
             * 申请提额
             * */
            applicationGetReturn (data) {
                //
            },
            tabChange (data) {
                this.activeTab = data;
                this.getListPage();
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
            _navHeight=this.$refs['limitManage'].getBoundingClientRect().top;
            let _maxHeight = window.innerHeight - _navHeight - this.$refs['ivu-card-head'].offsetHeight - _pageHeight - 130;
            this.tableMaxHeight = _maxHeight;
        },
        created () {
            vm = this;
        }
    }
</script>

<style lang="less">
    .limitManage {
        .indexTh{border-left: solid 4px #E2A54D;padding-left: 10px;font-size: 14px;margin-bottom: 10px;}
        .ivu-tabs-nav .ivu-tabs-tab-active{
            color: #fff;
            background: #E2A54D;
            border: solid 1px #E2A54D !important;
        }
        .ivu-tabs-nav .ivu-tabs-tab{ border-left: solid 1px #ddd; border-top:  solid 1px #ddd; border-right:  solid 1px #ddd; margin-right: 0;}
        .ivu-tabs-ink-bar{ display: none;}
        .ivu-tabs-bar{
            border-bottom: 2px solid #E2A54D;
            margin-bottom: 0;
        }
    }

</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/limitManage.vue