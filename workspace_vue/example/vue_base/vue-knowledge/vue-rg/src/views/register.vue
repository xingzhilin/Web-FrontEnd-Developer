<template>
<div class="register">
    <Header-Bar-Login-Register ref="HeaderBarLoginRegister"></Header-Bar-Login-Register>
    <div class="register-con">
        <template>
            <Form ref="formItem" :model="formItem" :label-width="200" :rules="ruleValidate">
                <FormItem  label="企业类型："  prop="radio">
                    <RadioGroup v-model="formItem.radio">
                        <Radio label="1">终端</Radio>
                        <Radio label="2">商业公司</Radio>
                        <Radio label="3">工业公司</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机号：" prop="iphone">
                <Input v-model="formItem.iphone" type="text" :readonly="types1"  @on-focus="changeTpe(1)"  autocomplete="off" placeholder="请输入手机号..." style="width:190px;"></Input>
                <Button type="warning" @click="getCode" ghost>获取验证码</Button>
                </FormItem>

                <FormItem label="短信验证码：" prop="iphoneCodes">
                    <Input v-model="formItem.iphoneCodes" autocomplete="off" :readonly="types2" type="text" @on-focus="changeTpe(2)"  placeholder="请输入验证码..." style="width:286px;"></Input>
                </FormItem>

                <FormItem label="设置密码：" prop="password">
                    <Input v-model="formItem.password" type="password"  autocomplete="off" :readonly="types3" @on-focus="changeTpe(3)" placeholder="请输入密码..." style="width:286px;"></Input>
                </FormItem>

                <FormItem label="确认密码：" prop="passwordSecond">
                    <Input v-model="formItem.passwordSecond" type="password"  :readonly="types4" @on-focus="changeTpe(4)"  placeholder="请再次输入密码..." style="width:286px;"></Input>
                </FormItem>

                <FormItem label="图形验证码：" prop="iphoneCodesImage">
                    <Input v-model="formItem.iphoneCodesImage"  :readonly="types5" @on-focus="changeTpe(5)" placeholder="请输入验证码..." style="width:190px;"></Input><div @click="getImageCode" class="setImageCode"><img
                        :src="formItem.imageCode" alt=""></div>
                </FormItem>

                <FormItem prop="checkbox">
                    <Checkbox v-model="formItem.checkbox">我已阅读并接受<a href="javascript:void(0);" @click="confirm">《用户注册协议》</a></Checkbox>
                </FormItem>


                <FormItem>
                    <Button type="warning" @click="registers('formItem')" ghost style=" background: #E9961E; width: 290px; color: #fff;">立即注册</Button>
                </FormItem>
            </Form>
        </template>
    </div>
    <copy-right ref="footer"></copy-right>

    <Modal title="用户注册协议" v-model="modalProtocol" class-name="vertical-center-modal" okText="同意并继续" width="900" >
        <div class="protocol" :style="{height:protocolHeight + 'px'}">
            <h3>用户注册协议</h3>
            <p>本协议是您与“北京融贯电子商务有限公司”（以下简称“本公司”）共同缔结的契约。您只需一个账户、一套密码、一次登录，即可实现本公司各平台（包括但不限于“我的医药网”、“菲加云智慧药房管理系统”、“药金融”、“我的诊所”、“我的康康”，以下统称“平台”）提供的一站式服务。</p>
            <p><span>【审慎阅读】在接受本协议之前，请您仔细阅读本协议的全部内容（特别是以粗体下划线标注的内容）。当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序并在网络页面点击确认后，即表示您已充分阅读、理解并接受本协议的全部内容，并与本公司达成一致，成为本公司平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</span></p>
            <h4>一、账户注册与使用</h4>
            <p>1、当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可获得平台账户并成为平台用户。</p>
            <p>2、您有权使用您设置或确认的账号、手机号码、邮箱（以下简称“账户名称”）及您设置的密码（账户名称及密码合称“账户”）登录本公司平台，且无需另行设置账户。</p>
            <p>3、您在使用账户过程中，所提供的注册信息发生变动，应及时进行变更。</p>
            <p><span>4、您须保证所填写的注册信息和所提供的资料真实、准确、完整，否则无法使用平台服务或在使用过程中受到限制。对于因您提供的信息不真实、不准确或不完整导致的损失由您承担。如您提供的注册资料存在虚假信息、冒用他人信息的情况，本公司作为本协议服务的提供方有权冻结该账号。</span></p>
            <p>5、由于您的平台账户关联您的个人信息、企业信息及平台交易信息，您的平台账户仅限您本人使用。未经本公司同意，您直接或间接授权第三方使用您平台账户或获取您账户项下信息的行为无效。如本公司根据平台规则判断您平台账户的使用可能危及您的账户安全及/或平台信息安全的，本公司可拒绝提供相应服务或终止本协议。</p>
            <p>6、由于用户账户关联用户信用信息，仅当有法律明文规定、司法裁定或经本公司同意，并符合平台规则规定的用户账户转让流程的情况下，您可进行账户的转让。您的账户一经转让，该账户项下权利义务一并转移。除此外，您的账户不得以任何方式转让，否则本公司有权追究您的违约责任，且由此产生的一切责任均由您承担。</p>
            <p><span>7、账户一经注册，即可在本公司平台中通行使用。在用账号登录并使用其他平台提供的产品或服务时，除遵守本协议约定外，还应遵守该���平台服务协议的约定、平台公布的规则以及有关正确使用平台服务的说明和操作指引。平台账户和其他平台对可能出现的纠纷在法律规定和约定的范围内各自承担责任。</span></p>
            <p><span>8、本公司为您提供互联网一站式账户服务，为用户体验及功能服务考虑，您在不同平台入口注册时被要求填写的内容可能不完全一致，因此，在使用更高级别服务时，为了给您提供更好的服务及为了您的账户安全，可能需要您补充完整信息后方可使用。</span></p>
            <h4>二、用户名和密码安全</h4>
            <p><span>您须妥善保管本人的用户名和密码，及装载和使用平台服务的设备。凡使用该用户名和密码的行为，本公司将视为您本人的操作，操作所产生的电子信息记录均为平台账户用户行为的有效凭据。您对利用该用户名和密码所进行的一切活动负全部责任。</span></p>
            <h4>三、用户行为规范</h4>
            <p>1、您使用平台账户用户服务时，禁止从事以下行为，平台的系统记录可作为实施该行为的证据：</p>
            <p>（1）发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；</p>
            <p>（2）发布、传送、传播、储存侵害他人知识产权、商业秘密等合法权利的内容；</p>
            <p>（3）恶意虚构事实、隐瞒真相以误导、欺骗他人；</p>
            <p>（4）发布、传送、传播广告信息及垃圾信息；</p>
            <p>（5）将有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序等资料，加以上载、张贴、发送电子邮件或以其他方式传送；</p>
            <p>（6）恶意登录、注册，恶意使用系统功能及服务；干扰或破坏平台服务或与平台服务相连的服务器和网络，或不遵守平台服务网络使用的规定；</p>
            <p>（7）恶意诋毁或损害本公司平台声誉、利用平台用户身份从事违反国家法律法规活动等行为；</p>
            <p>（8）违反任何相关的中国法律、行政法规、规章、条例等其他具有法律效力的规范。</p>
            <p>2、如果本公司发现或收到他人举报您发布的信息违反本条约定，本公司有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，本公司有权视用户的行为性质，采取包括但不限于暂停或终止服务，限制、冻结或终止账号使用等措施并追究法律责任。</p>
            <h4>四、服务的变更、中断或终止</h4>
            <p>1、您理解，平台需要定期或不定期地对提供服务的系统或相关的设备进行检修或者维护，或对平台系统进行升级、改造。如因此类情况而造成服务在合理时间内的中断，本公司无需为此承担任何责任。但本公司应尽可能事先进行通告并根据情况在相应服务页面提前作出通知。</p>
            <p>2、如发生下列任何一种情形，本公司有权不经通知而中断或终止向您提供本协议项下的服务而无需对您或任何第三方承担任何责任：</p>
            <p>（1）根据法律规定您应提交真实信息，而您提供的个人/企业信息不真实、或与注册时信息不一致又未能提供合理证明；</p>
            <p>（2）您违反相关法律法规或本协议的约定；</p>
            <p>（3）按照法律规定或主管部门的要求；</p>
            <p>（4）出于安全的原因或其他必要的情形。</p>
            <h4>五、授权条款</h4>
            <p>1、您同意并授权本公司使用、储存、复制您在账户注册、企业认证以及使用平台服务过程中提供、形成的信息。</p>
            <p>2、为方便您使用本公司其他相关服务，您同意并授权本公司将您在账户注册、企业认证以及使用平台服务过程中提供、形成的信息传递给本公司关联公司或合作机构等相关服务提供者，或从其他相关服务提供者获取您在注册、使用相关服务期间提供、形成的信息。</p>
            <p>3、您理解并同意，本公司可能将您所提供的信息用于以下一项或多项目的：更准确的身份确认；处理您采购商品及服务的要求；满足您使用各类网上服务、移动通讯服务及其他服务的要求；更好的为您服务和与您沟通，包括向您不定期发送相关新闻和服务信息、为您提供有关优惠及推荐产品；预防或禁止非法的活动；经您许可的其他用途。</p>
            <p>4、为保障您的信息的安全性和保密性，本公司采取了适当的安全技术措施并建立严格的信息存储和使用制度规范。</p>
            <p><span>5、前述“信息”可能包括但不限于您注册时填写的手机号/邮箱、企业基本信息、企业财产信息、法人身份信息、平台交易信息以及合作中可能产生的所有相关信息。为确保信息的安全，本公司对上述信息负有保密义务，并尽最大努力采取各种措施保证信息安全。</span></p>
            <h4>六、免责条款</h4>
            <p><span>1、对于本协议第四条造成的服务变更、中断或终止造成损失的，本公司不承担责任。</span></p>
            <p><span>2、因指令信息不明、存在乱码或不完整等非本公司原因导致您提交的操作���令无法执行造成损失的，本公司不承担责任。</span></p>
            <p><span>3、受到计算机病毒、木马或其他恶意程序、黑客攻击造成损失的，本公司不承担责任。</span></p>
            <p><span>4、您对平台账户名称及密码保管不善造成损失的，本公司不承担责任。</span></p>
            <p><span>5、您在共享环境下或在电脑被远程监控的情况下登录平台造成损失造成损失的，本公司不承担责任。</span></p>
            <p><span>6、因无法预见、无法避免且无法克服的不可抗力事件，导致平台在本协议项下的义务无法履行或无法按时履行，本公司在法律允许的范围内免责。</span></p>
            <h4>七、知识产权声明</h4>
            <p>1、本公司在平台服务中所包含的内容（包括但不限于网页、文字、图片、音频、视频、图表等）及提供平台服务时所依托软件的著作权、专利权及其他知识产权均归本公司所有。平台在平台服务中所使用的“我的医药网”、“我的康康”等商业标识，其商标权和相关权利归本公司所有。</p>
            <p>2、平台服务包含的内容的知识产权均受到法律保护，您若侵犯平台相关知识产权将承担损害赔偿责任。</p>
            <h4>八、法律适用和争议解决</h4>
            <p>1、本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不含冲突法），如无相关法律规定的，则应参照通用国际商业惯例和/或行业惯例。</p>
            <p><span>2、您与平台在履行本协议的过程中，如发生争议，应协商解决。协商不成的，均可向北京市朝阳区人民法院提起诉讼。</span></p>
        </div>
    </Modal>
</div>
</template>

<script>
    import axios from 'axios'
    import copyRight from '../components/copyRight'
    import HeaderBarLoginRegister from '../components/HeaderBarLoginRegister'
    export default {
        name: "register",
        components: {copyRight,HeaderBarLoginRegister},
        data () {
            return {
                modalProtocol: false,
                protocolHeight:null,
                types1: true,
                types2: true,
                types3: true,
                types4: true,
                types5: true,
                formItem: {
                    radio: '',
                    iphone: '',
                    iphoneCodes: '',
                    password: '',
                    passwordSecond: '',
                    iphoneCodesImage: '',
                    checkbox: false,
                    imageCode: '',
                    imgCodeToken: ''
                },
                ruleValidate: {
                    radio: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('企业类型必填'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    iphone: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('手机号不能为空'));
                                } else if (!/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(v)) {
                                    callback(new Error('请输入正确的11位手机号'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    iphoneCodes: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('验证码不能为空'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    password: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('密码不能为空'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    passwordSecond: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('确认密码不能为空'));
                                } else if (v !== this.formItem.password) {
                                    callback(new Error('两次输入密码不一致'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    iphoneCodesImage: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('图形验证码不能为空'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    checkbox: [
                        {
                            required: true,
                            trigger: 'change',
                            validator: (rule, v, callback) => {
                                if (!v) {
                                    callback(new Error('是否阅读 我的医药网VIP会员协议'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            changeTpe (val) {
                if (val === 1) {
                    this.types1 = false;
                }
                if (val === 2) {
                    this.types2 = false;
                }
                if (val === 3) {
                    this.types3 = false;
                }
                if (val === 4) {
                    this.types4 = false;
                }
                if (val === 5) {
                    this.types5 = false;
                }

            },
            confirm () {
                this.modalProtocol = true;
            },
            // 注册
            registers (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$https.post('/api-webbff-unauth/v1/member/registerUser2RGT', {
                            username: this.formItem.iphone,
                            password: this.formItem.password,
                            passwordConfirm: this.formItem.passwordSecond,
                            smsCode:  this.formItem.iphoneCodes,
                            imgCode: this.formItem.iphoneCodesImage,
                            imgCodeToken: this.formItem.imgCodeToken,
                            userType: Number(this.formItem.radio)
                        })
                            .then(res => {
                                if (res.data.success === 1) {
                                    this.$Message.success('注册成功');
                                    this.$router.push({path: '/login'})
                                } else {
                                    this.$Message.error(res.data.error.msg);
                                }
                            })
                            .catch(err => {
                                window.console.log(err)
                            })
                    } else {
                        window.console.log('Fail!');
                    }
                })
            },
            // 获取短信验证码
            getCode () {
                if (this.formItem.iphone === '') {
                    this.$Message.error('手机号不能为空');
                    return
                } else {
                    if (!/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.formItem.iphone)) {
                        return
                    }
                }
                this.$https.get(`/api-webbff-unauth/v1/member/getSmsCode/${this.formItem.iphone}`)
                    .then(res => {
                        if (res.data.success === 1) {
                            this.$Message.success('短信验证码发送成功');
                        } else {
                            this.$Message.error(res.data.error.msg);
                        }
                    })
                    .catch(err => {
                        this.$Message.error(err);
                    })
            },
            // 获取图形验证码
            getImageCode () {
                this.$https.get('/api-webbff-unauth/v1/member/getImgCode')
                    .then(res => {
                        if (res.data.success === 1) {
                            this.formItem.imageCode = res.data.data.imgCode
                            this.formItem.imgCodeToken = res.data.data.imgCodeToken
                        } else {

                        }
                    })
                    .catch(err => {
                        this.$Message.error(err);
                    })
            }
        },

        mounted () {
            this.getImageCode()
        },
        updated(){
            this.protocolHeight=window.innerHeight-200;
        }
    }
</script>

<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .protocol{ overflow: auto}
        h3 {
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
        .ivu-btn-text{
            display: none;
        }
        .ivu-modal-footer{
            text-align: center;
        }
    }
.register{
    .register-con{
        width: 1200px;
        margin: 0 auto;
        /*border-top:solid 2px #E2A54D;*/
        border-bottom:solid 2px #E2A54D;
        padding: 30px 0 100px 0;
    }
}
    .setImageCode {
        width: 92px;
        display: inline-block;
        margin-left: 5px;
        img {
            width: 100%;
            vertical-align: middle;
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/register.vue