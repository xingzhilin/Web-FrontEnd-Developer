## VUEX 
    State，Getter，Mutation，Action，Module，


## store
    俗称仓库，仓库里是你的模块的数据、数据状态、对数据做的操作，都在这个仓库里。


    state
    仓库里的数据都放到这个里面，很像 vue 的 data 。


## getters
    通常获取可以用 this.$store.state.shopList 就可以拿到，但是如果你想对这项数据加工一下（格式化、过滤），就在 getters 里处理，然后通过 this.$store.getters.eventName 获取。


## mutation
    修改数据操作，你想对某项数据进行修改，就得守规矩。不能用 this.$store.state.count=99，要把修改函数写在 mutation 里面，用 this.commit('eventName') 触发修改函数。注意，这里的操作必须是同步。


## action
    异步触发 mutation 。


## module
    给多个状态模块分类。

    https://www.jianshu.com/p/5624362cd1f4

## Vuex 主要有四部分：
 
    state：包含了 store 中存储的各个状态。
    getter: 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
    mutation: 一组方法，是改变 store 中状态的执行者， 只能是同步操作 。
    action: 一组方法，其中可以 包含异步操作 。


## state
    Vuex 使用 state 来存储应用中需要共享的状态。为了能让 Vue 组件在 state 更改后也随着更改，需要基于 state 创建计算属性。

    // 创建一个 Counter 组件
    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            count () {
            return this.$store.state.count  // count 为某个状态
            }
        }
    }

## Getter
    类似于 Vue 中的 计算属性（可以认为是 store 的计算属性），getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

    Getter 方法接受 state 作为其第一个参数：

    const store = new Vuex.Store({
    state: {
        todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
        return state.todos.filter(todo => todo.done)
        }
    }
    })
    通过属性访问
    Getter 会暴露为 store.getters 对象，可以以属性的形式访问这些值：

    store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
    Getter 方法也接受 state 和其他 getters 作为前两个参数。

    getters: {
        // ...
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        }
    }
    store.getters.doneTodosCount // -> 1
    我们可以很容易地在任何组件中使用它：

    computed: {
    doneTodosCount () {
        return this.$store.getters.doneTodosCount
    }
    }
    注意：getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

    通过方法访问
    也可以通过让 getter 返回一个函数，来实现给 getter 传参。在对 store 里的数组进行查询时非常有用。

    getters: {
    // ...
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
    }
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
    注意：getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

## Mutation
    更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。也就是说，前面两个都是状态值本身， mutations才是改变状态的执行者。

    注意： mutations 只能是同步地更改状态。

    Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler) 。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

    const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
        // 变更状态
        state.count++
        }
    }
    })
    调用 store.commit 方法：

    store.commit('increment')
    提交载荷（Payload）
    // ...
    mutations: {
        increment (state, n) {
            state.count += n
        }
    }
    this.$store.commit('increment', 10)
    其中，第一个参数是 state ，后面的参数是向 store.commit 传入的额外的参数，即 mutation 的 载荷（payload） 。

    store.commit 方法的第一个参数是要发起的 mutation 类型名称，后面的参数均当做额外数据传入 mutation 定义的方法中。

    规范的发起 mutation 的方式如下：

    // 以载荷形式
    store.commit('increment'，{
    amount: 10   //这是额外的参数
    })

    // 或者使用对象风格的提交方式
    store.commit({
    type: 'increment',
    amount: 10   //这是额外的参数
    })
    额外的参数会封装进一个对象，作为第二个参数传入 mutation 定义的方法中。

    mutations: {
    increment (state, payload) {
        state.count += payload.amount
    }
    }
## Action
    想要 异步地更改状态 ，就需要使用 action 。 action 并不直接改变 state ，而是发起 mutation 。

    注册一个简单的 action：

    const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
        state.count++
        }
    },
    actions: {
        increment (context) {
        context.commit('increment')
        }
    }
    })
    Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

    实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：

    actions: {
    increment ({ commit }) {
        commit('increment')
    }
    }
    在action内部执行 异步 操作：

    actions: {
    incrementAsync ({ commit }) {
        setTimeout(() => {
        commit('increment')
        }, 1000)
    }
    }
    发起 action 的方法形式和发起 mutation 一样，只是换了个名字 dispatch 。

    // 以对象形式分发Action
    store.dispatch({
    type: 'incrementAsync',
    amount: 10
    })
    Actions 支持同样的载荷方式和对象方式进行分发

    Action处理异步的正确使用方式
    想要使用 action 处理异步工作很简单，只需要将异步操作放到 action 中执行（如上面代码中的 setTimeout ）。

    要想在异步操作完成后继续进行相应的流程操作，有两种方式:

    store.dispatch 返回相应 action 的执行结果，而action的处理函数返回的就是Promise，所以 store.dispatch 仍然返回一个Promise。

    actions: {
    actionA ({ commit }) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            commit('someMutation')
            resolve()
        }, 1000)
        })
    }
    }
    现在可以写成：

    store.dispatch('actionA').then(() => {
    // ...
    })
    在另外一个 action 中也可以：

    actions: {
    // ...
    actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
        commit('someOtherMutation')
        })
    }
    }
    利用 async/await 进行组合action。代码更加简洁。

    // 假设 getData() 和 getOtherData() 返回的是 Promise

    actions: {
    async actionA ({ commit }) {
        commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
    }
    }
    一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

    Action与Mutation的区别
    Action 类似于 mutation，不同在于：

    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作，而Mutation只能且必须是同步操作。
    Module
    由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
    这时我们可以将 store 分割为 模块（module） ，每个模块拥有自己的 state 、 getters 、 mutations 、 actions 、甚至是嵌套子模块——从上至下进行同样方式的分割。

    代码示例：

    const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
    }

    const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
    }

    const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
    })

    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态
    嵌套子模块
    首先创建子模块的文件：

    // products.js

    // initial state
    const state = {
    added: [],
    checkoutStatus: null
    }
    // getters
    const getters = {
    checkoutStatus: state => state.checkoutStatus
    }
    // actions
    const actions = {
    checkout ({ commit, state }, products) {
    }
    }
    // mutations
    const mutations = {
    mutation1 (state, { id }) {
    }
    }
    export default {
    state,
    getters,
    actions,
    mutations
    }
    然后在总模块中引入：

    import Vuex from 'vuex'
    import products from './modules/products' //引入子模块
    Vue.use(Vuex)

    export default new Vuex.Store({
    modules: {
        products   // 添加进模块中
    }
    })
    各个模块与 Vue 组件结合
    将 state 和 getter 结合进组件需要使用 计算属性 ：

    computed: {
        count () {
        return this.$store.state.count 
        // 或者 return this.$store.getter.count
        }
    }
    将 mutation 和 action 结合进组件需要在 methods 中调用 this.$store.commit() 或者 this.$store.commit() :

    methods: {
        changeDate () {
            this.$store.commit('change');
        },
        changeDateAsync () {
            this.$store.commit('changeAsync');
        }
    }
    为了简便起见，Vuex 提供了四个辅助函数方法用来方便的将这些功能结合进组件。

    mapState
    mapGetters
    mapMutations
    mapActions
    示例代码：

    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        // ...
        computed: {
        localComputed () { /* ... */ },
            // 使用对象展开运算符将此对象混入外部对象中
        ...mapState({
            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            count(state) {
            return state.count + this.localCount
            }
        }),
        ...mapGetters({
            getterCount(state, getters) {
            return state.count + this.localCount
            }
        })
        }
        methods: {
        ...mapMutations({
            // 如果想将一个属性另取一个名字，使用以下形式。注意这是写在对象中
            add: 'increment' // 将 `this.add()` 映射为`this.$store.commit('increment')`
            }),
        ...mapActions({
            add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
            })
        }
    }
    如果结合进组件之后不想改变名字，可以直接使用 数组 的方式。

    methods: {
        ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
        ]),
    }
    为何使用展开运算符： mapState 等四个函数返回的都是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个 工具 函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是有了 对象展开运算符 ，我们就可以进行简化写法。

    Vuex的使用差不多就是这样。还有命名空间的概念，大型应用会使用。可以 点这里查看 。

    附：项目结构
    Vuex 不限制代码结构。但是规定了一些需要遵守的规则：

    应用层级的状态应该集中到单个 store 对象中。
    提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
    异步逻辑都应该封装到 action 里面。
    只要你遵守以上规则，如何组织代码随你便。如果 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。