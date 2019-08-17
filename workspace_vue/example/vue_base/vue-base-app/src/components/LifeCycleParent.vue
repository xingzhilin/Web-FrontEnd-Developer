<template>
    <div class="complex">
        <h3>复杂组件</h3>
        <LifecycleSingle compName="child"></LifecycleSingle>
        <h3>复杂组件</h3>
        <lifecycle-single compName="cihld1"></lifecycle-single>
        <lifecycle-single compName="child2"></lifecycle-single>
    </div>
</template>
<script>
 const COMPONENT_NAME = 'complex'

 import LifecycleSingle from './LifeCycleSingle.vue';

 export default {
    name: 'LifeCycleParent',
    data() {
        return {
            dataVar: 1
        }
    },
     beforeCreate() {
         console.log(`--${COMPONENT_NAME}--beforeCreate`)
     },
     created() {
         console.log(`--${COMPONENT_NAME}--created`)
     },
     beforeMount() {
         console.log(`--${COMPONENT_NAME}--beforeMount`)
     },
     mounted() {
         console.log(`--${COMPONENT_NAME}--mounted`)
     },
     beforeUpdate() {
         console.log(`--${COMPONENT_NAME}--beforeUpdate`)
     },
     updated() {
         console.log(`--${COMPONENT_NAME}--updated`)
     },
     beforeDestroy() {
         console.log(`--${COMPONENT_NAME}--beforeDestroy`)
     },
     destroyed() {
         console.log(`--${COMPONENT_NAME}--destroyed`)
     },
     components: {
        LifecycleSingle
     }
 }
</script>