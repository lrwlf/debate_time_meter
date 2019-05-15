import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
    data() {
        return {
            zhengimg: ['static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg'],
            fanimg: ['static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg'],
            xiaohui: ['static/defaultimg.jpg', 'static/defaultimg.jpg'], //校徽
            vsimg:'static/vs.jpg',
            topicz: '',
            topicf: '',
            fomat: [{
                    name: '正方开篇立论',
                    countmode: 1,
                    time: 210,
                    person: 1,
                },
                {
                    name: '反方二辩质询',
                    countmode: 1,
                    time: 120,
                    person: -2,
                },
                {
                    name: '反方开篇立论',
                    countmode: 1,
                    time: 210,
                    person: -1,
                },
                {
                    name: '正方二辩质询',
                    countmode: 1,
                    time: 120,
                    person: 2,
                },
                {
                    name: '正方质询小结',
                    countmode: 1,
                    time: 90,
                    person: 2,
                },
                {
                    name: '反方质询小结',
                    countmode: 1,
                    time: 90,
                    person: -2,
                },
                {
                    name: '正反四辩对辩论',
                    countmode: 2,
                    time: 90,
                    person: 4,
                },
                {
                    name: '正方三辩盘问',
                    countmode: 1,
                    time: 90,
                    person: 3,
                },
                {
                    name: '反方三辩盘问',
                    countmode: 1,
                    time: 90,
                    person: -3,
                },
                {
                    name: '正方盘问小结',
                    countmode: 1,
                    time: 90,
                    person: 3,
                },
                {
                    name: '反方盘问小结',
                    countmode: 1,
                    time: 90,
                    person: -3,
                },
                {
                    name: '自由辩论',
                    countmode: 2,
                    time: 240,
                    person: 1,
                },
                {
                    name: '反方结辩',
                    countmode: 1,
                    time: 210,
                    person: -4,
                },
                {
                    name: '正方结辩',
                    countmode: 1,
                    time: 210,
                    person: 4,
                },
            ]
        }
    },

}).$mount('#app')