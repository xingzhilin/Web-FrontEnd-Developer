<template>
        <div class="hello">
            <div class="addClsFather">
                <div class="addCls" @click="addFuc">
                    Add
                </div>
                <div>
                    未使用vuex：{{count}}
                </div>
                <div>
                    使用vuex：{{this.$store.state.count}}
                </div>
                <div>
                    计算属性getters：{{countNumber}} ¥
                </div>
            </div>
        </div>
      </template>
      <script>
      import { mapState, mapGetters, mapMutations } from 'vuex';
      export default {
        name: 'HelloWorld',
        data () {
          return {
            count: 0
          }
        },
        computed:{ 
            ...mapState([
                // 映射 this.shopList为 store.state.shopList
                'shopList'
            ]),
            ...mapGetters([
                'countNumber',
                'shopid2'
            ]),
            ...mapMutations([
                'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

                // `mapMutations` 也支持载荷：
                'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
            ]),
            ...mapMutations({
                add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
            })
        },
        methods: {
          addFuc() {
              this.count++
              this.$store.dispatch('count', 5) // 触发action中的方法&&传值
          }
        }
      }
      </script>
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      .addClsFather {
          margin: 50px 100px;
      }
      .addCls {
          cursor: pointer;
          width: 100px;
          height: 30px;
          line-height: 30px;
          background-color: blue;
          text-align: center;
          color: #fff;
          border-radius: 5px;
      }
      </style>