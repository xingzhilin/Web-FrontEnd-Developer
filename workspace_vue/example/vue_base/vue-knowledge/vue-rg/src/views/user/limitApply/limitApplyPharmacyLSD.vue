<template>
    <div class="min-height-100 limitApply titlePaddingOther" ref="limitApplyLSD">
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
        <Row :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <div>
                    <Form ref="editFormListPharmacy" :model="editFormListPharmacy" :label-width="200"
                          :rules="ruleValidatePharmacy">
                        <!-- 填写药店信息 S -->
                        <Card :dis-hover="true" :bordered="false" class="margin-top-10">
                            <Card :dis-hover="true" :padding="0" class="padding-bottom-15">
                                <p slot="title" style=" color: #333; font-size: 14px;">填写药店信息</p>
                                <div class="margin-top-20">
                                    <Row>
                                        <Col>
                                            <FormItem class='displayStyle' label="药店成立日期：" prop="pharmacyCreateTime">
                                                <Date-picker type="date"
                                                             class="w260"
                                                             v-model="editFormListPharmacy.pharmacyCreateTime"
                                                             placeholder="药店成立日期">
                                                </Date-picker>
                                            </FormItem>
                                            <FormItem class='displayStyle' label="门店面积：" prop="shopAre">
                                                <Input placeholder="门店面积" class="w260"
                                                       v-model="editFormListPharmacy.shopAre"></Input> 平方米
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormItem class='setAll displayStyle' label="经营场所是否为购得：">
                                                <RadioGroup class="w260" v-model="editFormListPharmacy.useplaceIsSelf"
                                                            @on-change="isUseplaceIsSelf">
                                                    <Radio label="0">否</Radio>
                                                    <Radio label="1">是</Radio>
                                                </RadioGroup>
                                            </FormItem>
                                            <FormItem label="租赁合同到期日：" v-show="leaseTimeShow" class="displayStyle setAll">
                                                <Date-picker
                                                        type="date"
                                                        class="w260"
                                                        :value="editFormListPharmacy.leaseTime"
                                                        @on-change="editFormListPharmacy.leaseTime=$event"
                                                        placeholder="租赁合同到期日">
                                                </Date-picker>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormItem v-show="getEntTypeLsds !== '2'" label="法人名下是否有房产："
                                                      class="displayStyle setAll">
                                                <RadioGroup class="w260" v-model="editFormListPharmacy.legalHasHouse"
                                                            @on-change="isHouses">
                                                    <Radio label="0">否</Radio>
                                                    <Radio label="1">是</Radio>
                                                </RadioGroup>
                                            </FormItem>
                                            <FormItem class='displayStyle' label="医保近3个月回款金额：" prop="yearReturnMoney">
                                                <Input placeholder="医保近3个月回款金额" v-model="editFormListPharmacy.yearReturnMoney"
                                                       class="w260"></Input> 万元
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormItem v-show="getEntTypeLsds !== '2'" label="法人名下是否有车辆："
                                                      class="displayStyle setAll">
                                                <RadioGroup class="w260" v-model="editFormListPharmacy.legalHasCar"
                                                            @on-change="isChangeCar">
                                                    <Radio label="0">否</Radio>
                                                    <Radio label="1">是</Radio>
                                                </RadioGroup>
                                            </FormItem>
                                            <FormItem label="车辆购买日期：" v-show="buyCarTimeShow&&(getEntTypeLsds !== '2')"
                                                      class="displayStyle setAll">
                                                <Date-picker
                                                        type="date"
                                                        :value="editFormListPharmacy.buyCarTime"
                                                        @on-change="editFormListPharmacy.buyCarTime=$event"
                                                        placeholder="选择日期">
                                                </Date-picker>
                                            </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col v-if="(getMedicalInsurances==='640000'||getMedicalInsurances===640000)? true:false" span="24">
                                            <div class="textWarp">
                                                <div class='displayStyle seeImg'>
                                                    <span>注：连锁药店需添加所有分店医保中心号</span><span @click="imgHidden">查看医保中心号图例</span>
                                                </div>
                                                <FormItem
                                                        :class="(getMedicalInsurances==='640000'||getMedicalInsurances===640000)? 'formItemStyle':'formItemStyleTwo'"
                                                        v-for="(item, index) in editFormListPharmacy.items"
                                                        v-if="item.status"
                                                        :key="index"
                                                        :label="'医保中心号' + item.index">
                                                    <Row>
                                                        <Col span="18">
                                                            <Input type="text" class="w260" :maxlength="8"
                                                                   @on-change="validateYbNo(item.value).then(res=> {}).catch(err=>{})"
                                                                   @on-blur="validateLength(item.value)" v-model="item.value"
                                                                   placeholder="请输入医保药店管理系统用户名前8位"></Input>
                                                        </Col>
                                                        <Col span="4" offset="2">
                                                            <Button type="error"
                                                                    v-if="(index === editFormListPharmacy.items.length-1)&&(index !==0)"
                                                                    @click="handleRemove(index)">删除
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </FormItem>
                                                <FormItem>
                                                    <Row>
                                                        <Col span="12">
                                                            <Button type="primary" class="w260" @click="handleAdd"
                                                                    icon="plus-round">新增医保中心号
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </FormItem>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormItem class='displayStyle' label="推荐人：">
                                                <Row>
                                                    <Col>
                                                        <Input placeholder="推荐人" class="w260" v-model="editFormListPharmacy.referee"></Input>
                                                    </Col>
                                                </Row>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Card>
                        <!-- 填写药店信息 E -->
                        <!-- 发票寄送人信息 S -->
                        <Card :dis-hover="true" :bordered="false" class="margin-top-10">
                            <Card :dis-hover="true" :padding="0" class="padding-bottom-15">
                                <p slot="title" style=" color: #333; font-size: 14px;">填写发票寄送人信息</p>
                                <Row class="margin-top-20">
                                    <Col>
                                        <FormItem class='displayStyle' label="票据寄送人职务：" prop="billPersonPost">
                                            <Input placeholder="票据寄送人职务" class="w260"
                                                   v-model="editFormListPharmacy.billPersonPost"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="票据寄送人邮箱：" prop="billPersonEmail">
                                            <Input placeholder="票据寄送人邮箱" class="w260"
                                                   v-model="editFormListPharmacy.billPersonEmail"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormItem class='displayStyle' label="票据寄送人传真：" prop="billPersonFax">
                                            <Input placeholder="票据寄送人传真" class="w260"
                                                   v-model="editFormListPharmacy.billPersonFax"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="票据寄送人邮编：" prop="billPersonZipcode">
                                            <Input placeholder="票据寄送人邮编" class="w260"
                                                   v-model="editFormListPharmacy.billPersonZipcode"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem label="票据寄送地址：" prop="billProviceCode">
                                            <Select style="width:150px" v-model="editFormListPharmacy.billProviceCode"
                                                    @on-change="getAdressInfoAll(editFormListPharmacy.billProviceCode, 'listCitiesTwo')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in listProvinceTwo" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:150px" v-show="listCitiesTwo.length > 0"
                                                    v-model="editFormListPharmacy.billCityCode"
                                                    @on-change="getAdressInfoAll(editFormListPharmacy.billCityCode, 'listDistrictsTwo')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in listCitiesTwo" :key="item.lcode" :value="item.lcode">
                                                    {{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:150px" v-show="listDistrictsTwo.length > 0"
                                                    v-model="editFormListPharmacy.billAreaCode">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in listDistrictsTwo" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="24">
                                        <FormItem label="票据寄送详细地址：" prop="billAddress">
                                            <Input v-model="editFormListPharmacy.billAddress" placeholder="票据寄送详细地址..."
                                                   class="w260"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                        <!-- 发票寄送人信息 E -->
                        <Row class="margin-top-10">
                            <Col span="24" class="saveBntStyle">
                                <Button type="primary" @click="goBack()">返回</Button>
                                <Button type="primary" @click="validatePassLsd('editFormListPharmacy')" :disabled="btnDisabled">保存并下一步</Button>
                            </Col>
                        </Row>
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
    import agreementsPingAn from '../components/agreementsPingAn'
    import shareholderInfo from './shareholderInfo'
    import Validates from '../../../libs/Validate'
    import axios from 'axios'
    export default {
        name: "limitApplyPharmacyLSD",
        components: {
            fileUploadCommon,
            agreements,
            agreementsPingAn,
            fileUploadApply,
            shareholderInfo
        },
        data () {
            return {
                showImg: false,
                leaseTimeShow: true, // 租赁到期日显示隐藏
                isApply: false,
                btnDisabled: false,
                modalLSD:false,
                TipsLSD:'',
                ruleValidateLegal: {
                    same: [
                        { required: true, message: '请填写实际控制人与法人为是否为同一人', trigger: 'blur' },
                    ]
                },
                editFormList: {
                    radio: '1'
                },
                buyCarTimeShow: false,
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
                    billPersonPost: '',
                    billPersonEmail: '',
                    billPersonFax: '',
                    billPersonZipcode: '',
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
                            name: '请填写医保近3个月回款金额',
                            trigger: 'blur',
                            validator: Validates.isNumberAll
                        }
                    ],
                    billProviceCode:[
                        { required: true, message: '请选择票据寄送地址', trigger: 'change' }
                    ],
                    billAddress:[
                        { required: true, message: '请填写票据寄送详细地址', trigger: 'blur' }
                    ],
                    billPersonPost: [ { required: true, message: '请填写票据寄送人职务', trigger: 'blur' }],
                    billPersonEmail: [
                        { required: true, message: '请填写票据寄送人邮箱', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
                    ],
                    billPersonFax: [
                        {
                            required: true,
                            message: '请填写票据寄送人传真',
                            trigger: 'blur'
                        }
                    ],
                    billPersonZipcode: [
                        { required: true, name: '票据寄送人邮编',validator: Validates.isPostcode, trigger: 'blur' }
                    ],
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
                        {
                            required: true,
                            trigger: 'blur' ,
                            validator: Validates.isPhone
                        },
                    ],
                    enterpriseCompanyTel: [
                        { required: true, name: '企业电话',validator: Validates.isEntIphone, trigger: 'blur' }
                    ],
                    enterpriseOfficeFax: [
                        { required: true, name: '企业传真',validator: Validates.isEntIphone, trigger: 'blur' }
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
                listDistrictsTwo: []
                // 企业认证 E
            }
        },
        computed: {
            getEntTypes () {
                return this.$store.getters.getEntType
            },
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
            },
            getLimitAppIds () { // 授信id
                return this.$store.getters.getLimitAppId
            },
            getMedicalInsurances () { // 流水贷基本信息所选择企业地址省的code
                return this.$store.getters.getMedicalInsurance
            },
            getEntTypeLsds () { // 流水贷基本信息所选择的类型
                return this.$store.getters.getEntTypeLsd
            },
            getClassifications () {
                return this.$store.getters.getClassification
            }
        },
        methods: {
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
                axios.all([that.getAdressInfoAll('', 'listProvinceTwo').then(res=>{}).catch(err=>{})])
                    .then(axios.spread(function (...args) {
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
            // 增加医保中心号
            handleAdd () {
                this.editFormListPharmacy.items.push({
                    value: '',
                    index: this.editFormListPharmacy.items.length + 1,
                    status: 1
                });
            },
            handleRemove (index) {
                this.editFormListPharmacy.items.splice(this.editFormListPharmacy.items.length - 1,1)
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
            // 是否显示车辆行驶证
            isChangeCar (val) {
                if (vm.getEntTypeLsds === '1') {
                    if (val === '0') {
                        vm.editFormListPharmacy.buyCarTime = '';// 车辆购买日期
                        vm.$store.commit('setIsCarShow', false);
                    } else {
                        vm.$store.commit('setIsCarShow', true);
                    }
                } else {
                    vm.$store.commit('setIsCarShow', false);
                    vm.editFormListPharmacy.buyCarTime = '';// 车辆购买日期
                }

            },
            isHouses (val) {
                if (vm.getEntTypeLsds === '1') {
                    if (val === '0') {
                        vm.$store.commit('setIsHouse', false);
                    } else {
                        vm.$store.commit('setIsHouse', true);
                    }
                } else {
                    vm.$store.commit('setIsHouse', false);
                }

            },
            isUseplaceIsSelf (val) {
                if (val === '0') {
                    vm.leasingContractShow = false;
                    vm.leaseTimeShow = true;
                } else {
                    vm.editFormListPharmacy.leaseTime = '';
                    vm.leasingContractShow= true;
                    vm.leaseTimeShow = false;
                }
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
             * 我的申请-企业授信申请-法人、实控人查询
            * */
            ApplyQuery () {
                vm.$https.get(`/api-webbff/v1/asset/queryDrugstoreInformationForLSD?limitAppId=${vm.getLimitAppIds}`)
                    .then(res => {
                        if (res.data.success === 1) {
                            let arr = ['', null, undefined, 'null'];
                            let ybCenterNoInfo = [640000, '640000'];
                            let isApply = ['0', '2', '4', 0, 2, 4]; // 0:待初审，2：待资方审核， 4：已生效 (注：后端给这三种状态不让申请)
                            let lsdGetInfo = res.data.data;
                            if (lsdGetInfo !== '0') {
                                // 第三步 填写药店信息
                                if (!arr.includes(lsdGetInfo.pharmacyCreateTime)) {
                                    vm.editFormListPharmacy.pharmacyCreateTime = lsdGetInfo.pharmacyCreateTime; // 药店成立日期
                                }
                                if (!arr.includes(lsdGetInfo.shopAre)) {
                                    vm.editFormListPharmacy.shopAre = lsdGetInfo.shopAre; // 门店面积
                                }
                                if (!arr.includes(lsdGetInfo.useplaceIsSelf)&&(lsdGetInfo.useplaceIsSelf !== '0')) { // 经营场所是否为购得
                                    vm.editFormListPharmacy.useplaceIsSelf = lsdGetInfo.useplaceIsSelf;
                                    vm.leaseTimeShow = false;
                                    vm.editFormListPharmacy.leaseTime = ''; // 租赁合同到期日
                                } else {
                                    vm.editFormListPharmacy.useplaceIsSelf = '0';
                                    vm.leaseTimeShow = true;
                                    vm.editFormListPharmacy.leaseTime = lsdGetInfo.contractEndDate; // 租赁合同到期日
                                }
                                if (!arr.includes(lsdGetInfo.yearReturnMoney)) { // 医保近3个月回款金额
                                    vm.editFormListPharmacy.yearReturnMoney = String(lsdGetInfo.yearReturnMoney);
                                } else {
                                    vm.editFormListPharmacy.yearReturnMoney = '';
                                }
                                if (!arr.includes(lsdGetInfo.legalHasHouse) && (lsdGetInfo.legalHasHouse !== '0')) { // 法人名下是否有房产
                                    vm.editFormListPharmacy.legalHasHouse = lsdGetInfo.legalHasHouse;
                                    vm.$store.commit('setIsHouse', true);
                                } else {
                                    vm.$store.commit('setIsHouse', false);
                                    vm.editFormListPharmacy.legalHasHouse = '0';
                                }
                                if (!arr.includes(lsdGetInfo.legalHasCar) && (lsdGetInfo.legalHasCar!== '0')) { // 法人名下是否有车辆
                                    vm.editFormListPharmacy.legalHasCar = lsdGetInfo.legalHasCar;
                                    vm.editFormListPharmacy.buyCarTime = lsdGetInfo.buyCarTime;// 车辆购买日期
                                    vm.$store.commit('setIsCarShow', true);
                                    vm.buyCarTimeShow = true;
                                } else {
                                    vm.editFormListPharmacy.legalHasCar = '0';
                                    vm.editFormListPharmacy.buyCarTime = '';// 车辆购买日期
                                    vm.$store.commit('setIsCarShow', false);
                                    vm.buyCarTimeShow = false;
                                }

                                if (!arr.includes(lsdGetInfo.billProviceCode)) {
                                    vm.editFormListPharmacy.billProviceCode = lsdGetInfo.billProviceCode; // 票据寄送地址
                                    vm.getAdressInfoAll(lsdGetInfo.billProviceCode, 'listCitiesTwo').then(res => {
                                        if (!arr.includes(lsdGetInfo.billCityCode)) {
                                            vm.editFormListPharmacy.billCityCode = lsdGetInfo.billCityCode; // 票据寄送地址所属市code
                                            vm.getAdressInfoAll(lsdGetInfo.billCityCode, 'listDistrictsTwo').then(res => {
                                                if (!arr.includes(lsdGetInfo.billAreaCode)) {
                                                    vm.editFormListPharmacy.billAreaCode = lsdGetInfo.billAreaCode; // 票据寄送地址所属区域code
                                                }
                                            })
                                        }
                                    })
                                }
                                if (!arr.includes(lsdGetInfo.billAddress)) {
                                    vm.editFormListPharmacy.billAddress = lsdGetInfo.billAddress; // 票据寄送详细地址
                                }
                                if (!arr.includes(lsdGetInfo.ybCenterNo) && ybCenterNoInfo.includes(vm.getMedicalInsurances)) {
                                    let ybCenterNoArr = lsdGetInfo.ybCenterNo.split(',')
                                    let ybCenterNoArrTwo = []
                                    ybCenterNoArr.forEach((item,index) => {
                                        ybCenterNoArrTwo.push({
                                            value: item,
                                            index: index + 1,
                                            status: 1
                                        })
                                    })
                                    vm.editFormListPharmacy.items = ybCenterNoArrTwo // 医保中心号
                                }
                                if (!arr.includes(lsdGetInfo.referee)) {
                                    vm.editFormListPharmacy.referee = lsdGetInfo.referee; // 推荐人
                                }
                                if (!arr.includes(lsdGetInfo.touchEmail)) {
                                    vm.editFormListPharmacy.billPersonEmail = lsdGetInfo.touchEmail;// 票据寄送人邮箱
                                }
                                if (!arr.includes(lsdGetInfo.touchFax)) {
                                    vm.editFormListPharmacy.billPersonFax = lsdGetInfo.touchFax; // 票据寄送人传真
                                }
                                if (!arr.includes(lsdGetInfo.touchJob)) {
                                    vm.editFormListPharmacy.billPersonPost = lsdGetInfo.touchJob; //  票据寄送人职务
                                }
                                if (!arr.includes(lsdGetInfo.touchZipCode)) {
                                    vm.editFormListPharmacy.billPersonZipcode = lsdGetInfo.touchZipCode // 票据寄送人邮编
                                }
                            }
                        }
                    })
                    .catch(err => {
                        vm.$message.error('获取流水贷申请信息失败！')
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
            validatePassLsd (name) {
                let arr = ['0','',null,'null',undefined];
                if (vm.leaseTimeShow && arr.includes(vm.editFormListPharmacy.leaseTime)) {
                    vm.$message.error('请填租赁合同到期日')
                    return
                }
                if (vm.buyCarTimeShow && vm.editFormListPharmacy.buyCarTime === '') {
                    vm.$message.error('车辆购买日期')
                    return
                }

                if (vm.listDistrictsTwo.length > 0) {
                    if (arr.includes(vm.editFormListPharmacy.billAreaCode)) {
                      vm.$message.error("请填写完整票据寄送地址");
                      return;
                    }
                }
                if (arr.includes(vm.editFormListPharmacy.billProviceCode) || arr.includes(vm.editFormListPharmacy.billCityCode)) {
                    vm.$message.error("请填写完整票据寄送地址");
                    return;
                }

                vm.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$nextTick(() => {
                            let ybCenterNo = [640000, '640000'];
                            let medicalArr = [];
                            let medicalArrString = [];
                            if (ybCenterNo.includes(vm.getMedicalInsurances)) {
                                medicalArr = vm.editFormListPharmacy.items.filter(item => {
                                    if (item.value !== '' && item.status !== 0) {
                                        return item.value
                                    }
                                });
                                medicalArrString = medicalArr.map(item => item.value);
                                if (medicalArrString.length === 0) {
                                    vm.$message.error('请填写医保中心号')
                                    return
                                } else {
                                    let isNextNum = medicalArrString.findIndex((item, index, arr) => {
                                        return (item.length < 8 || !isFinite(item))
                                    });
                                    if (isNextNum === -1) {
                                        vm.submitLsdApply(medicalArrString);
                                    } else {
                                        vm.$message.error('医保中心号需为8位数字');
                                    }
                                }

                            } else {
                                vm.submitLsdApply([]);
                            }
                        })
                    } else {
                        vm.btnDisabled = false;
                        vm.$message.error('药店信息/发票寄送人信息有误，请核对后再提交');
                    }
                });

            },
            /**
             * 流水贷 —— 授信请求
             *
             * */
            submitLsdApply (medicalArrString) {
                let zeroArr = [0, '0'];
                let ybCenterNo = [640000, '640000'];
                let _params = {
                    limitAppId: vm.getLimitAppIds,
                    pharmacyCreateTime: vm.editFormListPharmacy.pharmacyCreateTime, // 药店成立日期
                    shopAre: vm.editFormListPharmacy.shopAre, // 门店面积
                    useplaceIsSelf: vm.editFormListPharmacy.useplaceIsSelf, // 经营场所是否为购得
                    yearReturnMoney: vm.editFormListPharmacy.yearReturnMoney, // 医保近3个月回款金额
                    legalHasHouse: vm.editFormListPharmacy.legalHasHouse, // 法人名下是否有房产
                    contractEndDate: vm.editFormListPharmacy.leaseTime, // 租赁合同到期日
                    legalHasCar: vm.editFormListPharmacy.legalHasCar, // 法人名下是否有车
                    buyCarTime: vm.editFormListPharmacy.legalHasCar ==='0'? '' : vm.editFormListPharmacy.buyCarTime, // 车辆购买日期
                    billProviceCode: zeroArr.includes(vm.editFormListPharmacy.billProviceCode)? '':vm.editFormListPharmacy.billProviceCode, // 票据寄送地址省
                    billCityCode: zeroArr.includes(vm.editFormListPharmacy.billCityCode)? '':vm.editFormListPharmacy.billCityCode,
                    billAreaCode: zeroArr.includes(vm.editFormListPharmacy.billAreaCode)? '':vm.editFormListPharmacy.billAreaCode,
                    billAddress: vm.editFormListPharmacy.billAddress,
                    ybCenterNo: ybCenterNo.includes(vm.getMedicalInsurances)?medicalArrString.join(',') : '', // 医保中心号
                    referee: vm.editFormListPharmacy.referee, // 推荐人
                    touchEmail: vm.editFormListPharmacy.billPersonEmail, // 票据寄送人邮箱
                    touchFax: vm.editFormListPharmacy.billPersonFax, // 票据寄送人传真
                    touchJob: vm.editFormListPharmacy.billPersonPost, //  票据寄送人职务
                    touchZipCode: vm.editFormListPharmacy.billPersonZipcode, // 票据寄送人邮编
                };
                vm.btnDisabled = true;
                vm.$https.post('/api-webbff/v1/asset/creditApplyDrugstoreInformationTOForLSD' , _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            vm.$Message.success(res.data.data);
                            vm.btnDisabled = false;
                            if ((vm.getEntTypeLsds === '1' && vm.getClassifications === 3)||(vm.getEntTypeLsds==='2')) {
                              vm.$emit('setSteps', 4, '流水贷/股东信息');
                            } else {
                              vm.$emit('setSteps', 5, '流水贷/材料上传');
                            }
                        } else {
                            vm.btnDisabled = false;
                        }
                    }).catch(e => {
                    vm.btnDisabled = false;
                    vm.$Message.error('申请失败！');
                });
            },
            /**
             * 返回
             * */
            goBack () {
                vm.$emit('setSteps', 2, '流水贷/法人-实际控制人信息');
            },
            // 获取城市信息

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
            'editFormListPharmacy.billProviceCode': {
                handler (newVal,oldVal) { // 票据 省
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListPharmacy.billCityCode = '0';
                            self.editFormListPharmacy.billAreaCode = '0';
                            self.listCitiesTwo = [];
                            self.listDistrictsTwo = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListPharmacy.billCityCode = '0';
                            self.editFormListPharmacy.billAreaCode = '0';
                            self.listDistrictsTwo = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListPharmacy.billCityCode': {
                handler (newVal,oldVal) { // 票据 市
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListPharmacy.billAreaCode = '0';
                            self.listDistrictsTwo = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListPharmacy.billAreaCode = '0';
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
                }
                span:last-child {
                    color: #0099DD;
                    margin-left: 15px;
                    cursor: pointer;
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
    /*.modalImgShow {*/
    /*}*/
</style>



// WEBPACK FOOTER //
// src/views/user/limitApply/limitApplyPharmacyLSD.vue