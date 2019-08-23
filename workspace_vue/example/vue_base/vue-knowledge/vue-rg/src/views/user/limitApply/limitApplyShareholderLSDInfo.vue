<template>
    <div class="min-height-100 limitApply titlePadding" ref="limitApplyLSD">
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
        <Row   :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <div>
                    <div style="padding: 0 15px;">
                        <!-- 填写股东信息 S -->
                        <shareholder-info
                                :creditApplyIds="creditApplyId"
                                :disableApplyBtn="false">
                        </shareholder-info>
                        <!-- 填写股东信息 E -->
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
    import shareholderInfo from './shareholderInfoShow'
    export default {
        name: "limitApplyShareholderLSD",
        components: {
            fileUploadCommon,
            agreements,
            agreementsPingAn,
            fileUploadApply,
            shareholderInfo
        },
        data () {
            return {
                creditApplyId: '',
                showImg: false,
                leaseTimeShow: true, // 租赁到期日显示隐藏
                isApply: false,
                btnDisabled: false,
                modalLSD:false,
                TipsLSD:''
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
                if (val === '0') {
                    vm.editFormListPharmacy.buyCarTime = '';// 车辆购买日期
                } else {
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
                vm.$emit('setSteps', 5, '流水贷/材料上传');
            },
            /**
             * 返回
             * */
            goBack () {
                vm.$emit('setSteps', 3, '流水贷/药店信息');
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
            this.creditApplyId = this.getLimitAppIds
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
// src/views/user/limitApply/limitApplyShareholderLSDInfo.vue