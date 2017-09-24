// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/bootstrap.css'
import store from './store/store.js'
import '../static/css/swiper.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
