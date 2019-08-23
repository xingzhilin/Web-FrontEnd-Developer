<template>
    <div>
        <Modal v-model="addQuotaModal" :title="moduleTitile" width="1200" :closable="false" :mask-closable="false" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidateAdd" :label-width="240">
                <Row>
                    <Col span="24">
                        <FormItem class='displayStyle inputWidth' label="股东类型：" prop="shareholderType">
                            <Select v-model="formValidate.shareholderType" placeholder="股东类型">
                                <Option value="1">法人</Option>
                                <Option value="2">自然人</Option>
                            </Select>
                        </FormItem>
                        <FormItem class='displayStyle inputWidth'  label="股东名称：" prop="shareholderName">
                            <Input v-model="formValidate.shareholderName" :disabled="formValidate.isHaveSubShareholders === '1'" placeholder="股东名称"></Input>
                            <div style="width: 530px;color: red;" v-if="addOrEdit === 2">注：如需修改股东名称，请先删除其股东的股东信息</div>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="formValidate.shareholderType !== '1'? false : true">
                    <Col span="24">
                        <FormItem label="统一社会信用代码：" class='displayStyle inputWidth' prop="creditCode">
                            <Input v-model="formValidate.creditCode" :maxlength="18" placeholder="统一社会信用代码"></Input>
                        </FormItem>
                        <FormItem label="股东的法人代表姓名：" class='displayStyle inputWidth' prop="shareholderLegalPersonName">
                            <Input v-model="formValidate.shareholderLegalPersonName"  placeholder="股东的法人代表姓名"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24" v-if="formValidate.shareholderType !== '1'? true : false">
                        <FormItem class='displayStyle inputWidth' label="股东身份证号：" prop="shareholderIdCardNo">
                            <Input v-model="formValidate.shareholderIdCardNo" :maxlength="18" placeholder="股东身份证号"></Input>
                        </FormItem>
                        <FormItem class='displayStyle inputWidth' label="占股比例%：" prop="shareholdingPer">
                            <Input v-model="formValidate.shareholdingPer"  placeholder="占股比例%"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <FormItem v-if="formValidate.shareholderType !== '1'? false : true" class='displayStyle inputWidth' label="股东的法人代表身份证号：" prop="shareholderLegalPersonNo">
                            <Input v-model="formValidate.shareholderLegalPersonNo" :maxlength="18"  placeholder="股东的法人代表身份证号"></Input>
                        </FormItem>
                        <FormItem v-if="formValidate.shareholderType !== '1'? false : true" class='displayStyle inputWidth' label="占股比例%：" prop="shareholdingPer">
                            <Input v-model="formValidate.shareholdingPer"  placeholder="占股比例%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem class='displayStyle inputWidth' :label="formValidate.shareholderType !== '1'? '股东手机':'股东的法人代表手机'" prop="shareholderTelephone">
                            <Input :maxlength="11" v-model="formValidate.shareholderTelephone" :placeholder="formValidate.shareholderType !== '1'? '股东手机':'股东的法人代表手机'"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="股东联系地址:"  prop="shareholdingProvinceCode">
                            <Select style="width:14%" v-model="formValidate.shareholdingProvinceCode"
                                    @on-change="getAdressInfoAll(formValidate.shareholdingProvinceCode, 'shareholdinglistCities')">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in shareholdinglistProvince" :key="item.lcode" :value="item.lcode">
                                    {{item.lname}}
                                </Option>
                            </Select>

                            <Select style="width:14%"
                                    v-model="formValidate.shareholdingCityCode"
                                    v-show="shareholdinglistCities.length > 0"
                                    @on-change="getAdressInfoAll(formValidate.shareholdingCityCode, 'shareholdinglistDistricts')">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in shareholdinglistCities" :key="item.lcode" :value="item.lcode">
                                    {{item.lname}}
                                </Option>
                            </Select>
                            <Select
                                    style="width:15%"
                                    v-show="shareholdinglistDistricts.length > 0"
                                    v-model="formValidate.shareholdingAreaCode">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in shareholdinglistDistricts" :key="item.lcode" :value="item.lcode">
                                    {{item.lname}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="股东详细联系地址：" class='displayStyle inputWidth' prop="shareholdingAddress">
                            <Input placeholder="股东详细联系地址" class="w260" v-model="formValidate.shareholdingAddress"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem class='displayStyle inputWidth'  :label="formValidate.shareholderType !== '1'? '股东紧急联系人：':'股东的法人紧急联系人：'" prop="urgencyContact">
                            <Input  :placeholder="formValidate.shareholderType !== '1'? '股东紧急联系人':'股东的法人紧急联系人'" v-model="formValidate.urgencyContact"></Input>
                        </FormItem>
                        <FormItem class='displayStyle inputWidth'  :label="formValidate.shareholderType !== '1'? '紧急联系人与股东关系：':'紧急联系人与股东的法人关系:'" prop="relationShip">
                            <Input  placeholder="紧急联系人与股东关系" v-model="formValidate.relationShip"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem  :label="formValidate.shareholderType !== '1'? '紧急联系人手机：':'股东的法人紧急联系人手机：'" class='displayStyle inputWidth' prop="urgencyTelephone">
                            <Input :maxlength="11" :placeholder="formValidate.shareholderType !== '1'? '紧急联系人手机':'股东的法人紧急联系人手机'"  v-model="formValidate.urgencyTelephone"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem :label="formValidate.shareholderType !== '1'? '紧急联系人地址：': '股东的法人紧急联系人地址：'" prop="urgencyProvinceCode">
                            <Select style="width:14%" v-model="formValidate.urgencyProvinceCode"  @on-change="getAdressInfoAll(formValidate.urgencyProvinceCode, 'urgencylistCities')">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in urgencylistProvince" :key="item.lcode"  :value="item.lcode">{{item.lname}}</Option>
                            </Select>

                            <Select style="width:14%" v-show="urgencylistCities.length > 0"  v-model="formValidate.urgencyCityCode" @on-change="getAdressInfoAll(formValidate.urgencyCityCode, 'urgencylistDistricts')">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in urgencylistCities" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                            </Select>
                            <Select style="width:15%" v-show="urgencylistDistricts.length > 0"  v-model="formValidate.urgencyAreaCode">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in urgencylistDistricts" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem  :label="formValidate.shareholderType !== '1'? '紧急联系人详细地址：': '股东的法人紧急联系人详细地址：'" class='displayStyle inputWidth' prop="dPosition">
                            <Input  :placeholder="formValidate.shareholderType !== '1'? '紧急联系人详细地址': '股东的法人紧急联系人详细地址'" v-model="formValidate.urgencyAddress"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="((getEntTypeLsds === '1' && getClassifications === 3)||(getEntTypeLsds==='2'))&&formValidate.shareholderType === '2'">
                    <Col>
                        <p class="shareolderhint">提示：允许上传大小10M 允许上传PNG、JPG、PDF 格式文件</p>
                    </Col>
                    <Col span="12">
                        <FormItem label="股东身份证正面照：" prop="leasingContractUrl" class="top-border setAll">
                            <file-upload-apply
                                    ref="upload1"
                                    refUpload="upload1"
                                    action="/api-webbff/v1/asset/uploadAll"
                                    :filelists="shareholderFrontIDCardImg"
                                    :isMultiUpload="false"
                                    :is-text="1">
                            </file-upload-apply>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="股东身份证反面照：" prop="leasingContractUrl" class="top-border setAll">
                            <file-upload-apply
                                    ref="upload2"
                                    refUpload="upload2"
                                    action="/api-webbff/v1/asset/uploadAll"
                                    :filelists="shareholderBackIDCardImg"
                                    :isMultiUpload="false"
                                    :is-text="1">
                            </file-upload-apply>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="((getEntTypeLsds === '1' && getClassifications === 3)||(getEntTypeLsds==='2'))&&formValidate.shareholderType === '1'">
                    <Col>
                        <p class="shareolderhint">提示：允许上传大小10M 允许上传PNG、JPG、PDF 格式文件</p>
                    </Col>
                    <Col span="24">
                        <FormItem label="股东公司章程(可传多张)：" prop="leasingContractUrl" class="top-border setAll">
                            <file-upload-apply
                                    ref="upload3"
                                    refUpload="upload3"
                                    action="/api-webbff/v1/asset/uploadAll"
                                    :filelists="entRulesImg"
                                    :isMultiUpload="true"
                                    :is-text="1">
                            </file-upload-apply>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="营业执照：" prop="leasingContractUrl" class="top-border setAll">
                            <file-upload-apply
                                    ref="upload4"
                                    refUpload="upload4"
                                    action="/api-webbff/v1/asset/uploadAll"
                                    :filelists="businessLicenseImg"
                                    :isMultiUpload="false"
                                    :is-text="1">
                            </file-upload-apply>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" class="footerBtn">
                <Button type="primary"  @click="addQuotaModalCancel">取消</Button>
                <Button type="primary"  @click="saveOrEditShareholder('formValidate')" :disabled="btnDisabled">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import fileUploadApply from '../components/fileUploadApply'
    import Validates from '../../../libs/Validate';
    export default {
        name: "shareholderOneLevel",
        props: {
            paramsRowShareholderOne: {
                type: Object
            },
            addOrEdit: {
                type: Number
            }
        },
        components: {
            fileUploadApply
        },
        data () {
            return{
                addQuotaModal: false,
                btnDisabled: false,
                moduleTitile: '添加',
                shareholderFrontIDCardImg: '',
                shareholderBackIDCardImg: '',
                entRulesImg: '',
                businessLicenseImg: '',
                formValidate: {
                    shareholderLevel: 1,
                    enterpriseCreditApplyId: '',
                    shareholderType: '2', // 股东类型(1:法人,2: 自然人)
                    shareholderName: '', // 股东名称
                    shareholderIdCardNo: '', //  股东证件号
                    shareholderId: '', // 股东记录id
                    shareholdingPer: '', // 占股比例% 0
                    shareholderLegalPersonNo: '', // 股东的法人代表身份证号
                    shareholderTelephone: '', // 股东手机号(联系方式)
                    shareholdingProvinceCode: 0, // 股东所属省code
                    shareholdingCityCode: 0, // 股东所属市code
                    shareholdingAreaCode: 0, //  股东所属区域code
                    shareholdingAddress: '', // 股东详细联系地址
                    urgencyContact: '', // 紧急联系人
                    relationShip: '', // 紧急联系人关系
                    urgencyTelephone: '', // 紧急联系人手机
                    urgencyAddress: '', // 紧急联系人地址
                    urgencyProvinceCode: 0,
                    urgencyCityCode: 0,
                    urgencyAreaCode: 0,
                    shareholderLegalPersonName: '',
                    creditCode: '',
                    isHaveSubShareholders: '0'
                },
                shareholdinglistProvince: [],
                shareholdinglistCities: [],
                shareholdinglistDistricts: [],
                urgencylistProvince: [],
                urgencylistCities: [],
                urgencylistDistricts: [],
                citys: false,
                districtsAll: false,
                ruleValidateAdd: {
                    shareholderType: [
                        {required: true, message: '请填写股东类型', trigger: 'blur'}
                    ],
                    shareholderName: [
                        {required: true, message: '请填写股东名称', trigger: 'blur'}
                    ],
                    shareholderLegalPersonName: [
                        {required: true, message: '请填写股东的法人代表姓名', trigger: 'blur'}
                    ],
                    shareholderIdCardNo: [
                        {
                            required: true,
                            name: '股东身份证号',
                            validator: Validates.idCardPass,
                            trigger: 'blur'
                        }
                    ],
                    shareholdingPer: [
                        {
                            required: true,
                            name: '请填写占股比例',
                            validator: Validates.isNumberShareholdingPer,
                            trigger: 'blur'
                        }
                    ],
                    shareholderLegalPersonNo: [
                        {
                            required: true,
                            name: '请填写股东的法人代表身份证号',
                            validator: Validates.idCardPass,
                            trigger: 'blur'
                        }
                    ],
                    shareholderTelephone: [
                        {
                            required: true,
                            name: '股东手机',
                            validator: Validates.isPhone,
                            trigger: 'change'
                        }
                    ],
                    shareholdingProvinceCode: [
                        {required: true, message: '请填写股东联系地址', trigger: 'blur'}
                    ],
                    shareholdingAddress: [
                        {required: true, message: '请填写详细联系地址', trigger: 'blur'}
                    ],
                    creditCode: [
                        {
                            required: true,
                            name: '统一社会信用代码',
                            validator: Validates.isNumLength,
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed: {
            getClassifications () {
                return this.$store.getters.getClassification
            },
            getEntTypeLsds () { // 流水贷基本信息所选择的类型
                return this.$store.getters.getEntTypeLsd
            }
        },
        methods: {
            addQuotaModalCancel () {
                this.$emit('paramsRowShareholderOneInit')
                this.addQuotaModal = false;
            },
            /**
             * 流水贷 增加、修改股东信息
             * @params:
             *  id: {type: String, explain: 授信记录id}
             *  rank: {type: Number, explain: 股东级别}
             * */
            saveOrEditShareholder (name) {
                let arr = ['0',0,'',null,'null',undefined]
                let that = this;
                let isCardImg = arr.includes(that.$refs.upload1.newListqny.length) || arr.includes(that.$refs.upload2.newListqny.length);
                let isCardImgTwo = arr.includes(that.$refs.upload3.newListqny.length) || arr.includes(that.$refs.upload4.newListqny.length);
                let isEntTypeInfo = ((that.getEntTypeLsds === '1' && that.getClassifications === 3)||(that.getEntTypeLsds==='2')) && that.formValidate.shareholderType === '2';
                let isEntTypeInfoTwo = ((that.getEntTypeLsds === '1' && that.getClassifications === 3)||(that.getEntTypeLsds==='2')) && that.formValidate.shareholderType === '1';
                if (isCardImg && isEntTypeInfo) {
                    that.$message.error('请填上传完整股东身份证图片')
                    return
                }
                if (isCardImgTwo && isEntTypeInfoTwo) {
                    that.$message.error('请填上传完整股东(公司章程/营业执照)图片')
                    return
                }
                if (that.shareholdinglistDistricts.length > 0) {
                    if (arr.includes(that.formValidate.shareholdingAreaCode)) {
                        that.$message.error('请填写完整股东所属地址')
                        return
                    }
                }
                if (arr.includes(that.formValidate.shareholdingProvinceCode)||arr.includes(that.formValidate.shareholdingCityCode)) {
                    that.$message.error('请填写完整股东所属地址')
                    return
                }
                if (that.urgencylistDistricts.length > 0) {
                    if (arr.includes(that.formValidate.urgencyAreaCode)) {
                        that.$message.error('请填写完整 紧急联系人地址/股东的法人紧急联系人地址')
                        return
                    }
                }
                if (that.urgencylistCities.length > 0) {
                    if (arr.includes(that.formValidate.urgencyCityCode)) {
                        that.$message.error('请填写完整 紧急联系人地址/股东的法人紧急联系人地址')
                        return
                    }
                }
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        let zeroArr = [0, '0'];
                        this.btnDisabled = true;
                        this.$https.post('/api-webbff/v1/asset/saveOrEditEnterpriseShareholder', {
                            limitAppId: that.formValidate.enterpriseCreditApplyId, // 授信表id
                            shareholderType: that.formValidate.shareholderType, // 股东类型(1:法人,2: 自然人)
                            shareholderName: that.formValidate.shareholderName, // 股东名称
                            shareholderId: that.formValidate.shareholderId,
                            shareholderIdCardNo: that.formValidate.shareholderType ==='2'? that.formValidate.shareholderIdCardNo:that.formValidate.creditCode, //  股东证件号
                            shareholdingPer: that.formValidate.shareholdingPer, // 占股比例%
                            shareholderLegalPersonNo: that.formValidate.shareholderLegalPersonNo,
                            shareholderTelephone: that.formValidate.shareholderTelephone, // 股东手机号(联系方式)
                            shareholdingProvinceCode: zeroArr.includes(that.formValidate.shareholdingProvinceCode)? '':that.formValidate.shareholdingProvinceCode, // 股东所属省code
                            shareholdingCityCode: zeroArr.includes(that.formValidate.shareholdingCityCode)? '':that.formValidate.shareholdingCityCode, // 股东所属市code
                            shareholdingAreaCode: zeroArr.includes(that.formValidate.shareholdingAreaCode)? '':that.formValidate.shareholdingAreaCode, //  股东所属区域code
                            shareholdingAddress: that.formValidate.shareholdingAddress, // 股东详细联系地址
                            urgencyContact: that.formValidate.urgencyContact, // 紧急联系人
                            relationShip: that.formValidate.relationShip, // 紧急联系人关系
                            urgencyTelephone: that.formValidate.urgencyTelephone, // 紧急联系人手机
                            urgencyAddress: that.formValidate.urgencyAddress, // 紧急联系人地址
                            shareholderLevel: that.formValidate.shareholderLevel, // 股东级别关系
                            urgencyProvinceCode: zeroArr.includes(that.formValidate.urgencyProvinceCode)? '':that.formValidate.urgencyProvinceCode,
                            urgencyCityCode: zeroArr.includes(that.formValidate.urgencyCityCode)? '':that.formValidate.urgencyCityCode,
                            urgencyAreaCode: zeroArr.includes(that.formValidate.urgencyAreaCode)? '':that.formValidate.urgencyAreaCode,
                            shareholderLegalPersonName: that.formValidate.shareholderLegalPersonName,
                            shareholderBackIDCard: (((that.getEntTypeLsds === '1' && that.getClassifications === 3)||(that.getEntTypeLsds==='2'))&&that.formValidate.shareholderType === '2')? that.$refs.upload1.newListqny.join(',') : '',
                            shareholderFrontIDCard: (((that.getEntTypeLsds === '1' && that.getClassifications === 3)||(that.getEntTypeLsds==='2'))&&that.formValidate.shareholderType === '2')? that.$refs.upload2.newListqny.join(',') : '',
                            companySystemUrl: (((that.getEntTypeLsds === '1' && that.getClassifications === 3)||(that.getEntTypeLsds==='2')) && that.formValidate.shareholderType === '1')? that.$refs.upload3.newListqny.join(',') : '',
                            licenseUrl: (((that.getEntTypeLsds === '1' && that.getClassifications === 3)||(that.getEntTypeLsds==='2')) && that.formValidate.shareholderType === '1')? that.$refs.upload4.newListqny.join(',') : ''
                        })
                            .then(res => {
                                if (res.data.success === 1) {
                                    that.addQuotaModalCancel()
                                    that.$message.success('添加/修改股东信息成功')
                                } else {
                                    that.$message.error('添加/修改股东信息失败')
                                }
                                that.btnDisabled = false;
                            })
                            .catch(err => {
                                that.$message.error('添加/修改股东信息失败');
                                that.btnDisabled = false;
                            })
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
             * 编辑和添加时初始化信息
             * */
            initData () {
                let self = this;
                let editInfo = this.paramsRowShareholderOne
                let arr = ['', null, undefined, 'null']
                this.$nextTick(()=> {
                    if (self.addOrEdit === 1) { // 1：添加
                        self.moduleTitile = '新增股东';
                        self.formValidate.enterpriseCreditApplyId = editInfo.enterpriseCreditApplyId;
                        self.formValidate.shareholderLevel = 1;
                        self.formValidate.shareholderName ='';// 股东名称
                        self.formValidate.shareholderIdCardNo =''; //  股东证件号
                        self.formValidate.shareholdingPer = ''; // 占股比例% 0
                        self.formValidate.shareholderTelephone =  ''; // 股东手机号(联系方式)
                        self.formValidate.shareholdingAddress =  ''; // 股东详细联系地址
                        self.formValidate.urgencyContact =  ''; // 紧急联系人
                        self.formValidate.relationShip =  ''; // 紧急联系人关系
                        self.formValidate.urgencyTelephone = ''; // 紧急联系人手机
                        self.formValidate.urgencyAddress =  ''; // 紧急联系人地址
                        self.formValidate.shareholderLegalPersonName =  '';
                        self.formValidate.creditCode =  '';
                        self.formValidate.shareholderId = '';
                        self.$refs['formValidate'].resetFields();
                        self.formValidate.shareholdingProvinceCode =  '0'; // 股东所属省code
                        self.formValidate.shareholdingCityCode =  '0'; // 股东所属市code
                        self.formValidate.shareholdingAreaCode =  '0'; //  股东所属区域code
                        self.formValidate.urgencyProvinceCode =  '0';
                        self.formValidate.urgencyCityCode =  '0';
                        self.formValidate.urgencyAreaCode =  '0';
                    }
                    if(self.addOrEdit === 2){ // 2：编辑
                        self.moduleTitile = '修改股东';
                        self.formValidate.shareholderType = String(editInfo.shareholderType)
                        if (editInfo.shareholderType === 1) {
                            self.formValidate.creditCode = editInfo.shareholderIdCardNo
                            self.formValidate.shareholderLegalPersonNo = editInfo.shareholderLegalPersonNo
                        } else {
                            self.formValidate.creditCode = ''
                            self.formValidate.shareholderLegalPersonNo = ''
                        }
                        if (editInfo.shareholderType === 2) {
                            self.formValidate.shareholderIdCardNo = editInfo.shareholderIdCardNo
                        } else {
                            self.formValidate.shareholderIdCardNo = ''
                        }
                        self.formValidate.enterpriseCreditApplyId = editInfo.enterpriseCreditApplyId;
                        self.formValidate.shareholderId = editInfo.shareholderId;
                        self.formValidate.shareholderLevel = editInfo.shareholderLevel;
                        self.formValidate.shareholderName = editInfo.shareholderName
                        self.formValidate.shareholdingPer = editInfo.shareholdingPer
                        self.formValidate.shareholderTelephone = editInfo.shareholderTelephone
                        self.formValidate.isHaveSubShareholders = editInfo.isHaveSubShareholders
                        if (!arr.includes(editInfo.shareholdingProvinceCode)) {
                            self.formValidate.shareholdingProvinceCode = editInfo.shareholdingProvinceCode // 企业所在位置省编码
                            self.getAdressInfoAll(editInfo.shareholdingProvinceCode, 'shareholdinglistCities').then(res => {
                                if (!arr.includes(editInfo.shareholdingCityCode)) {
                                    self.formValidate.shareholdingCityCode = editInfo.shareholdingCityCode // 企业地址市
                                    self.getAdressInfoAll(editInfo.shareholdingCityCode, 'shareholdinglistDistricts').then(res => {
                                        if (!arr.includes(editInfo.shareholdingAreaCode)) {
                                            self.formValidate.shareholdingAreaCode = editInfo.shareholdingAreaCode // 企业地址区
                                        }
                                    }).catch(err => {})
                                }
                            }).catch(err => {})
                        }
                        self.formValidate.shareholdingAddress = editInfo.shareholdingAddress
                        self.formValidate.urgencyContact = editInfo.urgencyContact
                        self.formValidate.relationShip = editInfo.relationShip
                        self.formValidate.urgencyTelephone = editInfo.urgencyTelephone
                        self.formValidate.urgencyAddress = editInfo.urgencyAddress
                        if (!arr.includes(editInfo.urgencyProvinceCode)) {
                            self.formValidate.urgencyProvinceCode = editInfo.urgencyProvinceCode // 企业所在位置省编码
                            self.getAdressInfoAll(editInfo.urgencyProvinceCode, 'urgencylistCities').then(res => {
                                if (!arr.includes(editInfo.urgencyCityCode)) {
                                    self.formValidate.urgencyCityCode = editInfo.urgencyCityCode // 企业地址市
                                    self.getAdressInfoAll(editInfo.urgencyCityCode, 'urgencylistDistricts').then(res => {
                                        if (!arr.includes(editInfo.urgencyAreaCode)) {
                                            self.formValidate.urgencyAreaCode = editInfo.urgencyAreaCode // 企业地址区
                                        }
                                    }).catch(err => {})
                                }
                            }).catch(err => {})
                        }
                        self.formValidate.shareholderLegalPersonName = editInfo.shareholderLegalPersonName;
                        self.shareholderFrontIDCardImg = editInfo.shareholderFrontIDCard;
                        self.shareholderBackIDCardImg = editInfo.shareholderBackIDCard;
                        self.entRulesImg = editInfo.companySystemUrl;
                        self.businessLicenseImg = editInfo.licenseUrl;
                    }
                })

            }
        },
        created () {
        },
        mounted () {
            this.getAdressInfoAll('', 'shareholdinglistProvince').then(res => {}).catch(err => {});
            this.getAdressInfoAll('', 'urgencylistProvince').then(res => {}).catch(err => {});
        },
        watch: {
            paramsRowShareholderOne (newVal) {
                this.initData()
            },
            'formValidate.shareholdingProvinceCode': {
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.formValidate.shareholdingAreaCode = '0';
                            self.formValidate.shareholdingCityCode = '0';
                            self.shareholdinglistCities = [];
                            self.shareholdinglistDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.formValidate.shareholdingAreaCode = '0';
                            self.formValidate.shareholdingCityCode = '0';
                            self.shareholdinglistDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'formValidate.shareholdingCityCode': {
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.formValidate.shareholdingAreaCode = '0';
                            self.shareholdinglistDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.formValidate.shareholdingAreaCode = '0';
                        })
                    }
                },
                deep: true
            },
            'formValidate.urgencyProvinceCode': {
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.formValidate.urgencyAreaCode = '0';
                            self.formValidate.urgencyCityCode = '0';
                            self.urgencylistCities = [];
                            self.urgencylistDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.formValidate.urgencyAreaCode = '0';
                            self.formValidate.urgencyCityCode = '0';
                            self.urgencylistDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'formValidate.urgencyCityCode': {
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.formValidate.urgencyAreaCode = '0';
                            self.urgencylistDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.formValidate.urgencyAreaCode = '0';
                        })
                    }
                },
                deep: true
            }
        }

    }
</script>

<style lang="less" scoped>
    .displayStyle {
        display: inline-block;
    }
    .inputWidth{
        width: 470px;
    }
    .shareolderhint {
        text-align: right;
        color: red;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .protocolText{
        overflow: auto;
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
    .Agreement {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        .ivu-form-item-content {
            margin-left: 0!important;
        }
        .ivu-form-item-error-tip {
            width: 100%;
        }
        span {
            color: #0854CE;
            cursor: pointer;
        }
    }
    .footerBtn {
        text-align: center;
        button {
            width: 150px;
            height: 40px;
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/user/components/shareholderOneLevel.vue