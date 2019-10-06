<template>
  <div>
    <!-- Banner -->
    <div class="container">
        <div class="row">
            <div class="col">
                <img src="images/banner-fashion.jpg" width="100%" height="150">
            </div>
        </div>
    </div>

    <!-- User information -->
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="row border-bottom">
            <div class="col">
              <h2>User Information</h2>
            </div>
          </div>
          <div class="row">
            <div class="col">
              Name:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="name" id="name" name="name" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Email:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="email" id="email" name="email" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Username:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="username" id="username" name="username" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Password:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="password" v-model="password" id="password" name="password" class="form-control">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Address selection -->
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="row border-bottom">
            <div class="col">
              <h2>Shipping Address</h2>
            </div>
          </div>
          <div class="row">
            <div class="col">
              Contact Name:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="contactName" id="contactName" name="contactName" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Address:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="address" id="address" name="address" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              City:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="city" id="city" name="city" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Province:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="province" id="province" name="province" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Postal Code:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="postalCode" id="postalCode" name="postalCode" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Telephone:
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" v-model="telephone" id="telephone" name="telephone" class="form-control">
            </div>
          </div>
          <div class="row mt-4 align-self-end">
              <div class="col">
                <a href="#" @click="completeRegistration" class="btn btn-warning btn-block">Register</a>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as util from '../services.js'

export default {
  data () {
    return {
      isLoggedIn: false,
      name: '',
      email: '',
      username: '',
      password: '',
      contactName: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      telephone: ''
    }
  },
  beforeCreate () {

  },
  created () {
  },
  watch: {
    $route: 'orderCode'
  },
  methods: {
    completeRegistration () {
      var user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
        shippingAddress: []
      }
      var address = {
        contactName: this.contactName,
        address: this.address,
        city: this.city,
        province: this.province,
        postalCode: this.postalCode,
        telephone: this.telephone,
        isChosen: true
      }
      user.shippingAddress.push(address)
      console.log(user)
      util.registerUser(user).then(returnUser => {
        console.log('OK registered')
        this.$session.set('user', user)
        this.$session.set('isLoggedIn', true)
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>
