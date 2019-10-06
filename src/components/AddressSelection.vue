<template>
  <div>
    <!-- Address selection -->
    <div class="container">
      <div class="row d-flex align-items-left mt-2">
        <h6 class="breadcrumbar_fg"><a href="#/">Home</a> / Address Information</h6>
    </div>
    <div class="row d-flex align-items-left">
      <h4 class="title">Shipping Address</h4>
    </div>
    <div class="row menu-bg border-bottom text-dark pt-2 clear-pad">
      <div class="col-8 d-flex align-items-baseline justify-content-center">
        <h6><b>Shipping Address Information</b></h6>
      </div>
      <div class="col-4 d-flex align-items-baseline justify-content-center">
        <h6><b>Order Summary</b></h6>
      </div>
    </div>
      <div class="row">
        <div class="col-8" style="padding-left:0px">
          <div class="row">
            <div class="col">
              <b>Contact Name:</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <template v-if="isLoggedIn">
                {{shippingAddress.contactName}}
              </template>
              <template v-else>
                <input type="text" v-model="contactName" id="contactName" name="contactName" class="form-control no-round-border">
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>Address:</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <template v-if="isLoggedIn">
                {{shippingAddress.address}}
              </template>
              <template v-else>
                <input type="text" v-model="address" id="address" name="address" class="form-control no-round-border">
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <b>City:</b>
            </div>
            <div class="col">
              <b>Province:</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <template v-if="isLoggedIn">
                {{shippingAddress.city}}
              </template>
              <template v-else>
                <input type="text" v-model="city" id="city" name="city" class="form-control no-round-border">
              </template>
            </div>
            <div class="col">
              <template v-if="isLoggedIn">
                {{shippingAddress.province}}
              </template>
              <template v-else>
                <input type="text" v-model="province" id="province" name="province" class="form-control no-round-border">
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>Postal Code:</b>
            </div>
            <div class="col">
              <b>Telephone:</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <template v-if="isLoggedIn">
                {{shippingAddress.postalCode}}
              </template>
              <template v-else>
                <input type="text" v-model="postalCode" id="postalCode" name="postalCode" class="form-control no-round-border">
              </template>
            </div>
            <div class="col">
              <template v-if="isLoggedIn">
                {{shippingAddress.telephone}}
              </template>
              <template v-else>
                <input type="text" v-model="telephone" id="telephone" name="telephone" class="form-control no-round-border">
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>Email:</b>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <template v-if="isLoggedIn">
                {{user.email}}
              </template>
              <template v-else>
                <input type="text" v-model="email" id="email" name="email" class="form-control no-round-border">
              </template>
            </div>
          </div>
        </div>
        <div class="col-4 border">
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
              <div class="col-7 text-right">
                ${{purchaseOrder.subTotalString}}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                Shipping cost:
              </div>
              <div class="col-7 text-right">
                ${{purchaseOrder.shippingCostString}}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                Tax:
              </div>
              <div class="col-7 text-right">
                ${{purchaseOrder.taxString}}
              </div>
            </div>
            <div class="row border-top">
              <div class="col-5">
                <span class="fold-weight-bold">Total:</span>
              </div>
              <div class="col-7 text-right">
                <span class="fold-weight-bold">${{purchaseOrder.totalString}}</span>
              </div>
            </div>
            <div class="row mt-4 align-self-end">
              <div class="col">
                <a href="#" @click="completeOrder" class="btn btn-danger btn-block no-round-border">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as functions from '../functions.js'

export default {
  data () {
    return {
      hasItem: false,
      isLoggedIn: false,
      purchaseOrder: null,
      contactName: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      telephone: '',
      email: '',
      user: null,
      shippingAddress: null
    }
  },
  beforeCreate () {

  },
  created () {
    let purchaseOrder = this.$session.get('purchaseOrder')
    if (purchaseOrder.cartProducts.length > 0) this.hasItem = true
    else this.hasItem = false
    functions.calculateOrderSummary(purchaseOrder)
    this.purchaseOrder = purchaseOrder
    this.$session.set('purchaseOrder', purchaseOrder)
    if (this.$session.exists('isLoggedIn')) {
      this.isLoggedIn = this.$session.get('isLoggedIn')
      this.user = this.$session.get('user')
      this.shippingAddress = this.user.shippingAddress[0]
    }
  },
  watch: {
    $route: 'purchaseOrder'
  },
  methods: {
    completeOrder () {
      if (!this.isLoggedIn) {
        var address = {
          contactName: this.contactName,
          address: this.address,
          city: this.city,
          province: this.province,
          postalCode: this.postalCode,
          telephone: this.telephone,
          email: this.email,
          isChosen: true
        }
        this.$session.set('address', address)
      }
      this.$router.push({ name: 'summaryOrder' })
    }
  }
}
</script>
