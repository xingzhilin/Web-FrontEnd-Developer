<template>
    <div class="active-class">
        <router-link :to="/home">Home</router-link>
        <router-link :to="/home" replace>Home</router-link>
        <router-link :to="/home" tag="li">Home</router-link>
    </div>
</template>

<script>
    export default {
        name: 'ActiveClass',
        props: {
            msg: String
        },
        components: []
    }
</script>
<style scoped lang="less">

</style>