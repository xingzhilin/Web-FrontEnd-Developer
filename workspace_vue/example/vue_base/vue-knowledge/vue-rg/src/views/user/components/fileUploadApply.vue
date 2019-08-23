<template>
    <div class="upload-file-common" :class="isText===0? 'clearBoth':''">
        <div class="demo-upload-list" v-for="(item, index) in uploadListC">
            <template v-if="item.status === 'finished'">
                <img :src="item.url" v-if="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleViewC(item.url)"></Icon>
                    <Icon type="ios-trash-outline" v-if="isText !== 2" @click.native="handleRemoveC(index)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <div >
            <div v-if="isText !== 2">
                <Upload
                        :ref="refUpload"
                        :isMultiUpload = 'isMultiUpload'
                        :show-upload-list="false"
                        :default-file-list="fileListsAll"
                        :on-success="handleSuccessC"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png','pdf']"
                        :max-size="10240"
                        :on-format-error="handleFormatErrorC"
                        :on-exceeded-size="handleMaxSizeC"
                        :before-upload="handleBeforeUploadC"
                        :headers='getTokenInfo'
                        type="drag"
                        multiple
                        :action="action"
                        style="display: inline-block;width:122px;">
                    <div style="width: 120px;height:120px;line-height: 120px;" v-if="isText === 0">
                        <Icon type="plus-round" size="25" style="color: #E2A54D"></Icon>
                        <Spin fix v-if="spinShow" class="spinStyle">
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                        </Spin>
                    </div>
                    <div v-else>
                        上传
                        <Spin fix v-if="spinShow" class="spinStyle">
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                        </Spin>
                    </div>
                </Upload>
            </div>
            <Modal title="图片预览" v-model="visibleC" class="z-index-style">
                <img :src="imgLarge1UrlC" v-if="visibleC" style="width: 100%">
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fileUploadApply",
        props: {
            refUpload:{
                type: String,
                default: 'upload'
            },
            action:{
                type: String,
                default: ''
            },
            filelists: {
                type: String,
                default: ''
            },
            isMultiUpload: false,
            isText: {
                type: Number,
                default: 0
            }
        },
        data () {
            return{
                spinShow: false,
                fileListsAll: [],
                imgLarge1UrlC: '',
                visibleC: false,
                uploadListC: [],
                newListqny: [],
                newListRgt: []
            }
        },
        computed: {
            getTokenInfo () {
                return {Authorization: this.$store.getters.getToken}
            },
            getUids () {
                return this.$store.getters.getUid
            },
            getEntIds () {
                return this.$store.getters.getEntId
            }
        },
        methods: {
            handleViewC (name) {
                this.imgLarge1UrlC = name;
                this.visibleC = true;
            },
            handleRemoveC (index) {
                this.uploadListC.splice(index, 1);
                this.newListqny.splice(index, 1);
                this.newListRgt.splice(index, 1);
            },
            handleSuccessC (res, file) {
                this.spinShow = false;
                if (!res.qny.success) {
                    this.$Message.error('图片上传失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: res.qny.data.cdnUrl,
                    status: 'finished'
                }
                this.uploadListC.push(data);
                this.newListqny.push(res.qny.data.cdnUrl);
                this.newListRgt.push(res.rgt.data);
            },
            handleError (err, file) {
                this.spinShow = false;
            },
            handleFormatErrorC (file) {
                this.spinShow = false;
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式是 ' + file.name + ' 不正确，请选择JPG、PNG或PDF格式.'
                });
            },
            handleMaxSizeC (file) {
                this.spinShow = false;
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件  ' + file.name + ' 太大，不超过10M.'
                });
            },
            handleBeforeUploadC (file) {
                this.spinShow = true;
                const check = this.uploadListC.length < 1; // check为true 或 false，小于1为true
                if (this.isMultiUpload || (!this.isMultiUpload && check)) { // isMultiUpload是否为多个上传
                } else {
                    this.$Notice.warning({
                        title: '只能上传一张'
                    });
                    this.spinShow = false;
                    return check
                }
            },
        },
        created () {
        },
        mounted () {
        },
        watch: {
            filelists(val) {
                if (val !== null) {
                    let values = val.split(',');
                    let arr = values.map(item => {
                        return {
                            name: '1',
                            url: item,
                            status: 'finished'
                        }
                    })
                    this.uploadListC = arr;
                    this.newListqny = values;
                }
            }
        }

    }
</script>

<style lang="less">
    .spinStyle {
        width: 100%;
        height: 100%;
        top: 5px;
    }
    .z-index-style {
        .ivu-modal-mask {
            z-index: 9998!important;
        }
        .ivu-modal-wrap {
            z-index: 9999!important;
        }
    }
.clearBoth {
    clear:both;
    overflow:hidden
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.upload-file-common{
    .demo-upload-list{
        display: inline-block;
        float:left;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 120px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 14px;
    }
    .ivu-upload-drag{border: solid 1px #E2A54D;}
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        margin: 0 2px;
    }
}
</style>



// WEBPACK FOOTER //
// src/views/user/components/fileUploadApply.vue