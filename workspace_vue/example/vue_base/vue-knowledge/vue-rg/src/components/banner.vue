<template>
    <div class="product" :style="intStyle">
        <div class="product-banner">
            <ul class="ulset">
                <li class="liset" @click="bannerClick(index, item)" v-for="(item, index) in list" :class="index===current ? 'active' : ''" :style="{background: 'url('+item.url+') 50% 0'}"></li>
                <div class="product-banner-w" v-if="offApply">
                    <div class="Formbanner">
                        <h2>快速通道</h2>
                        <Form ref="ApplyformItem" :model="formItem" :label-width="82" class="bannerForm" :rules="ruleValidate">
                            <FormItem  label="公司名称：" prop="enterpriseName">
                                <Input v-model="formItem.enterpriseName" placeholder="请输入公司名称">
                                </Input>
                            </FormItem>

                            <FormItem  label="申请额度：" prop="applyQuota">
                                <Select  class="setSelect" v-model="formItem.applyQuota"  placeholder="请选择申请额度">
                                    <Option key="0-50万"  value="0-50万"></Option>
                                    <Option key="50-200万"  value="50-200万"></Option>
                                    <Option key="200-500万"  value="200-500万"></Option>
                                    <Option key="500万以上"  value="500万以上"></Option>
                                </Select>
                            </FormItem>

                            <FormItem  label="联系人：" prop="contactorName">
                                <Input v-model="formItem.contactorName" placeholder="请输入联系人">
                                </Input>
                            </FormItem>

                            <FormItem  label="联系电话：" prop="contactorMobi">
                                <Input v-model="formItem.contactorMobi" placeholder="请输入联系电话">
                                </Input>
                            </FormItem>
                            <Button  type="warning" class="submit" long @click="passApply">立即申请</Button>
                        </Form>
                    </div>
                </div>
            </ul>
            <div class="product-banner-Page">
                <span v-for="(item, index) in list" :class="index === current ? 'active' : ''"
                      @mouseenter="changeBanner(index)" @mouseleave="startLoop" v-if="list.length>1"></span>
            </div>
            <a class="prev-btn" @click="prev" @mouseenter="stopLoop" @mouseleave="startLoop" v-if="list.length>1"></a>
            <a class="next-btn" @click="next" @mouseenter="stopLoop" @mouseleave="startLoop" v-if="list.length>1"></a>
        </div>

        <Modal v-model="modalSuccess" width="360" class="Success-w">
            <p slot="header" style="color:#0077cc;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <p>恭喜您，申请成功！</p>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="btnSuccess">确定</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import axios from 'axios'
    let vm = null;
    export default {
        name: "banner",
        components: {},
        data() {
            return {
                modalSuccess: false,
                modal_loading: false,
                formItem: {
                    enterpriseName:'',
                    applyQuota:'',
                    contactorName:'',
                    contactorMobi:''
                },
                ruleValidate: {
                    enterpriseName: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('公司名称不能为空'));
                                    this.$Message.error('公司名称不能为空');
                                }else {
                                    callback();
                                }
                            }
                        }
                    ],
                    applyQuota: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('申请额度不能为空'));
                                    this.$Message.error('申请额度不能为空');
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    contactorName: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('联系人不能为空'));
                                    this.$Message.error('联系人不能为空');
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    contactorMobi: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, v, callback) => {
                                if (v === '') {
                                    callback(new Error('联系电话不能为空'));
                                    this.$Message.error('联系电话不能为空');
                                } else if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.formItem.contactorMobi)){
                                    callback(new Error('请输入正确联系电话'));
                                    this.$Message.error('请输入正确联系电话!');
                                }else {
                                    callback();
                                }
                            }
                        }
                    ]
                },
                current: 0, // 当前索引
                timerId: null, // 清除循环标记
                intStyle: {}
            }
        },
        props: [
            'offApply',
            'list',
            'looptime',
            'height',
            'width',
            'background',
               ],
        computed: {
            tokens () {
                return this.$store.getters.getToken
            },
            getEntIds () {
                return this.$store.getters.getEntId
            },
            getYBTstates () {
                return this.$store.getters.getYBTstate
            },
            getLSDstates () {
                return this.$store.getters.getLSDstate
            },
            getKDstates () {
                return this.$store.getters.getKDstate
            }
        },
        methods: {
            checkNum(){
                if(/\D/g.test(this.formItem.applyQuota)){
                    vm.formItem.applyQuota = '';
                    vm.$Message.error('请输入正确申请额度！');
                }
            },
            checkMobi(){
                if(!/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.formItem.contactorMobi)){
                    vm.formItem.contactorMobi = '';
                    vm.$Message.error('请输入正确联系电话！');
                }
            },
            btnSuccess () {
                this.modalSuccess = false;
            },
            passApply (name) {
                this.$refs.ApplyformItem.validate((valid) => {
                    if(valid){
                        let _params = {
                            applyQuota: vm.formItem.applyQuota,
                            enterpriseName: vm.formItem.enterpriseName,
                            contactorMobi:vm.formItem.contactorMobi,
                            contactorName:vm.formItem.contactorName
                        }
                this.$https.post('/api-webbff-unauth/v1/member/immediateApplication', _params)
                    .then(res => {
                        if (res.data.success === 1) {
                            vm.modalSuccess = true;
                            vm.emptyInput();
                        } else {
                            vm.$Message.error(res.data.error.msg);
                            vm.emptyInput();
                        }
                    })
                    .catch(err => {
                        vm.$Message.error(err);
                    })
                    }
                });
            },
             //清空Input
            emptyInput(){
                vm.formItem= {
                enterpriseName:'',
                applyQuota:'',
                contactorName:'',
                contactorMobi:''
               }
            },
            // 鼠标移入状态圆点
            changeBanner (index) {
                this.$emit('change', this.current);
                this.stopLoop();
                this.current = index;
            },
            // 鼠标点击banner内容
            bannerClick (index, item) {
                this.$emit('click', index, item);
                if (item.href === 1) {
                    return
                }
                let that = this;
                if(that.tokens.length > 1){
                    that.$store.dispatch('getAuth',{_self: this, id: that.getEntIds}).then(res => {
                        that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                            if (item.id === 1) {
                                if (that.getYBTstates === -1) {
                                    that.$router.push({path: item.href})
                                }
                                if (that.getYBTstates === 0) {
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getYBTstates === 1) {
                                    that.$router.push({path: '/user/limitApplyYBTInfo'});
                                }
                            } else if (item.id === 2) {
                                if (that.getLSDstates === -1) {
                                    that.$router.push({path: item.href})
                                }
                                if (that.getLSDstates === 0) {
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getLSDstates === 1) {
                                    that.$router.push({path: '/user/limitApplyLSDInfo'});
                                }
                            } else if (item.id === 3) {
                                if (that.getKDstates === -1) {
                                    that.$router.push({path: item.href})
                                }
                                if (that.getKDstates === 0) {
                                    that.$router.push({path: '/user/'});
                                }
                                if (that.getKDstates === 1) {
                                    that.$router.push({path: '/user/limitApplyKDInfo'});
                                }
                            }
                        })
                    })
                } else {
                    that.$store.dispatch('getLimitCredits', {_self: this}).then(res => {
                        if (item.id === 1) {
                            if (that.getYBTstates === -1) {
                                that.$store.commit('setRecord', item.href);
                            }
                            if (that.getYBTstates === 0) {
                                that.$store.commit('setRecord', '/user/');
                            }
                            if (that.getYBTstates === 1) {
                                that.$store.commit('setRecord', '/user/limitApplyYBTInfo');
                            }
                        } else if (item.id === 2) {
                            if (that.getLSDstates === -1) {
                                that.$store.commit('setRecord', item.href);
                            }
                            if (that.getLSDstates === 0) {
                                that.$store.commit('setRecord', '/user/');
                            }
                            if (that.getLSDstates === 1) {
                                that.$store.commit('setRecord', '/user/limitApplyLSDInfo');
                            }
                        } else if (item.id === 3) {
                            if (that.getKDstates === -1) {
                                that.$store.commit('setRecord', item.href);
                            }
                            if (that.getKDstates === 0) {
                                that.$store.commit('setRecord', '/user/');
                            }
                            if (that.getKDstates === 1) {
                                that.$store.commit('setRecord', '/user/limitApplyKDInfo');
                            }
                        }
                        this.$router.push({path: '/login/'});
                    })
                }
            },
            // 点击上一张按钮
            prev () {
                if(this.current > 0) {
                    // 将对象列表对应的索引和整个对象传出去
                    this.$emit('prev', this.current, this.list);
                    this.current--;
                } else {
                    this.$emit('prev', this.current, this.list);
                    this.current = this.list.length-1;
                }
            },
            // 点击下一张按钮
            next () {
                if(this.current < this.list.length-1) {
                    this.$emit('prev', this.current, this.list);
                    this.current ++;
                    //console.log(this.current)
                } else {
                    this.$emit('prev', this.current, this.list);
                    this.current = 0;
                }
            },
            // 鼠标移出继续循环播放
            startLoop () {
                this.int(this.looptime);
            },
            // 鼠标移入停止循环播放
            stopLoop () {
                clearTimeout(this.timerId); // 清除循环
            },
            // 初始化加载
            int (time){
                this.timerId = setInterval(()=> {
                    this.next();
                }, time);
                // 初始化样式
                this.intStyle = {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    background: this.background
                }
            }
        },
        mounted () {
            vm = this;
        },
        created() {     //  vue实例被生成后调用这个函数
            this.int(this.looptime);
        }
    }
</script>
<style lang="less">
    .Success-w{
        .ivu-modal-footer{
            padding: 12px 120px 12px 120px;
        }
    }
    .product-banner{
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        background-position: center;
        .next-btn,.prev-btn{
            width: 48px;
            height: 48px;
            position: absolute;
            top: 191px;
        }
        .next-btn{
            right: 50%;
            margin-right: -600px;
            background: url(../img/prev-btn.png);
            &:hover{
                background: url(../img/prev-btn-v.png);
            }
        }
        .prev-btn{
            left:50%;
            margin-left: -600px;
            background: url(../img/next-btn.png);
            &:hover{
                background: url(../img/next-btn-v.png);
            }
        }
        .product-banner-Page{
            position: absolute;
            text-align: center;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            z-index: 10;
            bottom:20px;
            left: 0;
            width: 100%;
            span{
                background: #ccc none repeat scroll 0 0;
                border-radius:30px;
                display:inline-block;
                height: 8px;
                width:38px;
                cursor: pointer;
                margin: 0 5px;
                transition: all 1.5s;
            }
            .active{
                background: #fff;
            }
        }
        .ulset{
            height:430px;
            background: #000;
            overflow: hidden;
            .liset{
                position:absolute;
                left:-1200px;
                width:100%;
                height:100%;
                font-size: 0;
                height: 430px;
                display: block;
                opacity:0;
                transition: all 1.5s;
                cursor: pointer;
                background-size: auto 100%
            }
            .active{
                left:0;
                opacity:1;
                transition: all 1.5s;
            }
        }
        .product-banner-w{
            width: 1200px;
            height: 430px;
            overflow: hidden;
            margin: 0 auto;
            margin-left: 255px;
            position: absolute;
            top: 0;
            left: 50%;
            .Formbanner{
                height:290px;
                margin-top: 120px;
                width: 280px;
                padding: 20px;
                background: #fff;
                h2{
                    text-align: center;
                    font-size: 16px;
                    color: #333;
                }
                .ivu-form-item{
                    margin-bottom: 10px;
                }
                .ivu-form .ivu-form-item-label{
                    padding-right: 3px;
                }
                .bannerForm{
                    padding-top: 15px;
                }
            }
            .ivu-form-item-error-tip{
                display: none;
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/components/banner.vue