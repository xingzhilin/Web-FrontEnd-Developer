


import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import test from './modules/test';
import learn from './modules/learn';

import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'testVue'
})
Vue.use(Vuex);

const store = new Vuex.Store({
    namespaced: true,
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        user,
        test,
        learn
    },
    plugins: [vuexLocal.plugin]
});

export default store;



// WEBPACK FOOTER //
// ./src/store/index.js

