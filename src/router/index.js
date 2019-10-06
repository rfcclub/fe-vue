import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../components/Product.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import AddressSelection from '../components/AddressSelection.vue'
import SummaryOrder from '../components/SummaryOrder.vue'
import Register from '../components/Register.vue'
import ControlPanel from '../components/ControlPanel.vue'
import ChangePassword from '../components/ChangePassword.vue'

Vue.use(VueRouter)

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

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router
