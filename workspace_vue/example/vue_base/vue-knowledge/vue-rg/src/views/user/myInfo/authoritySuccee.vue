<template>
    <div class="min-height-100 Workbench" ref="Workbench">
        <Form type="flex">
        <Card :dis-hover="true" :bordered="false">
            <Card :dis-hover="true" :padding="0">
                <p class="titles" slot="title" style=" color: #333; font-size: 14px;">企业信息</p>
                <div class="contant">企业认证申请已提交成功，请等待审核</div>
                <div class="setButton clearfix"><router-link to="authoritySee"  class="fl">查看进度</router-link><router-link to="/" class="fr">返回首页</router-link></div>
            </Card>
        </Card>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "authoritySuccee",
        data () {
            return{}
        },
        methods: {
        },
        mounted () {
        },
        created () {
        }
    }
</script>

<style  lang="less">
    @import '../../../assets/css/common.less';
    @import '../../../assets/css/table.less';
    @import '../../../assets/css/risk.less';
    .Workbench{
        .ivu-card-head{
            background: #F7F7F7;
            padding: 9px 16px;
        }
        .indexTh{
            border-left: solid 4px #E2A54D;
            padding-left: 10px;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .contant {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            text-align: center;
            margin: 37px 0;
        }
        .setButton {
            width: 290px;
            margin: 0 auto;
            margin-bottom: 39px;
            a {
                width: 130px;
                height: 32px;
                background-color: #E2A54D;
                display: inline-block;
                text-align: center;
                line-height: 32px;
                color: #ffffff;
                &:last-child {
                    background-color: #ffffff;
                    border: 1px solid #E2A54D;
                    color: #E2A54D;
                }
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/views/user/myInfo/authoritySuccee.vue