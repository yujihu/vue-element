import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { user: (JSON.parse(sessionStorage.getItem('user')) || { username: '', userid: '' }) },
    mutations: {
        setUser(state, user) {
            Object.assign(state.user, user);
            sessionStorage.setItem('user', JSON.stringify(user));
        },
        deleUser(state) {
            Object.keys(state.user).forEach(k => Vue.delete(state, k));
            sessionStorage.removeItem('user');
        }
    }
})