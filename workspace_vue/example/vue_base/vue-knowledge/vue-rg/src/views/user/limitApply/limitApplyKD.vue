<template>
    <div class="min-height-100 limitApply protocol" ref="limitApplyKD">
        <agreements ref="agreementIsShow"></agreements>
        <Row   :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <p class="indexTh"  ref="ivu-card-head">
                    快贷
                </p>
                <div>
                    <Form ref="editFormList" :model="editFormList" :label-width="160" :rules="ruleValidate">
                        <div>
                            <dl class="apply-detail">
                                <dt><span>快贷申请流程</span></dt>
                                <dd>
                                    <Row>
                                        <Col span="24">
                                            <FormItem  label="企业类型："  prop="radio">
                                                <RadioGroup v-model="editFormList.radio">
                                                    <Radio label="8" v-if="getUserTypes === 3">工业</Radio>
                                                    <Radio label="5" v-if="getUserTypes === 2">商业</Radio>
                                                    <Radio label="6" v-if="getUserTypes === 1">医院</Radio>
                                                    <Radio label="7" v-if="getUserTypes === 1">诊所</Radio>
                                                    <Radio label="1" v-if="getUserTypes === 1">单体药房</Radio>
                                                    <Radio label="2" v-if="getUserTypes === 1">连锁药店总店</Radio>
                                                    <Radio label="3" v-if="getUserTypes === 1">连锁药店分店（直营店）</Radio>
                                                    <Radio label="4" v-if="getUserTypes === 1">连锁加盟店</Radio>
                                                </RadioGroup>
                                            </FormItem>
                                        </Col>
                                        <Col span="11">
                                        <FormItem label="企业名称：" prop="enterpriseName">
                                            <Input v-model="editFormList.enterpriseName" placeholder="企业名称" class="w260"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="13">
                                        <FormItem label="统一社会信用代码：" prop="business">
                                            <Input  placeholder="统一社会信用代码" :maxlength="18" class="w260" v-model="editFormList.business"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="企业注册地址：" prop="enterpriseAddressProvince">
                                                <Select style="width:14%" v-model="editFormList.enterpriseAddressProvince"  @on-change="getAdressInfoAll(editFormList.enterpriseAddressProvince, 'listCities')">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in listProvince" :key="item.lcode"  :value="item.lcode">{{item.lname}}</Option>
                                                </Select>

                                                <Select style="width:14%" v-show="listCities.length > 0"  v-model="editFormList.enterpriseAddressCity" @on-change="getAdressInfoAll(editFormList.enterpriseAddressCity, 'listDistricts')">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in listCities" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                                                </Select>
                                                <Select style="width:15%" v-show="listDistricts.length > 0"  v-model="editFormList.enterpriseAddressCountry">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in listDistricts" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem  label="详细地址：" prop="dPosition">
                                                <Input  placeholder="详细地址" class="w260" v-model="editFormList.dPosition"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="推荐人：">
                                                <Input class="w260" placeholder="推荐人" v-model="editFormList.recommender"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>

                                </dd>
                            </dl>
                            <div class="Agreements">
                                <FormItem label="" class="Agreement">
                                    <Checkbox v-model="agreements">已同意</Checkbox>
                                    <span  @click="agreementPing">《药金融信息服务平台服务协议》</span><span @click="agreementShang">《商家授权协议》</span>
                                </FormItem>
                            </div>
                            <div class="mt30 text-align-center tj-btn">
                                <Button type="primary" :disabled="btnDisabled" @click="save('editFormList')">下一步</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Card>
            </Col>
        </Row>
        <!-- 链接跳转提示框 S -->
        <Modal
        v-model="isWindowModel"
        :mask-closable="false"
        class="setModelStyleKD"
        title="提示">
            <div class="modelContantKD">
                <a :href="windowUrl" @click="cancel" target="_blank">请点击此处进入下一步</a>
            </div>
            <div slot="footer" class="modelFooterKD"></div>
        </Modal>
        <!-- 链接跳转提示框 E -->
    </div>
</template>

<script>
    let vm = null;
    import agreements from '../components/agreements';
    import Validates from '../../../libs/Validate';
    export default {
        name: "limitApplyKD",
        components: {
            agreements
        },
        data () {
            return {
                isWindowModel: false,
                windowUrl: '',
                agreements: true,
                btnDisabled: false,
                isApply: false,
                listProvince: [],
                listCities: [],
                listDistricts: [],
                editFormList: {
                    enterpriseName: '',
                    enterpriseAddressProvince: 0,
                    enterpriseAddressCity: 0,
                    enterpriseAddressCountry: 0,
                    dPosition:'',
                    radio:'6',
                },
                ruleValidate: {
                    radio: [
                        { required: true, message: '请选择企业类型！', trigger: 'change' }
                    ],
                    enterpriseName: [
                        { required: true, message: '请填写企业名称', trigger: 'blur' },
                    ],
                    business: [
                        {
                            required: true,
                            name: '统一社会信用代码',
                            validator: Validates.isNumLength,
                            trigger: 'blur'
                        },
                    ],
                    enterpriseAddressProvince:[
                        { required: true, message: '请选择企业注册地址！', trigger: 'blur' }
                    ],
                    dPosition:[
                        { required: true, message: '请填写详细街道！', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            cancel () {
                this.isWindowModel = false;
            },
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
                            if (kdInfo !== '0') {
                                if (!arr.includes(kdInfo.proviceCode)) {
                                    vm.editFormList.enterpriseAddressProvince = kdInfo.proviceCode; // 企业所在位置省编码
                                    vm.getAdressInfoAll(kdInfo.proviceCode, 'listCities').then(res => {
                                        if (!arr.includes(kdInfo.cityCode)) {
                                            vm.editFormList.enterpriseAddressCity = kdInfo.cityCode; // 企业地址市
                                            vm.getAdressInfoAll(kdInfo.cityCode, 'listDistricts').then(res => {
                                                if (!arr.includes(kdInfo.areaCode)) {
                                                    vm.editFormList.enterpriseAddressCountry = kdInfo.areaCode; // 企业地址区
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(kdInfo.enterpriseAddress)) {
                                    vm.editFormList.dPosition = kdInfo.enterpriseAddress;// 企业详细地址
                                }
                                if (!arr.includes(kdInfo.enterpriseName)) {
                                    vm.editFormList.enterpriseName = kdInfo.enterpriseName;
                                }
                                if (!arr.includes(kdInfo.enterpriseType)) {
                                    vm.editFormList.radio = String(kdInfo.enterpriseType);
                                }
                                if (!arr.includes(kdInfo.socialUnifiedCreditNo)) {
                                    vm.editFormList.business = kdInfo.socialUnifiedCreditNo;
                                }
                                vm.editFormList.recommender = kdInfo.referee;
                            }
                        } else {
                            vm.$message.success('获取信息失败');
                        }
                    })
                    .catch(err => {
                        vm.$message.error('获取信息失败');
                    })
            },
            save (name) {
                if(vm.isApply) {
                    vm.$message.error('已有一条授信记录，无需重复申请');
                    return
                }
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
                let arr = ['0','',null,'null',undefined];
                if (!vm.agreements) {
                    vm.$message.error('请阅读并同意 《药金融信息服务平台服务协议》《商家授权协议》')
                    return
                }
                if (vm.listDistricts.length > 0) {
                    if (arr.includes(vm.editFormList.enterpriseAddressCountry)) {
                        vm.$message.error('请填写完整企业注册地址')
                        return
                    }
                }
                if (arr.includes(vm.editFormList.enterpriseAddressProvince)||arr.includes(vm.editFormList.enterpriseAddressCity)) {
                    vm.$message.error('请填写完整企业注册地址')
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
                        if(res.data.resultCode === 1){
                            vm.windowUrl = res.data.data.returnUrl;
                            vm.isWindowModel = true;
                            vm.btnDisabled = false;
                        } else {
                            vm.btnDisabled = false;
                            if (res.data.code === 201 || res.data.code === '201') { // 后端定201为用户已经申请成功快贷，产品需求要跳用户中心页。
                                vm.$router.push({path: '/user/'});
                            } else {
                                vm.$message.error(res.data.msg)
                            }
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
                vm.$router.push({path: '/user/'})
            },
            /**
             * 商家授权协议
             * */
            agreementShang () {
                this.$refs.agreementIsShow.isModalShoper = true;
            },
            /**
             * 药金融信息服务平台服务协议
             * */
            agreementPing () {
                this.$refs.agreementIsShow.isModalProtocol = true;
            }
        },
        created () {
            vm = this;

        },
        mounted () {
            this.getAdressInfoAll('', 'listProvince').then(res=>{}).catch(err=>{});
            this.getApplyInfoKD()
            if (this.getUserTypes === 2) {
                this.editFormList.radio = '5';
            }
            if (this.getUserTypes  === 3) {
                this.editFormList.radio = '8';
            }
        },
        computed : {
            getUserTypes () {
                return this.$store.getters.getUserType
            }
        },
        watch: {
            'editFormList.enterpriseAddressProvince': {
                handler (newVal,oldVal) { // 企业
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormList.enterpriseAddressCity = '0';
                            self.editFormList.enterpriseAddressCountry = '0';
                            self.listCities = [];
                            self.listDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormList.enterpriseAddressCity = '0';
                            self.editFormList.enterpriseAddressCountry = '0';
                            self.listDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormList.enterpriseAddressCity': {
                handler (newVal,oldVal) { // 企业
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormList.enterpriseAddressCountry = '0';
                            self.listDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormList.enterpriseAddressCountry = '0';
                        })
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="less">
    .setModelStyleKD {
        .modelContantKD {
            margin: 50px 0;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .modelFooterKD {
            height: 27px;
        }
    }
    .protocol{
        h3 {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 18px;
            text-align: center;
        }
        h4 {
            font-size: 16px;
        }
        p{
            line-height: 20px;
            font-size: 14px;
            span {
                font-weight: bold;
            }
        }
    }
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
// src/views/user/limitApply/limitApplyKD.vue