<template>
    <div class="upload-file-common" style="clear:both;overflow:hidden">
        <div class="demo-upload-list" v-for="(item, index) in uploadListC">
            <template v-if="item.status === 'finished'">
                <img :src="item.url" v-if="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleViewC(item.url)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <div style="padding-top:5px;">
            <Modal title="图片预览" v-model="visibleC">
                <img :src="imgLarge1UrlC" v-if="visibleC" style="width: 100%">
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fileUploadCommonImg",
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
            isMultiUpload: false
        },
        data () {
            return{
                fileListsAll: [],
                imgLarge1UrlC: '',
                visibleC: false,
                uploadListC: [],
                newListArr: []
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
                this.newListArr.splice(index, 1);
            },
            handleSuccessC (res, file) {
                if (res.success !== 1) {
                    this.$Message.error('上传图片失败，请重试');
                }
                let data = {
                    name: file.name,
                    url: res.data.cdnUrl,
                    status: 'finished'
                }
                this.uploadListC.push(data);
                this.newListArr.push(res.data.cdnUrl);
            },
            handleFormatErrorC (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式是 ' + file.name + ' 不正确，请选择JPG、PNG或PDF格式.'
                });
            },
            handleMaxSizeC (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件  ' + file.name + ' 太大，不超过10M.'
                });
            },
            handleBeforeUploadC (file) {
                const check = this.uploadListC.length < 1; // check为true 或 false，小于1为true
                if (this.isMultiUpload || (!this.isMultiUpload && check)) { // isMultiUpload是否为多个上传
                } else {
                    this.$Notice.warning({
                        title: '只能上传一张'
                    });
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
                    this.newListArr = val.split(',');
                }
            }
        }

    }
</script>

<style lang="less">
.upload-file-common{
    .demo-upload-list{
        display: inline-block;
        float:left;
        width: 150px;
        height: 120px;
        text-align: center;
        line-height: 150px;
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
// src/views/user/components/fileUploadImg.vue