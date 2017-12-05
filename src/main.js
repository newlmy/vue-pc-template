// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from 'src/router/index'
import './assets/css/reset.css'
import './assets/css/font/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
window.Vue = Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  diagol: {}
})
