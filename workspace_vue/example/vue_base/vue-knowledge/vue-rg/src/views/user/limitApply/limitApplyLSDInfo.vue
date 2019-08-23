<template>
    <div class="min-height-100 limitApply" ref="limitApplyLSD">
        <agreements ref="agreementIsShow">
        </agreements>
        <agreements-ping-an
                @agreementInfo="agreementInfo"
                ref="agreementInfos"
                :entName="editFormList.eName"
        >
        </agreements-ping-an>
        <Modal v-model="confirmDelete" title="删除"  class-name="vertical-center-modal" @on-ok="">
            <p style="font-size:16px">确认要删除股东信息吗？</p>
        </Modal>
        <Modal
                v-model="showImg"
                title="图片展示"
                class="modalImgShow"
                :width="700">
            <img src="../../../img/showImg.jpg" style="width: 100%" alt="img">
            <div slot="footer">
                <Button type="primary" @click="showImgCancel">关闭</Button>
            </div>
        </Modal>
        <!-- 进度条 S -->
        <div>
            <Card :dis-hover="true" :bordered="false">
                <p class="indexTh" ref="ivu-card-head">
                    流水贷
                </p>
            </Card>
        </div>
        <!-- 进度条 E -->
        <!-- 企业信息 S -->
        <div v-if="indexLSD === 1" class="titlePadding">
            <Row   :gutter="10" type="flex">
                <Col span="24">
                    <Card :dis-hover="true" :bordered="false">
                        <div>
                            <Form ref="editFormList" :model="editFormList" :label-width="170" :rules="ruleValidate">
                                <!-- 企业认证 S  -->
                                <Card :dis-hover="true" :bordered="false">
                                    <Card :dis-hover="true" :padding="0">
                                        <p slot="title" style=" color: #333; font-size: 14px;">企业基本信息</p>
                                        <Row style="padding-top: 25px;">
                                            <Col span="12">
                                                <FormItem  label="企业类型："  prop="radio">
                                                    <div v-if="editFormList.radio === '1'">
                                                        单体药房
                                                    </div>
                                                    <div v-else>
                                                        连锁药店总店
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12" v-if="editFormList.radio === '1'">
                                                <FormItem  label="企业分类：" class="setAlls">
                                                    <div v-if="editFormList.sort === 1">
                                                        个体工商户
                                                    </div>
                                                    <div v-if="editFormList.sort === 2">
                                                        个人独资企业
                                                    </div>
                                                    <div v-if="editFormList.sort === 3">
                                                        有限责任公司
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  label="企业名称：" prop="eName">
                                                    {{editFormList.eName}}
                                                </FormItem>
                                            </Col>

                                            <Col span="12">
                                                <FormItem  label="统一社会信用代码：" prop="creditCode">
                                                    {{editFormList.creditCode}}
                                                    <span style="padding-left: 10px;">有效期：</span>
                                                    <div class="creditCodeShow" v-if="creditCodeShow">
                                                        {{editFormList.creditCodestartTime}}
                                                        <span>至</span>
                                                        {{editFormList.creditCodeendTime}}
                                                        <span v-if="creditCodeType">长期</span>
                                                    </div>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  label="药品经营许可证：" prop="DrugsLicence">
                                                    {{editFormList.DrugsLicence}}
                                                    <span style="padding-left: 10px;">有效期：</span>
                                                    {{editFormList.DrugsLicencestartTime}}
                                                    <span>至</span>
                                                    {{editFormList.DrugsLicenceendTime}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  label="GSP证书："  prop="gspCertificate">
                                                    {{editFormList.gspCertificate}}
                                                    <span style="padding-left: 10px;">有效期：</span>
                                                    {{editFormList.gspstartTime}}
                                                    <span>至</span>
                                                    {{editFormList.gspendTime}}
                                                    <span style="padding-left: 10px;">
                                            </span>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem class='displayStyle' label="紧急联系人：" prop="contactorName">
                                                    {{editFormList.contactorName}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  class='displayStyle' label="紧急联系人身份证号：" prop="contactorIdNo">
                                                    {{editFormList.contactorIdNo}}
                                                </FormItem>
                                            </Col>

                                            <Col span="12">
                                                <FormItem class='displayStyle' label="紧急联系人邮箱：" prop="contactorEmail">
                                                    {{editFormList.contactorEmail}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem class='displayStyle'  label="紧急联系人手机：" prop="mobile">
                                                    {{editFormList.mobile}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem class='displayStyle'   label="企业电话：" prop="enterpriseCompanyTel">
                                                    {{editFormList.enterpriseCompanyTel}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  class='displayStyle'  label="企业邮编：" prop="enterpriseZipCode">
                                                    {{editFormList.enterpriseZipCode}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem class='displayStyle'   label="企业传真：" prop="enterpriseOfficeFax">
                                                    {{editFormList.enterpriseOfficeFax}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="企业所在位置：" prop="enterpriseAddressProvince">
                                                    {{editFormList.enterpriseAddressProvinceWord}}&nbsp;{{editFormList.enterpriseAddressCityWord}}&nbsp;{{editFormList.enterpriseAddressCountryWord}}  {{editFormList.dPosition}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="经营范围：" prop="businessScope">
                                                    {{editFormList.businessScope}}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Card>
                                <!-- 企业认证 E  -->
                            </Form>
                            <Form  ref="editFormListBank" :model="editFormListBank" :label-width="170" :rules="ruleValidateBank">
                                <!-- 企业银行账号信息 S  -->
                                <Card :dis-hover="true" :bordered="false" class="margin-top-10">
                                    <Card :dis-hover="true" :padding="0">
                                        <p slot="title" style=" color: #333; font-size: 14px;">企业银行账号信息</p>
                                        <Row class="margin-top-20">
                                            <Col span="12">
                                                <FormItem  label="银行账号：" prop="bankNo">
                                                    {{editFormListBank.bankNo}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem  label="银行名称：" class="setAll">
                                                    {{editFormListBank.bankName}}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span="12">
                                                <FormItem  label="开户行名称：" class="setAll">
                                                    {{editFormListBank.openingBankName}}
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="开户行地址：" prop="openingBankProvinceCode" class="top-border">
                                                    {{editFormListBank.openingBankAddressDetils}}{{editFormListBank.openingBankAddress}}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>

                                        </Row>
                                    </Card>
                                </Card>
                                <!-- 填写企业银行账号信息 E  -->
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
        <!-- 企业信息 E -->
        <!-- 法人-实际控制人信息 S -->
        <div>
            <legal-lsd @setSteps="setStep"></legal-lsd>
        </div>
        <!-- 法人-实际控制人信息 E -->
        <!-- 药店信息 S -->
        <div>
            <pharmacy-lsd @setSteps="setStep"></pharmacy-lsd>
        </div>
        <!-- 药店信息 E -->
        <!-- 股东信息 S -->
        <div>
            <shareholder-lsd @setSteps="setStep"></shareholder-lsd>
        </div>
        <!-- 股东信息 E -->
        <!-- 材料上传 S -->
        <div>
            <img-lsd></img-lsd>
        </div>
        <!-- 材料上传 D -->
        <Modal v-model="modalLSD" width="360" class="modalLSD">
            <p slot="header" style="color:#0077cc;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <p>{{TipsLSD}}</p>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long  @click="btnTips">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    let vm = null;
    import fileUploadCommon from '../components/FileUploadCommon'
    import fileUploadApply from '../components/fileUploadApply'
    import agreements from '../components/agreements'
    import agreementsPingAn from '../components/agreementsPingAn'
    import shareholderInfo from './shareholderInfo'
    import Validates from '../../../libs/Validate'
    import publicMethod from '../../../libs/publicMethod'
    import legalLsd from './limitApplyLegalLSDInfo'
    import pharmacyLsd from './limitApplyPharmacyLSDInfo'
    import shareholderLsd from './limitApplyShareholderLSDInfo'
    import imgLsd from './limitApplyImgLSDInfo'
    import axios from 'axios'
    export default {
        name: "limitApplyLSD",
        components: {
            fileUploadCommon,
            agreements,
            agreementsPingAn,
            fileUploadApply,
            shareholderInfo,
            legalLsd,
            pharmacyLsd,
            shareholderLsd,
            imgLsd
        },
        data () {
            return {
                supplierLoading: false,
                openingBankSupplierLoading: false,
                indexLSD: 1,
                titleInfo: '流水贷/企业信息',
                sortList: [
                    {
                        value: 1,
                        name: '个体工商户'
                    },
                    {
                        value: 2,
                        name: '个人独资企业'
                    },
                    {
                        value: 3,
                        name: '有限责任公司'
                    }
                ],
                isApply: false,
                leaseTimeShow: true, // 租赁到期日显示隐藏
                medicalArr: [],
                disableApplyBtn: true,
                limitAppId: '',
                confirmDelete: false,
                showImg: false,
                btnDisabled: false,
                modalShoper: false,
                modalProtocol: false,
                agreements: false,
                leasingContractShow: false,
                isHouse: false,
                companySysteShow: false,
                isCarShow: false,
                buyCarTimeShow: false,
                modalLSD:false,
                TipsLSD:'',
                listProvince: [],
                listCities: [],
                listDistricts: [],
                urgencyListProvince: [],
                urgencyListCities: [],
                urgencyListDistricts: [],
                legalListProvince:[],
                legalListCities: [],
                legalListDistricts: [],
                editFormList: {
                    radio:'1',
                    sort: 1,
                    eName:'',
                    contactorName:'', // 紧急联系人
                    contactorIdNo: '', // 紧急联系人身份证
                    contactorMobile:'', // 紧急联系人手机
                    contactorEmail:'', // 紧急联系人邮箱
                    enterpriseCompanyTel: '', // 企业电话
                    enterpriseOfficeFax: '', // 企业传真
                    enterpriseZipCode: '', // 企业邮编
                    gspstartTime: '',//查询条件-开始时间
                    gspendTime: '',//查询条件-结束时间
                    creditCodestartTime: '',//查询条件-开始时间
                    creditCodestartTimeValue: '',
                    creditCodeendTime: '',//查询条件-结束时间
                    creditCode:'', // 社会统一信用代码
                    DrugsLicencestartTime: '',//查询条件-开始时间
                    DrugsLicenceendTime: '',//查询条件-结束时间
                    MedicalLicencestartTime: '',//查询条件-开始时间
                    MedicalLicenceendTime: '',//查询条件-结束时间
                    DrugsLicence:'',
                    MedicalLicence:'',
                    gspCertificate:'',
                    enContacts:'',
                    mobile:'',
                    enterpriseAddressProvince: 0,
                    enterpriseAddressCity: 0,
                    enterpriseAddressCountry: 0,
                    enterpriseAddressProvinceWord: '',
                    enterpriseAddressCityWord: '',
                    enterpriseAddressCountryWord: '',
                    dPosition:'',
                    businessScope: '',
                    drivingUrl:'',
                    houseUrl:'',
                    leasingContractUrl:'',
                    companySystemUrl:'',
                    enterpriseInfoMd5: ''
                },
                openingBankListProvince: [],
                openingBankListCities: [],
                openingBankListDistricts: [],
                bankNameArry: [],
                openingBankNameArry: [],
                editCode:0,
                isEditRetrunCode: false,
                editFormListBank: {
                    bankNo: '',
                    bankName: '',
                    bankCode: 0,
                    openingBankName: '',
                    openingBankCode: 0,
                    openingBankProvinceCode: '',
                    openingBankCityCode: '',
                    openingBankAreaCode: '',
                    openingBankAddress: '',
                    openingBankAddressDetils: ''
                },
                ruleValidateBank: {
                    bankNo: [
                        { required: true, message: '请填写银行账号', trigger: 'blur' }
                    ],
                    bankName: [
                        { required: true, message: '请填写银行名称', trigger: 'blur' }
                    ],
                    openingBankName:  [
                        { required: true, message: '请填写开户行名称', trigger: 'blur' }
                    ],
                    openingBankProvinceCode:  [
                        { required: true, message: '请填写开户行地址', trigger: 'blur' }
                    ],
                    openingBankAddress:  [
                        { required: true, message: '请填写开户行详细地址', trigger: 'blur' }
                    ]
                },
                editFormListLegal: { // 第二步 填写企业法人信息
                    legalName:'',
                    legalNo:'',
                    legalIphone: '',
                    legalEmail: '',
                    legalProvinceCode: 0,
                    legalCityCode: 0,
                    legalAreaCode: 0,
                    legalAddress: '',
                    urgencyName: '', // 法人紧急联系人姓名
                    relationShip: '', // 法人紧急联系关系
                    urgencyPhoneNo: '', // 法人紧急联系人方式
                    urgencyProvinceCode: 0,
                    urgencyCityCode: 0,
                    urgencyAreaCode: 0,
                    urgencyAddress: ''
                },
                ruleValidateLegal: {
                    legalName: [
                        { required: true, message: '请填写企业法人', trigger: 'blur' },
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
                        { required: true, message: '企业法人邮箱填写', trigger: 'blur' },
                    ],
                    legalProvinceCode: [
                        { required: true, message: '法人联系地址填写', trigger: 'blur' },
                    ],
                    legalAddress: [
                        { required: true, message: '法人详细地址填写', trigger: 'blur' },
                    ]

                },
                editFormListPharmacy: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ],
                    yearReturnMoney: '',
                    pharmacyCreateTime:'', // 药店成立日期
                    shopAre:'', // 门店面积
                    accountNo: '', // 开户银行卡
                    billAddress:'',
                    legalHasHouse:'0',
                    legalHasCar:'0',
                    useplaceIsSelf:'0',
                    buyCarTime: '',
                    leaseTime: '', // 租赁到期日
                    billProviceCode: 0,
                    billCityCode: 0,
                    billAreaCode: 0,
                    referee:''
                },
                ruleValidatePharmacy: {
                    pharmacyCreateTime: [
                        { required: true, type: 'date', message: '药店成立日期填写！', trigger: 'change' },
                    ],
                    leaseTime: [
                        { required: true, type: 'date', message: '租赁合同到期日填写！', trigger: 'change' },
                    ],
                    shopAre: [
                        { required: true, message: '门店面积填写！', trigger: 'blur' },
                        { type: 'number', message: '门店面积请输入数字', trigger: 'blur', transform (value) {
                                return isNaN(value);
                            }, validator (rule, value, cb) {
                                if (value) {
                                    cb(new Error());
                                } else {
                                    cb();
                                }
                            } }
                    ],
                    yearReturnMoney: [
                        {
                            required: true,
                            name: '医保近3个月回款金额填写！',
                            trigger: 'blur',
                            validator: Validates.isNumberAll
                        }
                    ],
                    billProviceCode:[
                        { required: true, message: '请选择票据寄送地址！', trigger: 'blur' }
                    ],
                    billAddress:[
                        { required: true, message: '请填写票据寄送详细地址！', trigger: 'blur' }
                    ]
                },
                leasingContractUrlImg: '',
                generalLeasingContractUrlImg: '',
                houseDrivingPropertyUrlImg: '',
                houseUrlImg: '',
                drivingUrlImg: '',
                businessLicensePicUrlImg:'',
                gspPicUrlImg: '',
                tradingLicensePicUrlImg: '',
                companySystemUrlImg:'',
                ruleValidate: {
                    contactorName: [
                        { required: true, message: '联系人填写！', trigger: 'blur' }
                    ],
                    contactorIdNo: [
                        { required: true, validator: Validates.idCardPass, trigger: 'blur' },
                    ],
                    contactorMobile: [
                        { required: true,
                            trigger: 'blur' ,
                            validator: Validates.isPhone
                        },
                    ],
                    enterpriseCompanyTel: [
                        { required: true, name: '企业电话',validator: Validates.isEntIphone, trigger: 'blur' }
                    ],
                    enterpriseOfficeFax: [
                        {
                            required: true,
                            name: '企业传真',
                            trigger: 'blur',
                            validator: Validates.isEntFax
                        }
                    ],
                    enterpriseZipCode: [
                        { required: true, name: '企业邮编',validator: Validates.isPostcode, trigger: 'blur' }
                    ],
                    contactorEmail: [
                        { required: true, message: '联系人邮箱填写', trigger: 'change' },
                        { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
                    ],
                    businessScope:[
                        {
                            required: true,
                            message: '请填写经营范围',
                            trigger: 'blur'
                        }
                    ],
                    radio: [
                        { required: true, message: '请选择企业类型', trigger: 'change' }
                    ],
                    sort: [
                        { required: true, message: '请选择企业分类', trigger: 'change' }
                    ],
                    eName: [
                        { required: true, message: '请填写企业名称', trigger: 'blur' },
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
                        { required: true, message: '请填写药品经营许可证！', trigger: 'blur' }
                    ],
                    DrugsLicencestartTime: [
                        { required: true, message: '请填写开始时间', trigger: 'blur' }
                    ],
                    DrugsLicenceendTime: [
                        { required: true, message: '请填写结束时间', trigger: 'blur' }
                    ],
                    MedicalLicence:[
                        { required: true, message: '请填写医疗机构执业许可证', trigger: 'blur' }
                    ],
                    MedicalLicencestartTime:[
                        { required: true, message: '请填写开始时间', trigger: 'blur' }
                    ],
                    MedicalLicenceendTime:[
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
                    mobile:[
                        { required: true,
                            trigger: 'blur' ,
                            validator: (rule, v, callback) => {
                                if (v === ''|| v===null) {
                                    callback(new Error('联系手机不能为空'));
                                } else if(!/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.editFormList.mobile)){
                                    callback(new Error('请输入正确联系手机'));
                                }else {
                                    callback();
                                }
                            }
                        }
                    ],
                    enterpriseAddressProvince:[
                        { required: true, message: '请选择企业所在位置！', trigger: 'blur' }
                    ],
                    dPosition:[
                        { required: true, message: '请填写详细街道！', trigger: 'blur' }
                    ]
                },
                // 企业认证 S
                creditCodeShow: true,
                citysTwo: false,
                creditCodeType: false,
                DrugsLicenceType:false,
                MedicalLicenceType:false,
                gspCertificateType:false,
                file: '',
                readerResult: '',
                listProvinceTwo: [],
                listCitiesTwo: [],
                listDistrictsTwo: [],
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
                start_MedicalLicence: {
                    disabledDate (date) {
                        let end = vm.editFormList.MedicalLicenceendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_MedicalLicence: {
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
                // 企业认证 E


            }
        },
        computed: {
            getEntTypes () {
                return this.$store.getters.getEntType
            },
            // 企业认证 S
            getTokenInfo () {
                return {Authorization: this.$store.getters.getToken}
            },
            getToken () {
                return this.$store.getters.getToken
            },
            getUids () {
                return this.$store.getters.getUid
            },
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getSupplierIds () {
                return this.$store.getters.getSupplierId
            },
            getUserTypes () {
                return this.$store.getters.getUserType
            }
            // 企业认证 E
        },
        methods: {
            /**
             * 查询银行信息
             * */
            getBankList (name) {
                if (name.length >= 3) {
                    vm.supplierLoading = true;
                    this.$https.get(`/api-webbff/v1/asset/queryBank?bankName=${name}`)
                        .then(res => {
                            vm.supplierLoading = false;
                            if (res.data.success === 1) {
                                vm.bankNameArry = res.data.data;
                            }
                        })
                        .catch(err => {
                            vm.supplierLoading = false;
                        })
                }
            },
            /**
             * 查询开户行
             * */
            getOpeningBankNameList (name) {
                if (name.length >= 3) {
                    vm.openingBankSupplierLoading = true;
                    this.$https.get(`/api-webbff/v1/asset/queryOpeningBank?bankName=${name}`)
                        .then(res => {
                            vm.openingBankSupplierLoading = false;
                            if (res.data.success === 1) {
                                vm.openingBankNameArry = res.data.data;
                            }
                        })
                        .catch(err => {
                            vm.openingBankSupplierLoading = false;
                        })
                }
            },
            openingBankInfo (val) {
                let {label: openingBankName} = val;
                this.editFormListBank.openingBankName = openingBankName;
            },
            // 单独数字验证
            validateYbNo (val) {
                let self = this;
                return new Promise((resolve, reject) => {
                    if (!isFinite(val)) {
                        reject(0)
                        self.$message.error('医保中心号需为8位数字');
                    } else {
                        resolve(1)

                    }
                })
            },
            // 验证长度
            validateLength (val) {
                if (val.length < 8) {
                    this.$message.error('医保中心号需为8位数字');
                }
            },
            // 是否同意平安协议
            agreementInfo (val) {
                if (val === 0) {
                    this.agreements = false;
                } else {
                    this.agreements = true;
                }
            },
            // 初始化信息
            initInfo () {
                let that = this;
                axios.all([that.getAdressInfoAll('', 'listProvince').then(res=>{}).catch(err=>{}), that.getAdressInfoAll('', 'openingBankListProvince').then(res=>{}).catch(err=>{})])
                    .then(axios.spread(function (acct, perms) {
                        that.ApplyQuery();
                    }));
            },
            // 展示隐藏图片
            imgHidden () {
                this.showImg = true;
            },
            // 关闭图片展示model
            showImgCancel () {
                this.showImg = false;
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
            // 获取经营范围
            businessScopeInfo () {
                let self = this;
                if (this.editFormList.creditCode.length === 18) {
                    this.$https.get(`/api-webbff/v1/risk/getBizScope?search_key=${this.editFormList.creditCode}`)
                        .then(res => {
                            if (res.data.data.Scope !== '') {
                                self.editFormList.businessScope = res.data.data.Scope;
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            // 是否显示房产证和 车辆信息
            isShowUploadImg (val) {
                if (val === '1') {
                    this.$store.commit('setCompanySysteShow', false)
                } else {
                    this.$store.commit('setCompanySysteShow', true)
                }
            },
            creditCodeChecked (b) {
                if (b) {
                    this.editFormList.creditCodeendTime = '';
                }
            },
            /**
             *  四要素验证  [企业名称  社会统一信用代码  企业法人  法人身份证]
             *
             */
            fourElements () {
                return new Promise((resolve, reject) => {
                    this.$https.post('/api-webbff/v1/risk/bizFour', {
                        company_name: this.editFormList.eName,
                        credit_code: this.editFormList.creditCode,
                        legal_person: this.editFormListLegal.legalName,
                        person_id: this.editFormListLegal.legalNo
                    })
                        .then(res => {
                            if (res.data.success === 1) {
                                if (res.data.data.flag === 'Y') {
                                    resolve(1)
                                } else {
                                    reject(res.data.data.msg)
                                }
                            } else {
                                reject(res.data.error.msg)
                            }
                        })
                        .catch(err => {
                            if (err.data.success === 0) {
                                this.$message.error(err.data.error.msg);
                            }
                        })
                })
            },
            // ----  流水贷 S  ----
            agreementShang () {
                this.$refs.agreementIsShow.isModalShoper = true;
            },
            agreementPing () {
                this.$refs.agreementIsShow.isModalProtocol = true;
            },
            agreementApply () {
                this.$refs['agreementInfos'].isModalProtocol = true;
            },
            /**
             * 失去焦点数字变成千分位数字
             */
            changeToNumThousands (num) {
                vm.editFormListPharmacy.yearReturnMoney = this.$utilFinance.formatNumThousands(num, 2);
            },
            /**
             * 聚焦input由千分位数字变回数字再编辑
             */
            changeToNum (num) {
                var numNew = this.$utilFinance.removeNumFormat(num);
                vm.editFormListPharmacy.yearReturnMoney = numNew;
            },

            /**
             * 企业授信申请-企业基本信息 、企业银行账号...
             * */
            ApplyQuery () {
                vm.$https.get('/api-webbff/v1/asset/queryEssentialInformationForLSD')
                    .then(res => {
                        if (res.data.success === 1) {
                            let arr = ['', null, undefined, 'null'];
                            let ybCenterNoInfo = [640000, '640000'];
                            let isApply = ['0', '2', '4', 0, 2, 4]; // 0:待初审，2：待资方审核， 4：已生效 (注：后端给这三种状态不让申请)
                            let lsdGetInfo = res.data.data;
                            if (lsdGetInfo !== '0') {
                                // 第一步 企业信息
                                if (!arr.includes(lsdGetInfo.enterpriseType)) {
                                    vm.editFormList.radio = String(lsdGetInfo.enterpriseType); // 企业类型
                                }
                                if (!arr.includes(lsdGetInfo.enterpriseClassification) && String(lsdGetInfo.enterpriseType) === '1') {
                                    vm.editFormList.sort = lsdGetInfo.enterpriseClassification;
                                } else {
                                    vm.editFormList.sort = 1
                                }
                                vm.editFormList.eName = lsdGetInfo.enterpriseName; // 企业名称
                                if (!arr.includes(lsdGetInfo.enterpriseName)) {
                                    vm.$store.commit('setEnterpriseName', lsdGetInfo.enterpriseName)
                                }
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
                                if (!arr.includes(lsdGetInfo.contactorIdNo)) {
                                    vm.editFormList.contactorIdNo = lsdGetInfo.contactorIdNo; // 紧急联系人身份证号
                                }
                                if (!arr.includes(lsdGetInfo.contactorMobile)) {
                                    vm.editFormList.mobile = lsdGetInfo.contactorMobile;// 紧急联系人手机
                                }
                                if (arr.includes(lsdGetInfo.contactorEmail)) {
                                    vm.editFormList.contactorEmail = ''	// 紧急联系人邮箱
                                } else {
                                    vm.editFormList.contactorEmail = lsdGetInfo.contactorEmail;	// 紧急联系人邮箱
                                }
                                if (!arr.includes(lsdGetInfo.enterpriseCompanyTel)) {
                                    vm.editFormList.enterpriseCompanyTel = lsdGetInfo.enterpriseCompanyTel; // 企业电话
                                }
                                if (!arr.includes(lsdGetInfo.enterpriseZipCode)) {
                                    vm.editFormList.enterpriseZipCode = lsdGetInfo.enterpriseZipCode; // 企业邮编
                                }
                                if (!arr.includes(lsdGetInfo.officeFax)) {
                                    vm.editFormList.enterpriseOfficeFax = lsdGetInfo.officeFax; // 企业传真
                                }
                                if (!arr.includes(lsdGetInfo.proviceCode)) {
                                    vm.editFormList.enterpriseAddressProvince = lsdGetInfo.proviceCode; // 企业所在位置省编码
                                    vm.getAdressInfoAll(lsdGetInfo.proviceCode, 'listCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.cityCode)) {
                                            vm.editFormList.enterpriseAddressCity = lsdGetInfo.cityCode; // 企业地址市
                                            vm.getAdressInfoAll(lsdGetInfo.cityCode, 'listDistricts').then(res => {
                                                vm.$nextTick(()=>{
                                                    vm.editFormList.enterpriseAddressProvinceWord = publicMethod.addressName(vm.listProvince,lsdGetInfo.proviceCode);
                                                    vm.editFormList.enterpriseAddressCityWord = publicMethod.addressName(vm.listCities,lsdGetInfo.cityCode);
                                                    if (!arr.includes(lsdGetInfo.areaCode)) {
                                                        vm.editFormList.enterpriseAddressCountryWord = publicMethod.addressName(vm.listDistricts,lsdGetInfo.areaCode);
                                                    }
                                                });
                                                if (!arr.includes(lsdGetInfo.areaCode)) {
                                                    vm.editFormList.enterpriseAddressCountry = lsdGetInfo.areaCode; // 企业地址区
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo.enterpriseAddress)) {
                                    vm.editFormList.dPosition = lsdGetInfo.enterpriseAddress; // 企业所在位置
                                }
                                if (!arr.includes(lsdGetInfo.businessScope)) {
                                    vm.editFormList.businessScope = lsdGetInfo.businessScope; // 经营范围
                                }

                                if (!arr.includes(lsdGetInfo.cardNumber)) { // 银行账号
                                    vm.editFormListBank.bankNo = lsdGetInfo.cardNumber;
                                }
                                if (!arr.includes(lsdGetInfo.bankCode)) { // 银行名称
                                    vm.editFormListBank.bankName = lsdGetInfo.bankName;
                                }
                                if (!arr.includes(lsdGetInfo.openingBankCode)) { // 开户行名称
                                    vm.editFormListBank.openingBankName = lsdGetInfo.openingBankName;
                                }
                                if (!arr.includes(lsdGetInfo.openingBankProvinceCode)) {
                                    vm.editFormListBank.openingBankProvinceCode = lsdGetInfo.openingBankProvinceCode; // 开户行所在省
                                    vm.getAdressInfoAll(lsdGetInfo.openingBankProvinceCode, 'openingBankListCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.openingBankCityCode)) {
                                            vm.editFormListBank.openingBankCityCode = lsdGetInfo.openingBankCityCode; // 开户行所在市
                                            vm.getAdressInfoAll(lsdGetInfo.openingBankCityCode, 'openingBankListDistricts').then(res => {
                                                vm.$nextTick(()=>{
                                                    let provinceStr = publicMethod.addressName(vm.openingBankListProvince,lsdGetInfo.openingBankProvinceCode);
                                                    let cityStr = publicMethod.addressName(vm.openingBankListCities,lsdGetInfo.openingBankCityCode);
                                                    let area = ''
                                                    if (!arr.includes(lsdGetInfo.openingBankAreaCode)) {
                                                        area = publicMethod.addressName(vm.openingBankListDistricts,lsdGetInfo.openingBankAreaCode);
                                                    }
                                                    vm.editFormListBank.openingBankAddressDetils = provinceStr + cityStr + area;
                                                });
                                                if (!arr.includes(lsdGetInfo.openingBankAreaCode)) {
                                                    vm.editFormListBank.openingBankAreaCode = lsdGetInfo.openingBankAreaCode; // 开户行所在区
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo.openingBankAdress)) {
                                    vm.editFormListBank.openingBankAddress = lsdGetInfo.openingBankAdress; // 开户行所在位置
                                }
                                if (!arr.includes(lsdGetInfo.limitAppId)) { // 授信记录id
                                    vm.$store.commit('setLimitAppId', res.data.data.limitAppId);
                                }
                                if (String(lsdGetInfo.enterpriseType) === '2') { // 公司章程 vm.companySysteShow
                                    vm.$store.commit('setCompanySysteShow', true)
                                } else {
                                    vm.$store.commit('setCompanySysteShow', false)
                                }
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        vm.$message.error('获取流水申请信息失败！')
                    })
            },
            /*
            * 关闭
            * */
            btnTips(){
                vm.modalLSD=false;
                setTimeout(() => {
                    vm.goBack();
                }, );
            },
            /**
             * 流水贷表单验证方法
             * */
            validatePassLsd () {
                let arr = ['0',0,'',null,'null',undefined]
                if(vm.editFormList.radio === '1'&&vm.editFormList.sort === '') {
                    vm.$message.error('请选择企业分类');
                    return
                }
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
                if (vm.openingBankListDistricts.length > 0) {
                    if (arr.includes(vm.editFormListBank.openingBankAreaCode)) {
                        vm.$message.error('请填写完整开户行地址')
                        return
                    }
                }
                if (arr.includes(vm.editFormListBank.openingBankProvinceCode)||arr.includes(vm.editFormListBank.openingBankCityCode)) {
                    vm.$message.error('请填写完整开户行地址')
                    return
                }
                if (arr.includes(vm.editFormListBank.bankCode)) {
                    vm.$message.error('请选择银行名称');
                    return
                }
                if (arr.includes(vm.editFormListBank.openingBankCode)) {
                    vm.$message.error('请选择开户行名称');
                    return
                }
                vm.$refs['editFormList'].validate((valid) => {
                    if (valid) {
                        vm.$refs['editFormListBank'].validate((valid) => {
                            if (valid) {
                                if (window.location.href.includes('test') || window.location.href.includes('test2') || window.location.href.includes('dev')) {
                                    vm.submitLsdApply()
                                } else {
                                    vm.fourElements()
                                        .then(res => {
                                            if (res === 1) {
                                                vm.submitLsdApply()
                                            }
                                        })
                                        .catch(err => {
                                            vm.$message({message: err,type:'error',duration:5000})
                                        })
                                }
                            } else {
                                vm.btnDisabled = false;
                            }
                        });
                    } else {
                        vm.btnDisabled = false;
                    };
                });
            },
            // 图片验证
            validateImgLsd ()  {
                return new Promise((resolve, reject) => {
                    if (vm.$refs.uploadS1.newListqny.length === 0) {
                        vm.$message.error('请上传企业营业执照图片')
                        reject()
                        return false
                    }
                    if (vm.$refs.uploadS2.newListqny.length === 0) {
                        vm.$message.error('请上传GSP证书图片')
                        reject()
                        return false
                    }
                    if (vm.$refs.uploadS3.newListqny.length === 0) {
                        vm.$message.error('请上传药品经营许可证图片')
                        reject()
                        return false
                    }
                    if (vm.companySysteShow) {
                        if (vm.$refs.uploadS4.newListqny.length === 0) {
                            vm.$message.error('请上传公司章程')
                            reject()
                            return false
                        }
                    }
                    if (vm.$refs.uploadS5.newListqny.length === 0) {
                        vm.$message.error('请上传经营场所购买/租赁合同图片')
                        reject()
                        return false
                    }
                    if (vm.editFormListPharmacy.legalHasHouse !== '0') {
                        if (vm.$refs.uploadS6.newListqny.length === 0) {
                            vm.$message.error('请上房产证图片')
                            reject()
                            return false
                        }
                    }
                    if (vm.editFormListPharmacy.legalHasCar !== '0') {
                        if (vm.$refs.uploadS7.newListqny.length === 0) {
                            vm.$message.error('请上车辆行驶证图片')
                            reject()
                            return false
                        }
                    }
                    if (vm.editFormList.radio === '2') {
                        if (vm.$refs.uploadS8.newListqny.length === 0) {
                            vm.$message.error('总部办公场所房产证/租赁合同')
                            reject()
                            return false
                        }
                    }
                    if (vm.$refs.uploadS9.newListqny.length === 0) {
                        vm.$message.error('实际控制人房产证/车辆行驶证/财产证明（三选一）')
                        reject()
                        return false
                    }
                    if (vm.buyCarTimeShow) {
                        if (vm.editFormList.buyCarTime === ''){
                            vm.$message.error('请填车辆购买日期')
                            reject()
                            return false
                        }
                    }
                    resolve()
                })
            },
            /**
             * 流水贷 —— 授信请求
             *
             * */
            submitLsdApply () {
                let zeroArr = [0, '0'];
                let openingBank = vm.openingBankNameArry.find((item, index, arr) => item.bankCode === vm.editFormListBank.openingBankCode);
                let {bankName:openingBankNames} = openingBank;
                vm.editFormListBank.openingBankName = openingBankNames;
                let _params = {
                    enterpriseType: vm.editFormList.radio, // 企业类型
                    enterpriseName: vm.editFormList.eName,// 企业名称
                    enterpriseClassification: vm.editFormList.radio === '1' ? vm.editFormList.sort : '', // 企业分类 ：1-个体工商户 ，2-个人独资企业，3-有限责任公司
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
                    contactorIdNo: vm.editFormList.contactorIdNo, // 紧急联系人身份证号
                    contactorMobile: vm.editFormList.mobile, // 紧急联系人手机
                    contactorEmail: vm.editFormList.contactorEmail,	// 紧急联系人邮箱
                    enterpriseZipCode:vm.editFormList.enterpriseZipCode, // 企业邮编
                    enterpriseCompanyTel:vm.editFormList.enterpriseCompanyTel, // 企业电话
                    officeFax:vm.editFormList.enterpriseOfficeFax, // 企业传真
                    contactorName: vm.editFormList.contactorName, // 紧急联系人
                    proviceCode: zeroArr.includes(vm.editFormList.enterpriseAddressProvince)? '':vm.editFormList.enterpriseAddressProvince, // 企业所在的省份编码
                    cityCode: zeroArr.includes(vm.editFormList.enterpriseAddressCity)? '':vm.editFormList.enterpriseAddressCity, // 企业所在的市编码
                    areaCode: zeroArr.includes(vm.editFormList.enterpriseAddressCountry)? '':vm.editFormList.enterpriseAddressCountry, // 企业所在区域编码
                    enterpriseAddress: vm.editFormList.dPosition, // 企业所在位置
                    businessScope:vm.editFormList.businessScope, // 经营范围
                    cardNumber: vm.editFormListBank.bankNo, // 银行账号
                    bankCode: vm.editFormListBank.bankCode, // 银行code
                    openingBankName: vm.editFormListBank.openingBankName,
                    openingBankCode: vm.editFormListBank.openingBankCode, // 开户行code
                    openingBankProvinceCode: zeroArr.includes(vm.editFormListBank.openingBankProvinceCode)? '':vm.editFormListBank.openingBankProvinceCode, // 开户行地址省
                    openingBankCityCode: zeroArr.includes(vm.editFormListBank.openingBankCityCode)? '':vm.editFormListBank.openingBankCityCode, // 开户行地址市
                    openingBankAreaCode: zeroArr.includes(vm.editFormListBank.openingBankAreaCode)? '':vm.editFormListBank.openingBankAreaCode, // 开户行地址区
                    openingBankAdress: vm.editFormListBank.openingBankAddress, // 开户行地址详细地址
                };
                vm.btnDisabled = true;
                vm.$store.commit('setLimitAppId', '');
                vm.$https.post('/api-webbff/v1/asset/creditApplyEssentialInformationForLSD' , _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            vm.$Message.success('保存成功');
                            vm.$store.commit('setEnterpriseName', vm.editFormList.eName)
                            vm.$store.commit('setLimitAppId', res.data.data.limitAppId);
                            vm.$store.commit('setEntTypeLsd', vm.editFormList.radio);
                            vm.$store.commit('setMedicalInsurance', vm.editFormList.enterpriseAddressProvince);
                            vm.$store.commit('setClassification', vm.editFormList.sort);
                            vm.setStep(2, '流水贷/法人-实际控制人信息');
                            vm.btnDisabled = false;
                            vm.isApply = true; // 授信申���成功后 不能在申请
                        } else {
                            vm.btnDisabled = false;
                        }
                    }).catch(e => {
                    vm.btnDisabled = false;
                    vm.$Message.error('保存失败');
                });
            },
            /**
             * 返回
             * */
            goBack () {
                this.$router.push({path: '/user/'});
            },
            /**
             * 设置步骤条
             * @param {Number} index [步骤条所在位置]
             * @param {String} info  [步骤条title信息]
             * */
            setStep(index, info) {
                vm.indexLSD = index;
                vm.titleInfo = info;
            },
            /**
             * 新增或编辑保存
             */
            // 时间过滤
            filterDate (date) {
                if (date === null) {
                    return ''
                }
                let time = new Date(parseInt(date) + 8 * 60 * 60 * 1000)
                let ymdhis = ''
                let isFull = true
                ymdhis += time.getUTCFullYear() + '-'
                if (time.getUTCMonth() + 1 >= 10) {
                    ymdhis += (time.getUTCMonth() + 1) + '-'
                } else {
                    ymdhis += '0' + (time.getUTCMonth() + 1) + '-'
                }
                if (time.getUTCDate() >= 10) {
                    ymdhis += time.getUTCDate()
                } else {
                    ymdhis += '0' + time.getUTCDate()
                }
                if (isFull === true) {
                    if (time.getUTCHours() >= 10) {
                        ymdhis += ' ' + time.getUTCHours() + ':'
                    } else {
                        ymdhis += ' 0' + time.getUTCHours() + ':'
                    }
                    if (time.getUTCMinutes() >= 10) {
                        ymdhis += time.getUTCMinutes() + ':'
                    } else {
                        ymdhis += '0' + time.getUTCMinutes() + ':'
                    }
                    if (time.getUTCSeconds() >= 10) {
                        ymdhis += time.getUTCSeconds()
                    } else {
                        ymdhis += '0' + time.getUTCSeconds()
                    }
                }
                return ymdhis
            }
            // ----  企业认证 E  ----
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
            'editFormListBank.openingBankProvinceCode': {
                handler (newVal,oldVal) { // 企业
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListBank.openingBankCityCode = '0';
                            self.editFormListBank.openingBankAreaCode = '0';
                            self.openingBankListCities = [];
                            self.openingBankListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListBank.openingBankCityCode = '0';
                            self.editFormListBank.openingBankAreaCode = '0';
                            self.openingBankListDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListBank.openingBankCityCode': {
                handler (newVal,oldVal) { // 企业
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListBank.openingBankAreaCode = '0';
                            self.openingBankListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListBank.openingBankAreaCode = '0';
                        })
                    }
                },
                deep: true
            }
        },
        created () {
            vm = this;
        },
        /*------------   企业认证 E  --------------*/
        mounted () {
            this.initInfo()
        },
        /*------------   企业认证 S  --------------*/
        updated () {
            if(this.editFormList){
                if(this.editFormList.radio === '1'){
                }
            }
        }
    }
</script>

<style lang="less">
    .titlePadding {
        .ivu-card-body {
            padding-bottom: 0;
            padding-top: 0;
        }
        .stepSlot{
            color: #333;
            font-size: 14px;
        }
        .stepContent {
            width: 1000px;
            margin: 20px auto;
        }
    }
    .formItemStyle {
        width: 547px!important;
        .ivu-form-item-label:before {
            content: '* ';
            color: #ed3f14;
            font-size: 16px;
        }
    }
    .formItemStyleTwo {
        width: 547px!important;
    }
    .modalLSD{
        .ivu-modal-footer{
            padding: 12px 120px 12px 120px;
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
        .outDate {background:#ddd;
            dt{background:#ddd;}
        }
        .apply-detail{
            border:solid 1px #ddd;
            dt{padding:8px;background: #F7F7F7;}
            dd{padding:10px 10px;border-top:solid 1px #ddd ;clear: both; line-height: 30px}
            .top-border{
                padding-top:20px;
                border-top:1px solid #eee;
                padding-bottom: 20px;
            }
            .fr{
                float: right;
                color: red;
            }
        }
        .setAlls {
            .ivu-form-item-label {
                &:before {
                    font-size: 16px;
                    content: '* ';
                    color: red;
                }
            }
        }
        .applyUImg{
            .ivu-form-item-required{
                .ivu-form-item-content{
                    position: relative;
                    top:-30px;
                }
                .demo-upload-list{
                    width: 130px;
                    height: 130px;
                    margin-bottom: 10px;
                    background: #f2f2f2;
                }
            }
            .ivu-upload-drag{
                border: solid 1px #E2A54D;
            }
            .ivu-form-item{
                margin-bottom: 0;
            }
        }
        .tj-btn{
            button{width:120px; margin:0 10px}
        }
        .setAll {
            .ivu-form-item-label {
                &:before {
                    font-size: 16px;
                    content: '* ';
                    color: red;
                }
            }
        }
        /*--------    企业认证 S      ----------*/

        .indexTh{
            border-left: solid 4px #E2A54D;
            padding-left: 10px;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .ivu-card-head{ background: #F7F7F7; padding: 9px 16px;}
        .indexTh{
            border-left: solid 4px #E2A54D;
            padding-left: 10px;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .w260{ width: 280px;}
        .creditCodeShow {
            display: inline-block;
        }
        .demo-upload-list{ width: 120px; height: 120px; line-height: 120px;}
        .setTitile {
            color: #333;
            font-size: 14px;
            span:last-child{
                font-size: 12px;
                color: red;
            }
        }
        .aptitude{padding-top: 25px;
            .rzimg{width: 130px; height: 130px; display: inline-block; background: #f2f2f2;}
            .ts{ position: absolute; left:162px; top:30px; color: #666;}
            .previewButton {
                width: 60px;
                height: 23px;
                line-height: 23px;
            }
            .demo-upload-list{
                width: 130px; height: 130px; background: #f2f2f2;
            }
            .back{ border-bottom: solid 1px #ddd; padding-bottom: 30px}
            .ivu-upload-drag{border: solid 1px #E2A54D;}
            .demo-upload-list-cover i{ margin-top: 40px; font-size: 50px;}
            .eAptitude{
                ul{
                    padding: 0 30px 15px 30px;
                    li{
                        width:20%; float: left; text-align: center; margin-bottom: 20px;
                        span{color: #333; padding-bottom: 10px; display: block;}
                        img{
                            width: 130px; height: 150px;
                        }
                    }
                }
            }
            .clearfix:after{clear:both;display:block;content:"";font-size:0;height:0;visibility:hidden;}
            .clearfix{zoom:1}
        }
        .footerBtn{text-align: center; padding:20px 0;
            .ivu-btn{ padding:6px 40px; background: #E2A54D;}
        }
        .ApprovalState-text{
            padding: 20px; color: #333;
        }
        .eTh{
            .ivu-card-head{
                background: #EEF9FF;
            }
            .right{ float: right;}
            .customBtn button{ background: #E2A54D; padding: 6px 30px;}
            .red{ color: red;}
        }
        .collapseSetStyle {
            margin-top: 15px;
            .ivu-collapse-header {
                padding-left: 20px;
            }
        }
        .displayStyle {
            display: inline-block;
        }
        .textWarp {
            position: relative;
            .seeImg {
                position: absolute;
                z-index: 6;
                left: 496px;
                span {
                    font-size: 14px;
                    color: red;
                    cursor: pointer;
                }
                span:last-child {
                    color: #0099DD;
                    margin-left: 15px;
                    cursor: default;
                }
            }
        }
        /*--------    企业认证 E      ----------*/
        .saveBntStyle {
            text-align: center;
            button {
                width: 110px;
                height: 40px;
                margin-bottom: 20px;
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/limitApplyLSDInfo.vue