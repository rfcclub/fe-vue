// App.vue

<template>
    <div class="container-fluid clear-pad">
        <v-header></v-header>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import JQuery from 'jquery'
    window.$ = JQuery
    window.JQuery = JQuery
    import VHeader from './components/VHeader.vue'
    export default {
      components: {
        VHeader
      },
      created () {
        let purchaseOrder = this.$session.get('purchaseOrder')
        if (purchaseOrder) {
          let totalItems = purchaseOrder.cartProducts.reduce((total, product) => total + product.quantity, 0)
          this.$store.commit('setOrderCount', totalItems)
        }
      }
    }
</script>
<style>
.fade-enter-active, .fade-leave-active { transition: opacity .5s }
.fade-enter, .fade-leave-active { opacity: 0 }
</style>
