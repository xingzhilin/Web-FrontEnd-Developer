// import axios from 'axios'
// import store from '../index';
const test = {
    state: {
        count: 0,
        count2: 0,
        countNumber: 10,
        token: '',
        // 商品列表
        shopList: [{
            id: 1,
            name: '兰博基尼',
            price: 10
        },{
            id: 2,
            name: '五菱宏光',
            price: 99999
        }],
        // 购物车列表
        addList: []
    },
    getters: {// 获取id为2的商品
        shopid2(state){
            return state.shopList.find((el)=>{
                return el.id == 2;    
            });
        },
        countNumber (state) {
            state.countNumber += 2; // state中countNumber字段发生变化，就会触发该方法
            return state.countNumber
        },
        getUserInfo: () => {
            // axios.post('https://devminiapi.yangguangzhenxuan.com',{
            //     token: store.state.user.token
            // }).then(res => {
            // }).catch(err => {
            //     window.console.log(err)
            // })
        },
        doneTodos: (state, getters) => {
            //return state.todos.filter(todo => todo.done)
        }
    },
    mutations: {
        count (state, num) { // num为dispatch传递的参数
            state.count+=num
            state.countNumber+=num
        },
        increment (state, payload) {
            state.count+=100000
        },
        increment2 (state) {
            // 变更状态
            state.count2++
        },
        increment3(state, payload) {
            state.count2 += payload.amount2
        }
    },
    actions: {
        count ({commit}, name) {
            return commit('count', name) // 触发mutations中的方法&&传值
        },
        addCount(context) {
            // 可以包含异步操作
           // context 是一个与 store 实例具有相同方法和属性的 context 对象
        }
    }
}

export default test;