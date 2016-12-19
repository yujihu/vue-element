import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './config/routes'
import store from './store/user'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(({ meta, path }, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.username) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/') {
        return next({ path: '/' })
    }
    next()
})

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})