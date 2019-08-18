<template>
    <div class="active-class">
       <div> <router-link to="/home2" active-class="u-link--Active">Home</router-link></div>
       <div> <router-link to="/home2" replace active-class="u-link--Active">Home</router-link></div>
       <div> <router-link to="/home2" tag="li">Home</router-link></div>
    </div>
</template>

<script>
    export default {
        name: 'ActiveClass',
        props: {
            msg: String
        }
    }
</script>
<style scoped lang="less">
    .u-link--Active{
        color: pink;
    }
</style>