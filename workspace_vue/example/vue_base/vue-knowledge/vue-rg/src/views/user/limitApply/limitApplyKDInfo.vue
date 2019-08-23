<template>
    <div class="min-height-100 limitApply protocol" ref="limitApplyKD">
        <Row   :gutter="10" type="flex">
            <Col span="24">
                <Card :dis-hover="true" :bordered="false">
                    <p class="indexTh"  ref="ivu-card-head">
                        快贷信息
                    </p>
                    <div>
                        <Form ref="editFormList" :model="editFormList" :label-width="160" :rules="ruleValidate">
                            <div>
                                <dl class="apply-detail">
                                    <dt><span>快贷申请流程</span></dt>
                                    <dd>
                                        <Row>
                                            <Col span="12">
                                                <FormItem label="企业名称：" prop="enterpriseName">
                                                    {{editFormList.enterpriseName}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  label="企业类型："  prop="radio">
                                                    {{editFormList.radio}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <!-- 借款人名称后端答复已记录的是法人名称 -->
                                                <FormItem label="借款人名称：" prop="enterpriseName">
                                                    {{editFormList.legalName}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="证件类型：" prop="enterpriseName">
                                                    <div>
                                                        身份证
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="证件号码：" prop="enterpriseName">
                                                    <div>
                                                        {{editFormList.legalNo}}
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="开户行：" prop="enterpriseName">
                                                    <div>
                                                        {{editFormList.bankName}}
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="银行卡号：" prop="enterpriseName">
                                                    <div>
                                                        {{editFormList.cardNumber}}
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="银行预留电话：" prop="enterpriseName">
                                                    <div>
                                                        {{editFormList.cardMobile}}
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <!--<Col span="13">-->
                                                <!--<FormItem label="统一社会信用代码：" prop="business">-->
                                                    <!--{{editFormList.business}}-->
                                                <!--</FormItem>-->
                                            <!--</Col>-->
                                            <Col span="24">
                                                <FormItem label="企业注册地址：" prop="enterpriseAddressProvince">
                                                    {{editFormList.enterpriseAddressProvince}} {{editFormList.enterpriseAddressCity}} {{editFormList.enterpriseAddressCountry}} {{editFormList.dPosition}}
                                                </FormItem>
                                            </Col>
                                            <Col span="24">
                                                <FormItem label="推荐人：">
                                                    {{editFormList.recommender}}
                                                </FormItem>
                                            </Col>
                                        </Row>

                                    </dd>
                                </dl>
                                <div class="mt30 text-align-center tj-btn">
                                    <Button type="primary" @click="goBack">返回</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    let vm = null;
    export default {
        name: "limitApplyKDInfo",
        components: {
        },
        data () {
            return {
                btnDisabled: false,
                isApply: false,
                listProvince: [],
                listCities: [],
                listDistricts: [],
                editFormList: {
                    enterpriseName: '',
                    legalName: '',
                    legalNo: '',
                    bankName: '',
                    cardNumber: '',
                    cardMobile: '',
                    enterpriseAddressProvince: '',
                    enterpriseAddressCity: '',
                    enterpriseAddressCountry: '',
                    dPosition:'',
                    radio: '',
                },
                ruleValidate: {
                    radio: [
                        { required: true, message: '请选择企业类型！', trigger: 'change' }
                    ],
                    enterpriseName: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    business: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    enterpriseAddressProvince:[
                        { required: true, message: '请选择企业所在位置！', trigger: 'blur' }
                    ],
                    dPosition:[
                        { required: true, message: '请填写详细街道！', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 请求快贷信息
            getApplyInfoKD () {
                vm.$https.post('/api-webbff/v1/asset/creditApplyInfo', {
                    productCode: 'KD'
                })
                    .then(res => {
                        if (res.data.success === 1) {
                            let kdInfo = res.data.data;
                            let arr = ['', null, undefined, 'null'];
                            let isApply = ['0', '2', '4', 0, 2, 4]; // 0:待初审，2：待资方审核， 4：已生效 (注：后端给这三种状态不让申请)
                            if (isApply.includes(kdInfo.creditStatus)) {
                                vm.isApply = true;
                            } else {
                                vm.isApply = false;
                            }
                            vm.editFormList.enterpriseAddressProvince = kdInfo.proviceCodeDesc;
                            vm.editFormList.legalName = kdInfo.legalName;
                            vm.editFormList.legalNo = kdInfo.legalNo;
                            vm.editFormList.bankName = kdInfo.bankName;
                            vm.editFormList.cardNumber = kdInfo.cardNumber;
                            vm.editFormList.cardMobile = kdInfo.cardMobile;
                            vm.editFormList.enterpriseAddressCity = kdInfo.cityCodeDesc;
                            vm.editFormList.enterpriseAddressCountry = kdInfo.areaCodeDesc;
                            vm.editFormList.dPosition = kdInfo.enterpriseAddress; // 企业详细地址
                            vm.editFormList.enterpriseName = kdInfo.enterpriseName;
                            vm.editFormList.radio = kdInfo.enterpriseTypeDesc;
                            vm.editFormList.business = kdInfo.socialUnifiedCreditNo;
                            vm.editFormList.recommender = kdInfo.referee;
                        } else {
                            vm.$message.success('获取信息失败');
                        }
                    })
                    .catch(err => {
                        vm.$message.error('获取信息失败');
                    })
            },
            save (name) {
                // if(vm.isApply) {
                //     vm.$message.error('已有一条授信记录，无需重复申请');
                //     return
                // }
                vm.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.submitkuaidai()
                    }
                })
            },
            /**
             * @param {String} code     [地区编码]
             * @param {String} arrName  [当前要输出的省市区数组名称]
             * */
            getAdressInfoAll (code, arrName) {
                let self = this;
                return new Promise((resolve, reject) => {
                    self.$store.dispatch('getAdressInfo', {_that: this, codes:code})
                        .then(res => {
                            resolve(1)
                            self.$set(self.$data, arrName, res)
                        })
                        .catch(err => {
                            reject(0)
                            self.$message.error('获取地址信息失败')
                        })
                })
            },
            /**
             * 快贷申请提交
             * */
            submitkuaidai () {
                let arr = ['0','',null,'null',undefined]
                if (vm.listDistricts.length > 0) {
                    if (arr.includes(vm.editFormList.enterpriseAddressCountry)) {
                        vm.$message.error('请填写完整企业所在位置')
                        return
                    }
                }
                if (arr.includes(vm.editFormList.enterpriseAddressProvince)||arr.includes(vm.editFormList.enterpriseAddressCity)) {
                    vm.$message.error('请填写完整企业所在位置')
                    return
                }
                this.$nextTick(() => {
                    vm.btnDisabled = true;
                    this.$https.post('/api-webbff/v1/limit/getLimitApplyUrl' , {
                        enterpriseType: Number(vm.editFormList.radio), // 企业类型 1 单体药房 2 连锁药店总店 3 连锁药店分店（直营店） 4 连锁加盟店 5 商业公司 6 医院 7 诊所 8 工业公司 9 其他
                        enterpriseName: vm.editFormList.enterpriseName, // 企业名称
                        socialUnifiedCreditNo: vm.editFormList.business, // 统一社会信用代码
                        proviceCode: vm.editFormList.enterpriseAddressProvince, // 省份code
                        cityCode: vm.editFormList.enterpriseAddressCity, // 城市编码
                        areaCode: vm.editFormList.enterpriseAddressCountry, // 区域编码
                        enterpriseAddress: vm.editFormList.dPosition, // 企业详细地址
                        referee: vm.editFormList.recommender // 推荐人
                    }).then(res => {
                        if(res.data.success === 1){
                            // console.log('2222', res.data.data.returnUrl);
                            // window.open('')
                        } else {
                            vm.btnDisabled = false;
                            vm.$message.error('申请失败，请稍后重试！')
                        }
                    }).catch(e => {
                        vm.btnDisabled = false;
                        vm.$message.error('申请失败，请稍后重试！')
                    });
                })
            },
            /**
             * 返回
             * */
            goBack () {
                this.$router.push({path: '/user/'})
            }
        },
        created () {
            vm = this;
        },
        mounted () {
            this.getApplyInfoKD()
        }
    }
</script>

<style lang="less" scoped>
    .limitApply {
        .indexTh{border-left: solid 4px #E2A54D;padding-left: 10px;font-size: 14px;margin-bottom: 10px;}
        .light-blue{background: #EEF9FF}
        .light-grey{background: #F7F7F7}
        .list-status{border:solid 1px #ddd;
            dt{padding:10px;background: #EEF9FF;}
            dd{padding:15px 10px;border-top:solid 1px #CBCBCB ;clear: both; overflow: hidden; line-height: 30px}
        }
        .w260{ width: 260px;}
        .outDate {background:#ddd;
            dt{background:#ddd;}
        }
        .apply-detail{
            .setTitile {
                color: #333;
                font-size: 14px;
                span:last-child{
                    font-size: 12px;
                    color: red;
                }
            }
            border:solid 1px #ddd;
            dt{padding:8px;background: #F7F7F7;}
            dd{padding:10px 10px;border-top:solid 1px #ddd ;clear: both; overflow: visible; line-height: 30px}
            .top-border{
                padding-top:20px;border-top:1px solid #eee;
                .ivu-form-item-label {
                    &:before {
                        font-size: 16px;
                        content: '* ';
                        color: red;
                    }
                }
            }
        }
        .tj-btn{
            button{width:120px; margin:0 10px}
        }

    }
</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/limitApplyKDInfo.vue