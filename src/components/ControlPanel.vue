<template>
  <div>
    <template v-if="isLoggedIn">
      <!-- Address editing -->
      <div class="container mt-2">
        <div class="row">
          <div class="col-4 border-left border-top border-bottom mb-4">
            <div class="row bg-light">
              <div class="col">
                <h5><b>Menu</b></h5>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">Account information</div>
            </div>
            <div class="row mt-2">
              <div class="col"><a href="#/changepassword">Change password</a></div>
            </div>
            <div class="row mt-2">
              <div class="col"><a href="#/orderhistory">Order history</a></div>
            </div>
          </div>
          <div class="col-8 border mb-4">
            <div class="row bg-light">
              <div class="col">
                <h5><b>User information</b></h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Username:
              </div>
            </div>
            <div class="row">
              <div class="col">
                {{user.username}}
              </div>
            </div>
            <div class="row">
              <div class="col">
                Name:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" id="name" name="name" class="form-control" v-model="user.name">
              </div>
            </div>
            <div class="row">
              <div class="col">
                Email:
              </div>
            </div>
            <div class="row border-bottom">
              <div class="col mb-2">
                <input type="text" id="email" name="email" class="form-control" v-model="user.email">
              </div>
            </div>
            <div class="row bg-light">
              <div class="col">
                <h5><b>Shipping Address</b></h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Contact Name:
              </div>
            </div>
            <div class="row">
              <div class="col">
                  <input type="text" id="contactName" name="contactName" class="form-control" v-model="shippingAddress.contactName">
              </div>
            </div>
            <div class="row">
              <div class="col">
                Address:
              </div>
            </div>
            <div class="row">
              <div class="col">
                  <input type="text" id="address" name="address" class="form-control" v-model="shippingAddress.address">
              </div>
            </div>
            <div class="row">
              <div class="col">
                City:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" id="city" name="city" class="form-control" v-model="shippingAddress.city">
              </div>
            </div>
            <div class="row">
              <div class="col">
                Province:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" id="province" name="province" class="form-control" v-model="shippingAddress.province">
              </div>
            </div>
            <div class="row">
              <div class="col">
                Postal Code:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" id="postalCode" name="postalCode" class="form-control" v-model="shippingAddress.postalCode">
              </div>
            </div>
            <div class="row">
              <div class="col">
                Telephone:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" id="telephone" name="telephone" class="form-control" v-model="shippingAddress.telephone">
              </div>
            </div>
            <div class="row mt-2 mb-2">
              <div class="col-4">
                <input @click="changeUserInfo" type="submit" class="btn btn-block btn-primary" value="Change Information">
              </div>
              <div class="col-6">
                <span id="success-alert" class="badge badge-success" v-if="showSuccess">Save successfully</span>
                <span id="danger-alert" class="badge badge-danger" v-if="showFail">Save failed !!!!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import * as util from '../services.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      user: null,
      shippingAddress: null,
      showSuccess: false,
      showFail: false
    }
  },
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn
  }),
  beforeCreate () {

  },
  created () {
    if (this.isLoggedIn) {
      this.user = this.$session.get('user')
      this.shippingAddress = this.user.shippingAddress[0]
    }
  },
  methods: {
    turnAlertOff () {
      this.showSuccess = false
      this.showFail = false
    },
    changeUserInfo () {
      let sessionUser = this.$session.get('user')
      sessionUser.name = this.user.name
      sessionUser.email = this.user.email
      sessionUser.shippingAddress[0].contactName = this.shippingAddress.contactName
      sessionUser.shippingAddress[0].address = this.shippingAddress.address
      sessionUser.shippingAddress[0].city = this.shippingAddress.city
      sessionUser.shippingAddress[0].province = this.shippingAddress.province
      sessionUser.shippingAddress[0].postalCode = this.shippingAddress.postalCode
      sessionUser.shippingAddress[0].telephone = this.shippingAddress.telephone
      this.$session.set('user', sessionUser)
      // eslint-disable-next-line no-console
      console.log('update information of ' + sessionUser.name + ' with session isLoggedin ' + this.$session.get('isLoggedIn'))
      var body = {
        user: sessionUser,
        jwt: this.$session.get('token')
      }
      util.updateUserInformation(body).then(result => {
        if (result.saved === 200) {
          this.showSuccess = true
          setTimeout(this.turnAlertOff, 1000)
        } else {
          this.showFail = true
          setTimeout(this.turnAlertOff, 1000)
        }
      })
    }
  }
}
</script>
