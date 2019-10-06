<template>
  <div>
    <!-- Products -->
    <div class="container">
      <!-- Category Title -->
      <div class="row d-flex align-items-center mt-2">
        <h6 class="breadcrumbar_fg"><a href="#/">Home</a> / Clothes</h6>
      </div>
      <div class="row d-flex align-items-center mt-2">
        <div class="col-9 clear-pad"><h5>Clothes</h5></div>
      </div>
      <!-- loop through products and print out result on a horizontal list -->
      <div class="row">
        <div class="col">
          <div class="list">
            <div class="card-group clear-pad">
              <div v-for="(product, index) in products" class="card border m-2" :id="'product_' + index+ '_parent'" :key="index">
                <img
                  class="card-img-top"
                  :src="product.imageLink"
                  :alt="product.imageLink"
                  height="200"
                >
                <div class="card-body d-inline-flex flex-column">
                  <h6 class="card-title mb-auto">
                    <router-link :to="'/productdetail/' + product._id">{{product.name}}</router-link>
                  </h6>
                  <div>
                    <p class="card-text align-bottom align-self-end">
                      <span class="text-danger font-weight-bold">${{product.price}}</span>
                    </p>
                  </div>
                  <div class="mt-1">
                    <a
                      href="#"
                      class="btn btn-warning"
                      style="border-radius: 0%"
                      @click="addToCart(index, '#product_' + index +'_parent')"
                    >Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as util from '../services.js'
import * as functions from '../functions.js'

export default {
  data () {
    return {
      loading: false,
      products: null
    }
  },
  created () {
    this.fetchProducts()
  },
  methods: {
    fetchProducts () {
      this.loading = true
      util.fetchProducts().then(productData => {
        this.loading = false
        this.products = productData.products
        this.$session.set('products', this.products)
        let mapProduct = {}
        this.products.forEach(x => { mapProduct[x._id] = x })
        this.$session.set('productMap', mapProduct)
      })
    },
    addToCart (index, parentId, qtyElement) {
      functions.animateToShoppingCart(parentId)
      if (!this.$session.exists('purchaseOrder')) {
        console.log('add new product')
        // create new purchase order
        let purchaseOrder = {
          cartProducts: [],
          subTotal: 0.00,
          shippingCost: 0.00,
          tax: 0.00,
          total: 0.00
        }
        this.$session.set('purchaseOrder', purchaseOrder)
      }
      let product = this.products[index]
      console.log(product)
      let purchaseOrder = this.$session.get('purchaseOrder')
      let lineIndex = functions.findProductIndex(purchaseOrder.cartProducts, product)
      if (lineIndex >= 0) {
        console.log('Update object')
        purchaseOrder.cartProducts[lineIndex].quantity += 1
      } else {
        console.log('Add object')
        purchaseOrder.cartProducts.push({
          product: product,
          quantity: 1
        })
      }
      this.$store.commit('incrementOrderCount', 1)
      this.$session.set('purchaseOrder', purchaseOrder)
      console.log('Cartcount: ' + functions.sumOfProducts(purchaseOrder.cartProducts))
    }
  }
}
</script>
