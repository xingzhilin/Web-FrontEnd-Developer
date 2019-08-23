<template>
    <div class="min-height-100 limitApply titlePaddingOther" ref="limitApplyLSD">
        <Row   :gutter="10" type="flex">
            <Col span="24">
            <Card :dis-hover="true" :bordered="false">
                <div>
                    <Form ref="editFormListLegal" :model="editFormListLegal" :label-width="220"
                          :rules="ruleValidateLegal">
                        <!-- 填写企业法人信息 S -->
                        <Card :dis-hover="true" :bordered="false" class="margin-top-10">
                            <Card :dis-hover="true" :padding="0" class="padding-bottom-15">
                                <p slot="title" style=" color: #333; font-size: 14px;">填写企业法人信息</p>
                                <Row style="padding-top: 25px;">
                                    <Col span="24">
                                        <FormItem class='displayStyle' label="企业法人：" prop="legalName">
                                            <Input placeholder="企业法人" class="w260"
                                                   v-model="editFormListLegal.legalName"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="法人身份证：" prop="legalNo">
                                            <Input placeholder="法人身份证" class="w260" :maxlength="18"
                                                   v-model="editFormListLegal.legalNo"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem class='displayStyle' label="法人手机：" prop="legalIphone">
                                            <Input placeholder="法人手机" :maxlength="11" class="w260"
                                                   v-model="editFormListLegal.legalIphone"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="法人邮箱：" prop="legalEmail">
                                            <Input placeholder="法人邮箱" class="w260"
                                                   v-model="editFormListLegal.legalEmail"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span="24">
                                        <FormItem label="法人联系地址：" prop="legalProvinceCode">
                                            <Select style="width:14%" v-model="editFormListLegal.legalProvinceCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.legalProvinceCode, 'legalListCities')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in legalListProvince" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:14%" v-show="legalListCities.length > 0"
                                                    v-model="editFormListLegal.legalCityCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.legalCityCode, 'legalListDistricts')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in legalListCities" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:15%" v-show="legalListDistricts.length > 0"
                                                    v-model="editFormListLegal.legalAreaCode">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in legalListDistricts" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem label="法人详细地址：" prop="legalAddress">
                                            <Input placeholder="法人详细地址" class="w260"
                                                   v-model="editFormListLegal.legalAddress"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem class='displayStyle' label="法人紧急联系人姓名：" prop="enContacts">
                                            <Input placeholder="法人紧急联系人姓名" class="w260"
                                                   v-model="editFormListLegal.urgencyName"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="紧急联系人与法人关系：" prop="enContacts">
                                            <Input placeholder="紧急联系人与法人关系" class="w260"
                                                   v-model="editFormListLegal.relationShip"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem label="法人紧急联系人电话：" prop="mobile">
                                            <Input placeholder="法人紧急联系人电话" class="w260"
                                                   v-model="editFormListLegal.urgencyPhoneNo"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem label="法人紧急联系人地址：">
                                            <Select style="width:14%" v-model="editFormListLegal.urgencyProvinceCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.urgencyProvinceCode, 'urgencyListCities')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in urgencyListProvince" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:14%" v-show="urgencyListCities.length > 0"
                                                    v-model="editFormListLegal.urgencyCityCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.urgencyCityCode, 'urgencyListDistricts')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in urgencyListCities" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:15%" v-show="urgencyListDistricts.length > 0"
                                                    v-model="editFormListLegal.urgencyAreaCode">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in urgencyListDistricts" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="法人紧急联系人详细地址：">
                                            <Input placeholder="法人紧急联系人详细地址" class="w260"
                                                   v-model="editFormListLegal.urgencyAddress"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                        <!-- 填写法人信息 E -->
                        <!-- 实际控制人 S -->
                        <Card :dis-hover="true" :bordered="false" class="margin-top-10">
                            <Card :dis-hover="true" :padding="0" class="padding-bottom-15">
                                <p slot="title" style=" color: #333; font-size: 14px;">填写企业实际控制人信息</p>
                                <Row style="padding-top: 25px;">
                                    <Col span="24">
                                        <FormItem  label="实际控制人与法人是否为同一人："  prop="same">
                                            <RadioGroup v-model="editFormListLegal.same" @on-change="isSamePerson">
                                                <Radio label="0">否</Radio>
                                                <Radio label="1">是</Radio>
                                            </RadioGroup>
                                        </FormItem>
                                    </Col>
                                    <Col span="24">
                                        <FormItem class='displayStyle' label="实际控制人姓名：" prop="actualControllerName">
                                            <Input placeholder="实际控制人姓名" class="w260"
                                                   v-model="editFormListLegal.actualControllerName"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="实际控制人身份证号：" prop="actualIdCardNo">
                                            <Input placeholder="实际控制人身份证号" class="w260" :maxlength="18"
                                                   v-model="editFormListLegal.actualIdCardNo"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem class='displayStyle' label="实际控制人手机：" prop="actualPhoneNo">
                                            <Input placeholder="实际控制人手机" :maxlength="11" class="w260"
                                                   v-model="editFormListLegal.actualPhoneNo"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span="24">
                                        <FormItem label="实际控制人联系地址：" prop="actualAddress">
                                            <Select style="width:14%" v-model="editFormListLegal.actualProvinceCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.actualProvinceCode, 'actualListCities')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in actualListProvince" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:14%" v-show="actualListCities.length > 0"
                                                    v-model="editFormListLegal.actualCityCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.actualCityCode, 'actualListDistricts')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in actualListCities" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:15%" v-show="actualListDistricts.length > 0"
                                                    v-model="editFormListLegal.actualAreaCode">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in actualListDistricts" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem label="实际控制人详细地址：" prop="actualAddress">
                                            <Input placeholder="实际控制人详细地址" class="w260"
                                                   v-model="editFormListLegal.actualAddress"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem class='displayStyle' label="实际控制人紧急联系人姓名：" prop="actualUrgencyName">
                                            <Input placeholder="实际控制人紧急联系人姓名" class="w260"
                                                   v-model="editFormListLegal.actualUrgencyName"></Input>
                                        </FormItem>
                                        <FormItem class='displayStyle' label="实际控制人与紧急联系人关系：" prop="actualRelationShip">
                                            <Input placeholder="紧急联系人与实际控制人关系" class="w260"
                                                   v-model="editFormListLegal.actualRelationShip"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <FormItem label="实际控制人紧急联系人电话：" prop="actualUrgencyPhoneNo">
                                            <Input placeholder="实际控制人紧急联系人电话" class="w260"
                                                   v-model="editFormListLegal.actualUrgencyPhoneNo"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span="24">
                                        <FormItem label="实际控制人紧急联系人地址：" prop="actualUrgencyProvinceCode">
                                            <Select style="width:14%" v-model="editFormListLegal.actualUrgencyProvinceCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.actualUrgencyProvinceCode, 'actualUrgencyListCities')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in actualUrgencyListProvince" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>

                                            <Select style="width:14%" v-show="actualUrgencyListCities.length > 0"
                                                    v-model="editFormListLegal.actualUrgencyCityCode"
                                                    @on-change="getAdressInfoAll(editFormListLegal.actualUrgencyCityCode, 'actualUrgencyListDistricts')">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in actualUrgencyListCities" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                            <Select style="width:15%" v-show="actualUrgencyListDistricts.length > 0"
                                                    v-model="editFormListLegal.actualUrgencyAreaCode">
                                                <Option value="0">请选择</Option>
                                                <Option v-for="item in actualUrgencyListDistricts" :key="item.lcode"
                                                        :value="item.lcode">{{item.lname}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="实际控制人紧急联系人详细地址：" prop="actualUrgencyAddress">
                                            <Input placeholder="实际控制人紧急联系人详细地址" class="w260"
                                                   v-model="editFormListLegal.actualUrgencyAddress"></Input>
                                        </FormItem>

                                        <FormItem  label="婚姻状态：" prop="marriageState">
                                            <Select style="width: 120px;" v-model="editFormListLegal.marriageState">
                                                <Option v-for="item in marriageStateList" :key="item.state"
                                                        :value="item.state">{{item.lable}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <!--  已婚 S  -->
                                <div v-show="editFormListLegal.marriageState === '1'">
                                    <Row>
                                        <Col span="24">
                                            <FormItem class='displayStyle setAll' label="配偶姓名：" prop="actualMateName">
                                                <Input placeholder="配偶姓名" class="w260"
                                                       v-model="editFormListLegal.actualMateName"></Input>
                                            </FormItem>
                                            <FormItem class='displayStyle setAll' label="配偶身份证号：" prop="actualMateCardNo">
                                                <Input placeholder="配偶身份证号" class="w260" :maxlength="18"
                                                       v-model="editFormListLegal.actualMateCardNo"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem class='displayStyle setAll' label="配偶手机：" prop="actualMatePhoneNo">
                                                <Input placeholder="配偶手机" :maxlength="11" class="w260"
                                                       v-model="editFormListLegal.actualMatePhoneNo"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="配偶联系地址：" class="setAll">
                                                <Select style="width:14%" v-model="editFormListLegal.actualMateProvinceCode"
                                                        @on-change="getAdressInfoAll(editFormListLegal.actualMateProvinceCode, 'actualMateListCities')">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in actualMateListProvince" :key="item.lcode"
                                                            :value="item.lcode">{{item.lname}}
                                                    </Option>
                                                </Select>
                                                <Select style="width:14%" v-show="actualMateListCities.length > 0"
                                                        v-model="editFormListLegal.actualMateCityCode"
                                                        @on-change="getAdressInfoAll(editFormListLegal.actualMateCityCode, 'actualMateListDistricts')">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in actualMateListCities" :key="item.lcode"
                                                            :value="item.lcode">{{item.lname}}
                                                    </Option>
                                                </Select>
                                                <Select style="width:15%" v-show="actualMateListDistricts.length > 0"
                                                        v-model="editFormListLegal.actualMateAreaCode">
                                                    <Option value="0">请选择</Option>
                                                    <Option v-for="item in actualMateListDistricts" :key="item.lcode"
                                                            :value="item.lcode">{{item.lname}}
                                                    </Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="配偶联系详细地址：" class="setAll">
                                                <Input placeholder="配偶联系详细地址" class="w260"
                                                       v-model="editFormListLegal.actualMateAddress"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <FormItem label="结婚证：" prop="marriageCertificateImg" class="top-border setAll">
                                            <file-upload-apply
                                                    ref="upload1"
                                                    refUpload="upload1"
                                                    action="/api-webbff/v1/asset/uploadAll"
                                                    :filelists="marriageCertificateImg"
                                                    :isMultiUpload="false"
                                                    :is-text="1">
                                            </file-upload-apply>
                                        </FormItem>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem label="配偶身份证正面照：" prop="leasingContractUrl" class="top-border setAll">
                                                <file-upload-apply
                                                        ref="upload2"
                                                        refUpload="upload2"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="spouseFrontIDCardImg"
                                                        :isMultiUpload="false"
                                                        :is-text="1">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem label="配偶身份证反面照：" prop="leasingContractUrl" class="top-border setAll">
                                                <file-upload-apply
                                                        ref="upload3"
                                                        refUpload="upload3"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="spouseBackIDCardImg"
                                                        :isMultiUpload="false"
                                                        :is-text="1">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                                <!--  已婚 E  -->
                                <!--  离异 S  -->
                                <div v-show="editFormListLegal.marriageState === '2'">
                                    <Row>
                                        <Col span="12">
                                            <FormItem label="离婚证：" prop="leasingContractUrl" class="top-border setAll">
                                                <file-upload-apply
                                                        ref="upload4"
                                                        refUpload="upload4"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="divorceCertificateImg"
                                                        :isMultiUpload="true"
                                                        :is-text="1">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                                <!--  离异 E  -->
                                <!--  未婚 S  -->
                                <div v-show="editFormListLegal.marriageState === '0'">
                                    <Row>
                                        <Col span="12">
                                            <FormItem label="户口本（证明未婚状态）：" prop="leasingContractUrl" class="top-border setAll">
                                                <file-upload-apply
                                                        ref="upload5"
                                                        refUpload="upload5"
                                                        action="/api-webbff/v1/asset/uploadAll"
                                                        :filelists="hukouBookImg"
                                                        :isMultiUpload="true"
                                                        :is-text="1">
                                                </file-upload-apply>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                                <!--  未婚 E  -->
                            </Card>
                        </Card>
                        <!-- 实际控制人 E -->
                        <Row class="margin-top-10">
                            <Col span="24" class="saveBntStyle">
                                <Button type="primary" @click="goBack()">返回</Button>
                                <Button type="primary" @click="validatePassLsd()" :disabled="btnDisabled">保存并下一步</Button>
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
        name: "limitApplyLegalLSD",
        components: {
            fileUploadCommon,
            agreements,
            agreementsPingAn,
            fileUploadApply,
            shareholderInfo
        },
        data () {
            return {
                isApply: false,
                btnDisabled: false,
                modalLSD:false,
                TipsLSD:'',
                urgencyListProvince: [],
                urgencyListCities: [],
                urgencyListDistricts: [],
                legalListProvince:[],
                legalListCities: [],
                legalListDistricts: [],

                actualListProvince: [], // 实际控制人 地址array S
                actualListCities: [],
                actualListDistricts: [], // 实际控制人 地址array E

                actualUrgencyListCities: [], // 实际控制人紧急联系人 地址array S
                actualUrgencyListDistricts: [],
                actualUrgencyListProvince: [], // 实际控制人紧急联系人 地址array E

                actualMateListProvince: [], // 配偶信息 地址array S
                actualMateListCities: [],
                actualMateListDistricts: [], // 配偶信息 地址array E

                marriageStateList: [
                    {
                        state: '0',
                        lable: '未婚'
                    },
                    {
                        state: '1',
                        lable: '已婚'
                    },
                    {
                        state: '2',
                        lable: '离异'
                    }
                ],
                marriageCertificateImg: '', // 结婚证
                spouseFrontIDCardImg: '', // 配偶身份证正面照
                spouseBackIDCardImg: '', // 配偶身份证反面照
                divorceCertificateImg: '', // 离婚证
                hukouBookImg: '', // 户口本（证明未婚状态）
                editFormListLegal: { // 第二步 填写企业法人信息
                    enterpriseName: '',
                    socialUnifiedCreditNo: '',
                    same: '0',
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
                    urgencyAddress: '',

                    actualControllerName: '', // 实际控制人 S
                    actualIdCardNo: '',
                    actualPhoneNo: '',
                    actualAddress: '',
                    actualProvinceCode: '',
                    actualCityCode: '',
                    actualAreaCode: '', // 实际控制人 E

                    actualUrgencyName: '', // 实际控制人紧急联系人 S
                    actualRelationShip: '',
                    actualUrgencyPhoneNo: '',
                    actualUrgencyProvinceCode: '',
                    actualUrgencyCityCode: '',
                    actualUrgencyAreaCode: '',
                    actualUrgencyAddress: '', // 实际控制人紧急联系人 E

                    marriageState: '', // 婚姻状态

                    actualMateName: '', // 配偶信息 S
                    actualMateCardNo: '',
                    actualMatePhoneNo: '',
                    actualMateProvinceCode: '',
                    actualMateCityCode: '',
                    actualMateAreaCode: '',
                    actualMateAddress: '', // 配偶信息 E



                },
                ruleValidateLegal: {
                    same: [
                        { required: true, message: '请填写实际控制人与法人为是否为同一人', trigger: 'blur' },
                    ],
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
                        { required: true, message: '请填写企业法人邮箱', trigger: 'blur' },
                    ],
                    legalProvinceCode: [
                        { required: true, message: '请填写法人联系地址', trigger: 'blur' },
                    ],
                    legalAddress: [
                        { required: true, message: '请填写法人详细地址', trigger: 'blur' },
                    ],
                    actualControllerName: [
                        { required: true, message: '请填写实际控制人姓名', trigger: 'blur' },
                    ], // 实际控制人 S
                    actualIdCardNo: [
                        { required: true, validator: Validates.idCardPass, trigger: 'blur' },
                    ],
                    actualPhoneNo: [
                        { required: true,
                            validator: Validates.isPhone,
                            name: '请填写实际控制人手机',
                            trigger: 'blur'
                        },
                    ],
                    actualAddress: [
                        { required: true, message: '请填写实际控制人详细地址', trigger: 'blur' },
                    ],
                    actualProvinceCode: [
                        { required: true, message: '请填写实际控制人联系地址', trigger: 'blur' },
                    ], // 实际控制人 E

                    actualUrgencyName: [
                        { required: true, message: '请填写实际控制人紧急联系人姓名', trigger: 'blur' },
                    ], // 实际控制人紧急联系人 S
                    actualRelationShip: [
                        { required: true, message: '请填写实际控制人与紧急联系人关系', trigger: 'blur' },
                    ],
                    actualUrgencyPhoneNo: [
                        { required: true, message: '请填写实际控制人紧急联系人电话', trigger: 'blur' },
                    ],
                    actualUrgencyProvinceCode: [
                        { required: true, message: '请填写实际控制人紧急联系人地址', trigger: 'blur' },
                    ],
                    actualUrgencyAddress: [
                        { required: true, message: '请填写实际控制人紧急联系人详细地址', trigger: 'blur' },
                    ], // 实际控制人紧急联系人 E

                    marriageState: [
                        { required: true, message: '请选择婚姻状态', trigger: 'blur' },
                    ] // 婚姻状态
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
            },
            getLimitAppIds () {
                return this.$store.getters.getLimitAppId
            }
            // 企业认证 E
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
                axios.all([that.getAdressInfoAll('', 'urgencyListProvince').then(res=>{}).catch(err=>{}), that.getAdressInfoAll('', 'legalListProvince').then(res=>{}).catch(err=>{}), that.getAdressInfoAll('', 'actualListProvince').then(res=>{}).catch(err=>{}), that.getAdressInfoAll('', 'actualUrgencyListProvince').then(res=>{}).catch(err=>{}), that.getAdressInfoAll('', 'actualMateListProvince').then(res=>{}).catch(err=>{})])
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
            // 是否为同一人
            isSamePerson (val) {
                let arr = ['', null, undefined, 'null', '0', 0];
                if (val === '1') {
                    vm.editFormListLegal.actualControllerName = vm.editFormListLegal.legalName;
                    vm.editFormListLegal.actualIdCardNo = vm.editFormListLegal.legalNo;
                    vm.editFormListLegal.actualPhoneNo = vm.editFormListLegal.legalIphone;
                    vm.editFormListLegal.actualCityCode = vm.editFormListLegal.legalCityCode;
                    vm.editFormListLegal.actualAreaCode = vm.editFormListLegal.legalAreaCode;
                    if (!arr.includes(vm.editFormListLegal.legalProvinceCode)) {
                        vm.editFormListLegal.actualProvinceCode = vm.editFormListLegal.legalProvinceCode; // 实际控制人所属省code
                        vm.getAdressInfoAll(vm.editFormListLegal.legalProvinceCode, 'actualListCities').then(res => {
                            if (!arr.includes(vm.editFormListLegal.legalCityCode)) {
                                vm.editFormListLegal.actualCityCode = vm.editFormListLegal.legalCityCode; // 实际控制人所属市code
                                vm.getAdressInfoAll(vm.editFormListLegal.legalCityCode, 'actualListDistricts').then(res => {
                                    if (!arr.includes(vm.editFormListLegal.legalAreaCode)) {
                                        vm.editFormListLegal.actualAreaCode = vm.editFormListLegal.legalAreaCode; // 实际控制人所属区域code
                                    }
                                }).catch(err=>{})
                            }
                        }).catch(err=>{})
                    }
                    vm.editFormListLegal.actualAddress = vm.editFormListLegal.legalAddress;
                    vm.editFormListLegal.actualUrgencyName = vm.editFormListLegal.urgencyName;
                    vm.editFormListLegal.actualRelationShip = vm.editFormListLegal.relationShip;
                    vm.editFormListLegal.actualUrgencyPhoneNo = vm.editFormListLegal.urgencyPhoneNo;
                    if (!arr.includes(vm.editFormListLegal.urgencyProvinceCode)) {
                        vm.editFormListLegal.actualUrgencyProvinceCode = vm.editFormListLegal.urgencyProvinceCode; // 实际控制人紧急联系人所属省code
                        vm.getAdressInfoAll(vm.editFormListLegal.urgencyProvinceCode, 'actualUrgencyListCities').then(res => {
                            if (!arr.includes(vm.editFormListLegal.urgencyCityCode)) {
                                vm.editFormListLegal.actualUrgencyCityCode = vm.editFormListLegal.urgencyCityCode; // 实际控制人紧急联系人所属市code
                                vm.getAdressInfoAll(vm.editFormListLegal.urgencyCityCode, 'actualUrgencyListDistricts').then(res => {
                                    if (!arr.includes(vm.editFormListLegal.urgencyAreaCode)) {
                                        vm.editFormListLegal.actualUrgencyAreaCode = vm.editFormListLegal.urgencyAreaCode; // 实际控制人紧急联系人所属区域code
                                    }
                                }).catch(err=>{})
                            }
                        }).catch(err=>{})
                    }
                    vm.editFormListLegal.actualUrgencyAddress =  vm.editFormListLegal.urgencyAddress;
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
            // 是否显示车辆行驶证
            isChangeCar (val) {
                if (val === '0') {
                    this.isCarShow = false;
                    this.buyCarTimeShow = false;
                } else {
                    this.isCarShow = true;
                    this.buyCarTimeShow = true;
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
                    vm.leaseTimeShow = true;
                } else {
                    this.leasingContractShow= true;
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
                vm.$https.get(`/api-webbff/v1/asset/queryLegalPersonAndActualControllerInformationForLSD?limitAppId=${vm.getLimitAppIds}`)
                    .then(res => {
                        if (res.data.success === 1) {
                            let arr = ['', null, undefined, 'null'];
                            let lsdGetInfo = res.data.data;
                            if (lsdGetInfo !== '0') {
                                // 第二步 法人信息
                                vm.editFormListLegal.enterpriseName = lsdGetInfo.enterpriseName; // 企业名称
                                vm.editFormListLegal.socialUnifiedCreditNo = lsdGetInfo.socialUnifiedCreditNo; // 社会统一信用代码
                                if (!arr.includes(lsdGetInfo.legalName)) {
                                    vm.editFormListLegal.legalName = lsdGetInfo.legalName; // 企业法人
                                }
                                if (!arr.includes(lsdGetInfo.legalNo)) {
                                    vm.editFormListLegal.legalNo = lsdGetInfo.legalNo; // 法人身份证
                                }
                                if (!arr.includes(lsdGetInfo.legalMobile)) {
                                    vm.editFormListLegal.legalIphone = lsdGetInfo.legalMobile; // 法人手机
                                }
                                if (!arr.includes(lsdGetInfo.legalEmail)) {
                                    vm.editFormListLegal.legalEmail = lsdGetInfo.legalEmail; // 法人邮箱
                                }
                                if (!arr.includes(lsdGetInfo.legalProvinceCode)) {
                                    vm.editFormListLegal.legalProvinceCode = lsdGetInfo.legalProvinceCode; // 法人联系地址省
                                    vm.getAdressInfoAll(lsdGetInfo.legalProvinceCode, 'legalListCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.legalCityCode)) {
                                            vm.editFormListLegal.legalCityCode = lsdGetInfo.legalCityCode; // 法人联系地址市
                                            vm.getAdressInfoAll(lsdGetInfo.legalCityCode, 'legalListDistricts').then(res => {
                                                if (!arr.includes(lsdGetInfo.legalAreaCode)) {
                                                    vm.editFormListLegal.legalAreaCode = lsdGetInfo.legalAreaCode; // 法人联系地址区
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo.legalAddress)) {
                                    vm.editFormListLegal.legalAddress = lsdGetInfo.legalAddress; // 法人详细地址
                                }
                                if (!arr.includes(lsdGetInfo.urgencyName)) {
                                    vm.editFormListLegal.urgencyName = lsdGetInfo.urgencyName; // 法人紧急联系人姓名
                                }
                                if (!arr.includes(lsdGetInfo.relationShip)) {
                                    vm.editFormListLegal.relationShip = lsdGetInfo.relationShip; // 法人紧急联系人关系
                                }
                                if (!arr.includes(lsdGetInfo.urgencyPhoneNo)) {
                                    vm.editFormListLegal.urgencyPhoneNo = lsdGetInfo.urgencyPhoneNo; // 法人紧急联系人方式
                                }
                                if (!arr.includes(lsdGetInfo.urgencyProvinceCode)) {
                                    vm.editFormListLegal.urgencyProvinceCode = lsdGetInfo.urgencyProvinceCode; // 法人紧急联系人所属省code
                                    vm.getAdressInfoAll(lsdGetInfo.urgencyProvinceCode, 'urgencyListCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.urgencyCityCode)) {
                                            vm.editFormListLegal.urgencyCityCode = lsdGetInfo.urgencyCityCode; //  法人紧急联系人所属市code
                                            vm.getAdressInfoAll(lsdGetInfo.urgencyCityCode, 'urgencyListDistricts').then(res => {
                                                if (!arr.includes(lsdGetInfo.urgencyAreaCode)) {
                                                    vm.editFormListLegal.urgencyAreaCode = lsdGetInfo.urgencyAreaCode; //  法人紧急联系人所属区域code
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo.urgencyAddress)) {
                                    vm.editFormListLegal.urgencyAddress = lsdGetInfo.urgencyAddress; // 法人紧急联系人地址
                                }
                                if (!arr.includes(lsdGetInfo.isSame)) {
                                    vm.editFormListLegal.same = lsdGetInfo.isSame; // 实际控制人与法人为是否为同一人
                                }
                                if (!arr.includes(lsdGetInfo.actualControllerName)) {
                                    vm.editFormListLegal.actualControllerName = lsdGetInfo.actualControllerName; // 实际控制人姓名
                                }
                                if (!arr.includes(lsdGetInfo.actualIdCardNo)) {
                                    vm.editFormListLegal.actualIdCardNo = lsdGetInfo.actualIdCardNo; // 实际控制人身份证号
                                }
                                if (!arr.includes(lsdGetInfo.actualPhoneNo)) {
                                    vm.editFormListLegal.actualPhoneNo = lsdGetInfo.actualPhoneNo; // 实际控制人手机
                                }
                                if (!arr.includes(lsdGetInfo.actualProvinceCode)) {
                                    vm.editFormListLegal.actualProvinceCode = lsdGetInfo.actualProvinceCode; // 实际控制人所属省code
                                    vm.getAdressInfoAll(lsdGetInfo.actualProvinceCode, 'actualListCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.actualCityCode)) {
                                            vm.editFormListLegal.actualCityCode = lsdGetInfo.actualCityCode; // 实际控制人所属市code
                                            vm.getAdressInfoAll(lsdGetInfo.actualCityCode, 'actualListDistricts').then(res => {
                                                if (!arr.includes(lsdGetInfo.actualAreaCode)) {
                                                    vm.editFormListLegal.actualAreaCode = lsdGetInfo.actualAreaCode; // 实际控制人所属区域code
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo.actualAddress)) {
                                    vm.editFormListLegal.actualAddress = lsdGetInfo.actualAddress; // 实际控制人联系详细地址
                                }
                                if (!arr.includes(lsdGetInfo.actualUrgencyName)) {
                                    vm.editFormListLegal.actualUrgencyName = lsdGetInfo.actualUrgencyName; // 实际控制人紧急联系人姓名
                                }
                                if (!arr.includes(lsdGetInfo.actualRelationShip)) {
                                    vm.editFormListLegal.actualRelationShip = lsdGetInfo.actualRelationShip; // 实际控制人与紧急联系人关系
                                }
                                if (!arr.includes(lsdGetInfo.actualUrgencyPhoneNo)) {
                                    vm.editFormListLegal.actualUrgencyPhoneNo = lsdGetInfo.actualUrgencyPhoneNo; // 实际控制人紧急联系人联系方式
                                }

                                if (!arr.includes(lsdGetInfo.actualUrgencyProvinceCode)) {
                                    vm.editFormListLegal.actualUrgencyProvinceCode = lsdGetInfo.actualUrgencyProvinceCode; // 实际控制人紧急联系人所属省code
                                    vm.getAdressInfoAll(lsdGetInfo.actualUrgencyProvinceCode, 'actualUrgencyListCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.actualUrgencyCityCode)) {
                                            vm.editFormListLegal.actualUrgencyCityCode = lsdGetInfo.actualUrgencyCityCode; // 实际控制人紧急联系人所属市code
                                            vm.getAdressInfoAll(lsdGetInfo.actualUrgencyCityCode, 'actualUrgencyListDistricts').then(res => {
                                                if (!arr.includes(lsdGetInfo.actualUrgencyAreaCode)) {
                                                    vm.editFormListLegal.actualUrgencyAreaCode = lsdGetInfo.actualUrgencyAreaCode; // 实际控制人紧急联系人所属区域code
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo. actualUrgencyAddress)) {
                                    vm.editFormListLegal.actualUrgencyAddress = lsdGetInfo.actualUrgencyAddress; // 实际控制人紧急联系人详细地址
                                }
                                if (!arr.includes(lsdGetInfo.actualMaritalStatus)) {
                                    vm.editFormListLegal.marriageState = lsdGetInfo.actualMaritalStatus; // 婚姻状态 0-未婚，1-已婚,2离异
                                }
                                if (!arr.includes(lsdGetInfo.actualMateName)) {
                                    vm.editFormListLegal.actualMateName = lsdGetInfo.actualMateName; // 配偶姓名
                                }
                                if (!arr.includes(lsdGetInfo.actualMateCardNo)) {
                                    vm.editFormListLegal.actualMateCardNo = lsdGetInfo.actualMateCardNo; // 配偶身份证号
                                }
                                if (!arr.includes(lsdGetInfo.actualMatePhoneNo)) {
                                    vm.editFormListLegal.actualMatePhoneNo = lsdGetInfo.actualMatePhoneNo; // 配偶手机
                                }
                                if (!arr.includes(lsdGetInfo.actualMateProvinceCode)) {
                                    vm.editFormListLegal.actualMateProvinceCode = lsdGetInfo.actualMateProvinceCode; // 实际控制人配偶地址所属省code
                                    vm.getAdressInfoAll(lsdGetInfo.actualMateProvinceCode, 'actualMateListCities').then(res => {
                                        if (!arr.includes(lsdGetInfo.actualMateCityCode)) {
                                            vm.editFormListLegal.actualMateCityCode = lsdGetInfo.actualMateCityCode; // 实际控制人配偶地址所属市code
                                            vm.getAdressInfoAll(lsdGetInfo.actualMateCityCode, 'actualMateListDistricts').then(res => {
                                                if (!arr.includes(lsdGetInfo.actualMateAreaCode)) {
                                                    vm.editFormListLegal.actualMateAreaCode = lsdGetInfo.actualMateAreaCode; // 实际控制人配偶地址所属区域code
                                                }
                                            }).catch(err=>{})
                                        }
                                    }).catch(err=>{})
                                }
                                if (!arr.includes(lsdGetInfo.actualMateAddress)) {
                                    vm.editFormListLegal.actualMateAddress = lsdGetInfo.actualMateAddress; // 实际控制人配偶地址联系地址
                                }
                                if (!arr.includes(lsdGetInfo.marriageCertificateUrl)) {
                                    vm.marriageCertificateImg = lsdGetInfo.marriageCertificateUrl; // 结婚证
                                } else {
                                    vm.marriageCertificateImg = '';
                                }
                                if (!arr.includes(lsdGetInfo.spouseFrontIDCardUrl)) {
                                    vm.spouseFrontIDCardImg = lsdGetInfo.spouseFrontIDCardUrl; // 配偶身份证正面照
                                } else {
                                    vm.spouseFrontIDCardImg = '';
                                }

                                if (!arr.includes(lsdGetInfo.spouseBackIDCardUrl)) {
                                    vm.spouseBackIDCardImg = lsdGetInfo.spouseBackIDCardUrl; // 配偶身份证正面照
                                } else {
                                    vm.spouseBackIDCardImg = '';
                                }

                                if (!arr.includes(lsdGetInfo.divorceCertificateUrl)) {
                                    vm.divorceCertificateImg = lsdGetInfo.divorceCertificateUrl; // 离婚证
                                } else {
                                    vm.divorceCertificateImg = '';
                                }
                                if (!arr.includes(lsdGetInfo.hukouBookUrl)) {
                                    vm.hukouBookImg = lsdGetInfo.hukouBookUrl; // 户口本（证明未婚状态）
                                } else {
                                    vm.hukouBookImg = '';
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
            validatePassLsd () {
                let arr = ['0','',null,'null',undefined];
                // 请填写完整法人联系地址 S
                if (vm.legalListDistricts.length > 0) {
                    if (arr.includes(vm.editFormListLegal.legalAreaCode)) {
                        vm.$message.error('请填写完整法人联系地址')
                        return
                    }
                }
                if (arr.includes(vm.editFormListLegal.legalProvinceCode)||arr.includes(vm.editFormListLegal.legalCityCode)) {
                    vm.$message.error('请填写完整法人联系地址')
                    return
                }
                // 请填写完整法人联系地址 E
                // 请填写完整法人紧急联系人地址 S
                if (vm.urgencyListDistricts.length > 0) {
                    if (arr.includes(vm.editFormListLegal.urgencyAreaCode)) {
                        vm.$message.error('请填写完整法人紧急联系人地址')
                        return
                    }
                }
                if (arr.includes(vm.editFormListLegal.urgencyProvinceCode)||arr.includes(vm.editFormListLegal.urgencyCityCode)) {
                    vm.$message.error('请填写完整法人紧急联系人地址')
                    return
                }
                // 请填写完整法人紧急联系人地址 E
                // 请填写完实际控制人联系地址 S
                if (vm.actualListDistricts.length > 0) {
                    if (arr.includes(vm.editFormListLegal.actualAreaCode)) {
                        vm.$message.error('请填写完实际控制人联系地址')
                        return
                    }
                }
                if (arr.includes(vm.editFormListLegal.actualProvinceCode)||arr.includes(vm.editFormListLegal.actualCityCode)) {
                    vm.$message.error('请填写完实际控制人联系地址')
                    return
                }
                // 请填写完实际控制人联系地址 E
                // 实际控制人紧急联系人地址 S
                if (vm.actualUrgencyListDistricts.length > 0) {
                    if (arr.includes(vm.editFormListLegal.actualUrgencyAreaCode)) {
                        vm.$message.error('请填写完实际控制人联系地址')
                        return
                    }
                }
                if (arr.includes(vm.editFormListLegal.actualUrgencyProvinceCode)||arr.includes(vm.editFormListLegal.actualUrgencyCityCode)) {
                    vm.$message.error('请填写完实际控制人联系地址')
                    return
                }
                // 实际控制人紧急联系人地址 E
                vm.$refs['editFormListLegal'].validate((valid) => {
                    if (valid) {
                        vm.validateImgLsd().then(res => {
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
                        }).catch(err=>{})
                    } else {
                        vm.btnDisabled = false;
                        vm.$message.error('企业法人信息/实际控制人信息有误，请核对后再提交');
                    };
                });
            },
            /**
             *  四要素验证  [企业名称  社会统一信用代码  企业法人  法人身份证]
             *
             */
            fourElements () {
                return new Promise((resolve, reject) => {
                    this.$https.post('/api-webbff/v1/risk/bizFour', {
                        company_name: this.editFormListLegal.enterpriseName,
                        credit_code: this.editFormListLegal.socialUnifiedCreditNo,
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
            // 图片验证
            validateImgLsd ()  {
                return new Promise((resolve, reject) => {
                    let isNull = ['' , 0, '0',null, 'null'];
                    if (vm.editFormListLegal.marriageState === '0' && vm.$refs.upload5.newListqny.length === 0) { // 未婚
                        vm.$message.error('请上传户口本（证明未婚状态）图片')
                        reject()
                        return
                    }
                    let isTrue = isNull.includes(vm.editFormListLegal.actualMateName)||isNull.includes(vm.editFormListLegal.actualMateCardNo)||isNull.includes(vm.editFormListLegal.actualMatePhoneNo);
                    let isAddressTrue = isNull.includes(vm.editFormListLegal.actualMateProvinceCode)||isNull.includes(vm.editFormListLegal.actualMateAreaCode)||isNull.includes(vm.editFormListLegal.actualMateAreaCode)||isNull.includes(vm.editFormListLegal.actualMateAddress);
                    let isImg = isNull.includes(vm.$refs.upload1.newListqny.length) || isNull.includes(vm.$refs.upload2.newListqny.length) || isNull.includes(vm.$refs.upload3.newListqny.length);
                    if (vm.editFormListLegal.marriageState === '1' && (isTrue || isAddressTrue || isImg)) { // 已婚
                        vm.$message.error('请上传配偶相关信息/图片');
                        reject()
                        return
                    }
                    if (vm.editFormListLegal.marriageState === '2' && vm.$refs.upload4.newListqny.length === 0) { // 离异
                        vm.$message.error('请上传离婚证图片');
                        reject()
                        return
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
                let ybCenterNo = [640000, '640000'];
                let _params = {
                    legalName: vm.editFormListLegal.legalName, // 企业法人
                    legalNo: vm.editFormListLegal.legalNo, // 法人身份证
                    legalMobile: vm.editFormListLegal.legalIphone, // 法人手机
                    legalEmail: vm.editFormListLegal.legalEmail, // 法人邮箱
                    legalProvinceCode: zeroArr.includes(vm.editFormListLegal.legalProvinceCode)? '':vm.editFormListLegal.legalProvinceCode, // 法人联系地址
                    legalCityCode: zeroArr.includes(vm.editFormListLegal.legalCityCode)? '':vm.editFormListLegal.legalCityCode,
                    legalAreaCode: zeroArr.includes(vm.editFormListLegal.legalAreaCode)? '':vm.editFormListLegal.legalAreaCode,
                    legalAddress: vm.editFormListLegal.legalAddress,
                    urgencyName: vm.editFormListLegal.urgencyName, // 法人紧急联系人姓名
                    relationShip: vm.editFormListLegal.relationShip, // 法人紧急联系人关系
                    urgencyPhoneNo: vm.editFormListLegal.urgencyPhoneNo, // 法人紧急联系人方式
                    urgencyProvinceCode: zeroArr.includes(vm.editFormListLegal.urgencyProvinceCode)? '':vm.editFormListLegal.urgencyProvinceCode,
                    urgencyCityCode: zeroArr.includes(vm.editFormListLegal.urgencyCityCode)? '':vm.editFormListLegal.urgencyCityCode,
                    urgencyAreaCode: zeroArr.includes(vm.editFormListLegal.urgencyAreaCode)? '':vm.editFormListLegal.urgencyAreaCode,
                    urgencyAddress: vm.editFormListLegal.urgencyAddress,
                    isSame: vm.editFormListLegal.same, // 实际控制人与法人为是否为同一人
                    actualControllerName: vm.editFormListLegal.actualControllerName, // 实际控制人姓名
                    actualIdCardNo: vm.editFormListLegal.actualIdCardNo, // 实际控制人身份证号
                    actualPhoneNo: vm.editFormListLegal.actualPhoneNo, // 实际控制人手机
                    actualProvinceCode: zeroArr.includes(vm.editFormListLegal.actualProvinceCode)? '':vm.editFormListLegal.actualProvinceCode, // 实际控制人联系地址省
                    actualCityCode: zeroArr.includes(vm.editFormListLegal.actualCityCode)? '':vm.editFormListLegal.actualCityCode, // 实际控制人联系地址市
                    actualAreaCode: zeroArr.includes(vm.editFormListLegal.actualAreaCode)? '':vm.editFormListLegal.actualAreaCode, // 实际控制人联系地址区
                    actualAddress: vm.editFormListLegal.actualAddress, // 实际控制人联系详细地址
                    actualUrgencyName: vm.editFormListLegal.actualUrgencyName, // 实际控制人紧急联系人姓名
                    actualRelationShip: vm.editFormListLegal.actualRelationShip, // 实际控制人与紧急联系人关系
                    actualUrgencyPhoneNo: vm.editFormListLegal.actualUrgencyPhoneNo, // 实际控制人紧急联系人联系方式
                    actualUrgencyProvinceCode: zeroArr.includes(vm.editFormListLegal.actualUrgencyProvinceCode)? '':vm.editFormListLegal.actualUrgencyProvinceCode, // 实际控制人紧急联系人所属省code
                    actualUrgencyCityCode: zeroArr.includes(vm.editFormListLegal.actualUrgencyCityCode)? '':vm.editFormListLegal.actualUrgencyCityCode, // 实际控制人紧急联系人所属市code
                    actualUrgencyAreaCode: zeroArr.includes(vm.editFormListLegal.actualUrgencyAreaCode)? '':vm.editFormListLegal.actualUrgencyAreaCode, // 实际控制人紧急联系人所属区域code
                    actualUrgencyAddress: vm.editFormListLegal.actualUrgencyAddress, // 实际控制人紧急联系人地址

                    actualMaritalStatus: vm.editFormListLegal.marriageState, // 婚姻状态 0-未婚，1-已婚,2离异
                    actualMateName: vm.editFormListLegal.actualMateName, //  配偶姓名
                    actualMateCardNo: vm.editFormListLegal.actualMateCardNo, // 配偶身份证号
                    actualMatePhoneNo: vm.editFormListLegal.actualMatePhoneNo, // 配偶手机
                    actualMateProvinceCode: zeroArr.includes(vm.editFormListLegal.actualMateProvinceCode)? '':vm.editFormListLegal.actualMateProvinceCode, // 实际控制人配偶地址所属省code
                    actualMateCityCode: zeroArr.includes(vm.editFormListLegal.actualMateCityCode)? '':vm.editFormListLegal.actualMateCityCode, // 实际控制人配偶地址所属市code
                    actualMateAreaCode: zeroArr.includes(vm.editFormListLegal.actualMateAreaCode)? '':vm.editFormListLegal.actualMateAreaCode, // 实际控制人配偶地址所属区域code
                    actualMateAddress: vm.editFormListLegal.actualMateAddress, // 实际控制人配偶地址联系地址
                    marriageCertificateUrl: vm.$refs.upload1.newListqny.join(','), // 结婚证
                    spouseFrontIDCardUrl: vm.$refs.upload2.newListqny.join(','), // 配偶身份证正面照
                    spouseBackIDCardUrl: vm.$refs.upload3.newListqny.join(','), // 配偶身份证反面照
                    divorceCertificateUrl: vm.$refs.upload4.newListqny.join(','), // 离婚证
                    hukouBookUrl: vm.$refs.upload5.newListqny.join(','), // 户口本（证明未婚状态）
                    limitAppId: vm.getLimitAppIds
                };
                vm.btnDisabled = true;
                vm.$https.post('/api-webbff/v1/asset/creditApplyLegalPersonAndActualControllerInformationTOForLSD' , _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            vm.$Message.success(res.data.data);
                            vm.btnDisabled = false;
                            vm.$emit('setSteps', 3, '流水贷/药店信息');
                            vm.creditApplyId = res.data.data.enterpriseCreditApplyId;
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
                vm.$emit('setSteps', 1, '流水贷/企业信息');
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
            }
            // ----  企业认证 E  ----
        },
        watch: {
            'editFormListLegal.urgencyProvinceCode': {
                handler (newVal, oldVal) { // 法人紧急联系人省
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.urgencyCityCode = '0';
                            self.editFormListLegal.urgencyAreaCode = '0';
                            self.urgencyListCities = [];
                            self.urgencyListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.urgencyCityCode = '0';
                            self.editFormListLegal.urgencyAreaCode = '0';
                            self.urgencyListDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.urgencyCityCode': {
                handler (newVal,oldVal) {  // 法人紧急联系人市
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.urgencyAreaCode = '0';
                            self.urgencyListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.urgencyAreaCode = '0';
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.legalProvinceCode': {
                handler (newVal, oldVal) { // 法人省
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.legalCityCode = '0';
                            self.editFormListLegal.legalAreaCode = '0';
                            self.legalListCities = [];
                            self.legalListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.legalCityCode = '0';
                            self.editFormListLegal.legalAreaCode = '0';
                            self.legalListDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.legalCityCode': {
                handler (newVal,oldVal) { // 法人市
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.legalAreaCode = '0';
                            self.legalListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.legalAreaCode = '0';
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.actualProvinceCode': { // 实际控制人 省
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualCityCode = '0';
                            self.editFormListLegal.actualAreaCode = '0';
                            self.actualListCities = [];
                            self.actualListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualCityCode = '0';
                            self.editFormListLegal.actualAreaCode = '0';
                            self.actualListDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.actualCityCode': {
                handler (newVal,oldVal) { // 实际控制人 市
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualAreaCode = '0';
                            self.actualListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualAreaCode = '0';
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.actualUrgencyProvinceCode': { // 实际控制人紧急联系人 省
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualUrgencyCityCode = '0';
                            self.editFormListLegal.actualUrgencyAreaCode = '0';
                            self.actualUrgencyListCities = [];
                            self.actualUrgencyListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualUrgencyCityCode = '0';
                            self.editFormListLegal.actualUrgencyAreaCode = '0';
                            self.actualUrgencyListDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.actualUrgencyCityCode': {
                handler (newVal,oldVal) { // 实际控制人紧急联系人 市
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualUrgencyAreaCode = '0';
                            self.actualUrgencyListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualUrgencyAreaCode = '0';
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.actualMateProvinceCode': { // 配偶联系地址 省
                handler (newVal,oldVal) {
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualMateCityCode = '0';
                            self.editFormListLegal.actualMateAreaCode = '0';
                            self.actualMateListCities = [];
                            self.actualMateListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualMateCityCode = '0';
                            self.editFormListLegal.actualMateAreaCode = '0';
                            self.actualMateListDistricts = [];
                        })
                    }
                },
                deep: true
            },
            'editFormListLegal.actualMateCityCode': {
                handler (newVal,oldVal) { // 配偶联系地址 市
                    let arr = [0, '0']
                    let self = this;
                    if (arr.includes(newVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualMateAreaCode = '0';
                            self.actualMateListDistricts = [];
                        })
                    }
                    if (!arr.includes(newVal) && (newVal !== oldVal)) {
                        self.$nextTick(() => {
                            self.editFormListLegal.actualMateAreaCode = '0';
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
// src/views/user/limitApply/limitApplyLegalLSD.vue