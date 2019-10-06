// eslint-disable-next-line no-useless-catch
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartCount: 0,
    isLoggedIn: false
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status
    },
    incrementOrderCount (state, number) {
      state.cartCount += number
    },
    setOrderCount (state, orderCount) {
      state.cartCount = orderCount
    },
    resetOrderCount (state) {
      state.cartCount = 0
    }
  }
})
Vue.prototype.$store = store

export default store
