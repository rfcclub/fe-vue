import Vue from 'vue'
import Router from 'vue-router'
import Product from './components/Product.vue'
import ProductDetail from './components/ProductDetail.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import AddressSelection from './components/AddressSelection.vue'
import SummaryOrder from './components/SummaryOrder.vue'
import Register from './components/Register.vue'
import ControlPanel from './components/ControlPanel.vue'
import ChangePassword from './components/ChangePassword.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: Product },
  {
    path: '/productdetail/:id',
    name: 'productdetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/buy/',
    name: 'buy',
    component: ShoppingCart
  },
  {
    path: '/address/',
    name: 'address',
    component: AddressSelection
  },
  {
    path: '/summaryorder/',
    name: 'summaryOrder',
    component: SummaryOrder
  },
  {
    path: '/register/',
    name: 'register',
    component: Register
  },
  {
    path: '/controlpanel/',
    name: 'controlpanel',
    component: ControlPanel
  },
  {
    path: '/changepassword/',
    name: 'changepassword',
    component: ChangePassword
  }
]


export default new Router({
  routes
})
