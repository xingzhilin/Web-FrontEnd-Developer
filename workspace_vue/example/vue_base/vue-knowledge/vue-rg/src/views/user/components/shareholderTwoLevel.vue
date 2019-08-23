<template>
    <div>
        <Modal v-model="addQuotaModal" :title="formValidate.shareholderModuleTitle" width="1000" :closable="false" :mask-closable="false" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidateAdd" :label-width="220">
                <Row>
                    <Col span="24">
                        <FormItem class='displayStyle inputWidth'  label="股东名称：" prop="shareholderPname">
                            {{formValidate.shareholderPname}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem class='displayStyle inputWidth' label="股东的股东类型：" prop="shareholderType">
                            <Select v-model="formValidate.shareholderType" placeholder="股东的股东类型">
                                <Option value="1">法人</Option>
                                <Option value="2">自然人</Option>
                            </Select>
                        </FormItem>
                        <FormItem class='displayStyle inputWidth'  label="股东的股东名称：" prop="shareholderName">
                            <Input v-model="formValidate.shareholderName" placeholder="股东的股东名称"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="formValidate.shareholderType === '1'">
                    <Col span="24">
                        <FormItem label="统一社会信用代码：" class='displayStyle inputWidth' prop="creditCode">
                            <Input v-model="formValidate.creditCode" :maxlength="18" placeholder="统一社会信用代码"></Input>
                        </FormItem>
                        <FormItem v-if="(getEntTypeLsds === '1' && getClassifications === 3)||(getEntTypeLsds === '2')" label="股东的的股东法人代表姓名：" class='displayStyle inputWidth' prop="shareholderLegalPersonName">
                            <Input v-model="formValidate.shareholderLegalPersonName" placeholder="股东的的股���法人代表姓名"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24" v-if="formValidate.shareholderType === '2'">
                        <FormItem class='displayStyle inputWidth' label="股东的股东身份证号：" prop="shareholderIdCardNo">
                            <Input v-model="formValidate.shareholderIdCardNo" :maxlength="18" placeholder="股东的股东身份证号"></Input>
                        </FormItem>
                        <FormItem class='displayStyle inputWidth' label="占股比例%：" prop="shareholdingPer">
                            <Input v-model="formValidate.shareholdingPer" placeholder="占股比例"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <FormItem v-if="(((formValidate.shareholderType === '1')&&(getEntTypeLsds === '1' && getClassifications === 3)))||((formValidate.shareholderType === '1')&&(getEntTypeLsds === '2'))" label="股东的的股东法人代表身份证号：" class='setAll displayStyle inputWidth' prop="legalRepresentativeNo">
                            <Input v-model="formValidate.legalRepresentativeNo" :maxlength="18" placeholder="股东的的股东法人代表身份证号"></Input>
                        </FormItem>
                        <FormItem v-if="formValidate.shareholderType === '1'" label="占股比例%：" class='displayStyle inputWidth' prop="shareholdingPer">
                            <Input v-model="formValidate.shareholdingPer" placeholder="占股比例"></Input>
                        </FormItem>
                        <FormItem class='displayStyle inputWidth' :label="formValidate.shareholderType !== '1'?'股东的股东手机：' : '股东的股东法人代表手机'" prop="shareholderTelephone">
                            <Input :maxlength="11" v-model="formValidate.shareholderTelephone" placeholder="股东的股东手机"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="addQuotaModalCancel">取消</Button>
                <Button type="primary"  @click="saveOrEditShareholder('formValidate')" :disabled="btnDisabled">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Validates from '../../../libs/Validate';
    export default {
        name: "shareholderTwoLevel",
        props: {
            paramsRowShareholderTwo: {
                type: Object
            },
            addOrEditTwo: {
                type: Number
            }
        },
        data () {
            return{
                addQuotaModal: false,
                btnDisabled: false,
                formValidate: {
                    enterpriseCreditApplyId: '',
                    shareholderId: '',
                    shareholderPid: '',
                    shareholderLevel: 2,
                    shareholderType: '1',
                    shareholderName: '',
                    shareholderPname: '',
                    shareholderModuleTitle: '添加股东的股东',
                    creditCode: '',
                    shareholderLegalPersonName: '',
                    shareholderIdCardNo: '',
                    shareholdingPer: '',
                    shareholderTelephone: '',
                    legalRepresentativeNo: ''
                },
                listProvince: [],
                listCities: [],
                listDistricts: [],
                citys: false,
                districtsAll: false,
                ruleValidateAdd: {
                    shareholderName: [
                        {required: true, message: '请填写企业名称', trigger: 'blur'}
                    ],
                    shareholderType: [
                        {required: true, message: '请填写股东的股东类型', trigger: 'blur'}
                    ],
                    creditCode: [
                        {
                            required: true,
                            name: '统一社会信用代码',
                            trigger: 'blur',
                            validator: Validates.isNumLength
                        }
                    ],
                    shareholderLegalPersonName: [
                        {required: true, message: '请填写股东的的股东法人代表姓名', trigger: 'blur'}
                    ],
                    shareholderIdCardNo: [
                        {   required: true,
                            name: '请填写股东的股东身份证号',
                            validator: Validates.idCardPass,
                            trigger: 'blur'
                        }
                    ],
                    shareholdingPer: [
                        {
                            required: true,
                            name: '请填写占股比例',
                            validator: Validates.isNumberShareholdingPer,
                            trigger: 'blur'}
                    ],
                    shareholderTelephone: [
                        {
                            required: true,
                            name: '股东的股东手机',
                            validator: Validates.isPhone,
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
                this.$emit('paramsRowShareholderTwoInit')
                this.addQuotaModal = false;
            },
            /**
             * 流水贷 增加、修改股东信息
             * @params:
             *  id: {type: String, explain: 授信记录id}
             *  rank: {type: Number, explain: 股东级别}
             * */
            saveOrEditShareholder (name) {
                let that = this;
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        let isShareLegalOne = (that.formValidate.shareholderType === '1') && (that.getEntTypeLsds === '1' && that.getClassifications === 3) && that.formValidate.legalRepresentativeNo === '';
                        let isShareLegalTwo = (that.formValidate.shareholderType === '1')&&(that.getEntTypeLsds === '2') && that.formValidate.legalRepresentativeNo === '';
                        if (isShareLegalOne || isShareLegalTwo) {
                            this.$Message.error('请填写股东的的股东法人代表身份证号');
                            return
                        }
                        this.btnDisabled = true;
                        this.$https.post('/api-webbff/v1/asset/saveOrEditEnterpriseShareholder', {
                            limitAppId: that.formValidate.enterpriseCreditApplyId, // 授信表id
                            shareholderId: that.formValidate.shareholderId,
                            shareholderLevel: that.formValidate.shareholderLevel,
                            shareholderPid: that.formValidate.shareholderPid,
                            shareholderType: that.formValidate.shareholderType, // 股东类型(1:法人,2: 自然人)
                            shareholderName: that.formValidate.shareholderName, // 股东名称
                            shareholderIdCardNo: that.formValidate.shareholderType === '2'? that.formValidate.shareholderIdCardNo : that.formValidate.creditCode, //  股东证件号 (身份证/统一社会信用代码)
                            shareholdingPer: that.formValidate.shareholdingPer, // 占股比例% 0
                            shareholderTelephone: that.formValidate.shareholderTelephone, // 股东手机号(联系方式)
                            shareholderLegalPersonName: that.formValidate.shareholderLegalPersonName,
                            legalRepresentativeNo: that.formValidate.legalRepresentativeNo
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
             * 编辑和添加时初始化信息
             * */
            initData () {
                this.$nextTick(() => {
                    if (this.addOrEditTwo === 1) { // 1：添加
                        this.formValidate.shareholderModuleTitle = '添加股东的股东'
                        this.formValidate.shareholderPname = this.paramsRowShareholderTwo.shareholderName
                        this.formValidate.enterpriseCreditApplyId = this.paramsRowShareholderTwo.enterpriseCreditApplyId
                        this.formValidate.shareholderPid = this.paramsRowShareholderTwo.shareholderId
                        this.formValidate.shareholderId = '';
                        this.formValidate.shareholderType =  '1';
                        this.formValidate.shareholderName =  '';
                        this.formValidate.creditCode =  '';
                        this.formValidate.legalRepresentativeNo = '';
                            this.formValidate.shareholderLegalPersonName = '';
                        this.formValidate.shareholderIdCardNo = '';
                        this.formValidate.shareholdingPer =  '';
                        this.formValidate.shareholderTelephone = '';
                        this.formValidate.shareholderLevel = '2';
                    }
                    if(this.addOrEditTwo === 2){ // 2：编辑
                        this.formValidate.shareholderModuleTitle = '修改股东的股东'
                        this.formValidate.enterpriseCreditApplyId = this.paramsRowShareholderTwo.enterpriseCreditApplyId
                        this.formValidate.shareholderId = this.paramsRowShareholderTwo.shareholderId
                        this.formValidate.shareholderPid = this.paramsRowShareholderTwo.shareholderPid
                        this.formValidate.shareholderLevel = this.paramsRowShareholderTwo.shareholderLevel
                        this.formValidate.shareholderType = String(this.paramsRowShareholderTwo.shareholderType)
                        this.formValidate.shareholderName = this.paramsRowShareholderTwo.shareholderName
                        this.formValidate.shareholderPname = this.paramsRowShareholderTwo.shareholderPname
                        this.formValidate.legalRepresentativeNo = this.paramsRowShareholderTwo.legalRepresentativeNo
                        if (this.paramsRowShareholderTwo.shareholderType === 1) {
                            this.formValidate.creditCode = this.paramsRowShareholderTwo.shareholderIdCardNo
                        } else {
                            this.formValidate.creditCode = ''
                        }
                        if (this.paramsRowShareholderTwo.shareholderType === 2) {
                            this.formValidate.shareholderIdCardNo = this.paramsRowShareholderTwo.shareholderIdCardNo
                        } else {
                            this.formValidate.shareholderIdCardNo = ''
                        }
                        this.formValidate.shareholderLegalPersonName = this.paramsRowShareholderTwo.shareholderLegalPersonName
                        this.formValidate.shareholdingPer = this.paramsRowShareholderTwo.shareholdingPer
                        this.formValidate.shareholderTelephone = this.paramsRowShareholderTwo.shareholderTelephone
                    }
                })
            }
        },
        created () {
        },
        mounted () {
        },
        watch: {
            paramsRowShareholderTwo (newVal) {
                this.initData()
            }
        }

    }
</script>

<style lang="less" scoped>
    .displayStyle {
        display: inline-block;
    }
    .inputWidth{
        width: 460px;
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
</style>



// WEBPACK FOOTER //
// src/views/user/components/shareholderTwoLevel.vue