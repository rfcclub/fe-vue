<template>
    <div class="container-fluid clear-pad">
        <!-- User panel -->
        <div class="container-fluid bg-black">
            <div class="row">
                <div class="col mb-3 mt-3">
                    <div class="row">
                        <div class="col-md-1 d-flex align-items-center offset-md-1">
                            <a href="#/" class="form-text fg-azure"><img src="images/logo.svg" alt="logo" class="bg-white" width="60px" height="60px"></a>
                        </div>
                        <div class="col-md-4 d-flex align-items-center offset-md-1">
                            <input type="text" placeholder="Type something to search" class="input-search input-form">
                            <button class="fg-azure bg-red btn-search"><i class="fas fa-search-plus"></i></button>
                        </div>
                        <div class="col-md-3 d-flex justify-content-end align-items-center" v-if="isLoggedIn">
                            <div class="border-header clearfix">
                               <span class="fg-azure">Welcome, <a href="#/controlpanel">{{user.name}}</a><a href="#/" class="btn fg-azure" @click="logout">Logout</a></span>
                            </div>
                        </div>
                        <div class="col-md-1 d-flex align-items-center offset-md-2" v-else>
                            <div class="border-header">
                                <popper trigger="clickToOpen" :options="{placement: 'bottom', modifiers: { offset: { offset: '0, 10px' } }}" :visible-arrow="false">
                                    <div class="popper">
                                        <div class="container">
                                            <div class="row mt-2">
                                                <div class="col text-left">Username</div>
                                            </div>
                                            <div class="row">
                                                <div class="col"><input type="text" v-model="username" id="username" maxlength="20"></div>
                                            </div>
                                            <div class="row">
                                                <div class="col text-left">Password</div>
                                            </div>
                                            <div class="row">
                                                <div class="col"><input type="password" v-model="password" id="password" maxlength="20"></div>
                                            </div>
                                            <div class="row mt-2 mb-2">
                                                <div class="col"><button class="btn btn-warning btn-block" @click="login">Login</button></div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" slot="reference" class="fg-azure" data-toggle="popover"><i class="far fa-user-circle"></i><span class="font-weight-bold"> Account</span></a>
                                </popper>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex align-items-center">
                            <div class="border-header">
                                <a href="#/buy" class="fg-azure shopping-cart"><i class="fas fa-shopping-cart"></i><span> </span><span id="itemsInCart" class="font-weight-bold cart-count">{{cartCount}}</span><span class="font-weight-bold fg-azure"> My Cart</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="row border-bottom mt-1 fg-azure"><!-- dummy row --></div>
    </div>
    <div class="container-fluid">
            <div class="row d-flex align-items-center menu-bg">
                <div class="col clear-pad d-flex justify-content-center align-items-center">
                    <a href="/#" class="menu-text">Men</a>
                    <a href="/#" class="menu-text">Women</a>
                    <a href="/#" class="menu-text">Kid</a>
                    <a href="/#" class="menu-text">Footwear</a>
                    <a href="/#" class="menu-text">Gear</a>
                    <a href="/#" class="menu-text">Electronics</a>
                    <a href="/#" class="menu-text">Fanwear</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as util from '../services.js'
import { mapState } from 'vuex'
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  data () {
    return {
      user: null,
      username: '',
      password: ''
    }
  },
  computed: mapState({
    cartCount: state => state.cartCount,
    isLoggedIn: state => state.isLoggedIn
  }),
  created () {
    if (this.$session.exists('isLoggedIn')) {
      this.user = this.$session.get('user')
    }
  },
  components: {
    'popper': Popper
  },
  methods: {
    login () {
      var user = {
        username: this.username,
        password: this.password
      }
      // eslint-disable-next-line
      console.log('logging in ' + user.username);
      // eslint-disable-next-line
      util.loginUser(user).then(result => {
        if (result.loggedIn) {
          this.user = result.loggedInUser;
          this.$session.set('isLoggedIn', true)
          // eslint-disable-next-line no-console
          console.log('JWT:' + result.token)
          this.$session.set('token', result.token)
          this.$session.set('user', result.loggedInUser)
          this.$store.commit('setLoginStatus', true)
          this.$router.push({ path: '/' })
        }
      })
    },
    logout () {
        // eslint-disable-next-line no-unused-vars
      util.logoutUser(this.user).then(result => {
        this.$session.set('isLoggedIn', false)
        this.$session.remove('user')
        this.$session.remove('token')
        this.user = null
        this.$store.commit('setLoginStatus', false)
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>
<style>
    .popper .arrow {
        display: none;
    }
</style>