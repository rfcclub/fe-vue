<template>
  <div>
    <!-- Products -->
    <div class="container">
    <!-- Category Title -->
    <div class="row d-flex align-items-left mt-2">
        <h6 class="breadcrumbar_fg"><a href="#/">Home</a> / Shopping Cart</h6>
    </div>
    <div class="row d-flex align-items-left">
      <h4 class="title">My Cart</h4>
    </div>
    <template v-if="hasItem">
    <!-- loop through products and print out result on a normal list -->
    <div class="row menu-bg border-bottom text-dark pt-2 clear-pad">
      <div class="col-8 d-flex align-items-baseline justify-content-center">
        <h6><b>Products</b></h6>
      </div>
      <div class="col-4 d-flex align-items-baseline justify-content-center">
        <h6><b>Order Summary</b></h6>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <template v-for="(cartProduct, index) in cartProducts">
          <div class="row d-flex align-items-center mt-1 mb-2 border-bottom mr-1" :key="index">
            <!-- picture -->
            <div class="col-2">
              <img class="img-thumbnail img-fluid" :src="cartProduct.product.imageLink" :alt="cartProduct.product.name">
            </div>
            <div class="col-9">
              <div class="row">
                <div class="col-8  d-flex align-items-start justify-content-start">
                  <h6 class="card-title"><b>{{cartProduct.product.name}}</b></h6>
                </div>
                <div class="col-4 d-flex align-items-baseline justify-content-end">
                  <p class="text-danger font-weight-bold mt-1">${{cartProduct.product.price}}</p>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-10">
                  <input type="number" :value="cartProduct.quantity" class="input-cart" @change="changeCartInfo(index, $event)" min="1">
                  <a class="alert button-cart-minor" href="#" @click="removeItem(index)">Remove from cart</a>
                  <a class="alert button-cart" href="#">Add to favorite</a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="col-4 d-flex justify-content-right" id="orderSummary">
        <div class="container">
          <div class="row">
            <div class="col-5">
              &nbsp;
            </div>
            <div class="col-7 text-right">
              Price in CAD
            </div>
          </div>
          <div class="row">
            <div class="col-5">
              Subtotal:
            </div>
            <div class="col-7 text-right" id="subTotal">
              ${{subTotalString}}
            </div>
          </div>
          <div class="row">
            <div class="col-5">
              Shipping cost:
            </div>
            <div class="col-7 text-right" id="shippingCost">
              ${{shippingCostString}}
            </div>
          </div>
          <div class="row">
            <div class="col-5">
              Tax:
            </div>
            <div class="col-7 text-right" id="tax">
              ${{taxString}}
            </div>
          </div>
          <div class="row border-top">
            <div class="col-5">
              Total:
            </div>
            <div class="col-7 text-right" id="total">
              ${{totalString}}
            </div>
          </div>
          <div class="row mt-4 align-self-end">
            <div class="col">
              <router-link :to="'/address/'" class="btn btn-warning btn-block" style="border-radius: 0%">Process to Checkout</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    <template v-else>
    <!-- Category Title -->
    <div class="row d-flex align-items-center">
      <div class="col-10">
        <router-link :to="'/'"><h5>Empty Cart, click here to continue to buy</h5></router-link>
      </div>
    </div>
    </template>
    </div>
  </div>
</template>
<script>
import * as functions from '../functions.js'

export default {
  data () {
    return {
      hasItem: false,
      subTotalString: '0',
      shippingCostString: '0',
      taxString: '0',
      totalString: '0',
      cartProducts: []
    }
  },
  beforeCreate () {

  },
  created () {
    if (this.$session.exists('purchaseOrder')) {
      let purchaseOrder = this.$session.get('purchaseOrder')
      if (purchaseOrder.cartProducts.length > 0) this.hasItem = true
    } else {
      this.hasItem = false
    }
    if (this.hasItem) {
      let purchaseOrder = this.$session.get('purchaseOrder')
      this.cartProducts = purchaseOrder.cartProducts
      functions.calculateOrderSummary(purchaseOrder)
      this.subTotalString = purchaseOrder.subTotalString
      this.shippingCostString = purchaseOrder.shippingCostString
      this.taxString = purchaseOrder.taxString
      this.totalString = purchaseOrder.totalString
    }
    console.log(this.hasItem)
    if (this.$session.exists('isLoggedIn')) {
      this.isLoggedIn = this.$session.get('isLoggedIn')
    }
  },
  methods: {
    changeCartInfo (index, eventHandler) {
      console.log('changeCartInfo:' + eventHandler.target.value)
      let purchaseOrder = this.$session.get('purchaseOrder')
      let lineItem = purchaseOrder.cartProducts[index]
      lineItem.quantity = parseInt(eventHandler.target.value)
      functions.calculateOrderSummary(purchaseOrder)
      this.subTotalString = purchaseOrder.subTotalString
      this.shippingCostString = purchaseOrder.shippingCostString
      this.taxString = purchaseOrder.taxString
      this.totalString = purchaseOrder.totalString
      let totalItems = purchaseOrder.cartProducts.reduce((total, product) => total + product.quantity, 0)
      this.$store.commit('setOrderCount', totalItems)
      if (purchaseOrder.cartProducts.length > 0) {
        this.hasItem = true
        this.$session.set('purchaseOrder', purchaseOrder)
        this.cartProducts = purchaseOrder.cartProducts
      } else {
        this.$session.remove('purchaseOrder')
        this.hasItem = false
        this.cartProducts = []
      }
    },
    removeItem (index) {
      let purchaseOrder = this.$session.get('purchaseOrder')
      purchaseOrder.cartProducts.splice(index, 1)
      functions.calculateOrderSummary(purchaseOrder)
      this.subTotalString = purchaseOrder.subTotalString
      this.shippingCostString = purchaseOrder.shippingCostString
      this.taxString = purchaseOrder.taxString
      this.totalString = purchaseOrder.totalString
      let totalItems = purchaseOrder.cartProducts.reduce((total, product) => total + product.quantity, 0)
      this.$store.commit('setOrderCount', totalItems)
      if (purchaseOrder.cartProducts.length > 0) {
        this.hasItem = true
        this.$session.set('purchaseOrder', purchaseOrder)
        this.cartProducts = purchaseOrder.cartProducts
      } else {
        this.$session.remove('purchaseOrder')
        this.hasItem = false
        this.cartProducts = []
      }
    }
  }
}
</script>
