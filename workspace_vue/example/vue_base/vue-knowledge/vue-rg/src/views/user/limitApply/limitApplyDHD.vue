<template>
    <div class="min-height-100 limitApply">
        <Row :gutter="10" type="flex">
            <Col span="24">
                <Card :dis-hover="true" :bordered="false">
                    <p class="indexTh"  ref="ivu-card-head">
                        订货贷
                    </p>
                    <!-- 贷款客户要求 S -->
                    <dl class="apply-detail">
                        <dt><span>贷款客户要求</span></dt>
                        <dd>
                            <Row class="demand text-align-center">
                                <Col span="6">
                                    <span><Icon type="record" class="demand-mark"></Icon></span>完整年度纳税记录，信用良好
                                </Col>
                                <Col span="6">
                                    <span><Icon type="record" class="demand-mark"></Icon></span>借款主体(企业/个体工商户均可)
                                </Col>
                                <Col span="6">
                                    <span><Icon type="record" class="demand-mark"></Icon></span>行业1年以上（含）持续采购记录
                                </Col>
                                <Col span="6">
                                    <span><Icon type="record" class="demand-mark"></Icon></span>征信记录符合微众银行要求
                                </Col>
                            </Row>
                        </dd>
                    </dl>
                    <!-- 贷款客户要求 E -->
                    <!-- 填写企业基本信息 S -->
                    <Form ref="editFormList" :model="editFormList" :label-width="160" :rules="ruleValidate">
                        <dl class="apply-detail margin-top-20">
                            <dt><span>填写企业基本信息</span></dt>
                            <dd>
                                <Row>
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
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem  label="企业名称：" prop="eName">
                                                <Input v-model="editFormList.eName" placeholder="企业名称"class="w260"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem  label="统一社会信用代码：" prop="creditCode">
                                                <Input
                                                        placeholder="统一社会信用代码"
                                                        :maxlength="18"
                                                        class="w260"
                                                        v-model="editFormList.creditCode">
                                                </Input>
                                                <div class="displayStyle" v-if="creditCodeShow">
                                                    <span style="padding-left: 10px;">有效期：</span>
                                                    <FormItem class='displayStyle' prop="creditCodestartTime">
                                                        <Date-picker
                                                                type="date"
                                                                :value="editFormList.creditCodestartTime"
                                                                @on-change="editFormList.creditCodestartTime=$event"
                                                                :options="start_creditCode"
                                                                placeholder="选择日期">
                                                        </Date-picker>
                                                    </FormItem>
                                                    <span>至</span>
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.creditCodeendTime"
                                                            @on-change="creditCodeType === true? editFormList.creditCodeendTime='' : editFormList.creditCodeendTime=$event"
                                                            :options="end_creditCode"
                                                            :disabled="creditCodeType"
                                                            placeholder="选择日期">

                                                    </Date-picker>
                                                    <span style="padding-left: 10px;"><Checkbox v-model="creditCodeType" @on-change="creditCodeChecked"></Checkbox>长期</span>
                                                </div>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem  label="药品经营许可证：" prop="DrugsLicence">
                                                <Input  placeholder="药品经营许可证" class="w260" v-model="editFormList.DrugsLicence"></Input>
                                                <span style="padding-left: 10px;">有效期：</span>
                                                <FormItem class='displayStyle' prop="DrugsLicencestartTime">
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.DrugsLicencestartTime"
                                                            @on-change="editFormList.DrugsLicencestartTime=$event"
                                                            :options="start_DrugsLicence" placeholder="选择日期">
                                                    </Date-picker>
                                                </FormItem>
                                                <span>至</span>
                                                <FormItem class='displayStyle' prop="DrugsLicenceendTime">
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.DrugsLicenceendTime"
                                                            @on-change="editFormList.DrugsLicenceendTime=$event"
                                                            :options="end_DrugsLicence"
                                                            placeholder="选择日期">
                                                    </Date-picker>
                                                </FormItem>
                                                <span style="padding-left: 10px;"></span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem  label="GSP证书："  prop="gspCertificate">
                                                <Input  placeholder="GSP证书" class="w260" v-model="editFormList.gspCertificate"></Input>
                                                <span style="padding-left: 10px;">有效期：</span>
                                                <FormItem class='displayStyle' prop="gspstartTime">
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.gspstartTime"
                                                            @on-change="editFormList.gspstartTime=$event"
                                                            :options="start_gspCertificate"
                                                            placeholder="选择日期">
                                                    </Date-picker>
                                                </FormItem>
                                                <span>至</span>
                                                <FormItem class='displayStyle' prop="gspendTime">
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.gspendTime"
                                                            @on-change="editFormList.gspendTime=$event"
                                                            :options="end_gspCertificate"
                                                            placeholder="选择日期">
                                                    </Date-picker>
                                                </FormItem>
                                                <span style="padding-left: 10px;">
                                            </span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem class='displayStyle' label="企业法人：" prop="legalName">
                                                <Input placeholder="企业法人" class="w260" v-model="editFormList.legalName"></Input>
                                            </FormItem>
                                            <FormItem class='displayStyle' label="法人身份证：" prop="legalNo">
                                                <Input placeholder="法人身份证" class="w260" :maxlength="18" v-model="editFormList.legalNo"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem class='displayStyle' label="法人手机：" prop="legalIphone">
                                                <Input placeholder="法人手机" :maxlength="11" class="w260" v-model="editFormList.legalIphone"></Input>
                                            </FormItem>
                                            <FormItem class='displayStyle' label="法人邮箱：" prop="legalEmail">
                                                <Input placeholder="法人邮箱" class="w260" v-model="editFormList.legalEmail"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem class='displayStyle' label="紧急联系人：" prop="contactorName">
                                                <Input  placeholder="紧急联系人" class="w260" v-model="editFormList.contactorName"></Input>
                                            </FormItem>
                                            <FormItem class='displayStyle'  label="紧急联系人手机：" prop="mobile">
                                                <Input  placeholder="紧急联系人手机" :maxlength="11" class="w260" v-model="editFormList.mobile"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem class='displayStyle' label="紧急联系人邮箱：" prop="contactorEmail">
                                                <Input placeholder="紧急联系人邮箱" class="w260" v-model="editFormList.contactorEmail"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem label="企业所在位置：" prop="enterpriseAddressProvince">
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
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem  label="详细地址：" prop="dPosition">
                                                <Input  placeholder="详细地址" class="w260" v-model="editFormList.dPosition"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormItem class='displayStyle' label="推荐人：">
                                                <Input placeholder="推荐人" class="w260" v-model="editFormList.referee"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Row>
                            </dd>
                        </dl>
                    </Form>
                    <div class="mt30 text-align-center tj-btn">
                        <Button type="primary" :disabled="btnDisabled" @click="verifySubmit('editFormList')">下一步</Button>
                    </div>
                    <!-- 填写企业基本信息 E -->
                    <!-- 弹出框 S -->
                    <Modal v-model="modalDHD" :closable="false" :mask-closable="false" width="900" class="classModalFPD"
                           title="订货贷">
                        <div class="bg">
                            <img class="bg-img" src="../../../img/main-page/popupDHD.png" alt="">
                            <div class="bg-text">
                                <h1>
                                    订货贷
                                    <div class="bg-bar"></div>
                                </h1>
                                <div class="bg-contant">
                                    <p>所有流程全部线上完成 包括合同签署、提款、还款等</p>
                                    <p>额度立等可见 激活后即可申请提款</p>
                                </div>
                            </div>
                            <ul>
                                <li><Icon type="record" class="modalIcon"></Icon>微信扫描左边二维码进入小程序发起融资申请。</li>
                                <li><Icon type="record" class="modalIcon"></Icon>该贷款需由法人申请和操作，因此需使用法人手机，系统检测到非法人手机会拒绝申请；</li>
                                <li><Icon type="record" class="modalIcon"></Icon><a target="_blank" href="https://download.mypharma.com/%E8%AE%A2%E8%B4%A7%E8%B4%B7%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf" style="color:#289cff;font-size:16px;">申请流程操作指引下载&gt;</a></li>
                            </ul>
                        </div>
                        <div slot="footer">
                            <Button type="primary" @click="goback">关闭</Button>
                        </div>
                    </Modal>
                    <!-- 弹出框 E -->
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import Validates from '../../../libs/Validate';
    import axios from 'axios'
    let vm = null;
    export default {
        name: "user-center-limitApplyDHD",
        data() {
            return {
                modalDHD: false,
                creditCodeShow: true,
                creditCodeType: false,
                btnDisabled: false,
                listProvince: [],
                listCities: [],
                listDistricts: [],
                isApply: false,
                editFormList: {
                    radio:'6',
                    eName:'',
                    gspstartTime: '',//查询条件-开始时间
                    gspendTime: '',//查询条件-结束时间
                    creditCodestartTime: '',//查询条件-开始时间
                    creditCodeendTime: '',//查询条件-结束时间
                    creditCode:'', // 社会统一信用代码
                    DrugsLicencestartTime: '',//查询条件-开始时间
                    DrugsLicenceendTime: '',//查询条件-结束时间
                    DrugsLicence:'',
                    gspCertificate:'',
                    creditCodeType: false,
                    // 法人
                    legalName:'',
                    legalNo:'',
                    legalIphone: '',
                    legalEmail: '',
                    // 紧急联系人
                    contactorName:'', // 紧急联系人
                    mobile:'', // 紧急联系人手机
                    contactorEmail:'', // 紧急联系人邮箱
                    // 企业位置
                    enterpriseAddressProvince: 0,
                    enterpriseAddressCity: 0,
                    enterpriseAddressCountry: 0,
                    dPosition:'',
                    referee: ''
                },
                ruleValidate: {
                    radio: [
                        { required: true, message: '请选择企业类型！', trigger: 'blur' }
                    ],
                    eName: [
                        { required: true, message: '请填写企业名称！', trigger: 'blur' },
                    ],
                    creditCode: [
                        {
                            required: true,
                            validator: Validates.isNumLength,
                            name: '统一社会信用代码',
                            trigger: 'blur'
                        }
                    ],
                    creditCodestartTime: [
                        { required: true, message: '请填写开始时间', trigger: 'blur' }
                    ],
                    DrugsLicence: [
                        { required: true, message: '请填写药品经营许可证', trigger: 'blur' }
                    ],
                    DrugsLicencestartTime: [
                        { required: true, message: '请填写开始时间', trigger: 'blur' }
                    ],
                    DrugsLicenceendTime: [
                        { required: true, message: '请填写结束时间', trigger: 'blur' }
                    ],
                    gspCertificate:[
                        { required: true, message: '请填写GSP证书', trigger: 'blur' }
                    ],
                    gspstartTime:[
                        { required: true, message: '请填写开始时间', trigger: 'blur' }
                    ],
                    gspendTime:[
                        { required: true, message: '请填写结束时间', trigger: 'blur' }
                    ],
                    enContacts:[
                        { required: true, message: '请填写紧急联系人', trigger: 'blur' }
                    ],
                    contactorName: [
                        { required: true, message: '联系人填写', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true,
                            trigger: 'blur' ,
                            name: '紧急联系人手机',
                            validator: Validates.isPhone
                        }
                    ],
                    contactorEmail: [
                        { required: true, message: '请填写联系人邮箱', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
                    ],
                    legalName: [
                        { required: true, message: '请填写企业法人名称', trigger: 'blur' },
                    ],
                    legalNo: [
                        { required: true, validator: Validates.idCardPass, trigger: 'blur' },
                    ],
                    legalIphone: [
                        { required: true,
                            validator: Validates.isPhone,
                            name: '企业法人手机',
                            trigger: 'blur' },
                    ],
                    legalEmail: [
                        { required: true, message: '请填写法人邮箱', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
                    ],
                    enterpriseAddressProvince:[
                        { required: true, message: '请选择企业所在位置', trigger: 'blur' }
                    ],
                    dPosition:[
                        { required: true, message: '请填写详细街道', trigger: 'blur' }
                    ]
                },
                start_creditCode: {
                    disabledDate (date) {
                        let end = vm.editFormList.creditCodeendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_creditCode: {
                    disabledDate (date) {
                        let start = vm.editFormList.creditCodestartTime;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
                start_DrugsLicence: {
                    disabledDate (date) {
                        let end = vm.editFormList.DrugsLicenceendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_DrugsLicence: {
                    disabledDate (date) {
                        let start = vm.editFormList.DrugsLicencestartTime;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
                start_gspCertificate:{
                    disabledDate (date) {
                        let end = vm.editFormList.gspendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_gspCertificate: {
                    disabledDate (date) {
                        let start = vm.editFormList.gspstartTime;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                }
            };
        },
        mounted () {
            axios.all([vm.getAdressInfoAll('', 'listProvince')])
                .then(axios.spread(function (acct) {
                    vm.ApplyQuery();
                }));
            if (this.getUserTypes === 2) {
                this.editFormList.radio = '5';
            }
            if (this.getUserTypes  === 3) {
                this.editFormList.radio = '8';
            }
        },
        created () {
            vm = this;
        },
        methods: {
            /**
             * 返回用户中心
             * */
            goback () {
                vm.$router.push({path: '/user/'});
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
             * 我的申请-授信申请信息查询
             * */
            ApplyQuery () {
                vm.$https.post('/api-webbff/v1/asset/creditApplyInfo', {
                    productCode: 'DHD'
                })
                    .then(res => {
                        if (res.data.success === 1) {
                            let arr = ['', null, undefined, 'null'];
                            let isApply = ['0', '4', 0,, 4]; // 0:待初审, 4：已生效 (注：后端给这两种状态不让申请)
                            let lsdGetInfo = res.data.data;
                            if (lsdGetInfo !== '0') {
                                // 第一步 企业信息
                                if (!arr.includes(lsdGetInfo.enterpriseType)) {
                                    vm.editFormList.radio = String(lsdGetInfo.enterpriseType); // 企业类型
                                }
                                vm.editFormList.eName = lsdGetInfo.enterpriseName; // 企业名称
                                if (isApply.includes(lsdGetInfo.creditStatus)) {
                                    vm.isApply = true;
                                } else {
                                    vm.isApply = false;
                                }
                                vm.editFormList.enterpriseInfoMd5 = lsdGetInfo.enterpriseInfoMd5; // md5
                                if (lsdGetInfo.socialIsLongTerm === 1) { // 社会统一信用代码证 是否长期 0:否  1：是
                                    vm.creditCodeType = true
                                } else {
                                    vm.creditCodeType = false
                                    if (arr.includes(lsdGetInfo.socialUnifiedCreditNoEndTime)) {
                                        vm.editFormList.creditCodeendTime = '' // 社会统一信用代码证有效期结束时间
                                    } else {
                                        vm.editFormList.creditCodeendTime = lsdGetInfo.socialUnifiedCreditNoEndTime // 社会统一信用代码证有效期结束时间
                                    }
                                }
                                if (!arr.includes(lsdGetInfo.socialUnifiedCreditNo)) {
                                    vm.editFormList.creditCode = lsdGetInfo.socialUnifiedCreditNo; // 统一社会信用代码证
                                    vm.$store.commit('setCreditCode', lsdGetInfo.socialUnifiedCreditNo);
                                }
                                if (arr.includes(lsdGetInfo.socialUnifiedCreditNoStartTime)) {
                                    vm.editFormList.creditCodestartTime = ''; //  社会统一信用代码证有效期开始时间通
                                } else {
                                    vm.editFormList.creditCodestartTime = lsdGetInfo.socialUnifiedCreditNoStartTime; //  社会统一信用代码证有效期开始时间通
                                }
                                vm.editFormList.DrugsLicence = lsdGetInfo.licenseNo; // 药品经营许可证
                                if (arr.includes(lsdGetInfo.licenseStartTime)) {
                                    vm.editFormList.DrugsLicencestartTime = ''; // 药品经营许可证开始时间
                                } else {
                                    vm.editFormList.DrugsLicencestartTime = lsdGetInfo.licenseStartTime; // 药品经营许可证开始时间
                                }
                                if (arr.includes(lsdGetInfo.licenseEndTime)) {
                                    vm.editFormList.DrugsLicenceendTime = ''; // 经营许可证有效期结束时间
                                } else {
                                    vm.editFormList.DrugsLicenceendTime = lsdGetInfo.licenseEndTime; // 经营许可证有效期结束时间
                                }
                                vm.editFormList.gspCertificate = lsdGetInfo.gspNo // GSP证书
                                if (arr.includes(lsdGetInfo.gspStartTime)) {
                                    vm.editFormList.gspstartTime = ''; // gsp证书有效期开始时间
                                } else {
                                    vm.editFormList.gspstartTime = lsdGetInfo.gspStartTime; // gsp证书有效期开始时间
                                }
                                if (arr.includes(lsdGetInfo.gspEndTime)) {
                                    vm.editFormList.gspendTime = ''; // gsp证书有效期结束时间
                                } else {
                                    vm.editFormList.gspendTime = lsdGetInfo.gspEndTime; // gsp证书有效期结束时间
                                }
                                if (!arr.includes(lsdGetInfo.contactorName)) {
                                    vm.editFormList.contactorName = lsdGetInfo.contactorName; // 紧急联系人
                                }
                                if (!arr.includes(lsdGetInfo.contactorMobile)) {
                                    vm.editFormList.mobile = lsdGetInfo.contactorMobile;// 紧急联系人手机
                                }
                                if (arr.includes(lsdGetInfo.contactorEmail)) {
                                    vm.editFormList.contactorEmail = ''	// 紧急联系人邮箱
                                } else {
                                    vm.editFormList.contactorEmail = lsdGetInfo.contactorEmail;	// 紧急联系人邮箱
                                }

                                if (!arr.includes(lsdGetInfo.proviceCode)) {
                                    vm.editFormList.enterpriseAddressProvince = lsdGetInfo.proviceCode; // 企业所在位置省编码
                                    vm.getAdressInfoAll(lsdGetInfo.proviceCode, 'listCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.cityCode)) {
                                            vm.editFormList.enterpriseAddressCity = lsdGetInfo.cityCode; // 企业地址市
                                            vm.getAdressInfoAll(lsdGetInfo.cityCode, 'listDistricts').then(res => {
                                                if (!arr.includes(lsdGetInfo.areaCode)) {
                                                    vm.editFormList.enterpriseAddressCountry = lsdGetInfo.areaCode; // 企业地址区
                                                }
                                            })
                                        }
                                    })
                                }
                                if (!arr.includes(lsdGetInfo.enterpriseAddress)) {
                                    vm.editFormList.dPosition = lsdGetInfo.enterpriseAddress; // 企业所在位置
                                }
                                // 第二步 法人信息
                                if (!arr.includes(lsdGetInfo.legalName)) {
                                    vm.editFormList.legalName = lsdGetInfo.legalName; // 企业法人
                                }
                                if (!arr.includes(lsdGetInfo.legalNo)) {
                                    vm.editFormList.legalNo = lsdGetInfo.legalNo; // 法人身份证
                                }
                                if (!arr.includes(lsdGetInfo.legalMobile)) {
                                    vm.editFormList.legalIphone = lsdGetInfo.legalMobile; // 法人手机
                                }
                                if (!arr.includes(lsdGetInfo.legalEmail)) {
                                    vm.editFormList.legalEmail = lsdGetInfo.legalEmail; // 法人邮箱
                                }
                                vm.editFormList.referee = lsdGetInfo.referee; // 推荐人
                            }
                        }
                    })
                    .catch(err => {
                        vm.$message.error('获取订货贷申请信息失败')
                    })
            },
            /**
             * 提交前的验证
             * */
            verifySubmit (name) {
                let arr = ['0','',null,'null',undefined];
                if(vm.isApply) {
                    vm.modalDHD  = true;
                    return
                }
                if (vm.creditCodeType === false && arr.includes(vm.editFormList.creditCodeendTime)) {
                    vm.$message.error('请填写统一社会信用代码有效期');
                    return
                }
                if (vm.listDistricts.length > 0) {
                    if (arr.includes(vm.editFormList.enterpriseAddressCountry)) {
                        vm.$message.error('请填写完整企业所在位置');
                        return
                    }
                }
                if (arr.includes(vm.editFormList.enterpriseAddressProvince)||arr.includes(vm.editFormList.enterpriseAddressCity)) {
                    vm.$message.error('请填写完整企业所在位置');
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.submitDHDApply()
                    } else {
                        vm.btnDisabled = false;
                    }
                });
            },
            /**
             * 授信请求方法
             *
             * */
            submitDHDApply () {
                let zeroArr = [0, '0'];
                let _params = {
                    enterpriseType: vm.editFormList.radio, // 企业类型
                    enterpriseName: vm.editFormList.eName,// 企业名称
                    socialIsLongTerm: vm.creditCodeType === true? 1:0, // 社会统一信用代码证 是否长期 0:否  1：是
                    socialUnifiedCreditNo: vm.editFormList.creditCode, // 统一社会信用代码证
                    socialUnifiedCreditNoEndTime: vm.creditCodeType === true?'':vm.editFormList.creditCodeendTime, // 社会统一信用代码证有效期结束时间
                    socialUnifiedCreditNoStartTime: vm.editFormList.creditCodestartTime, // 社会统一信用代码证有效期开始时间
                    licenseNo: vm.editFormList.DrugsLicence, // 药品经营许可证
                    licenseStartTime: vm.editFormList.DrugsLicencestartTime, // 药品经营许可证开始时间
                    licenseEndTime: vm.editFormList.DrugsLicenceendTime, // 经营许可证有效期结束时间
                    gspNo: vm.editFormList.gspCertificate, // GSP证书
                    gspStartTime: vm.editFormList.gspstartTime, // gsp证书有效期开始时间
                    gspEndTime: vm.editFormList.gspendTime, // gsp证书有效期结束时间
                    contactorMobile: vm.editFormList.mobile, // 紧急联系人手机
                    contactorEmail: vm.editFormList.contactorEmail,	// 紧急联系人邮箱
                    contactorName: vm.editFormList.contactorName, // 紧急联系人
                    proviceCode: zeroArr.includes(vm.editFormList.enterpriseAddressProvince)? '':vm.editFormList.enterpriseAddressProvince, // 企业所在的省份编码
                    cityCode: zeroArr.includes(vm.editFormList.enterpriseAddressCity)? '':vm.editFormList.enterpriseAddressCity, // 企业所在的市编码
                    areaCode: zeroArr.includes(vm.editFormList.enterpriseAddressCountry)? '':vm.editFormList.enterpriseAddressCountry, // 企业所在区域编码
                    enterpriseAddress: vm.editFormList.dPosition, // 企业所在位置
                    legalName: vm.editFormList.legalName, // 企业法人
                    legalNo: vm.editFormList.legalNo, // 法人身份证
                    legalMobile: vm.editFormList.legalIphone, // 法人手机
                    legalEmail: vm.editFormList.legalEmail, // 法人邮箱
                    referee: vm.editFormList.referee // 推荐人
                };
                vm.btnDisabled = true;
                vm.$https.post('/api-webbff/v1/asset/productCreditApplyForDHD' , _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            // vm.$Message.success('申请成功！');
                            vm.modalDHD = true;
                            vm.disableApplyBtn = false;
                            vm.isApply = true; // 授信申请成功后 不能在申请
                        } else {
                            vm.btnDisabled = false;
                        }
                    }).catch(e => {
                    vm.btnDisabled = false;
                    vm.$Message.error('申请失败');
                });
            },
            creditCodeChecked (b) {
                if (b) {
                    this.editFormList.creditCodeendTime = '';
                }
            },
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
            },
        }
    }
</script>

<style lang="less" scoped>
    .classModalFPD{
        .ivu-modal {
            top: 10px;
        }

        .bg {
            ul {
                position: absolute;
                left:383px;
                top:250px;
                li {
                    font-size: 16px;
                    line-height: 23px;
                    margin-bottom: 15px;
                    .modalIcon {
                        margin-right: 10px;
                        color:  #2d8cf0;
                    }
                }
            }
        position:relative;
        height:470px;
        background: url("../../../img/main-page/popupBackgroud.jpg") no-repeat 0 0;
            .bg-img {
                width: 171px;
                position: absolute;
                top: 239px;
                left: 61px;
            }
            .bg-text {
                position: absolute;
                left: 464px;
                color: #FA9100;
                font-size: 18px;
                letter-spacing:5px;
                h1 {
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                .bg-bar {
                    width: 36px;
                    height: 3px;
                    margin-top: 5px;
                    background-color: #ffffff;
                }
                .bg-contant {
                    color: #ffffff;
                    font-size: 16px;
                }
            }
        }
    }
    .limitApply {
        .w260{
            width: 280px;
        }
        .displayStyle {
            display: inline-block;
        }
        .indexTh {
            border-left: solid 4px #E2A54D;
            padding-left: 10px;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .apply-detail{
            border:solid 1px #ddd;
            dt {
                padding:8px;
                background: #F7F7F7;
            }
            dd{
                padding:10px 10px;
                border-top:solid 1px #ddd;
                clear: both;
                overflow: visible;
                line-height: 30px;
            }
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
        .demand {
            margin: 5px 0;
            span {
                margin-right: 15px;
                .demand-mark {
                    color: #2d8cf0
                }
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/limitApplyDHD.vue