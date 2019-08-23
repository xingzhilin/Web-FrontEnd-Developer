//import Cookies from 'js-cookie';

const learn = {
    state: { // 初始化状态
        zlCount:1
    },
    getters: { // getters接收state作为其第一个参数，接受其他 getters 作为第二个参数
        getZlCount: (state) => {
            return state.zlCount++;
        },
        // 两个参数
        getCountDoubleAndDouble: function(state, getters) {
            return getters.getZlCount*2
        }
    },
    mutations: {
        // 提交mutation是更改Vuex中的store中的状态的唯一方法。
        //mutation必须是同步的，如果要异步需要使用action。
        //每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。（提交荷载在大多数情况下应该是一个对象）,提交荷载也可以省略的。
        //无提交荷载
        increment(state) {
            state.zlCount++
        },
        //提交荷载
        incrementN(state, obj) {
            state.zlCount += obj.n
        }
    },
    actions: {

    }
};

export default learn;