<template v-if="product">
  <div>
    <!-- Product Detail -->
    <div class="container">
      <!-- Title -->
      <div class="row d-flex align-items-center mt-2">
        <h6 class="breadcrumbar_fg"><a href="#/">Home</a> / Clothes / {{product.name}}</h6>
      </div>
      <!-- Detail -->
      <div class="row">
        <div class="col" :id="'product_'+ id + '_parent'">
          <div class="row border-top border-bottom justify-content-start">
            <div class="col-5 mt-1 mb-1 clear-pad border" id="imageFrame">
              <img :src="product.imageLink" :alt="product.imageLink" class="img-block clear-pad bg-gray" width="100%">
              <input type="hidden" id="product_id" :value="product._id">
              <input type="hidden" id="product_index" :value="id">
            </div>
            <div class="col-7">
              <div class="row mt-5">
                <div class="col" v-if="product"><h3>{{product.name}}</h3></div>
              </div>
              <div class="row">
                <div class="col">
                  <h5>Price: <span class="text-danger font-weight-bold">${{product.price}}</span></h5>
                </div>
              </div>
              <div class="row">
                <div class="col-8 d-flex align-items-start">
                  <button class="fg-azure bg-grey btn-search border" @click="decrease"><i class="fas fa-minus"></i></button>
                  <input type="text" value="1" class="input-number border form-control bg-white" id="quantity" v-model.number="quantity" readonly>
                  <button class="fg-azure bg-grey btn-search border" @click="increase"><i class="fas fa-plus"></i></button>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-4">
                  <a href="#" class="btn btn-warning btn-block no-curve" @click="buyNow">Buy Now</a>
                </div>
                <div class="col-4">
                  <a href="#" class="btn btn-warning btn-block no-curve" @click="addToCart">Add to cart</a>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">{{product.description}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comment section -->
      <div class="row">
        <div class="col">
          <h5>Comments</h5>
        </div>
      </div>
      <template v-for="comment in product.comments">
        <div class="row" :key="comment">
        <template v-for="image in comment.images">
          <div class="col-3" :key="image">
            <img :src="image.imageLink" :alt="image.imageLink" width="100px" height="100px" class="img-thumbnail">
          </div>
        </template>
        </div>
        <div class="row" :key="comment.commentTitle">
          <div class="col"><b class="border-bottom">{{comment.commentTitle}}</b></div>
        </div>
        <div class="row" v-if="comment.postedBy" :key="comment.postedBy">
          <div class="col font-italic">Written by {{comment.postedBy.name}}</div>
        </div>
        <div class="row border-bottom" :key="comment.commentText">
          <div class="col">{{comment.commentText}}</div>
        </div>
      </template>
      <template v-if="isLoggedIn">
        <div class="row mt-5">
          <div class="col">Title</div>
        </div>
        <div class="row">
          <div class="col-8"><input type="text" v-model="commentTitle" id="commentTitle" name="commentTitle" class="form-control"></div>
        </div>
        <div class="row mt-2">
          <div class="col">Comment</div>
        </div>
        <div class="row">
          <div class="col-8"><input type="text" v-model="commentText" id="commentText" name="commentText" class="form-control"></div>
        </div>
        <div class="row mt-2">
          <div class="col">Picture of your product</div>
        </div>
        <div class="row">
          <div class="col-8"><input type="file" ref="file" id="file" name="file" class="form-control" accept="image/*" @change="handleFileUpload"></div>
        </div>
        <div class="row mt-2">
          <div class="col-3"><a href="#" @click="commentProduct" class="btn btn-warning btn-block">Post Comment</a></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import * as util from '../services.js'
import * as functions from '../functions.js'

export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      product: null,
      cartCount: 0,
      isLoggedIn: false,
      quantity: 1,
      commentTitle: '',
      commentText: '',
      file: null
    }
  },
  beforeCreate () {

  },
  created () {
    let productMap = this.$session.get('productMap')
    this.product = productMap[this.id]
    console.log(this.product)
    if (this.$session.exists('cartCount')) {
      this.cartCount = this.$session.get('cartCount')
    }
    this.fetchProductDetail(this.product)
    if (this.$session.exists('isLoggedIn')) {
      this.isLoggedIn = this.$session.get('isLoggedIn')
    }
  },
  watch: {
    $route: 'product',
    cartCount (newCartCount) {
      this.$session.set('cartCount', this.cartCount)
    }
  },
  methods: {
    fetchProductDetail (product) {
      this.loading = true
      util.fetchProductDetail(product).then(productWithComments => {
        console.log(productWithComments)
        this.loading = false
        this.product = productWithComments.product
      })
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    increase () {
      this.quantity += 1
    },
    decrease () {
      if (this.quantity > 1) this.quantity -= 1
      else this.quantity = 1
    },
    commentProduct () {
      var body = {
        productId: this.product._id,
        commentText: this.commentText,
        commentTitle: this.commentTitle,
        jwt: this.$session.get('token')
      }
      util.postComment(body, this.file).then(result => {
        if (result.saved === 200) {
          this.commentTitle = ''
          this.commentText = ''
          this.file = null
          let currId = this.id
          this.$router.push({ path: `/productdetail/${currId}` })
          this.fetchProductDetail(this.product)
        }
      })
    },
    buyNow () {
      this.addToCart()
      this.$router.push({ path: '/buy/' })
    },
    addToCart () {
      functions.animateToShoppingCart('#imageFrame')
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
      let purchaseOrder = this.$session.get('purchaseOrder')
      let lineIndex = functions.findProductIndex(purchaseOrder.cartProducts, this.product)
      if (lineIndex >= 0) {
        let currNum = Number(purchaseOrder.cartProducts[lineIndex].quantity)
        currNum = currNum + Number(this.quantity)
        purchaseOrder.cartProducts[lineIndex].quantity = currNum
      } else {
        purchaseOrder.cartProducts.push({
          product: this.product,
          quantity: Number(this.quantity)
        })
      }
      this.$store.commit('incrementOrderCount', Number(this.quantity))
      this.$session.set('purchaseOrder', purchaseOrder)
      this.cartCount = functions.sumOfProducts(purchaseOrder.cartProducts)
    }
  }
}
</script>
