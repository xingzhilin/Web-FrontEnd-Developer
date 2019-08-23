<template>
    <div>
        <Modal v-model="isModalProtocol" class-name="vertical-center-modal" :closable="false" :mask-closable="false" width="900">
            <div class="protocolText">
                <h3 slot="header">关于同意获取本单位医保相关数据的授权书</h3>
                <h4>平安国际融资租赁有限公司：</h4>
                <p>因业务合作需要，本单位授权并同意贵司（下称“贵司”）在开展与本单位相关业务过程中（含业务开展中的各个进程环节），通过平安医疗健康管理股份有限公司从与本单位有业务合作的医保局/医保中心/社会保障局等处获取本单位有关的医保数据，用于开展与本单位相关的业务，包括但不限于授信、合同制作、贷后管理等相关环节。</p>
                <p>本授权书中“与本单位相关的业务”包括：</p>
                <p>一、融资租赁、保理、债权转让等业务；</p>
                <p>二、需要查询医保相关数据的其他业务。</p>
                <p>若本单位在贵司业务未获批准办理，本函件无需退回本单位。</p>
                <p>本授权书自本单位签署或盖章之时生效，签署和盖章的形式包括且不限于法定代表人签字，公司盖章，使用电子签章确认，在“我的医药”网上确认等形式。以上形式确认均具有相同效力。</p>
                <p>本授权书有效期至本单位与贵司所有业务关系终止之日止。</p>
                <br>
                <br>
                <br>
                <br>
                <p class="text-align-right">本单位名称：{{entName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p class="text-align-right">（盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <h3>关于同意获取并传输本单位医保数据的授权书</h3>
                <h4>平安医疗健康管理股份有限公司：</h4>
                <p>因本单位与平安国际融资租赁有限公司的业务合作需要，本单位授权并同意平安国际融资租赁有限公司及贵司从与本单位有业务合作的医保局/医保中心/社会保障局等处获取与本单位有关的医保数据。该数据仅可用于开展与平安国际融资租赁有限公司相关的业务，包括但不限于授信、合同制作、贷后管理等相关环节，该数据不可用于与其他第三方的合作，也不可发送给其他第三方公司。</p>
                <p>本授权书中“与平安国际融资租赁有限公司相关的业务”包括：</p>
                <p>一、融资租赁、保理、债权转让等业务；</p>
                <p>二、需要查询医保相关数据的其他业务。</p>
                <p>本授权书自本单位签署或盖章之时生效，签署和盖章的形式包括且不限于法定代表人签字，公司盖章，使用电子签章确认，在“我的医药”网上确认等形式。以上形式确认均具有相同效力。</p>
                <p>本授权书有效期至本单位与平安国际融资租赁有限公司所有业务关系终止之日止。</p>
                <br>
                <br>
                <br>
                <br>
                <p class="text-align-right">本单位名称：{{entName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p class="text-align-right">（盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
            <div slot="footer">
                <Button @click="coloseModal" type="primary">拒绝</Button>
                <Button @click="coloseModalShoper" type="primary">同意</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "agreements",
        data () {
            return{
                isModalProtocol: false
            }
        },
        props: {
            entName: {
                type: String
            }
        },
        computed: {
        },
        methods: {
            coloseModal () {
                this.$emit('agreementInfo', 0)
                this.isModalProtocol = false
            },
            coloseModalShoper () {
                this.$emit('agreementInfo', 1)
                this.isModalProtocol = false
            }
        },
        created () {
        },
        mounted () {
        },
        watch: {
        }

    }
</script>

<style lang="less">
    .protocolText{
        overflow: auto;
        h3 {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 24px;
            text-align: center;
        }
        h4 {
            font-size: 20px;
        }
        p{
            line-height: 28px;
            font-size: 20px;
            text-indent: 30px;
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
// src/views/user/components/agreementsPingAn.vue