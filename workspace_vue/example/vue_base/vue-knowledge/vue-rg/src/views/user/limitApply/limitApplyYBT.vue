<template>
    <div class="min-height-100 limitApply" ref="limitApplyLSD">
        <agreements ref="agreementIsShow">
        </agreements>
        <Row   :gutter="10" type="flex">
            <Col span="24">
                <Card :dis-hover="true" :bordered="false">
                    <p class="indexTh"  ref="ivu-card-head">
                        药白条
                    </p>
                    <div>
                        <Form ref="editFormList" :model="editFormList" :label-width="200" :rules="ruleValidate">
                            <!-- 企业认证 S  -->
                            <Card :dis-hover="true" :bordered="false">
                                <Card :dis-hover="true" :padding="0">
                                    <p slot="title" style=" color: #333; font-size: 14px;">第一步 填写企业基本信息</p>
                                    <Row style="padding-top: 25px;">
                                        <Col span="24">
                                            <FormItem  label="企业类型："  prop="radio">
                                                <RadioGroup v-model="editFormList.radio">
                                                    <Radio label="5">商业</Radio>
                                                </RadioGroup>
                                            </FormItem>
                                        </Col>

                                        <Col span="24">
                                            <FormItem  label="企业名称：" prop="eName">
                                                <Input v-model="editFormList.eName" placeholder="企业名称"class="w260"></Input>
                                            </FormItem>
                                        </Col>

                                        <Col span="24">
                                            <FormItem  label="统一社会信用代码：" prop="creditCode">
                                                <Input  placeholder="统一社会信用代码"
                                                        :maxlength="18"
                                                        class="w260"
                                                        v-model="editFormList.creditCode">

                                                </Input>
                                                <div class="creditCodeShow">
                                                    <span style="padding-left: 10px;">有效期：</span>
                                                    <FormItem style="display: inline-block;" prop="creditCodestartTime">
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
                                                    <span style="padding-left: 10px;">
                                <Checkbox v-model="creditCodeType" @on-change="creditCodeChecked"></Checkbox>长期
                            </span>
                                                </div>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem  label="药品经营许可证：" prop="DrugsLicence">
                                                <Input  placeholder="药品经营许可证" class="w260" v-model="editFormList.DrugsLicence"></Input>
                                                <span style="padding-left: 10px;">有效期：</span>
                                                <FormItem style="display: inline-block;" prop="DrugsLicencestartTime">
                                                    <Date-picker
                                                        type="date"
                                                        :value="editFormList.DrugsLicencestartTime"
                                                        @on-change="editFormList.DrugsLicencestartTime=$event"
                                                        :options="start_DrugsLicence"
                                                        placeholder="选择日期"
                                                    >
                                                    </Date-picker>
                                                </FormItem>
                                                <span>至</span>
                                                <FormItem style="display: inline-block;" prop="DrugsLicenceendTime">
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.DrugsLicenceendTime"
                                                            @on-change="editFormList.DrugsLicenceendTime=$event"
                                                            :options="end_DrugsLicence"
                                                            placeholder="选择日期">
                                                    </Date-picker>
                                                </FormItem>
                                                <span style="padding-left: 10px;">
                                                </span>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem  label="GSP证书："  prop="gspCertificate">
                                                <Input  placeholder="GSP证书" class="w260" v-model="editFormList.gspCertificate"></Input>
                                                <span style="padding-left: 10px;">有效期：</span>
                                                <FormItem style="display: inline-block;" prop="gspstartTime">
                                                    <Date-picker
                                                            type="date"
                                                            :value="editFormList.gspstartTime"
                                                            @on-change="editFormList.gspstartTime=$event"
                                                            :options="start_gspCertificate"
                                                            placeholder="选择日期">
                                                    </Date-picker>
                                                </FormItem>
                                                <span>至</span>
                                                <FormItem style="display: inline-block;" prop="gspendTime">
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
                                        <Col span="24">
                                            <FormItem label="企业法人：" prop="legalName">
                                                <Input placeholder="企业法人" class="w260" v-model="editFormList.legalName"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="法人身份证：" prop="legalNo">
                                                <Input placeholder="法人身份证" class="w260" v-model="editFormList.legalNo"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="法人手机：" prop="legalIphone">
                                                <Input placeholder="法人手机" class="w260" v-model="editFormList.legalIphone"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="法人邮箱：" prop="legalEmail">
                                                <Input placeholder="法人邮箱" class="w260" v-model="editFormList.legalEmail"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem  label="紧急联系人：" prop="enContacts">
                                                <Input  placeholder="紧急联系人" class="w260" v-model="editFormList.enContacts"></Input>
                                            </FormItem>
                                        </Col>

                                        <Col span="24">
                                            <FormItem  label="紧急联系人手机：" prop="mobile">
                                                <Input  placeholder="紧急联系人手机" class="w260" v-model="editFormList.mobile"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="紧急联系人邮箱：" prop="contactorEmail">
                                                <Input placeholder="紧急联系人邮箱" class="w260" v-model="editFormList.contactorEmail"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="企业所在位置:" prop="enterpriseAddressProvince">
                                                <Select style="width:14%" v-model="editFormList.enterpriseAddressProvince"  @on-query-change="getProvinceCityNames(1)">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in listProvince" :key="item.lcode"  :value="item.lcode">{{item.lname}}</Option>
                                                </Select>

                                                <Select style="width:14%" v-show="citys"  v-model="editFormList.enterpriseAddressCity" @on-query-change="getProvinceCityNames(2)">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in listCities" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                                                </Select>

                                                <Select style="width:15%" v-show="districtsAll"  v-model="editFormList.enterpriseAddressCountry">
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
                                        <!--<Col span="24">-->
                                            <!--<FormItem label="经营范围：" prop="businessScope">-->
                                                <!--<Input placeholder="经营范围" type="textarea" :rows="5" style="width: 43%" v-model="editFormList.businessScope"></Input>-->
                                            <!--</FormItem>-->
                                        <!--</Col>-->
                                        <Col span="24">
                                            <FormItem label="推荐人：">
                                                <Input placeholder="推荐人" class="w260" v-model="editFormList.referee"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Card>
                            </Card>
                            <!-- 企业认证 E  -->
                            <!-- 流水贷 S -->
                            <div style="padding: 16px;">
                                <dl class="apply-detail  applyUImg mt10 setAlls">
                                    <dt><span class="ml10">第二步 上传企业资质</span> <span class="fr">提示：允许上传大小10M,允许上传PNG、JPG、PDF 格式文件</span></dt>
                                    <dd style="padding-top: 20px">
                                        <FormItem label="企业营业执照：" class="top-border" style="border-top:0;">
                                            <file-upload-apply
                                                    :isMultiUpload="false"
                                                    ref="uploadS1"
                                                    refUpload="uploadS1"
                                                    action="/api-webbff/v1/asset/uploadAll"
                                                    :filelists="businessLicensePicUrlImg">
                                            </file-upload-apply>
                                        </FormItem>
                                        <FormItem label="GSP证书：" class="top-border">
                                            <file-upload-apply
                                                    :isMultiUpload="false"
                                                    ref="uploadS2"
                                                    refUpload="uploadS2"
                                                    action="/api-webbff/v1/asset/uploadAll"
                                                    :filelists="gspPicUrlImg">
                                            </file-upload-apply>
                                        </FormItem>
                                        <FormItem label="药品经营许可证：" class="top-border">
                                            <file-upload-apply
                                                    :isMultiUpload="false"
                                                    ref="uploadS3"
                                                    refUpload="uploadS3"
                                                    action="/api-webbff/v1/asset/uploadAll"
                                                    :filelists="tradingLicensePicUrlImg">
                                            </file-upload-apply>
                                        </FormItem>
                                    </dd>
                                </dl>
                                <div class="Agreements">
                                    <FormItem label="" class="Agreement">
                                        <Checkbox v-model="agreements">已同意</Checkbox>
                                        <span  @click="agreementPing">《药金融信息服务平台服务协议》</span><span @click="agreementShang">《商家授权协议》</span>
                                    </FormItem>
                                </div>
                                <div class="mt30 text-align-center tj-btn">
                                    <Button type="primary" :disabled="btnDisabled" @click="fourElementsVerify('editFormList')">立即申请</Button>
                                </div>
                            </div>
                            <!-- 流水贷 E -->
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>

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
    import Validates from '../../../libs/Validate';
    export default {
        name: "limitApplyYBT",
        components: {
            fileUploadCommon,
            agreements,
            fileUploadApply
        },
        data () {
            return {
                isApply: false,
                btnDisabled: false,
                modalShoper: false,
                modalProtocol: false,
                greements: true,
                enterpriseType: false,
                leasingContractShow: false,
                isHouse: false,
                isCarShow: false,
                modalLSD:false,
                citys: false,
                TipsLSD:'',
                districtsAll: false,
                listProvince: [],
                listCities: [],
                listDistricts: [],
                editFormList: {
                    businessScope: '',
                    enterpriseInfoMd5: '',
                    legalName:'',
                    legalNo:'',
                    legalIphone: '',
                    legalEmail: '',
                    contactorName:'',
                    contactorMobile:'',
                    contactorEmail:'',
                    pharmacyCreateTime:'',
                    shopAre:'',
                    useplaceIsSelf:'0',
                    yearReturnMoney:null,
                    legalHasHouse:'0',
                    legalHasCar:'0',
                    referee:'',
                    leasingContractUrl:'',
                    houseUrl:'',
                    drivingUrl:'',
                    companySystemUrl:'',
                    radio:'5',
                    eName:'',
                    creditCode:'',
                    creditCodestartTime: '',//查询条件-开始时间
                    creditCodeendTime: '',//查询条件-结束时间
                    DrugsLicencestartTime: '',//查询条件-开始时间
                    DrugsLicenceendTime: '',//查询条件-结束时间
                    DrugsLicence:'',
                    gspCertificate:'',
                    gspstartTime: '',//查询条件-开始时间
                    gspendTime: '',//查询条件-结束时间
                    enContacts:'',
                    mobile:'',
                    enterpriseAddressProvince: 0,
                    enterpriseAddressCity: 0,
                    enterpriseAddressCountry: 0,
                    dPosition:''
                },
                leasingContractUrlImg: '',
                houseUrlImg: '',
                drivingUrlImg: '',
                businessLicensePicUrlImg:'',
                gspPicUrlImg: '',
                tradingLicensePicUrlImg: '',
                ruleValidate: {
                    legalName: [
                        { required: true, message: '企业法人填写！', trigger: 'blur' },
                    ],
                    legalIphone: [
                        { required: true,
                            validator: Validates.isPhone,
                            name: '企业法人手机',
                            trigger: 'blur' },
                    ],
                    legalEmail: [
                        { required: true, message: '企业法人邮箱', trigger: 'blur' },
                    ],
                    legalNo: [
                        { required: true, validator: Validates.idCardPass, trigger: 'blur' },
                    ],
                    contactorName: [
                        { required: true, message: '联系人填写！', trigger: 'blur' },
                    ],
                    contactorEmail: [
                        { required: true, message: '联系人邮箱填写！', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式有误！', trigger: 'blur' }
                    ],
                    pharmacyCreateTime: [
                        { required: true, type: 'date', message: '药店成立日期填写！', trigger: 'change' },
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
                        { required: true, message: '医保年回款金额填写！', trigger: 'blur' },
                    ],
                    radio: [
                        { required: true, message: '请选择企业类型！', trigger: 'change' }
                    ],
                    eName: [
                        { required: true, message: '请填写企业名称！', trigger: 'blur' },
                    ],
                    creditCode: [
                        { required: true,
                            validator: Validates.isNumLength,
                            name: '统一社会信用代码',
                            trigger: 'blur'
                        }
                    ],
                    creditCodestartTime: [
                        { required: true, message: '请填写开始时间！', trigger: 'blur' }
                    ],
                    DrugsLicence: [
                        { required: true, message: '请填写药品经营许可证！', trigger: 'blur' }
                    ],
                    DrugsLicencestartTime: [
                        { required: true, message: '请填写开始时间！', trigger: 'blur' }
                    ],
                    DrugsLicenceendTime: [
                        { required: true, message: '请填写结束时间！', trigger: 'blur' }
                    ],
                    MedicalLicence:[
                        { required: true, message: '请填写医疗机构执业许可证！', trigger: 'blur' }
                    ],
                    MedicalLicencestartTime:[
                        { required: true, message: '请填写开始时间！', trigger: 'blur' }
                    ],
                    MedicalLicenceendTime:[
                        { required: true, message: '请填写结束时间！', trigger: 'blur' }
                    ],
                    gspCertificate:[
                        { required: true, message: '请填写GSP证书!', trigger: 'blur' }
                    ],
                    gspstartTime:[
                        { required: true, message: '请填写开始时间!', trigger: 'blur' }
                    ],
                    gspendTime:[
                        { required: true, message: '请填写结束时间!', trigger: 'blur' }
                    ],
                    enContacts:[
                        { required: true, message: '请填写紧急联系人！', trigger: 'blur' }
                    ],
                    mobile:[
                        { required: true,
                            trigger: 'blur' ,
                            validator: Validates.isPhone,
                            name: '紧急联系人手机'
                        }
                    ],
                    enterpriseAddressProvince:[
                        { required: true, message: '请选择企业所在位置！', trigger: 'blur' }
                    ],
                    dPosition:[
                        { required: true, message: '请填写详细街道！', trigger: 'blur' }
                    ],
                    businessScope:[
                        {
                            required: true,
                            message: '请填写经营范围',
                            trigger: 'blur'
                        }
                    ],
                    imageUr1: [
                        {required: true, message: '统一信用代码证图片必选', trigger: 'change'}
                    ],
                    imageUr2: [
                        {required: true, message: ' 药品经营许可证图片必选', trigger: 'change'}
                    ],
                    imageUr3: [
                        {required: true, message: 'GSP/GMP证书图片必选', trigger: 'change'}
                    ],
                    imageUr4: [
                        {required: true, message: '开户许可证图片必选', trigger: 'change'}
                    ],
                    imageUr5: [
                        {required: true, message: '药品经营质量保证协议图片必选', trigger: 'change'}
                    ],
                    imageUr6: [
                        {required: true, message: '合格供货方档案表图片必选', trigger: 'change'}
                    ],
                    imageUr7: [
                        {required: true, message: '供货企业质量���证体系调查表图片必选', trigger: 'change'}
                    ],
                    imageUr8: [
                        {required: true, message: '出库单样本表图片必选', trigger: 'change'}
                    ],
                    imageUr9: [
                        {required: true, message: ' 印章印模（鲜章）必选', trigger: 'change'}
                    ],
                    imageUr10: [
                        {required: true, message: '税票样本图片图片必选', trigger: 'change'}
                    ],
                    imageUr11: [
                        {required: true, message: '医疗机构执业许可证图片必选', trigger: 'change'}
                    ]
                },
                // 企业认证 S
                isEdit: false,
                creditCodeType: false,
                DrugsLicenceType:false,
                MedicalLicenceType:false,
                gspCertificateType:false,
                file: '',
                agreements: true,
                readerResult: '',
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
            // 获取经营范围
            // businessScopeInfo () {
            //     let self = this;
            //     if (this.editFormList.creditCode.length === 18) {
            //         this.$https.get(`/api-webbff/v1/risk/getBizScope?search_key=${this.editFormList.creditCode}`)
            //             .then(res => {
            //                 if (res.data.data.Scope !== '') {
            //                     self.editFormList.businessScope = res.data.data.Scope;
            //                 }
            //             })
            //             .catch(err => {
            //                 console.log(err)
            //             })
            //     }
            // },
            // ----  流水贷 S  ----
            creditCodeChecked (b) {
                if (b) {
                    this.editFormList.creditCodeendTime = '';
                }
            },
            agreementShang () {
                this.$refs.agreementIsShow.isModalShoper = true;
            },
            agreementPing () {
                this.$refs.agreementIsShow.isModalProtocol = true;
            },
            // 是否显示车辆行驶证
            isChangeCar (val) {
                if (val === '0') {
                    this.isCarShow = false;
                } else {
                    this.isCarShow = true;
                }
            },
            isHouses (val) {
                if (val === '0') {
                    this.isHouse = false;
                } else {
                    this.isHouse = true;
                }
            },
            isUseplaceIsSelf (val) {
                if (val === '0') {
                    this.leasingContractShow = false;
                } else {
                    this.leasingContractShow= true;
                }
            },
            /**
             * 失去焦点数字变成千分位数字
             */
            changeToNumThousands (num) {
                vm.editFormList.yearReturnMoney = this.$utilFinance.formatNumThousands(num, 2);
            },
            /**
             * 聚焦input由千分位数字变回数字再编辑
             */
            changeToNum (num) {
                var numNew = this.$utilFinance.removeNumFormat(num);
                vm.editFormList.yearReturnMoney = numNew;
            },
            /**
            * 关闭
            * */
            btnTips(){
                vm.modalLSD=false;
                setTimeout(() => {
                    vm.goBack();
                }, );
            },
            /**
             *获取药白条申请信息
             * */
            getYBTinfo () {
                vm.$https.post('/api-webbff/v1/asset/creditApplyInfo', {
                    productCode: 'YBT'
                })
                    .then(res => {
                        if (res.data.success === 1) {
                            let ybtGetInfo = res.data.data;
                            let applyArr = ['', null, undefined, 'null'];
                            vm.editFormList.radio = '5'; // 企业类型
                            vm.editFormList.eName = ybtGetInfo.enterpriseName; // 企业名称
                            vm.editFormList.enterpriseInfoMd5 = ybtGetInfo.enterpriseInfoMd5; // md5
                            vm.editFormList.enterpriseAddressProvince = ybtGetInfo.proviceCode;
                            if (!applyArr.includes(ybtGetInfo.proviceCode) && applyArr.includes(ybtGetInfo.cityCode)) {
                                vm.adressShow(ybtGetInfo.proviceCode,'0',ybtGetInfo.areaCode)
                            } else {
                                vm.adressShow(ybtGetInfo.proviceCode,ybtGetInfo.cityCode,ybtGetInfo.areaCode)
                            }
                            vm.editFormList.dPosition = ybtGetInfo.enterpriseAddress // 企业所在位置
                            vm.editFormList.contactorEmail = ybtGetInfo.contactorEmail	// 紧急联系人邮箱
                            vm.editFormList.mobile = ybtGetInfo.contactorMobile;// 紧急联系人手机
                            vm.editFormList.enContacts = ybtGetInfo.contactorName; // 紧急联系人
                            if (ybtGetInfo.gspStartTime === null) {
                                vm.editFormList.gspstartTime = ''; // gsp证书有效期开始时间
                            } else {
                                vm.editFormList.gspstartTime = ybtGetInfo.gspStartTime; // gsp证书有效期开始时间
                            }
                            if (ybtGetInfo.gspEndTime === null) {
                                vm.editFormList.gspendTime = ''; // gsp证书有效期结束时间
                            } else {
                                vm.editFormList.gspendTime = ybtGetInfo.gspEndTime; // gsp证书有效期结束时间
                            }

                            vm.editFormList.gspCertificate = ybtGetInfo.gspNo // GSP证书
                            vm.businessLicensePicUrlImg = ybtGetInfo.businessLicensePicUrl // 营业执照url
                            vm.gspPicUrlImg = ybtGetInfo.gspPicUrl // GSP证书Url
                            vm.tradingLicensePicUrlImg = ybtGetInfo.tradingLicensePicUrl  // 药品经营url
                            vm.editFormList.legalEmail = ybtGetInfo.legalEmail; // 法人邮箱
                            vm.editFormList.legalIphone = ybtGetInfo.legalMobile; // 法人手机
                            vm.editFormList.legalName = ybtGetInfo.legalName; // 企业法人
                            vm.editFormList.legalNo = ybtGetInfo.legalNo;// 法人身份证
                            vm.editFormList.DrugsLicence = ybtGetInfo.licenseNo; // 药品经营许可证
                            if (ybtGetInfo.licenseStartTime === null) {
                                vm.editFormList.DrugsLicencestartTime = ''; // 药品经营许可证开始时间
                            } else {
                                vm.editFormList.DrugsLicencestartTime = ybtGetInfo.licenseStartTime; // 药品经营许可证开始时间
                            }
                            if (ybtGetInfo.licenseEndTime === null) {
                                vm.editFormList.DrugsLicenceendTime = ''; // 经营许可证有效期结束时间
                            } else {
                                vm.editFormList.DrugsLicenceendTime = ybtGetInfo.licenseEndTime; // 经营许可证有效期结束时间
                            }

                            vm.editFormList.referee = ybtGetInfo.referee;// 推荐人
                            if (ybtGetInfo.socialIsLongTerm === 1) { // 社会统一信用代码证 是否长期 0:否  1：是
                                vm.creditCodeType = true
                            } else {
                                if (ybtGetInfo.socialUnifiedCreditNoEndTime === null) {
                                    vm.editFormList.creditCodeendTime = ''; // 社会统一信用代码证有效期结束时间
                                } else {
                                    vm.editFormList.creditCodeendTime = ybtGetInfo.socialUnifiedCreditNoEndTime; // 社会统一信用代码证有效期结束时间
                                }
                            }
                            vm.editFormList.creditCode = ybtGetInfo.socialUnifiedCreditNo; // 统一社会信用代码证
                            if (ybtGetInfo.socialUnifiedCreditNoStartTime === null) {
                                vm.editFormList.creditCodestartTime = '' //  社会统一信用代码证有效期开始时间通
                            } else {
                                vm.editFormList.creditCodestartTime = ybtGetInfo.socialUnifiedCreditNoStartTime; //  社会统一信用代码证有效期开始时间通
                            }
                            if (!applyArr.includes(ybtGetInfo.businessScope)) {
                                vm.editFormList.businessScope = ybtGetInfo.businessScope; // 经营范围
                            }
                        }
                    })
                    .catch(err => {
                        vm.$message.error('获取药白条申请信息失败！')
                    })
            },
            /**
             *  四要素验证 [企业名称  社会统一信用代码  企业法人  法人身份证]
             */
            fourElements () {
                return new Promise((resolve, reject) => {
                    this.$https.post('/api-webbff/v1/risk/bizFour', {
                        company_name: this.editFormList.eName,
                        credit_code: this.editFormList.creditCode,
                        legal_person: this.editFormList.legalName,
                        person_id: this.editFormList.legalNo
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
            /**
             * 先验证四要素在申请 submitYBT('editFormList')
             **/
            fourElementsVerify (name) {
                if (vm.isApply) {
                    vm.$message.error('已有一条授信记录，无需重复申请');
                    return
                }
                vm.$refs[name].validate((valid) => { // 注：提交成功 但融贯通接口返回598
                    if (valid) {
                        if (window.location.href.includes('test') || window.location.href.includes('test2')) {
                            vm.submitYBT()
                        } else {
                            vm.fourElements()
                                .then(res => {
                                    if (res === 1) {
                                        vm.submitYBT()
                                    }
                                })
                                .catch(err => {
                                    vm.$message({message: err,type:'error',duration:5000})
                                })
                        }

                    } else {
                        vm.btnDisabled = false;
                    }
                })
            },
            /**
             * 药白条申请提交
             * */
            submitYBT () {
                let arr = ['0','',null]
                let arrTwo = ['0', 0]
                this.$nextTick(() => {
                    if (!vm.agreements) {
                        vm.$message.error('请阅读并同意 《药金融信息服务平台服务协议》《商家授权协议》')
                        return
                    }
                    if (vm.$refs.uploadS1.newListqny.length === 0) {
                        vm.$message.error('请上传企业营业执照图片')
                        return
                    }
                    if (vm.$refs.uploadS2.newListqny.length === 0) {
                        vm.$message.error('请上传GSP证书图片')
                        return
                    }
                    if (vm.$refs.uploadS3.newListqny.length === 0) {
                        vm.$message.error('请上传药品经营许可证图片')
                        return
                    }
                    if (vm.editFormList.legalName === vm.editFormList.enContacts) {
                        vm.$message.error('企业法人与紧急联系人不能为同一人')
                        return
                    }
                    if (vm.creditCodeType === false && vm.editFormList.creditCodeendTime === '') {
                        vm.$message.error('请填写有效期')
                        return
                    }
                    if (vm.districtsAll) {
                        if (arr.includes(vm.editFormList.enterpriseAddressCountry)) {
                            vm.$message.error('请填写完整企业所在位置')
                            return
                        }
                    }
                    if (arr.includes(vm.editFormList.enterpriseAddressProvince)||arr.includes(vm.editFormList.enterpriseAddressCity)) {
                        vm.$message.error('请填写完整企业所在位置')
                        return
                    }
                    let _params = {
                        enterpriseType: vm.editFormList.radio, // 企业类型
                        enterpriseName: vm.editFormList.eName,// 企业名称
                        proviceCode: arrTwo.includes(vm.editFormList.enterpriseAddressProvince)? '' : vm.editFormList.enterpriseAddressProvince, // 客户企业所在的省份编码
                        cityCode: arrTwo.includes(vm.editFormList.enterpriseAddressCity)? '' : vm.editFormList.enterpriseAddressCity, // 客户企业所在的市编码
                        areaCode: arrTwo.includes(vm.editFormList.enterpriseAddressCountry)? '' : vm.editFormList.enterpriseAddressCountry, // 客户企业所在区域编码
                        enterpriseAddress: vm.editFormList.dPosition, // 企业所在位置
                        contactorEmail: vm.editFormList.contactorEmail,	// 紧急联系人邮箱
                        contactorMobile: vm.editFormList.mobile, // 紧急联系人手机
                        contactorName: vm.editFormList.enContacts, // 紧急联系人
                        gspStartTime: vm.editFormList.gspstartTime, // gsp证书有效期开始时间
                        gspEndTime: vm.editFormList.gspendTime, // gsp证书有效期结束时间
                        gspNo: vm.editFormList.gspCertificate, // GSP证书
                        gspPicUrl: vm.$refs.uploadS2.newListqny.join(','), // GSP证书Url
                        gspPicUrlRgt: vm.$refs.uploadS2.newListRgt.join(','), // GSP证书Url-融贯通
                        legalEmail: vm.editFormList.legalEmail, // 法人邮箱
                        legalMobile: vm.editFormList.legalIphone, // 法人手机
                        legalName: vm.editFormList.legalName, // 企业法人
                        legalNo: vm.editFormList.legalNo, // 法人身份证
                        licenseNo: vm.editFormList.DrugsLicence, // 药品经营许可证
                        licensePicUrl: vm.$refs.uploadS3.newListqny.join(','), //  药品经营许可证url
                        licensePicUrlRgt: vm.$refs.uploadS3.newListRgt.join(','), //  药品经营许可证url-融贯通
                        licenseStartTime: vm.editFormList.DrugsLicencestartTime, // 药品经营许可证开始时间
                        licenseEndTime: vm.editFormList.DrugsLicenceendTime, // 经营许可证有效期结束时间
                        referee: vm.editFormList.referee, // 推荐人
                        socialIsLongTerm: vm.editFormList.creditCodeType === true? 1:0, // 社会统一信用代码证 是否长期 0:否  1：是
                        socialUnifiedCreditNo: vm.editFormList.creditCode, // 统一社会信用代码证
                        socialUnifiedCreditNoEndTime: vm.editFormList.creditCodeendTime, // 社会统一信用代码证有效期结束时间
                        socialUnifiedCreditNoStartTime: vm.editFormList.creditCodestartTime, //  社会统一信用代码证有效期开始时间
                        socialUnifiedCreditPicUrl: vm.$refs.uploadS1.newListqny.join(','), // 营业执照
                        socialUnifiedCreditPicUrlRgt: vm.$refs.uploadS1.newListRgt.join(','), // 营业执照-融贯通
                        enterpriseInfoMd5: vm.editFormList.enterpriseInfoMd5
                    };
                    vm.btnDisabled = true;
                    vm.$https.post('/api-webbff/v1/asset/productCreditApplyForYBT' , _params)
                        .then(res => {
                            if (res.data.success === 1) {
                                vm.$Message.success('申请成功！');
                                vm.$router.push({path: '/user/'})
                            } else {
                                vm.btnDisabled = false;
                            }
                        }).catch(e => {
                        vm.btnDisabled = false;
                        vm.$Message.error('请求接口失败！');
                    });
                })
            },
            /**
             * 返回
             * */
            goBack () {
                this.$router.push({path: '/user/'});
            },
            // 获取城市信息
            getProvinceCityNames (type) {
                let that = this;
                let id = ''
                if (type === 0) {
                    id = ''
                }
                if (type === 1) {
                    id = that.editFormList.enterpriseAddressProvince === '0'? '': that.editFormList.enterpriseAddressProvince
                }
                if (type === 2) {
                    id = that.editFormList.enterpriseAddressCity === '0'? '': that.editFormList.enterpriseAddressCity
                }
                return this.$https.post('/api-webbff/v1/common/getAddressByLcode',{
                    lcode: id
                }).then(res => {
                    if (res.data.success === 1) {
                        let addr = res.data.data
                        if (type === 0) {
                            that.listProvince = addr;
                        }
                        if (type === 1 && id !== '') {
                            that.citys = true;
                            that.districtsAll = false;
                            that.editFormList.enterpriseAddressCity = '0';
                            that.editFormList.enterpriseAddressCountry = '0';
                            that.listCities = addr;
                        }
                        if (type === 1 && id === '') {
                            that.citys = false;
                            that.districtsAll = false;
                            that.editFormList.enterpriseAddressCity = '0';
                            that.editFormList.enterpriseAddressCountry = '0';
                        }
                        if (type === 2 && id === '') {
                            that.districtsAll = false;
                            that.listDistricts = [];
                            that.editFormList.enterpriseAddressCountry = '0';
                        }
                        if (type === 2 && id !== '') {
                            if (addr.length !== 0) {
                                that.districtsAll = true;
                                that.listDistricts = addr;
                                that.editFormList.enterpriseAddressCountry = '0';
                            } else {
                                that.editFormList.enterpriseAddressCountry = '0';
                                that.districtsAll = false;
                            }
                        }
                    }
                }).catch(e => {
                    this.$Message.error('请求省市接口失败！');
                });
            },
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
            },
            // 重新获取企业id
            getEntIdInfos () {
                let that = this;
                that.$https.post('/api-webbff/v1/member/getUserInfoByToen2RGT',{
                    token: that.getToken
                }).then(res => {
                    if (res.data.success === 1) {
                        that.$store.commit('setEntType', res.data.data.enterpriseType);
                        that.$store.commit('setSupplierId', res.data.data.suId);
                        that.$store.commit('setEntId', res.data.data.enterpriseId);
                        that.$message.success('提交成功');
                        that.$router.push({path: 'authoritySuccee'});
                    }
                })
            },
            // 地址回显
            adressShow (provinces,citys,countrys) {
                let that = this;
                that.$https.post('/api-webbff/v1/common/getAddressByLcode',{
                    lcode: provinces
                }).then(res => {
                    if (citys !==null && citys !== '') {
                        that.citys = true;
                        that.listCities = res.data.data
                        that.editFormList.enterpriseAddressCity = citys
                        if (countrys !==null && countrys !== '') {
                            that.$https.post('/api-webbff/v1/common/getAddressByLcode',{
                                lcode: citys
                            }).then(res => {
                                that.districtsAll = true;
                                that.listDistricts = res.data.data
                                that.editFormList.enterpriseAddressCountry = countrys
                            }).catch(e => {
                                that.$Message.error('地址回显失败');
                            });
                        }
                    }
                }).catch(e => {
                    that.$Message.error('请求省市接口失败！');
                });
            },
            // ----  企业认证 E  ----
        },
        watch: {},
        created () {
            vm = this;
        },
        /*------------   企业认证 E  --------------*/
        mounted () {
            vm.getProvinceCityNames(0).then(()=>{
                vm.getYBTinfo()
            });
        },
        /*------------   企业认证 S  --------------*/
        updated () {
        }
    }
</script>

<style lang="less">
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
        .w260{ width: 260px;}
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


        /*--------    企业认证 E      ----------*/

    }
</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/limitApplyYBT.vue