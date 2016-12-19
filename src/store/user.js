import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: '',
            userid: ''
        }
    },
    mutations: {
        setUser(state, user) {
            state.user.username = user.username;
            state.user.userid = user.userid;
        },
        deleUser(state) {
            state.user.username = '';
            state.user.userid = '';
        }
    }
})