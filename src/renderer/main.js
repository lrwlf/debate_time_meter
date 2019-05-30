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




// var devInnerHeight = 1080.0 // 开发时的InnerHeight
// var devDevicePixelRatio = 1.0 // 开发时的devicepixelratio
// var devScaleFactor = 2.0 // 开发时的ScaleFactor
// var scaleFactor = require('electron').screen.getPrimaryDisplay().scaleFactor
// var zoomFactor = (window.innerHeight / devInnerHeight) * (window.devicePixelRatio / devDevicePixelRatio) * (devScaleFactor / scaleFactor)
// require('electron').webFrame.setZoomFactor(zoomFactor)




/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
    data() {
        return {
            bgchanged: false,
            zhengimg: ['static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg'],
            fanimg: ['static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg', 'static/defaultimg.jpg'],
            xiaohui: ['static/defaultimg.jpg', 'static/defaultimg.jpg'], //校徽
            topicz: '',
            topicf: '',
            fomat: [{
                    name: '正方立论',
                    countmode: 1,
                    time: 210,
                    person: 1,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '反方质询',
                    countmode: 1,
                    time: 120,
                    person: -2,
                    waitperson: 1,
                    statistic: true,
                },
                {
                    name: '反方立论',
                    countmode: 1,
                    time: 210,
                    person: -1,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '正方质询',
                    countmode: 1,
                    time: 120,
                    person: 2,
                    waitperson: -1,
                    statistic: true,
                },
                {
                    name: '质询小结',
                    countmode: 1,
                    time: 90,
                    person: -2,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '质询小结',
                    countmode: 1,
                    time: 90,
                    person: 2,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '对辩',
                    countmode: 2,
                    timel: 90,
                    timef: 90,
                    person: 4,
                    waitperson: -4,
                    statistic: true,
                },
                {
                    name: '正方盘问',
                    countmode: 1,
                    time: 90,
                    person: 3,
                    waitperson: 0,
                    statistic: true,
                },
                {
                    name: '反方盘问',
                    countmode: 1,
                    time: 90,
                    person: -3,
                    waitperson: 0,
                    statistic: true,
                },
                {
                    name: '盘问小结',
                    countmode: 1,
                    time: 90,
                    person: 3,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '盘问小结',
                    countmode: 1,
                    time: 90,
                    person: -3,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '自由辩论',
                    countmode: 2,
                    timel: 240,
                    timef: 240,
                    person: 0,
                    waitperson: 0,
                    statistic: true,
                },
                {
                    name: '反方结辩',
                    countmode: 1,
                    time: 210,
                    person: -4,
                    waitperson: 0,
                    statistic: false,
                },
                {
                    name: '正方结辩',
                    countmode: 1,
                    time: 210,
                    person: 4,
                    waitperson: 0,
                    statistic: false,
                },
            ],
            statistic: [],
        }
    },

}).$mount('#app')