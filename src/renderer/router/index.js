import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'start',
            component: require('@/pages/start.vue').default,
            meta: {
                isKeepAlive: true
            },
        },
        {
            path: '/loadimg',
            name: 'loadimg',
            component: require('@/pages/loadimg.vue').default
        },
        {
            path: '/timemeter',
            name: 'timemeter',
            component: require('@/pages/timemeter.vue').default
        },
    ]
})