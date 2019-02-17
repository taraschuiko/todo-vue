// import VueCookie from 'vue-cookie'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import router from './router'

// If you remove Vue Cookie, please remove it from package.json too
// Vue.use(VueCookie)
Vue.config.productionTip = false

new Vue({
  store,
  // router,
  render: h => h(App)
}).$mount('#app')