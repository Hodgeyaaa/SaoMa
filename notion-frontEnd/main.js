import App from './App'
import Vue from 'vue'
import GoEasy from 'goeasy'

import './style/animat.css'


//momet 时间模块
import moment from 'moment'
moment.locale('zh-cn')//中国时间
Vue.prototype.$Time = moment


// goeasy即时通讯初始化
Vue.prototype.goeasy = GoEasy.getInstance({
    host:"hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
    appkey:"BC-b68f741e35284f2fac776d3b061710d2",
    modules:['pubsub']//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
