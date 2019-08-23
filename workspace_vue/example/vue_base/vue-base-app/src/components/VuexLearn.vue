<template>
    <div class="zl-vuex">
            <p>{{$store.state.learn.zlCount}}</p>
            computed-store-state:::   {{zlCount}}
            <p>{{getZlCount}}</p>
            <p>{{getCountDoubleAndDouble}}</p>
            <button @click="incrementA">+++</button>
    </div>
</template>

<script>
    import { mapState ,mapGetters, mapMutations} from 'vuex';
    export default {
        name: 'ActiveClass',
        props: {
            msg: String
        },
        data () {
          return {

          }
        },
        computed: {
            ...mapState({
                zlCount: state => state.learn.zlCount
            }),
            ...mapGetters({
                getZlCount: 'getZlCount',
                getCountDoubleAndDouble: 'getCountDoubleAndDouble'
            }),
            ...mapMutations({
                increment: 'learn/increment'
            })

            // zlCount: function(){
            //     return this.$store.state.learn.zlCount
            // }
            // getZlCount: function(){
            //     return this.$store.getters.getZlCount
            // },
            // getCountDoubleAndDouble: function(){
            //     return this.$store.getters.getCountDoubleAndDouble
            // }
        },
        methods: {
            incrementA(){
		        //调用type，触发handler（state） 
		  	    this.$store.commit('learn/increment');
            }
        }
    }
</script>
<style scoped lang="less">

</style>