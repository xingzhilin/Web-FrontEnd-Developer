<!-- <template>
    <div>
        <h3>单组件</h3>
        <button @click="dataVar += 1">更新 {{dataVar}}</button>
        <button @click="handleDestroy">销毁</button>
    </div>
</template> -->
<template>
    <div class="complex">
        <button @click="dataVar += 1">complex更新 {{dataVar}}</button>
        <button @click="handleDestroy">complex销毁</button>
    </div>
</template>
<script>
export default {
    name: 'LifecycleSingle',
    data() {
        return {
            dataVar: 1
        }
    },
    props: {
        compName: {
            type: String,
            default: 'LifecycleSingle'
        }
    },
    beforeCreate() {
        // this.compName = 'single'
        // console.log(`--${this.compName}--beforeCreate`)
        console.log(` --data未初始化--beforeCreate`)
    },
    // beforeCreate() {
    //     this.compName = 'single'
    //     console.log(`--${this.compName}--beforeCreate`)
    // },
    created() {
        console.log(`--${this.compName}--created`)
    },
    beforeMount() {
        console.log(`--${this.compName}--beforeMount`)
    },
    mounted() {
        console.log(`--${this.compName}--mounted`)
    },
    beforeUpdate() {
        console.log(`--${this.compName}--beforeUpdate`)
    },
    updated() {
        console.log(`--${this.compName}--updated`)
    },
    beforeDestroy() {
        console.log(`--${this.compName}--beforeDestroy`)
    },
    destroyed() {
        console.log(`--${this.compName}--destroyed`)
    },
    methods: {
        handleDestroy() {
            this.$destroy()
        }
    }
}
</script>
