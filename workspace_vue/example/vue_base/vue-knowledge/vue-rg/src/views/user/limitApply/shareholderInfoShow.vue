<template>
    <div>
        <!-- 添加股东 弹出窗 S  -->
        <shareholder-one-level
                :paramsRowShareholderOne="paramsRowShareholderOne"
                @paramsRowShareholderOneInit="paramsRowShareholderOneInit"
                :addOrEdit="addOrEdit"
                ref="shareholders">
        </shareholder-one-level>
        <shareholder-two-level
                :paramsRowShareholderTwo="paramsRowShareholderTwo"
                @paramsRowShareholderTwoInit="paramsRowShareholderTwoInit"
                :addOrEditTwo="addOrEditTwo"
                ref="shareholdersTwo">
        </shareholder-two-level>
        <!-- 添加股东 弹出窗 E  -->
        <Modal
                v-model="isdel"
                :closable="false"
                :mask-closable="false"
                title="删除确认">
            <p style="text-align: center">确认要删除股东信息吗？</p>
            <div slot="footer">
                <Button @click="delOk(delInfoId,delInfoType,delIsHaveSubShareholders)" type="primary">确认</Button>
                <Button @click="delNo" type="primary">取消</Button>
            </div>
        </Modal>
        <!-- 第四步 填写股东信息 S -->
        <Collapse class="collapseSetStyle" v-model="collapseValue" :accordion="true">
            <Panel name="1">
                股东信息
                <div slot="content">
                    <div class="margin-top-10" style="overflow-x: auto;">
                        <Table border :columns="shareholder" :data="shareholderOneLevel"></Table>
                    </div>
                    <div class="margin-top-10" style="overflow-x: auto;">
                        <Table border :columns="shareholderSecond" :data="shareholderTwoLevel"></Table>
                    </div>
                </div>
            </Panel>
        </Collapse>
        <!-- 第四步 填写股东信息 E -->
    </div>
</template>

<script>
    import shareholderOneLevel from '../components/shareholderOneLevel'
    import shareholderTwoLevel from '../components/shareholderTwoLevel'
    let vm = {};
    let shareholderTh = [
        {key: 'id', title: '序号', fixed: 'left', width: 100, type: 'index', align: 'center', className: 'col-no-padding'},
        {
            key: 'shareholderType',
            title: '股东类型',
            width:100,
            align: 'center',
            render: (h, params) => {
                if (params.row.shareholderType=== 1) {
                    return h('div', '法人', '--');
                } else {
                    return h('div', '自然人', '--');
                }
            },
            className: 'col-no-padding'
        },
        {key: 'shareholderName', width:100, title: '股东名称', align: 'center', className: 'col-no-padding'},
        {key: 'shareholderIdCardNo', width:300, title: '股东身份证号（统一社会信用代码）', align: 'center', className: 'col-no-padding'},
        {
            key: 'shareholderLegalPersonName',
            width:180,
            title: '股东的法人代表姓名',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                let arr = ['', ' ', null, undefined]
                let shareholderLegalPersonName = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.shareholderLegalPersonName);
                if (!arr.includes(params.row.shareholderLegalPersonName)) {
                    return h('div', [shareholderLegalPersonName], '--');
                } else {
                    return h('div', '--');
                }
            }
        },
        {key: 'shareholderLegalPersonNo', width:190, title: '股东的法人代表身份证号', align: 'center', className: 'col-no-padding'},
        {key: 'shareholdingPer',  title: '占股比例（%）', width:160, align: 'center', className: 'col-no-padding'},
        {key: 'shareholderTelephone', title: '股东（法人）手机号', width:180, align: 'center', className: 'col-no-padding'},
        {
            key: '',
            width:330,
            title: '股东联系地址',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                let arr = ['', ' ', null, undefined]
                let shareholdingProvince = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.shareholdingProvince);
                let shareholdingCity = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.shareholdingCity);
                let shareholdingArea = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.shareholdingArea);
                let shareholdingAddress = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.shareholdingAddress);
                if (arr.includes(params.row.shareholdingArea)) {
                    return h('div', [shareholdingProvince, shareholdingCity, shareholdingAddress], '--');
                } else {
                    return h('div', [shareholdingProvince, shareholdingCity, shareholdingArea, shareholdingAddress], '--');
                }
            }
        },
        {key: 'urgencyContact', width:140, title: '紧急联系人', align: 'center', className: 'col-no-padding'},
        {key: 'relationShip', width:260, title: '紧急联系人与股东（法人）关系', align: 'center', className: 'col-no-padding'},
        {key: 'urgencyTelephone', width:180, title: '紧急联系人手机', align: 'center', className: 'col-no-padding'},
        {
            key: '',
            width:330,
            title: '紧急联系人地址',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                let arr = ['', ' ', null, undefined]
                let urgencyProvince = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.urgencyProvince);
                let urgencyCity = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.urgencyCity);
                let urgencyArea = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.urgencyArea);
                let urgencyAddress = h('span', {
                    style: {
                        marginRight: '15px'
                    }
                }, params.row.urgencyAddress);
                if (arr.includes(params.row.urgencyArea)) {
                    return h('div', [urgencyProvince, urgencyCity, urgencyAddress], '--');
                } else {
                    return h('div', [urgencyProvince, urgencyCity, urgencyArea, urgencyAddress], '--');
                }
            }
        },
        {
            key: 'shareholderFrontIDCard',
            width:130,
            title: '股东身份证正面',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.shareholderType === 2) {
                    return h('a',{
                        domProps: {
                            href: params.row.shareholderFrontIDCard,
                            target: '_blank'
                        }
                    }, '股东身份证正面');
                } else {
                    return h('div', '--')
                }
            }
        },
        {
            key: 'shareholderBackIDCard',
            width:130,
            title: '股东身份证反面',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.shareholderType === 2) {
                    return h('a',{
                        domProps: {
                            href: params.row.shareholderBackIDCard,
                            target: '_blank'
                        }
                    }, '股东身份证反面');
                } else {
                    return h('div', '--')
                }
            }
        },
        {
            key: 'companySystemUrl',
            width:200,
            title: '公司章程',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.shareholderType === 1) {
                    let companySystemArr = params.row.companySystemUrl.split(',');
                    let companyArray = companySystemArr.map((item, index, arr) => {
                        return h('a',{
                            domProps: {
                                href: item,
                                target: '_blank'
                            },
                            style: {
                                padding: '0 8px'
                            }
                        }, index + 1)
                    });
                    return h('div',companyArray, '--');
                } else {
                    return h('div', '--')
                }
            }
        },
        {
            key: 'licenseUrl',
            width:120,
            title: '营业执照',
            align: 'center',
            className: 'col-no-padding',
            render: (h, params) => {
                if (params.row.shareholderType === 1) {
                    return h('a',{
                        domProps: {
                            href: params.row.licenseUrl,
                            target: '_blank'
                        }
                    }, '营业执照');
                } else {
                    return h('div', '--')
                }
            }
        }

    ];
    let shareholderSecondTh = [
        {key: 'id', title: '序号',  fixed: 'left', width: 80, type: 'index', align: 'center', className: 'col-no-padding'},
        {key: 'shareholderPname', width:180, title: '股东名称', align: 'center', className: 'col-no-padding'},
        {
            key: 'shareholderType',
            title: '股东的股东类型',
            width: 150,
            align: 'center',
            render: (h, params) => {
                if (params.row.shareholderType === 1) {
                    return h('div', '法人', '--');
                } else {
                    return h('div', '自然人', '--');
                }
            },
            className: 'col-no-padding'
        },
        {key: 'shareholderName', width:180, title: '股东的股东名称', align: 'center', className: 'col-no-padding'},
        {key: 'shareholderIdCardNo', width:330, title: '股东的股东身份证号（统一社会信用代码）', align: 'center', className: 'col-no-padding'},
        {key: 'shareholderLegalPersonName', width:210, title: '股东的股东法人代表姓名', align: 'center', className: 'col-no-padding'},
        {key: 'legalRepresentativeNo', width:210, title: '股东的股东法人代表身份证号', align: 'center', className: 'col-no-padding'},
        {key: 'shareholdingPer', title: '持股比例（%）', width: 150, align: 'center', className: 'col-no-padding'},
        {key: 'shareholderTelephone', width:240, title: '股东的股东（法人）手机号', align: 'center', className: 'col-no-padding'}
    ];
    export default {
        name: "shareholderInfo",
        props: {
            creditApplyIds: {
                type: String
            },
            disableApplyBtn: {
                type: Boolean
            }
        },
        components: {
            shareholderOneLevel,
            shareholderTwoLevel
        },
        watch: {
            creditApplyIds (newVal) {
                if (newVal !== '') {
                    this.shareholderInfo(this.creditApplyIds, 1);
                    this.shareholderInfo(this.creditApplyIds, 2);
                }
            }
        },
        data () {
            return {
                collapseValue: '1',
                isdel: false,
                delInfoId: '',
                delInfoType: 0,
                delIsHaveSubShareholders: '0',
                addOrEdit: 0,
                addOrEditTwo: 0,
                paramsRowShareholderTwo: {},
                paramsRowShareholderOne: {},
                shareholder: shareholderTh,
                shareholderOneLevel: [],
                shareholderSecond: shareholderSecondTh,
                shareholderTwoLevel: []
            }
        },
        methods: {
            paramsRowShareholderOneInit () {
                this.paramsRowShareholderOne = {};
                this.shareholderInfo(this.creditApplyIds, 1);
            },
            paramsRowShareholderTwoInit () {
                this.paramsRowShareholderTwo = {};
                this.shareholderInfo(this.creditApplyIds, 1);
                this.shareholderInfo(this.creditApplyIds, 2);
            },
            /**
             * 添加股东/编辑股东
             * @param: num {Number} [1:添加/编辑一级股东，2：添加/编辑二级股东]
             * @param: shareholderInfo {Object} [列表每行的信息]
             * @param: addOrEdit {Object} [ 1:增加 2：编辑]
             * */
            addShareholderOne (num, shareholderInfo, addOrEdit) {
                if (num === 1) {
                    this.addOrEdit = addOrEdit;
                    this.paramsRowShareholderOne = {};
                    this.paramsRowShareholderOne = shareholderInfo;
                    this.$refs['shareholders'].addQuotaModal = true;
                } else {
                    this.addOrEditTwo = addOrEdit;
                    this.paramsRowShareholderTwo = {};
                    this.paramsRowShareholderTwo = shareholderInfo;
                    this.$refs['shareholdersTwo'].addQuotaModal = true;
                }
            },
            /**
             * 获取股东信息
             * @params:
             *  id: {type: String, explain: 授信记录id}
             *  rank: {type: Number, explain: 股东级别}   enterpriseCreditApplyId: id,
             shareholderLevel: rank
             * */
            shareholderInfo (id, rank) {
                let that = this;
                this.$https.get(`/api-webbff/v1/asset/queryEnterpriseShareholder?enterpriseCreditApplyId=${id}&shareholderLevel=${rank}`)
                    .then(res => {
                        if (res.data.success === 1) {
                            if (rank === 1) {
                                that.shareholderOneLevel = res.data.data;
                            } else {
                                that.shareholderTwoLevel = res.data.data;
                            }
                        } else {
                            that.$message.error('获取股东信息失败')
                        }
                    })
                    .catch(err => {
                        that.$message.error('获取股东信息失败');
                    })
            },
            /**
             * [ 删除股东信息 ]
             * @param  { String }  shareholderId                    [ 股东记录id ]
             * @param  { Number }  type                             [ 删除股东的类型 1：一级股东 2：二级股东]
             * @param  { String }  isHaveSubShareholders           [ 是否有二级股东 '0'：无 '1'：有]
             *
             * */
            shareholderDel (id,type,isHaveSubShareholders) {
                vm.delInfoId = id;
                vm.delInfoType = type;
                vm.delIsHaveSubShareholders = isHaveSubShareholders;
                vm.isdel = true;
            },
            delOk (id,type,isHaveSubShareholders) {
                if (type===1 && isHaveSubShareholders === '1') {
                    vm.$message.error({message: '此股东添加了股东的股东信息，如需删除，请先删除其股东的股东信息',type:'error',duration:5000})
                    return
                }
                this.$https.get(`/api-webbff/v1/asset/delEnterpriseShareholder?shareholderId=${id}`)
                    .then(res => {
                        if (res.data.success === 1) {
                            vm.$message.success('删除股东信息成功');
                            if (type === 1) {
                                vm.shareholderInfo(vm.creditApplyIds, 1);
                            } else {
                                vm.shareholderInfo(vm.creditApplyIds, 1);
                                vm.shareholderInfo(vm.creditApplyIds, 2);
                            }
                            vm.delNo()
                        } else {
                            vm.$message.error('删除股东信息失败')
                        }
                    })
                    .catch(err => {
                        vm.$message.error('删除股东信息失败');
                    })
            },
            delNo () {
                vm.delInfoId = '';
                vm.delInfoType = 1;
                vm.delIsHaveSubShareholders = '0';
                vm.isdel = false;
            }
        },
        mounted () {
        },
        created () {
            vm = this;
        }
    }
</script>

<style scoped>

</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/shareholderInfoShow.vue