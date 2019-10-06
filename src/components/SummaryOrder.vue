<template>
  <div>
    <!-- Address selection -->
    <template v-if="completed">
    <div class="container">
      <div class="row d-flex align-items-left mt-2">
        <h6 class="breadcrumbar_fg"><a href="#/">Home</a> / Order Summary</h6>
      </div>
      <div class="row d-flex align-items-left">
        <h4 class="title">Purchase Order Summary</h4>
      </div>
      <div class="row">
        <div class="col-8 offset-2">
          <div class="row">
            <div class="col">
              <h4>Purchase Order Code:</h4>(please saved this code to tracking)
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h5>{{orderCode}}</h5>
            </div>
          </div>
          <div class="row border-top">
            <div class="col">
              <h4>Shipping Information</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Contact Name:
            </div>
            <div class="col">
              {{address.contactName}}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Address:
            </div>
            <div class="col">
              {{address.address}}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              City:
            </div>
            <div class="col">
              {{address.city}}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Province:
            </div>
            <div class="col">
              {{address.province}}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Postal Code:
            </div>
            <div class="col">
              {{address.postalCode}}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Telephone:
            </div>
            <div class="col">
              {{address.telephone}}
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              Email:
            </div>
            <div class="col">
              <template v-if="isLoggedIn">
                {{user.email}}
              </template>
              <template v-else>
                {{address.email}}
              </template>
            </div>
          </div>
          <div class="row border-top">
              <div class="col">
                <h4>Order Summary</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                &nbsp;
              </div>
              <div class="col-5 text-right">
                Price in CAD
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Subtotal:
              </div>
              <div class="col-5 text-right">
                ${{purchaseOrder.subTotalString}}
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Shipping cost:
              </div>
              <div class="col-5 text-right">
                ${{purchaseOrder.shippingCostString}}
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Tax:
              </div>
              <div class="col-5 text-right">
                ${{purchaseOrder.taxString}}
              </div>
            </div>
            <div class="row border-top">
              <div class="col-4">
                <span class="fold-weight-bold">Total:</span>
              </div>
              <div class="col-5 text-right">
                <span class="fold-weight-bold">${{purchaseOrder.totalString}}</span>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-4 clear-pad">
                <router-link :to="'/'" class="alert">Return to Main</router-link>
              </div>
            </div>
        </div>
      </div>
    </div>
    </template>
    <template v-else>
      <div class="row d-flex align-items-center">
        <div class="col-10">
          <router-link :to="'/'"><h4>Problem when saving order, click here to return.</h4></router-link>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import * as util from '../services.js'

export default {
  data () {
    return {
      isLoggedIn: false,
      purchaseOrder: null,
      address: null,
      orderCode: '',
      completed: false,
      user: null
    }
  },
  beforeCreate () {

  },
  created () {
    if (this.$session.exists('isLoggedIn')) {
      this.isLoggedIn = this.$session.get('isLoggedIn')
    }
    var body = {
      purchaseOrder: this.$session.get('purchaseOrder'),
      address: this.$session.get('address'),
      jwt: this.$session.get('token')
    }
    util.sendPurchaseOrder(body).then(result => {
      if (result.saved === 200) {
        this.completed = true
        this.orderCode = result.orderCode
        this.purchaseOrder = this.$session.get('purchaseOrder')
        this.$session.remove('purchaseOrder')
        this.$session.remove('cartCount')
        this.$store.commit('resetOrderCount')
        if (this.isLoggedIn) {
          let user = this.$session.get('user')
          this.address = user.shippingAddress[0]
          this.user = user
        } else {
          this.address = this.$session.get('address')
          this.$session.remove('address')
        }
      }
    })
  },
  watch: {
    $route: 'orderCode'
  },
  methods: {

  }
}
</script>
