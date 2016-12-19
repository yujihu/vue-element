import login from '../page/login.vue'
import home from '../page/home.vue'
import home1 from '../page/home/home1.vue'
import home2 from '../page/home/home2.vue'
import home3 from '../page/home/home3.vue'

export default [{
        path: '/',
        component: login
    },
    {
        path: '/home',
        component: home,
        children: [{
                path: '',
                component: home1
            },
            {
                path: 'home1',
                component: home1
            },
            {
                path: 'home2',
                component: home2
            },
            {
                path: 'home3',
                component: home3
            }
        ]
    }
]