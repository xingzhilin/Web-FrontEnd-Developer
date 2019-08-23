<template>
    <div class="min-height-100 limitApply titlePadding margin-bottom-30" ref="limitApplyLSD">
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
        <agreements ref="agreementIsShow">
        </agreements>
        <agreements-ping-an
                @agreementInfo="agreementInfo"
                ref="agreementInfos"
                :entName="getEnterpriseNames"
        >
        </agreements-ping-an>
        <Row   :gutter="10" type="flex" class="m">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <div>
                    <!-- 填写药店信息 S -->
                    <div style="padding: 0 15px">
                        <Form ref="editFormListAdd" :label-width="200">
                            <!-- 第五步 图片上传 S -->
                            <dl class="apply-detail  applyUImg mt10 setAlls">
                                <dt><span class="ml10">上传企业资质材料</span> <span class="fr">提示：允许上传大小10M,允许上传PNG、JPG、PDF 格式文件</span></dt>
                                <dd style="padding-top: 20px">
                                    <Row>
                                        <Col span="12">
                                            <FormItem label="法人身份证正面：" style="border-top:0;">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload1"
                                                        refUpload="upload1"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="legalFrontIDCardImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="法人身份证反面：" style="border-top:0;">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload2"
                                                        refUpload="upload2"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="legalBackIDCardImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="12">
                                            <FormItem label="实际控制人身份证正面：" style="border-top:0;">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload3"
                                                        refUpload="upload3"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="actualFrontIDCardImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="实际控制人身份证反面：" style="border-top:0;">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload4"
                                                        refUpload="upload4"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="actualBackIDCardImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="12">
                                            <FormItem label="GSP证书：">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload5"
                                                        refUpload="upload5"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="gspPicUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="药品经营许可证：">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload6"
                                                        refUpload="upload6"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="tradingLicensePicUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="12">
                                            <FormItem label="企业营业执照：" v-show="(getEntTypeLsds === '1' && getClassifications === 3)||(getEntTypeLsds==='2')" style="border-top:0;">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload7"
                                                        refUpload="upload7"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="businessLicensePicUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="开户许可证："style="border-top:0;">
                                                <file-upload-apply
                                                        :isMultiUpload="false"
                                                        ref="upload18"
                                                        refUpload="upload18"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="openAccountBookUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="车辆行驶证：" prop="drivingUrl"v-show="getIsCarShows">
                                                <file-upload-apply
                                                        ref="upload8"
                                                        refUpload="upload8"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="drivingUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="法人房产证：" prop="houseUrl" v-show="getEntTypeLsds !== '2' && getIsHouses">
                                                <file-upload-apply
                                                        ref="upload9"
                                                        refUpload="upload9"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="houseUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="经营场所房产证/租赁合同：" prop="leasingContractUrl">
                                                <file-upload-apply
                                                        ref="upload10"
                                                        refUpload="upload10"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="leasingContractUrlImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="实际控制人房产证/车辆���驶证/财产证明(三选一):" prop="houseDrivingPropertyUrl">
                                                <file-upload-apply
                                                        ref="upload11"
                                                        refUpload="upload11"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="houseDrivingPropertyUrlImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="一般纳税人资格批准说明：" prop="leasingContractUrl">
                                                <file-upload-apply
                                                        ref="upload12"
                                                        refUpload="upload12"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="generalTaxpayersImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="专用开票信息证明：" prop="leasingContractUrl">
                                                <file-upload-apply
                                                        ref="upload13"
                                                        refUpload="upload13"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="specialUseInvoiceInfoImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="开票说明：" prop="leasingContractUrl">
                                                <file-upload-apply
                                                        ref="upload14"
                                                        refUpload="upload14"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="invoiceInfoImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="税务登记证：" prop="leasingContractUrl">
                                                <file-upload-apply
                                                        ref="upload15"
                                                        refUpload="upload15"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="taxCertificateImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="公司章程：" v-show="getCompanySysteShows||(getEntTypeLsds === '1' && getClassifications === 3)"
                                                      prop="companySystemUrl">
                                                <file-upload-apply
                                                        :isMultiUpload="true"
                                                        ref="upload16"
                                                        refUpload="upload16"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="companySystemUrlImg"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="24">
                                            <FormItem label="总部办公场所房产证/租赁合同：" v-show="getEntTypeLsds === '2'"
                                                      prop="generalLeasingContractUrl">
                                                <file-upload-apply
                                                        ref="upload17"
                                                        refUpload="upload17"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="generalLeasingContractUrlImg"
                                                        :isMultiUpload="true"
                                                        :is-text="2">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </dd>
                            </dl>
                            <!-- 第五步 图片上传 E -->
                        </Form>
                    </div>
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
        name: "limitApplyImgLSD",
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
                btnDisabled: false,
                disableApplyBtn: true,
                leasingContractUrlImg: '',
                generalLeasingContractUrlImg: '',
                houseDrivingPropertyUrlImg: '',
                modalLSD:false,
                TipsLSD:'',
                houseUrlImg: '',
                drivingUrlImg: '',
                businessLicensePicUrlImg:'',
                openAccountBookUrlImg: '',
                legalFrontIDCardImg: '',
                legalBackIDCardImg: '',
                actualBackIDCardImg: '',
                actualFrontIDCardImg: '',
                gspPicUrlImg: '',
                taxCertificateImg: '',
                invoiceInfoImg: '',
                specialUseInvoiceInfoImg: '',
                generalTaxpayersImg: '',
                tradingLicensePicUrlImg: '',
                companySystemUrlImg:'',
                agreements: false,
                enterpriseType: false,
                leasingContractShow: false,
                isHouse: false,
                companySysteShow: false,
                isCarShow: false,
                buyCarTimeShow: false,
                editFormList: {

                }
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
            },
            getCompanySysteShows () {
                return this.$store.getters.getCompanySysteShow
            },
            getIsHouses () {
                return this.$store.getters.getIsHouse
            },
            getIsCarShows () {
                return this.$store.getters.getIsCarShow
            },
            getEnterpriseNames () {
                return this.$store.getters.getEnterpriseName
            }
        },
        methods: {
            // 是否同意平安协议
            agreementInfo (val) {
                if (val === 0) {
                    this.agreements = false;
                } else {
                    this.agreements = true;
                }
            },
            // 展示隐藏图片
            imgHidden () {
                this.showImg = true;
            },
            // 关闭图片展示model
            showImgCancel () {
                this.showImg = false;
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
             * 我的申请-企业授信申请-法人、实控人查询
            * */
            ApplyQuery () {
                vm.$https.get(`/api-webbff/v1/asset/queryQualificationMaterialsForLSD?limitAppId=${vm.getLimitAppIds}`)
                    .then(res => {
                        if (res.data.success === 1) {
                            let arr = ['', null, undefined, 'null'];
                            let lsdGetInfo = res.data.data;
                            if (lsdGetInfo !== '0') {
                                vm.legalFrontIDCardImg = lsdGetInfo.legalPersonFrontIDCardUrl; // 法人身份证正面
                                vm.legalBackIDCardImg = lsdGetInfo.legalPersonBackIDCardUrl; // 法人身份证反面
                                vm.actualFrontIDCardImg = lsdGetInfo.actualControllerFrontIDCardUrl; // 实际控制人身份证正面
                                vm.actualBackIDCardImg = lsdGetInfo.actualControllerBackIDCardUrl; // 实际控制人身份证反面
                                vm.gspPicUrlImg = lsdGetInfo.gspPicUrl; // GSP证书Url
                                vm.tradingLicensePicUrlImg = lsdGetInfo.licensePicUrl; // 药品经营许可证url
                                vm.businessLicensePicUrlImg = lsdGetInfo.socialUnifiedCreditPicUrl; // 营业执照
                                if (arr.includes(lsdGetInfo.drivingUrl)) { // 车辆行驶证
                                    vm.drivingUrlImg = '';
                                } else {
                                    vm.drivingUrlImg = lsdGetInfo.drivingUrl;
                                }
                                if (arr.includes(lsdGetInfo.houseUrl)) { // 法人房产证
                                    vm.houseUrlImg = '';
                                } else {
                                    vm.houseUrlImg = lsdGetInfo.houseUrl;
                                }
                                vm.leasingContractUrlImg = lsdGetInfo.leasingContractUrl; // 经营场所购买/租赁合同
                                vm.houseDrivingPropertyUrlImg = lsdGetInfo.actualControllerHouseOrCarOrPropertyCertificateUrl; // 实际控制人房产证/车辆行驶证/财产证明（三选一）
                                vm.generalTaxpayersImg = lsdGetInfo.taxStatementUrl; // 一般纳税人资格批准说明
                                vm.specialUseInvoiceInfoImg = lsdGetInfo.specialInvoiceInformationCertificationUrl; // 专用开票信息证明
                                vm.invoiceInfoImg = lsdGetInfo.certificateOfInvoiceUrl; // 开票说明
                                vm.taxCertificateImg = lsdGetInfo.taxRegistrationCertificateUrl; // 税务登记证
                                vm.openAccountBookUrlImg = lsdGetInfo.openAccountBookUrl;// 客户许可证
                                if (vm.getCompanySysteShows || (vm.getEntTypeLsds === '1' && vm.getClassifications === 3)) {
                                    vm.companySystemUrlImg = lsdGetInfo.companySystemUrl; // 公司章程
                                } else {
                                    vm.companySystemUrlImg = '';
                                }
                                if (vm.getEntTypeLsds == '2') {
                                    vm.generalLeasingContractUrlImg = lsdGetInfo.headquartersOfficeSpaceUrlOrLeasingContractUrl; // 总部办公场所房产证/租赁合同
                                } else {
                                    vm.generalLeasingContractUrlImg = '';
                                }
                            }
                        }
                    })
                    .catch(err => {
                        vm.$message.error('获取流水贷申请信息失败！')
                    })
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
             * 图片验证
             * */
            validateImgLsd ()  {
                return new Promise((resolve, reject) => {
                    if (vm.$refs.upload1.newListqny.length === 0) {
                        vm.$message.error('请上传法人身份证正面图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload2.newListqny.length === 0) {
                        vm.$message.error('请上传法人身份证反面图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload3.newListqny.length === 0) {
                        vm.$message.error('请上传实际控制人身份证正面图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload4.newListqny.length === 0) {
                        vm.$message.error('请上传实际控制人身份证反面图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload18.newListqny.length === 0) {
                        vm.$message.error('请上传开户许可证图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload5.newListqny.length === 0) {
                        vm.$message.error('请上传GSP证书图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload6.newListqny.length === 0) {
                        vm.$message.error('请上传药品经营许可证图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload7.newListqny.length === 0) {
                        vm.$message.error('请上传企业营业执照图片')
                        reject()
                        return
                    }
                    if (vm.getIsCarShows && (vm.$refs.upload8.newListqny.length === 0)) {
                        vm.$message.error('请上车辆行驶证图片')
                        reject()
                        return
                    }
                    if (vm.getEntTypeLsds !== '2' && vm.getIsHouses && (vm.$refs.upload9.newListqny.length === 0)) {
                        vm.$message.error('请上房产证图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload10.newListqny.length === 0) {
                        vm.$message.error('请上传经营场所购买/租赁合同图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload11.newListqny.length === 0) {
                        vm.$message.error('请上传实际控制人房产证/车辆行驶证/财产证明（三选一）图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload12.newListqny.length === 0) {
                        vm.$message.error('请上传一般纳税人资格批准说明图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload13.newListqny.length === 0) {
                        vm.$message.error('请上传专用开票信息证明图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload14.newListqny.length === 0) {
                        vm.$message.error('请上传开票说明图片')
                        reject()
                        return
                    }
                    if (vm.$refs.upload15.newListqny.length === 0) {
                        vm.$message.error('请上传税务登记证图片')
                        reject()
                        return
                    }
                    if ((vm.getCompanySysteShows || (vm.getEntTypeLsds === '1' && vm.getClassifications === 3)) && (vm.$refs.upload16.newListqny.length === 0)) {
                        vm.$message.error('请上传公司章程图片')
                        reject()
                        return
                    }
                    if ((vm.getEntTypeLsds === '2') && (vm.$refs.upload17.newListqny.length === 0)) {
                        vm.$message.error('请上传总部办公场所房产证/租赁合同图片')
                        reject()
                        return
                    }
                    if (!vm.agreements) {
                        vm.$message.error('请阅读并同意 《药金融信息服务平台服务协议》《商家授权协议》《医保数据查询授权书》')
                        reject()
                        return
                    }
                    resolve()
                })
            },
            /**
             * 流水贷表单验证方法
             * */
            validatePassLsd () {
                vm.validateImgLsd().then(res => {
                    vm.submitLsdApply()
                }).catch(err =>{})
            },
            /**
             * 流水贷 —— 授信请求
             *
             * */
            submitLsdApply () {
                let _params = {
                    limitAppId: vm.getLimitAppIds,
                    legalPersonFrontIDCardUrl: vm.$refs.upload1.newListqny.join(','), // 法人身份证正面
                    legalPersonBackIDCardUrl: vm.$refs.upload2.newListqny.join(','), // 法人身份证反面
                    actualControllerFrontIDCardUrl: vm.$refs.upload3.newListqny.join(','), // 实际控制人身份证正面
                    actualControllerBackIDCardUrl: vm.$refs.upload4.newListqny.join(','), // 实际控制人身份证反面
                    gspPicUrl: vm.$refs.upload5.newListqny.join(','), // GSP证书Url
                    gspPicUrlRgt: vm.$refs.upload5.newListRgt.join(','), // GSP证书Url-融贯通
                    licensePicUrl: vm.$refs.upload6.newListqny.join(','), //  药品经营许可证url
                    licensePicUrlRgt: vm.$refs.upload6.newListRgt.join(','), //  药品经营许可证url-融贯通
                    socialUnifiedCreditPicUrl: vm.$refs.upload7.newListqny.join(','), // 营业执照
                    socialUnifiedCreditPicUrlRgt: vm.$refs.upload7.newListRgt.join(','), // 营业执照-融贯通
                    drivingUrl: vm.$refs.upload8.newListqny.join(','), // 车辆行驶证
                    houseUrl:vm.$refs.upload9.newListqny.join(','), // 房产证
                    leasingContractUrl: vm.$refs.upload10.newListqny.join(','), // 经营场所购买/租赁合同
                    actualControllerHouseOrCarOrPropertyCertificateUrl: vm.$refs.upload11.newListqny.join(','), // 实际控制人房产证/车辆行驶证/财产证明（三选一）
                    taxStatementUrl: vm.$refs.upload12.newListqny.join(','), // 一般纳税人资格批准说明
                    specialInvoiceInformationCertificationUrl: vm.$refs.upload13.newListqny.join(','), // 专用开票信息证明
                    certificateOfInvoiceUrl: vm.$refs.upload14.newListqny.join(','), // 开票说明
                    taxRegistrationCertificateUrl: vm.$refs.upload15.newListqny.join(','), // 税务登记证
                    companySystemUrl: vm.$refs.upload16.newListqny.join(','), // 公司章程
                    headquartersOfficeSpaceUrlOrLeasingContractUrl: vm.$refs.upload17.newListqny.join(','), // 总部办公场所房产证/租赁合同
                    openAccountBookUrl: vm.$refs.upload18.newListqny.join(',') // 客户许可证
                };
                vm.btnDisabled = true;
                vm.$https.post('/api-webbff/v1/asset/creditApplyQualificationMaterialsTOForLSD' , _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            vm.$Message.success(res.data.data);
                            vm.btnDisabled = false;
                            vm.$router.push({path: '/user/'});
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
                this.$router.push({path: '/user/limitApplyShareholderLSD'});
            },
            // ----  企业认证 E  ----
        },
        created () {
            vm = this;
        },
        /*------------   企业认证 E  --------------*/
        mounted () {
            this.ApplyQuery();
        },
        /*------------   企业认证 S  --------------*/
        updated () {
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
                    width: 120px;
                    height: 120px;
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
                width: 120px; height: 120px; background: #f2f2f2;
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
// src/views/user/limitApply/limitApplyImgLSDInfo.vue