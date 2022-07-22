import App from './App'

import Vue from 'vue'
import store from "./store"
import {
	ShowToastSuc,
	ShowToastErr,
	ShowToastNone
} from 'utils/showToastApi.js'
// 挂载到全局,创建一个ShowToastSuc方法
Vue.prototype.$ShowToastSuc = ShowToastSuc
// 挂载到全局,创建一个$ShowToastErr方法
Vue.prototype.$ShowToastErr = ShowToastErr
// 挂载到全局,创建一个$ShowToastNone方法
Vue.prototype.$ShowToastNone = ShowToastNone
//引入uView
import uView from "uview-ui";
Vue.use(uView);

//引入风控检测、全局oss
import {
	g_mixins
} from '@/components/mixins/mixins.js'

Vue.mixin(g_mixins);

// 挂载vuex
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
})

app.$mount()
