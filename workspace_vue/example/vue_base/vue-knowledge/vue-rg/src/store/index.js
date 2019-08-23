import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import VuexPersistence from 'vuex-persist/dist/umd/index.js'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'rograndec'
})
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
       user
    },
    plugins: [vuexLocal.plugin]
});

export default store;



// WEBPACK FOOTER //
// ./src/store/index.js