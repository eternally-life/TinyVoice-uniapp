import App from './App'

import Vue from 'vue'
import store from "./store"



// 挂载vuex
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
})

app.$mount()
