import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './config/routes'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})