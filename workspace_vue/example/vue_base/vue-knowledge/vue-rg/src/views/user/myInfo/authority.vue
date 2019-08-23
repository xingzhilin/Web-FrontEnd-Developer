<template>
    <div class="min-height-100 Workbench" ref="Workbench">
        <Card :dis-hover="true" :bordered="false">
            <p class="indexTh"  ref="ivu-card-head">
                企业认证
            </p>
            <Card :dis-hover="true" :padding="0" class="eTh">
                <p slot="title" style="color: #333; font-size: 14px;">{{entAuthInfos.entName}} <span class="right">认证状态：<span class="red">{{entAuthInfos.entStatus}}</span></span></p>
            </Card>
        </Card>

        <Form type="flex"  :model="submitItem" ref="submitItem" :rules="ruleValidate" :label-width="200">
        <Card :dis-hover="true" :bordered="false">
            <Card :dis-hover="true" :padding="0">
                <p slot="title" style=" color: #333; font-size: 14px;">企业信息</p>
                    <Row style="padding-top: 25px;">
                        <Col span="24">
                        <FormItem  label="企业类型："  prop="radio">
                            <RadioGroup v-model="submitItem.radio">
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

                        <Col span="24">
                        <FormItem  label="企业名称：" prop="eName">
                            <Input v-model="submitItem.eName" placeholder=""class="w260"></Input>
                            <div  v-if="false">北京融贯电子商务有限公司</div>
                        </FormItem>
                        </Col>

                        <Col span="24">
                        <FormItem  label="统一社会信用代码：" prop="creditCode">
                            <Input  placeholder="统一社会信用代码" :maxlength="18" class="w260" v-model="submitItem.creditCode"></Input>
                            <div class="creditCodeShow" v-if="creditCodeShow">
                                <span style="padding-left: 10px;">有效期：</span>
                                <FormItem style="display: inline-block;" prop="creditCodestartTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.creditCodestartTime"
                                            @on-change="submitItem.creditCodestartTime=$event"
                                            :options="start_creditCode"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span v-if="false">2018-01-01</span>
                                <span>至</span>
                                <Date-picker
                                        type="date"
                                        :value="submitItem.creditCodeendTime"
                                        @on-change="creditCodeType === true? submitItem.creditCodeendTime='' : submitItem.creditCodeendTime=$event"
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

                        <Col span="24"  v-if="submitItem.radio === '8'">
                        <FormItem  label="药品生产许可证：" prop="DrugsLicence">
                            <Input  placeholder="" class="w260" v-model="submitItem.DrugsLicence"></Input>
                            <span style="padding-left: 10px;">有效期：</span>
                            <FormItem style="display: inline-block;" prop="DrugsLicencestartTime">
                                <Date-picker
                                        type="date"
                                        :value="submitItem.DrugsLicencestartTime"
                                        @on-change="submitItem.DrugsLicencestartTime=$event"
                                        :options="start_DrugsLicence" placeholder="选择日期">
                                </Date-picker>
                            </FormItem>
                            <span>至</span>
                            <FormItem style="display: inline-block;" prop="DrugsLicenceendTime">
                                <Date-picker
                                        type="date"
                                        :value="submitItem.DrugsLicenceendTime"
                                        @on-change="submitItem.DrugsLicenceendTime=$event"
                                        :options="end_DrugsLicence"
                                        placeholder="选择日期">
                                </Date-picker>
                            </FormItem>
                            <span style="padding-left: 10px;">
                                <!--<Checkbox v-model="DrugsLicenceType" @on-change="drugsLicenceChecked"></Checkbox>长期-->
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="24"  v-if="submitItem.radio === '1' || submitItem.radio === '2' || submitItem.radio === '3' || submitItem.radio === '4' || submitItem.radio === '5'">
                            <FormItem  label="药品经营许可证：" prop="DrugsLicence">
                                <Input  placeholder="" class="w260" v-model="submitItem.DrugsLicence"></Input>
                                <span style="padding-left: 10px;">有效期：</span>
                                <FormItem style="display: inline-block;" prop="DrugsLicencestartTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.DrugsLicencestartTime"
                                            @on-change="submitItem.DrugsLicencestartTime=$event"
                                            :options="start_DrugsLicence" placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span>至</span>
                                <FormItem style="display: inline-block;" prop="DrugsLicenceendTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.DrugsLicenceendTime"
                                            @on-change="submitItem.DrugsLicenceendTime=$event"
                                            :options="end_DrugsLicence"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span style="padding-left: 10px;">
                                <!--<Checkbox v-model="DrugsLicenceType" @on-change="drugsLicenceChecked"></Checkbox>长期-->
                            </span>
                            </FormItem>
                        </Col>
                        <Col span="24" v-if="submitItem.radio === '6' || submitItem.radio === '7'">
                            <FormItem  label="医疗机构执业许可证：" prop="MedicalLicence">
                                <Input  placeholder="" class="w260" v-model="submitItem.MedicalLicence"></Input>
                                <span  v-if="false">11231231212515148X</span>
                                <span style="padding-left: 10px;">有效期：</span>
                                <FormItem style="display: inline-block;" prop="MedicalLicencestartTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.MedicalLicencestartTime"
                                            @on-change="submitItem.MedicalLicencestartTime=$event"
                                            :options="start_MedicalLicence"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span>至</span>
                                <FormItem style="display: inline-block;" prop="MedicalLicenceendTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.MedicalLicenceendTime"
                                            @on-change="submitItem.MedicalLicenceendTime=$event"
                                            :options="end_MedicalLicence"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span style="padding-left: 10px;">
                                    <!--<Checkbox v-model="MedicalLicenceType" @on-change="medicalLicenceChecked"></Checkbox>长期-->
                                </span>
                                <span  v-if="false">长期</span>
                            </FormItem>
                        </Col>

                        <Col span="24" v-if="submitItem.radio === '8'">
                            <FormItem  label="GMP证书："  prop="gspCertificate">
                                <Input  placeholder="" class="w260" v-model="submitItem.gspCertificate"></Input>
                                <span style="padding-left: 10px;">有效期：</span>
                                <FormItem style="display: inline-block;" prop="gspstartTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.gspstartTime"
                                            @on-change="submitItem.gspstartTime=$event"
                                            :options="start_gspCertificate"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span>至</span>
                                <FormItem style="display: inline-block;" prop="gspendTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.gspendTime"
                                            @on-change="submitItem.gspendTime=$event"
                                            :options="end_gspCertificate"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span style="padding-left: 10px;">
                                <!--<Checkbox v-model="gspCertificateType" @on-change="gspCertificateChecked"></Checkbox>长期-->
                            </span>
                            </FormItem>
                        </Col>
                        <Col span="24" v-if="submitItem.radio === '1' || submitItem.radio === '2' || submitItem.radio === '3' || submitItem.radio === '4' || submitItem.radio === '5'">
                            <FormItem  label="GSP证书："  prop="gspCertificate">
                                <Input  placeholder="" class="w260" v-model="submitItem.gspCertificate"></Input>
                                <span style="padding-left: 10px;">有效期：</span>
                                <FormItem style="display: inline-block;" prop="gspstartTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.gspstartTime"
                                            @on-change="submitItem.gspstartTime=$event"
                                            :options="start_gspCertificate"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span>至</span>
                                <FormItem style="display: inline-block;" prop="gspendTime">
                                    <Date-picker
                                            type="date"
                                            :value="submitItem.gspendTime"
                                            @on-change="submitItem.gspendTime=$event"
                                            :options="end_gspCertificate"
                                            placeholder="选择日期">
                                    </Date-picker>
                                </FormItem>
                                <span style="padding-left: 10px;">
                                <!--<Checkbox v-model="gspCertificateType" @on-change="gspCertificateChecked"></Checkbox>长期-->
                            </span>
                            </FormItem>
                        </Col>


                        <Col span="24">
                        <FormItem  label="企业联系人：" prop="enContacts">
                            <Input  placeholder="" class="w260" v-model="submitItem.enContacts"></Input>
                        </FormItem>
                        </Col>

                        <Col span="24">
                        <FormItem  label="联系人电话：" prop="mobile">
                            <Input  placeholder="" class="w260" v-model="submitItem.mobile"></Input>
                        </FormItem>
                        </Col>

                        <Col span="24" v-if="!eTypeE">
                        <FormItem label="所属区域:" prop="enterpriseAddressProvince">
                            <Select style="width:14%" v-model="submitItem.enterpriseAddressProvince"  @on-query-change="getProvinceCityNames(1)">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in listProvince" :key="item.lcode"  :value="item.lcode">{{item.lname}}</Option>
                            </Select>

                            <Select style="width:14%" v-show="citys"  v-model="submitItem.enterpriseAddressCity" @on-query-change="getProvinceCityNames(2)">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in listCities" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                            </Select>

                            <Select style="width:15%" v-show="districtsAll"  v-model="submitItem.enterpriseAddressCountry">
                                <Option value="0">请选择</Option>
                                <Option v-for="item in listDistricts" :key="item.lcode" :value="item.lcode">{{item.lname}}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="24"  v-if="!eTypeE">
                        <FormItem  label="详细街道：" prop="dPosition">
                            <Input  placeholder="" class="w260" v-model="submitItem.dPosition"></Input>
                            <div v-if="false">北京市朝阳区龙龙小区110号楼1单元102室</div>
                        </FormItem>
                        </Col>
                        <Col span="24"  v-if="eTypeE">
                            <FormItem  label="详细地址：" prop="dPosition">
                                <Input  placeholder="" class="w260" v-model="submitItem.dPosition"></Input>
                                <div v-if="false">北京市朝阳区龙龙小区110号楼1单元102室</div>
                            </FormItem>
                        </Col>
                    </Row>
            </Card>
        </Card>

        <Card :dis-hover="true" :bordered="false" style="margin-top:-15px;">
                <Card :dis-hover="true" :padding="0">
                    <p slot="title" class="setTitile"><span class="fl">企业资质</span><span class="fr">注：文件不超过10M格式要求JPG、JPEG、PNG格式</span></p>
                    <Row class="aptitude">
                        <Col span="24">
                        <FormItem  label="企业营业执照："  prop="imageUr1" v-if="submitItem.radio !== '6' && submitItem.radio !== '7'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList1">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView1(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove1(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload1"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList1"
                                    :on-success="handleSuccess1"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload1"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible1">
                                <img :src="submitItem.imageUr1" v-if="visible1" style="width: 100%">
                            </Modal>
                        </FormItem>

                        <FormItem  label="药品生产许可证：" prop="imageUr2" v-if="submitItem.radio === '8'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList2">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView2(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove2(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload2"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList2"
                                    :on-success="handleSuccess2"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload2"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible2">
                                <img :src="submitItem.imageUr2" v-if="visible2" style="width: 100%">
                            </Modal>
                        </FormItem>


                        <FormItem  label="药品经营许可证：" prop="imageUr2" v-if="submitItem.radio === '1' || submitItem.radio === '2' || submitItem.radio === '3' || submitItem.radio === '4' || submitItem.radio === '5'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList2">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView2(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove2(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload2"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList2"
                                    :on-success="handleSuccess2"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload2"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible2">
                                <img :src="submitItem.imageUr2" v-if="visible2" style="width: 100%">
                            </Modal>
                        </FormItem>


                        <FormItem  label="GMP证书：" prop="imageUr3" v-if="submitItem.radio === '8'" :class="{back:eTypeA}">
                            <div class="demo-upload-list" v-for="(item,index) in uploadList3">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView3(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove3(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload3"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList3"
                                    :on-success="handleSuccess3"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload3"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible3">
                                <img :src="submitItem.imageUr3" v-if="visible3" style="width: 100%">
                            </Modal>
                        </FormItem>

                        <FormItem  label="GSP证书：" prop="imageUr3" v-if="submitItem.radio === '1' || submitItem.radio === '2' || submitItem.radio === '3' || submitItem.radio === '4' || submitItem.radio === '5'" :class="{back:eTypeA}">
                            <div class="demo-upload-list" v-for="(item,index) in uploadList3">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView3(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove3(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload3"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList3"
                                    :on-success="handleSuccess3"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload3"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible3">
                                <img :src="submitItem.imageUr3" v-if="visible3" style="width: 100%">
                            </Modal>
                        </FormItem>

                        <FormItem  label="开户许可证：" prop="imageUr4"  v-if="submitItem.radio === '5' || submitItem.radio === '8'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList4">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView4(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove4(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload4"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList4"
                                    :on-success="handleSuccess4"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload4"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible4">
                                <img :src="submitItem.imageUr4" v-if="visible4" style="width: 100%">
                            </Modal>
                        </FormItem>
                        <FormItem  label="药品经营质量保证协议：" prop="imageUr5" v-if="submitItem.radio === '5' || submitItem.radio === '8'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList5">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView5(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove5(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload5"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList5"
                                    :on-success="handleSuccess5"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload5"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible5">
                                <img :src="submitItem.imageUr5" v-if="visible5" style="width: 100%">
                            </Modal>
                        </FormItem>
                        <FormItem  label="合格供货方档案表：" prop="imageUr6" v-if="submitItem.radio === '5' || submitItem.radio === '8'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList6">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView6(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove6(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload6"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList6"
                                    :on-success="handleSuccess6"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload6"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible6">
                                <img :src="submitItem.imageUr6" v-if="visible6" style="width: 100%">
                            </Modal>
                        </FormItem>
                        <FormItem  label="供货企业质量保证体系调查表：" prop="imageUr7" v-if="submitItem.radio === '5' || submitItem.radio === '8'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList7">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView7(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove7(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload7"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList7"
                                    :on-success="handleSuccess7"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload7"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible7">
                                <img :src="submitItem.imageUr7" v-if="visible7" style="width: 100%">
                            </Modal>
                        </FormItem>
                        <FormItem  label="出库单样本表：" prop="imageUr8" v-if="submitItem.radio === '5' || submitItem.radio === '8'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList8">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView8(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove8(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload8"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList8"
                                    :on-success="handleSuccess8"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload8"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible8">
                                <img :src="submitItem.imageUr8" v-if="visible8" style="width: 100%">
                            </Modal>
                        </FormItem>
                        <FormItem  label="印章印模（鲜章）：" prop="imageUr9" v-if="submitItem.radio === '5'" class='back'>
                            <div class="demo-upload-list" v-for="(item,index) in uploadList9">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView9(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove9(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload9"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList9"
                                    :on-success="handleSuccess9"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload9"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible9">
                                <img :src="submitItem.imageUr9" v-if="visible9" style="width: 100%">
                            </Modal>
                        </FormItem>




                        <FormItem  label="税票样本���" prop="imageUr10" v-if="submitItem.radio === '5' || submitItem.radio === '8'">
                            <div class="demo-upload-list" v-for="(item,index) in uploadList10">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView10(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove10(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload10"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList10"
                                    :on-success="handleSuccess10"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload10"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible10">
                                <img :src="submitItem.imageUr10" v-if="visible10" style="width: 100%">
                            </Modal>
                        </FormItem>

                        <FormItem  label="医疗机构执业许可证：" prop="imageUr11" v-if="submitItem.radio === '6' || submitItem.radio === '7'">
                            <div class="demo-upload-list" v-for="(item,index) in uploadList11">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView11(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove11(index)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                    ref="upload10"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList11"
                                    :on-success="handleSuccess11"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="10240"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload11"
                                    :headers='getTokenInfo'
                                    multiple
                                    type="drag"
                                    action="/api-webbff/v1/member/uploadFile2RGT"
                                    style="display: inline-block;width:130px;">
                                <div style="width: 127px;height:127px;line-height: 127px;">
                                    <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible11">
                                <img :src="submitItem.imageUr11" v-if="visible11" style="width: 100%">
                            </Modal>
                        </FormItem>
                        <!--<FormItem  label="logo：" v-if="eTypeE">-->
                            <!--<div class="demo-upload-list" v-for="(item,index) in uploadList12">-->
                                <!--<template v-if="item.status === 'finished'">-->
                                    <!--<img :src="item.url">-->
                                    <!--<div class="demo-upload-list-cover">-->
                                        <!--<Icon type="ios-eye-outline" @click.native="handleView12(item.url)"></Icon>-->
                                        <!--<Icon type="ios-trash-outline" @click.native="handleRemove12(index)"></Icon>-->
                                    <!--</div>-->
                                <!--</template>-->
                                <!--<template v-else>-->
                                    <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
                                <!--</template>-->
                            <!--</div>-->
                            <!--<Upload-->
                                    <!--ref="upload10"-->
                                    <!--:show-upload-list="false"-->
                                    <!--:default-file-list="defaultList12"-->
                                    <!--:on-success="handleSuccess12"-->
                                    <!--:format="['jpg','jpeg','png']"-->
                                    <!--:max-size="10240"-->
                                    <!--:on-format-error="handleFormatError"-->
                                    <!--:on-exceeded-size="handleMaxSize"-->
                                    <!--:before-upload="handleBeforeUpload12"-->
                                    <!--:headers='getTokenInfo'-->
                                    <!--multiple-->
                                    <!--type="drag"-->
                                    <!--action="/api-webbff/v1/member/uploadFile2RGT"-->
                                    <!--style="display: inline-block;width:130px;">-->
                                <!--<div style="width: 127px;height:127px;line-height: 127px;">-->
                                    <!--<Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>-->
                                <!--</div>-->
                            <!--</Upload>-->
                            <!--<Modal title="预览" v-model="visible12">-->
                                <!--<img :src="submitItem.imageUr12" v-if="visible12" style="width: 100%">-->
                            <!--</Modal>-->
                        <!--</FormItem>-->
                        </Col>
                    </Row>
                </Card>
        </Card>
        </Form>
        <div class="footerBtn">
            <Button type="warning" @click="enterpriseApplyForm('submitItem')">提交申请</Button>
        </div>
    </div>
</template>

<script>
    let vm = null;
    import Validates from '../../../libs/Validate';
    export default {
        name: "authority",
        data(){
            return{
                entAuthInfos: {
                    "entName": "",
                    "entAuthReason": "",
                    "entStatusCode": "",
                    "entStatus": "未认证"
                },
                creditCodeShow: true,
                isEdit: false,
                visible1: false,
                visible2: false,
                visible3: false,
                visible4: false,
                visible5: false,
                visible6: false,
                visible7: false,
                visible8: false,
                visible9: false,
                visible10: false,
                visible11: false,
                visible12: false,
                citys: false,
                districtsAll: false,
                eTypeA:true,//工业
                eTypeB:false,//医院 ,诊所
                eTypeC:false,//商业公司，连锁药加盟店，连锁药直营店，连锁药总店，单体
                eTypeD:true,
                eTypeE:true,
                creditCodeType: false,
                DrugsLicenceType:false,
                MedicalLicenceType:false,
                gspCertificateType:false,
                file: '',
                defaultList1: [
                    {
                        'url': ''
                    }
                ],
                defaultList2: [
                    {
                        'url': ''
                    }
                ],
                defaultList3: [
                    {
                        'url': ''
                    }
                ],
                defaultList4: [
                    {
                        'url': ''
                    }
                ],
                defaultList5: [
                    {
                        'url': ''
                    }
                ],
                defaultList6: [
                    {
                        'url': ''
                    }
                ],
                defaultList7: [
                    {
                        'url': ''
                    }
                ],
                defaultList8: [
                    {
                        'url': ''
                    }
                ],
                defaultList9: [
                    {
                        'url': ''
                    }
                ],
                defaultList10: [
                    {
                        'url': ''
                    }
                ],
                defaultList11: [
                    {
                        'url': ''
                    }
                ],
                defaultList12: [
                    {
                        'url': ''
                    }
                ],
                uploadList1: [],
                uploadList2: [],
                uploadList3: [],
                uploadList4: [],
                uploadList5: [],
                uploadList6: [],
                uploadList7: [],
                uploadList8: [],
                uploadList9: [],
                uploadList10: [],
                uploadList11: [],
                uploadList12: [],
                readerResult: '',
                submitItem:{
                    radio:'8',
                    eName:'',
                    creditCode:'',
                    gspstartTime: '',//查询条件-开始时间
                    gspendTime: '',//查询条件-结束时间
                    creditCodestartTime: '',//查询条件-开始时间
                    creditCodestartTimeValue: '',
                    creditCodeendTime: '',//查询条件-结束时间
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
                    dPosition:'',
                    imageUr1 : '',    //广告图片路径 ,
                    imageUr2 : '',
                    imageUr3 : '',
                    imageUr4 : '',
                    imageUr5 : '',
                    imageUr6 : '',
                    imageUr7 : '',
                    imageUr8 : '',
                    imageUr9 : '',
                    imageUr10 : '',
                    imageUr11 : '',
                    imageUr12 : ''
                },
                listProvince: [],
                listCities: [],
                listDistricts: [],
                ruleValidate: {
                    radio: [
                        { required: true, message: '请选择企业类型！', trigger: 'change' }
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
                        { required: true, message: '请填写GSP/GMP证书!', trigger: 'blur' }
                    ],
                    gspstartTime:[
                        { required: true, message: '请填写开始时间!', trigger: 'blur' }
                    ],
                    gspendTime:[
                        { required: true, message: '请填写结束时间!', trigger: 'blur' }
                    ],
                    enContacts:[
                        { required: true, message: '请填写企业联系人！', trigger: 'blur' }
                    ],
                    mobile:[
                        { required: true,
                            trigger: 'blur' ,
                            validator: (rule, v, callback) => {
                                if (v === ''|| v===null) {
                                    callback(new Error('联系手机不能为空'));
                                } else if(!/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.submitItem.mobile)){
                                    callback(new Error('请输入正确联系手机'));
                                }else {
                                    callback();
                                }
                            }
                        }
                    ],
                    enterpriseAddressProvince:[
                        { required: true, message: '请选择所属区域！', trigger: 'blur' }
                    ],
                    dPosition:[
                        { required: true, message: '请填写详细街道！', trigger: 'blur' }
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
                        {required: true, message: '供货企业质量保证体系调查表图片必选', trigger: 'change'}
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
                    // imageUr12: [
                    //     {required: true, message: 'logo图片必选', trigger: 'change'}
                    // ]
                },
                start_creditCode: {
                    disabledDate (date) {
                            let end = vm.submitItem.creditCodeendTime;
                            return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_creditCode: {
                    disabledDate (date) {
                            let start = vm.submitItem.creditCodestartTime;
                            return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
                start_DrugsLicence: {
                    disabledDate (date) {
                        let end = vm.submitItem.DrugsLicenceendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_DrugsLicence: {
                    disabledDate (date) {
                        let start = vm.submitItem.DrugsLicencestartTime;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
                start_MedicalLicence: {
                    disabledDate (date) {
                        let end = vm.submitItem.MedicalLicenceendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_MedicalLicence: {
                    disabledDate (date) {
                        let start = vm.submitItem.DrugsLicencestartTime;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
                start_gspCertificate:{
                    disabledDate (date) {
                        let end = vm.submitItem.gspendTime;
                        return date && date.valueOf() > new Date(end).getTime();
                    }
                },
                end_gspCertificate: {
                    disabledDate (date) {
                        let start = vm.submitItem.gspstartTime;
                        return date && date.valueOf() < new Date(start).getTime() - 24*60*60*1000 + 1000;
                    }
                },
            }

        },
        computed: {
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
            getEntTypes () {
                return this.$store.getters.getEntType
            },
            getSupplierIds () {
                return this.$store.getters.getSupplierId
            },
            getUserTypes () {
                return this.$store.getters.getUserType
            }
        },
        methods: {
            // 统一社会信用代码
            handleRemove1 (index) { //删除
                this.uploadList1.splice(index, 1)
                if (this.uploadList1.length === 0) {
                    this.submitItem.imageUr1 = ''
                }
            },
            handleView1(url){ //图片预览
                this.visible1 = true;
                this.submitItem.imageUr1 = url;
            },
            handleSuccess1 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr1,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList1 = arr;
            },
            handleBeforeUpload1 (file) {// ���传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr1 = reader.result
                };
            },
            creditCodeChecked (b) {
                if (b) {
                    this.submitItem.creditCodeendTime = '';
                }
            },
            // 药品经营许可证
            handleRemove2 (index) { //删除
                this.uploadList2.splice(index, 1)
                if (this.uploadList2.length === 0) {
                    this.submitItem.imageUr2 = ''
                }
            },
            handleView2(url){ //图片预览
                this.visible2= true;
                this.submitItem.imageUr2 = url;
            },
            handleSuccess2 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr2,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList2 = arr;
            },
            handleBeforeUpload2 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr2 = reader.result
                };
            },
            drugsLicenceChecked (b) {
                if (b) {
                    this.submitItem.DrugsLicenceendTime = '';
                }
            },
            // GSP证书
            handleRemove3 (index) { //删除
                this.uploadList3.splice(index, 1)
                if (this.uploadList3.length === 0) {
                    this.submitItem.imageUr3 = ''
                }
            },
            handleView3(url){ //图片预览
                this.visible3= true;
                this.submitItem.imageUr3 = url;
            },
            handleSuccess3 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr3,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList3 = arr;
            },
            gspCertificateChecked (b) {
                if (b) {
                    this.submitItem.gspendTime = '';
                }
            },
            handleBeforeUpload3 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr3 = reader.result
                };
            },
            // 开户许可证
            handleRemove4 (index) { //删除
                this.uploadList4.splice(index, 1)
                if (this.uploadList4.length === 0) {
                    this.submitItem.imageUr4 = ''
                }
            },
            handleView4(url){ //图片预览
                this.visible4= true;
                this.submitItem.imageUr4 = url;
            },
            handleSuccess4 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr4,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList4 = arr;
            },
            handleBeforeUpload4 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr4 = reader.result
                };
            },
            // 药品经营质量保证协议
            handleRemove5 (index) { //删除
                this.uploadList5.splice(index, 1)
                if (this.uploadList5.length === 0) {
                    this.submitItem.imageUr5 = ''
                }
            },
            handleView5(url){ //图片预览
                this.visible5= true;
                this.submitItem.imageUr5 = url;
            },
            handleSuccess5 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr5,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList5 = arr
            },
            handleBeforeUpload5 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr5 = reader.result
                };
            },
            // 合格供货方档案表
            handleRemove6 (index) { //删除
                this.uploadList6.splice(index, 1)
                if (this.uploadList6.length === 0) {
                    this.submitItem.imageUr6 = ''
                }
            },
            handleView6(url){ //图片预览
                this.visible6= true;
                this.submitItem.imageUr6 = url;
            },
            handleSuccess6 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr6,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList6 = arr;
            },
            handleBeforeUpload6 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr6 = reader.result
                };
            },
            // 供货企业质量保证体系调查表
            handleRemove7 (index) { //删除
                this.uploadList7.splice(index, 1)
                if (this.uploadList7.length === 0) {
                    this.submitItem.imageUr7 = ''
                }
            },
            handleView7(url){ //图片预览
                this.visible7= true;
                this.submitItem.imageUr7 = url;
            },
            handleSuccess7 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr7,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList7 = arr;
            },
            handleBeforeUpload7 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr7 = reader.result
                };
            },
            // 出库单样本表
            handleRemove8 (index) { //删除
                this.uploadList8.splice(index, 1)
                if (this.uploadList8.length === 0) {
                    this.submitItem.imageUr8 = ''
                }
            },
            handleView8(url){ //图片预览
                this.visible8= true;
                this.submitItem.imageUr8 = url;
            },
            handleSuccess8 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr8,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data);
                this.uploadList8 = arr;
            },
            handleBeforeUpload8 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr8 = reader.result
                };
            },
            // 印章印模（鲜章）
            handleRemove9 (index) { //删除
                this.uploadList9.splice(index, 1)
                if (this.uploadList9.length === 0) {
                    this.submitItem.imageUr9 = ''
                }
            },
            handleView9(url){ //图片预览
                this.visible9= true;
                this.submitItem.imageUr9 = url;
            },
            handleSuccess9 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr9,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList9 = arr;
            },
            handleBeforeUpload9 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr9 = reader.result
                };
            },
            // 税票样本
            handleRemove10 (index) { //删除
                this.uploadList10.splice(index, 1)
                if (this.uploadList10.length === 0) {
                    this.submitItem.imageUr10 = ''
                }
            },
            handleView10(url){ //图片预览
                this.visible10= true;
                this.submitItem.imageUr10 = url;
            },
            handleSuccess10 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr10,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList10 = arr;
            },
            handleBeforeUpload10 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr10 = reader.result
                };
            },
            // 医疗机构执业许可证
            handleRemove11 (index) { //删除
                this.uploadList11.splice(index, 1)
                if (this.uploadList11.length === 0) {
                    this.submitItem.imageUr11 = ''
                }
            },
            handleView11(url){ //图片预览
                this.visible11= true;
                this.submitItem.imageUr11 = url;
            },
            handleSuccess11 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr11,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList11 = arr;
            },
            handleBeforeUpload11 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr11 = reader.result
                };
            },



            // logo
            handleRemove12 (index) { //删除
                this.uploadList12.splice(index, 1)
                if (this.uploadList12.length === 0) {
                    this.submitItem.imageUr11 = ''
                }
            },
            handleView12(url){ //图片预览
                this.visible12= true;
                this.submitItem.imageUr12 = url;
            },
            handleSuccess12 (res, file ,fileList) {// 图片上传成功之后的赋值
                let arr = [];
                let dataUrlInfo = ''
                if (res.success === 1) {
                    dataUrlInfo = res.data
                } else {
                    dataUrlInfo = ''
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: this.submitItem.imageUr12,
                    status: 'finished',
                    dataUrl: dataUrlInfo
                }
                arr.push(data)
                this.uploadList12 = arr;
            },
            handleBeforeUpload12 (file) {// 上传前钩子函数
                let that = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    that.submitItem.imageUr12 = reader.result
                };
            },





            medicalLicenceChecked (b) {
                if (b) {
                    this.submitItem.MedicalLicenceendTime = '';
                }
            },
            handleFormatError (file) { // 错误提示
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: 'File format of ' + file.name + ' 文件格式不正确，请选择JPG或PNG.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: 'File  ' + file.name + ' 太大，不超过10M.'
                });
            },
            // 获取认证状态
            getAuth (id) {
                let self = this;
                this.$https.post('/api-webbff/v1/member/getEntAuthAuditProgress2RGT',{
                    entId: id
                })
                    .then(res => {
                        let entAuthInfo = res.data.data;
                        if (res.data.success === 1) {
                            self.entAuthInfos = entAuthInfo
                            if (entAuthInfo.entStatusCode === 1 || entAuthInfo.entStatusCode === -1) { // 1:已认证 -1:驳回
                                self.$nextTick(()=> {
                                    if ((self.getEntTypes === 5 && self.getSupplierIds !== 0) || self.getEntTypes === 8) {
                                        self.editTwo()
                                    } else {
                                        self.edit()
                                    }
                                })
                            }
                        } else {
                            self.$Message.error('获取认证状态失败');
                        }
                    })
                    .catch(err => {
                        self.$Message.error('获取认证状态失败');
                    })
            },
            // 获取城市信息
            getProvinceCityNames (type) {
                let that = this;
                let id = ''
                if (type === 0) {
                    id = ''
                }
                if (type === 1) {
                    id = that.submitItem.enterpriseAddressProvince === '0'? '': that.submitItem.enterpriseAddressProvince
                }
                if (type === 2) {
                    id = that.submitItem.enterpriseAddressCity === '0'? '': that.submitItem.enterpriseAddressCity
                }
                this.$https.post('/api-webbff/v1/common/getAddressByLcode',{
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
                                that.submitItem.enterpriseAddressCity = '0';
                                that.submitItem.enterpriseAddressCountry = '0';
                                that.listCities = addr;
                            }
                            if (type === 1 && id === '') {
                                that.citys = false;
                                that.districtsAll = false;
                                that.submitItem.enterpriseAddressCity = '0';
                                that.submitItem.enterpriseAddressCountry = '0';
                            }
                            if (type === 2 && id === '') {
                                that.districtsAll = false;
                                that.listDistricts = [];
                                that.submitItem.enterpriseAddressCountry = '0';
                            }
                            if (type === 2 && id !== '') {
                                if (addr.length !== 0) {
                                    that.districtsAll = true;
                                    that.listDistricts = addr;
                                    that.submitItem.enterpriseAddressCountry = '0';
                                } else {
                                    that.submitItem.enterpriseAddressCountry = '0';
                                    that.districtsAll = false;
                                }
                            }

                    }
                }).catch(e => {
                    this.$Message.error('请求省市接口失败！');
                });
            },
            /**
             * 新增或编辑保存
             */
            enterpriseApplyForm: function (name) {
                /*
                 * eTypeA:true,//工业
                 * eTypeB:false,//医院 ,诊所
                 * eTypeC:false,//商业公司，连锁药加盟店，连锁药直营店，连锁药总店，单体
                 * elegal: "" 法人
                 * elegalNo: "" 法人身份证
                 *
                 **/
                if (this.entAuthInfos.entStatusCode === 2) {
                    this.$message.info('待审核中，无法重复提交')
                    return
                }
                let self = this;
                let data = {}
                if (this.eTypeE) {
                    if (this.eTypeD) {
                        data = {
                            uid: self.getUids, // 用户ID
                            suType: self.submitItem.radio, // 企业类型
                            suName: self.submitItem.eName, // 企业名称
                            suAddress: self.submitItem.dPosition, // 详细地址
                            suContactor: self.submitItem.enContacts, // 联系人
                            suTel: self.submitItem.mobile, // 联系人电话
                            suLicenseNo: self.submitItem.creditCode, // 工商注册号
                            suLogo: '2019/03/08/697f01f304934f4696834f3dc483b98d.jpg',
                            epList: [
                                {
                                    epNo: self.submitItem.creditCode, // 营业执照
                                    epStartTime: self.submitItem.creditCodestartTime,
                                    epEndTime: self.submitItem.creditCodeendTime,
                                    epPic: self.uploadList1[0] === undefined ? '' : self.uploadList1[0].dataUrl,
                                    epType: 1
                                },
                                {
                                    epNo: self.submitItem.DrugsLicence, // 药品生产许可证
                                    epStartTime: self.submitItem.DrugsLicencestartTime,
                                    epEndTime: self.submitItem.DrugsLicenceendTime,
                                    epPic: self.uploadList2[0] === undefined ? '' : self.uploadList2[0].dataUrl,
                                    epType: 31
                                },
                                {
                                    epNo: self.submitItem.gspCertificate, // GMP证书
                                    epStartTime: self.submitItem.gspstartTime,
                                    epEndTime: self.submitItem.gspendTime,
                                    epPic: self.uploadList3[0] === undefined ? '' : self.uploadList3[0].dataUrl,
                                    epType: 12
                                },
                                {
                                    epNo: '', // 开户许可证
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList4[0] === undefined ? '' : self.uploadList4[0].dataUrl,
                                    epType: 11
                                },
                                {
                                    epNo: '', // 药品经营质量保证协议
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList5[0] === undefined ? '' : self.uploadList5[0].dataUrl,
                                    epType: 14
                                },
                                {
                                    epNo: '', // 合格供货方档案表
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList6[0] === undefined ? '' : self.uploadList6[0].dataUrl,
                                    epType: 15
                                },
                                {
                                    epNo: '', // 供货企业质量保证体系调查表
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList7[0] === undefined ? '' : self.uploadList7[0].dataUrl,
                                    epType: 16
                                },
                                {
                                    epNo: '', // 出库单样本表
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList8[0] === undefined ? '' : self.uploadList8[0].dataUrl,
                                    epType: 17
                                },
                                {
                                    epNo: '', // 印章印模（鲜章）
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList9[0] === undefined ? '' : self.uploadList9[0].dataUrl,
                                    epType: 19
                                },
                                {
                                    epNo: '', // 税票样本
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList10[0] === undefined ? '' : self.uploadList10[0].dataUrl,
                                    epType: 20
                                }
                            ]
                        }
                    } else {
                        data = {
                            uid: self.getUids, // 用户ID
                            suType: self.submitItem.radio, // 企业类型
                            suName: self.submitItem.eName, // 企业名称
                            suAddress: self.submitItem.dPosition, // 详细地址
                            suContactor: self.submitItem.enContacts, // 联系人
                            suTel: self.submitItem.mobile, // 联系人电话
                            suLicenseNo: self.submitItem.creditCode, // 工商注册号
                            suLogo: '2019/03/08/697f01f304934f4696834f3dc483b98d.jpg',
                            epList: [
                                {
                                    epNo: self.submitItem.creditCode, // 营业执照
                                    epStartTime: self.submitItem.creditCodestartTime,
                                    epEndTime: self.submitItem.creditCodeendTime,
                                    epPic: self.uploadList1[0] === undefined ? '' : self.uploadList1[0].dataUrl,
                                    epType: 1
                                },
                                {
                                    epNo: self.submitItem.DrugsLicence, // 药品经营许可证
                                    epStartTime: self.submitItem.DrugsLicencestartTime,
                                    epEndTime: self.submitItem.DrugsLicenceendTime,
                                    epPic: self.uploadList2[0] === undefined ? '' : self.uploadList2[0].dataUrl,
                                    epType: 2
                                },
                                {
                                    epNo: self.submitItem.gspCertificate, // GSP证书
                                    epStartTime: self.submitItem.gspstartTime,
                                    epEndTime: self.submitItem.gspendTime,
                                    epPic: self.uploadList3[0] === undefined ? '' : self.uploadList3[0].dataUrl,
                                    epType: 3
                                },
                                {
                                    epNo: '', // 开户许可证
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList4[0] === undefined ? '' : self.uploadList4[0].dataUrl,
                                    epType: 11
                                },
                                {
                                    epNo: '', // 药品经营质量保证协议
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList5[0] === undefined ? '' : self.uploadList5[0].dataUrl,
                                    epType: 14
                                },
                                {
                                    epNo: '', // 合格供货方档案表
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList6[0] === undefined ? '' : self.uploadList6[0].dataUrl,
                                    epType: 15
                                },
                                {
                                    epNo: '', // 供货企业质量保证体系调查表
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList7[0] === undefined ? '' : self.uploadList7[0].dataUrl,
                                    epType: 16
                                },
                                {
                                    epNo: '', // 出库单样本表
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList8[0] === undefined ? '' : self.uploadList8[0].dataUrl,
                                    epType: 17
                                },
                                {
                                    epNo: '', // 印章印模（鲜章）
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList9[0] === undefined ? '' : self.uploadList9[0].dataUrl,
                                    epType: 19
                                },
                                {
                                    epNo: '', // 税票样本
                                    epStartTime: '',
                                    epEndTime: '',
                                    epPic: self.uploadList10[0] === undefined ? '' : self.uploadList10[0].dataUrl,
                                    epType: 20
                                }
                            ]
                        }
                    }
                }
                if (this.eTypeB) {
                    data = {
                        uid: self.getUids, // 用户ID
                        ename: self.submitItem.eName, // 企业名称
                        etype: self.submitItem.radio, // 企业类型
                        eprovince: self.submitItem.enterpriseAddressProvince, // 省
                        ecity: self.submitItem.enterpriseAddressCity, // 市
                        eregion: self.submitItem.enterpriseAddressCountry, // 区县
                        eaddress: self.submitItem.dPosition, // 详细地址
                        econtactor: self.submitItem.enContacts, // 联系人
                        emobile: self.submitItem.mobile, // 联系人电话
                        elicenseNo: self.submitItem.creditCode, // 工商注册号
                        etradingNo: self.submitItem.MedicalLicence, // 交易许可证号
                        epList: [
                            {
                                epNo: self.submitItem.creditCode, // 资质编号
                                epStartTime: self.submitItem.creditCodestartTime,
                                epEndTime: self.submitItem.creditCodeendTime,
                                epPic: '',
                                epType: 1
                            },
                            {
                                epNo: self.submitItem.MedicalLicence, // 医疗机构执业许可证
                                epStartTime: self.submitItem.MedicalLicencestartTime,
                                epEndTime: self.submitItem.MedicalLicenceendTime,
                                epPic: self.uploadList11[0] === undefined ? '' : self.uploadList11[0].dataUrl,
                                epType: 13
                            }
                        ]
                    }
                }
                if (this.eTypeC) {
                    data = {
                        uid: self.getUids, // 用户ID
                        ename: self.submitItem.eName, // 企业名称
                        etype: self.submitItem.radio, // 企业类型
                        eprovince: self.submitItem.enterpriseAddressProvince, // 省
                        ecity: self.submitItem.enterpriseAddressCity, // 市
                        eregion: self.submitItem.enterpriseAddressCountry, // 区县
                        eaddress: self.submitItem.dPosition, // 详细地址
                        econtactor: self.submitItem.enContacts, // 联系人
                        emobile: self.submitItem.mobile, // 联系人电话
                        elicenseNo: self.submitItem.creditCode, // 工商注册号
                        etradingNo: self.submitItem.DrugsLicence, // 交易许可证号
                        egspNo: self.submitItem.gspCertificate, // GSP证书
                        epList: [
                            {
                                epNo: self.submitItem.creditCode, // 资质编号
                                epStartTime: self.submitItem.creditCodestartTime,
                                epEndTime: self.submitItem.creditCodeendTime,
                                epPic: self.uploadList1[0] === undefined ? '' : self.uploadList1[0].dataUrl,
                                epType: 1
                            },
                            {
                                epNo: self.submitItem.DrugsLicence, // 药品经营许可证
                                epStartTime: self.submitItem.DrugsLicencestartTime,
                                epEndTime: self.submitItem.DrugsLicenceendTime,
                                epPic: self.uploadList2[0] === undefined ? '' : self.uploadList2[0].dataUrl,
                                epType: 2
                            },
                            {
                                epNo: self.submitItem.gspCertificate, // GSP证书
                                epStartTime: self.submitItem.gspstartTime,
                                epEndTime: self.submitItem.gspendTime,
                                epPic: self.uploadList3[0] === undefined ? '' : self.uploadList3[0].dataUrl,
                                epType: 3
                            }
                        ]
                    }
                }
                if (this.eTypeE) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            self.$https.post('/api-webbff/v1/member/applySupplierAuth2RGT', data)
                                .then(res => {
                                    if (res.data.success === 1) {
                                        self.getEntIdInfos()
                                    } else {
                                        self.$message.success('提交失败');
                                    }
                                })
                                .catch(err => {
                                    self.$message.success('提交失败');
                                })
                        }
                    })
                } else {
                    this.$refs[name].validate((valid) => { // 注：提交成功 但融贯通接口返回598
                        if (valid) {
                            self.$https.post('/api-webbff/v1/member/applyEntAuth2RGT', data)
                                .then(res => {
                                    if (res.data.success === 1) {
                                        self.getEntIdInfos()
                                    } else {
                                        self.$message.error('提交失败');
                                    }
                                })
                                .catch(err => {
                                    self.$message.error('提交失败');
                                })
                        }
                    })
                }
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
                         that.submitItem.enterpriseAddressCity = citys
                         if (countrys !==null && countrys !== '') {
                             that.$https.post('/api-webbff/v1/common/getAddressByLcode',{
                                 lcode: citys
                             }).then(res => {
                                 that.districtsAll = true;
                                 that.listDistricts = res.data.data
                                 that.submitItem.enterpriseAddressCountry = countrys
                             }).catch(e => {
                                 that.$Message.error('地址回显失败');
                             });
                         }
                     }
                 }).catch(e => {
                     that.$Message.error('请求省市接口失败！');
                 });
            },
            // 重新编辑 获取数据
            edit () {
                let self = this;
                this.$https.post('/api-webbff/v1/member/getEntInfoByEntId2RGT', {
                    entId: this.getEntIds
                })
                    .then(res => {
                        if (res.data.success === 1) {
                            let entinfo = res.data.data;
                            let authArr = ['', null, undefined, 'null'];
                            self.submitItem.eName = entinfo.ename; // 企业名称
                            self.submitItem.radio = String(entinfo.etype); // 企业类型
                            self.submitItem.enterpriseAddressProvince = entinfo.eprovince;
                            if (!authArr.includes(entinfo.eprovince) && authArr.includes(entinfo.ecity)) {
                                self.adressShow(entinfo.eprovince,'0',entinfo.eregion);
                            } else {
                                self.adressShow(entinfo.eprovince,entinfo.ecity,entinfo.eregion);
                            }
                            self.submitItem.dPosition = entinfo.eaddress; // 详细地址
                            self.submitItem.enContacts = entinfo.econtactor; // 联系人
                            self.submitItem.mobile = entinfo.emobile; // 联系人电话
                            self.submitItem.creditCode = entinfo.elicenseNo; // 工商注册号
                            if (entinfo.etype ===6 || entinfo.etype === 7) {  // 医院|诊所
                                self.submitItem.MedicalLicence = entinfo.etradingNo  // 医疗机构执业许可证
                            } else {
                                self.submitItem.DrugsLicence = entinfo.etradingNo; // 药品经营许可证
                            }
                            for (let item of entinfo.epList) {
                                // 数据反显
                                if (item.epType === 1) { // 所有都包含 企业营业执照
                                    self.submitItem.creditCodestartTime = self.filterDate(item.epStartTime);
                                    if (item.epEndTime === null || item.epEndTime === '') {
                                        self.$nextTick(()=> {
                                            self.creditCodeType = true;
                                        })
                                    } else {
                                        self.submitItem.creditCodeendTime = self.filterDate(item.epEndTime);
                                    }
                                }
                                if (entinfo.etype === 6 || entinfo.etype === 7) { // 医院|诊所
                                    if (item.epType === 13) { // 医疗机构执业许可证
                                        self.submitItem.MedicalLicencestartTime = self.filterDate(item.epStartTime);
                                        if (item.epEndTime === null || item.epEndTime === '') {
                                            self.MedicalLicenceType = true;
                                        } else {
                                            self.submitItem.MedicalLicenceendTime = self.filterDate(item.epEndTime);
                                        }
                                    }
                                } else { // 其它
                                    if (item.epType === 2) { // 药品经营（生产）许可证
                                        self.submitItem.DrugsLicencestartTime = self.filterDate(item.epStartTime);
                                        if (item.epEndTime === null || item.epEndTime === '') {
                                            self.DrugsLicenceType = true;
                                        } else {
                                            self.submitItem.DrugsLicenceendTime = self.filterDate(item.epEndTime);
                                        }
                                    }
                                    if (item.epType === 3) { // GSP证书
                                        self.submitItem.gspCertificate = item.epNo;
                                        self.submitItem.gspstartTime = self.filterDate(item.epStartTime);
                                        if (item.epEndTime === null || item.epEndTime === '') {
                                            self.gspCertificateType = true;
                                        } else {
                                            self.submitItem.gspendTime = self.filterDate(item.epEndTime);
                                        }
                                    }
                                }

                                // 图片反显
                                if (item.epType === 1 && item.imgUrl !== null) { // 营业执照
                                    let arr = [];
                                    let data = {
                                        name: '1',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList1 = arr;
                                    self.submitItem.imageUr1 = item.epPic;
                                }
                                if (item.epType === 2 && item.imgUrl !== null) { // 药品经营许可证
                                    let arr = [];
                                    let data = {
                                        name: '2',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList2 = arr;
                                    self.submitItem.imageUr2 = item.epPic;
                                }
                                if (item.epType === 3 && item.imgUrl !== null) { // GSP证书
                                    let arr = [];
                                    let data = {
                                        name: '3',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList3 = arr;
                                    self.submitItem.imageUr3 = item.epPic;
                                }
                                if (item.epType === 11 && item.imgUrl !== null) { // 开户许可证
                                    let arr = [];
                                    let data = {
                                        name: '4',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList4 = arr;
                                    self.submitItem.imageUr4 = item.epPic;
                                }
                                if (item.epType === 14 && item.imgUrl !== null) { // 药品经营质量保证协议
                                    let arr = [];
                                    let data = {
                                        name: '5',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList5 = arr;
                                    self.submitItem.imageUr5 = item.epPic;
                                }
                                if (item.epType === 15 && item.imgUrl !== null) { // 合格供货方档案表
                                    let arr = [];
                                    let data = {
                                        name: '6',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList6 = arr;
                                    self.submitItem.imageUr6 = item.epPic;
                                }
                                if (item.epType === 16 && item.imgUrl !== null) { // 供货企业质量保证体系调查表
                                    let arr = [];
                                    let data = {
                                        name: '7',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList7 = arr;
                                    self.submitItem.imageUr7 = item.epPic;
                                }
                                if (item.epType === 17 && item.imgUrl !== null) { // 出库单样本表
                                    let arr = [];
                                    let data = {
                                        name: '8',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList8 = arr;
                                    self.submitItem.imageUr8 = item.epPic;
                                }
                                if (item.epType === 19 && item.imgUrl !== null) { // 印章印模（鲜章）
                                    let arr = [];
                                    let data = {
                                        name: '9',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList9 = arr;
                                    self.submitItem.imageUr9 = item.epPic;
                                }
                                if (item.epType === 20 && item.imgUrl !== null) { // 印章印模（鲜章）
                                    let arr = [];
                                    let data = {
                                        name: '10',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList10 = arr;
                                    self.submitItem.imageUr10 = item.epPic;
                                }
                                if (item.epType === 13 && item.imgUrl !== null) { // 医疗机构执业许可证
                                    let arr = [];
                                    let data = {
                                        name: '11',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList11 = arr;
                                    self.submitItem.imageUr11 = item.epPic;
                                }
                            }
                        } else {
                            self.$Message.error('获取信息失败！');
                        }
                    })
                    .catch(err => {
                        self.$Message.error('获取信息失败！');
                    })
            },
            // 商业和工业编辑
            editTwo () {
                let self = this;
                this.$https.post('/api-webbff/v1/member/getSupplierInfoBySuId2RGT', {
                    suId: this.getSupplierIds
                })
                    .then(res => {
                        if (res.data.success === 1) {
                            let entinfo = res.data.data
                            self.submitItem.eName = entinfo.suName; // 企业名称
                            if (entinfo.suType === 1) {
                                self.submitItem.radio = '5';
                            }
                            if (entinfo.suType === 2) {
                                self.submitItem.radio = '8';
                            }
                            // self.submitItem.enterpriseAddressProvince = entinfo.eprovince;
                            // self.adressShow(entinfo.eprovince,entinfo.ecity,entinfo.eregion);
                            self.submitItem.dPosition = entinfo.suAddress; // 详细地址
                            self.submitItem.enContacts = entinfo.suContactor; // 联系人
                            self.submitItem.mobile = entinfo.suTel; // 联系人电话
                            self.submitItem.creditCode = entinfo.suLicenseNo; // 工商注册号
                            // self.submitItem.DrugsLicence = entinfo.etradingNo; // 药品经营许可证
                            for (let item of entinfo.epList) {
                                // 数据反显
                                if (item.epType === 1) { // 所有都包含 企业营业执照
                                    self.submitItem.creditCodestartTime = self.filterDate(item.epStartTime);
                                    if (item.epEndTime === null || item.epEndTime === '') {
                                        self.$nextTick(()=> {
                                            self.creditCodeType = true;
                                        })
                                    } else {
                                        self.submitItem.creditCodeendTime = self.filterDate(item.epEndTime);
                                    }
                                }
                                if (entinfo.etype === 6 || entinfo.etype === 7) { // 医院|诊所
                                    if (item.epType === 13) { // 医疗机构执业许可证
                                        self.submitItem.MedicalLicencestartTime = self.filterDate(item.epStartTime);
                                        if (item.epEndTime === null || item.epEndTime === '') {
                                            self.MedicalLicenceType = true;
                                        } else {
                                            self.submitItem.MedicalLicenceendTime = self.filterDate(item.epEndTime);
                                        }
                                    }
                                } else { // 其它
                                    if (item.epType === 2) { // 药品经营（生产）许可证
                                        self.submitItem.DrugsLicence = item.epNo
                                        self.submitItem.DrugsLicencestartTime = self.filterDate(item.epStartTime);
                                        if (item.epEndTime === null || item.epEndTime === '') {
                                            self.DrugsLicenceType = true;
                                        } else {
                                            self.submitItem.DrugsLicenceendTime = self.filterDate(item.epEndTime);
                                        }
                                    }
                                    if (item.epType === 31) { // 药品经营（生产）许可证
                                        self.submitItem.DrugsLicence = item.epNo
                                        self.submitItem.DrugsLicencestartTime = self.filterDate(item.epStartTime);
                                        if (item.epEndTime === null || item.epEndTime === '') {
                                            self.DrugsLicenceType = true;
                                        } else {
                                            self.submitItem.DrugsLicenceendTime = self.filterDate(item.epEndTime);
                                        }
                                    }
                                    if (entinfo.suType === 1) {
                                        if (item.epType === 3) { // GSP证书
                                            self.submitItem.gspCertificate = item.epNo;
                                            self.submitItem.gspstartTime = self.filterDate(item.epStartTime);
                                            if (item.epEndTime === null || item.epEndTime === '') {
                                                self.gspCertificateType = true;
                                            } else {
                                                self.submitItem.gspendTime = self.filterDate(item.epEndTime);
                                            }
                                        }
                                    }
                                    if (entinfo.suType === 2) {
                                        if (item.epType === 12) { // GMP证书
                                            self.submitItem.gspCertificate = item.epNo;
                                            self.submitItem.gspstartTime = self.filterDate(item.epStartTime);
                                            if (item.epEndTime === null || item.epEndTime === '') {
                                                self.gspCertificateType = true;
                                            } else {
                                                self.submitItem.gspendTime = self.filterDate(item.epEndTime);
                                            }
                                        }
                                    }
                                }

                                // 图片反显
                                if (item.epType === 1 && item.imgUrl !== null) { // 营业执照
                                    let arr = [];
                                    let data = {
                                        name: '1',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList1 = arr;
                                    self.submitItem.imageUr1 = item.epPic;
                                }
                                if (item.epType === 2 && item.imgUrl !== null) { // 药品经营许可证
                                    let arr = [];
                                    let data = {
                                        name: '2',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList2 = arr;
                                    self.submitItem.imageUr2 = item.epPic;
                                }
                                if (item.epType === 31 && item.imgUrl !== null) { // 药品经营许可证
                                    let arr = [];
                                    let data = {
                                        name: '2',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList2 = arr;
                                    self.submitItem.imageUr2 = item.epPic;
                                }
                                if (item.epType === 3 && item.imgUrl !== null) { // GSP证书
                                    let arr = [];
                                    let data = {
                                        name: '3',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList3 = arr;
                                    self.submitItem.imageUr3 = item.epPic;
                                }
                                if (item.epType === 12 && item.imgUrl !== null) { // GSP证书
                                    let arr = [];
                                    let data = {
                                        name: '3',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList3 = arr;
                                    self.submitItem.imageUr3 = item.epPic;
                                }
                                if (item.epType === 11 && item.imgUrl !== null) { // 开户许可证
                                    let arr = [];
                                    let data = {
                                        name: '4',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList4 = arr;
                                    self.submitItem.imageUr4 = item.epPic;
                                }
                                if (item.epType === 14 && item.imgUrl !== null) { // 药品经营质量保证协议
                                    let arr = [];
                                    let data = {
                                        name: '5',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList5 = arr;
                                    self.submitItem.imageUr5 = item.epPic;
                                }
                                if (item.epType === 15 && item.imgUrl !== null) { // 合格供货方档案表
                                    let arr = [];
                                    let data = {
                                        name: '6',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList6 = arr;
                                    self.submitItem.imageUr6 = item.epPic;
                                }
                                if (item.epType === 16 && item.imgUrl !== null) { // 供货企业质量保证体系调查表
                                    let arr = [];
                                    let data = {
                                        name: '7',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList7 = arr;
                                    self.submitItem.imageUr7 = item.epPic;
                                }
                                if (item.epType === 17 && item.imgUrl !== null) { // 出库单样本表
                                    let arr = [];
                                    let data = {
                                        name: '8',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList8 = arr;
                                    self.submitItem.imageUr8 = item.epPic;
                                }
                                if (item.epType === 19 && item.imgUrl !== null) { // 印章印模（鲜章）
                                    let arr = [];
                                    let data = {
                                        name: '9',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList9 = arr;
                                    self.submitItem.imageUr9 = item.epPic;
                                }
                                if (item.epType === 20 && item.imgUrl !== null) { // 印章印模（鲜章）
                                    let arr = [];
                                    let data = {
                                        name: '10',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList10 = arr;
                                    self.submitItem.imageUr10 = item.epPic;
                                }
                                if (item.epType === 13 && item.imgUrl !== null) { // 医疗机构执业许可证
                                    let arr = [];
                                    let data = {
                                        name: '11',
                                        url: item.imgUrl,
                                        status: 'finished',
                                        dataUrl: item.epPic
                                    }
                                    arr.push(data)
                                    self.uploadList11 = arr;
                                    self.submitItem.imageUr11 = item.epPic;
                                }
                            }
                        } else {
                            self.$Message.error('获取信息失败！');
                        }
                    })
                    .catch(err => {
                        self.$Message.error('获取信息失败！');
                    })
            }
        },
        mounted () {
            this.$store.commit('setAuthSeeShow', false)
            if (this.getEntTypes !== 5 && this.getEntTypes !== 8) {
                this.getProvinceCityNames(0);
            }
            if (this.getUserTypes === 2) {
                this.submitItem.radio = '5';
            }
            if (this.getUserTypes  === 3) {
                this.submitItem.radio = '8';
            }
            if (Number(this.getEntIds) !== 0) {
                this.getAuth(this.getEntIds)
            }
        },
        updated () {
            if(this.submitItem){
                if(this.submitItem.radio=='8'){ //工业 eTypeA
                    this.eTypeA=true;
                    this.eTypeB=false;
                    this.eTypeC=false;
                    this.eTypeD=true;
                    this.eTypeE=true;
                    this.creditCodeShow = true;
                }
                if(this.submitItem.radio=='5'){
                    this.eTypeA=true;
                    this.eTypeB=false;
                    this.eTypeC=false;
                    this.eTypeD=false;
                    this.eTypeE=true;
                    this.creditCodeShow = true;
                }
                if(this.submitItem.radio=='6'||this.submitItem.radio=='7'){ //医院，诊所 eType
                    this.eTypeA=false;
                    this.eTypeB=true;
                    this.eTypeC=false;
                    this.eTypeD=false;
                    this.eTypeE=false;
                    this.creditCodeShow = false;
                }
                if(this.submitItem.radio=='1'||this.submitItem.radio=='2'||this.submitItem.radio=='3'||this.submitItem.radio=='4'){ //连锁药加盟店，连锁药直营店，连锁药总店，单体 eTypeC
                    this.eTypeA=false;
                    this.eTypeB=false;
                    this.eTypeC=true;
                    this.eTypeD=false
                    this.eTypeE=false;
                    this.creditCodeShow = true;
                }
            }
        },
        created: function () {
            vm = this;
        },
    }
</script>

<style  lang="less">
    @import '../../../assets/css/common.less';
    @import '../../../assets/css/table.less';
    @import '../../../assets/css/risk.less';
    .Workbench{
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
    }
</style>



// WEBPACK FOOTER //
// src/views/user/myInfo/authority.vue