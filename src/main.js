// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from 'src/router/index'
import './assets/css/reset.css'
import './assets/css/element-ui/index.css'
import './assets/css/font/iconfont.css'
let XM = {}
Vue.config.productionTip = false

Vue.use(ElementUI)
window.Vue = Vue
window.XM = XM
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  diagol: {}
})

