import Vue from 'vue'
import App from './App.vue'
import VueSessionStorage from 'vue-sessionstorage'
import router from './router'
import store from './store'

Vue.use(VueSessionStorage)
Vue.config.productionTip = false
// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})
