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
              <div class="col"><a href="#/controlpanel">Account information</a></div>
            </div>
            <div class="row mt-2">
              <div class="col">Change password</div>
            </div>
            <div class="row mt-2">
              <div class="col"><a href="#/">Order history</a></div>
            </div>
          </div>
          <div class="col-8 border mb-4">
            <div class="row bg-light">
              <div class="col">
                <h5><b>Change password</b></h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Current password:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="password" id="password" name="password" class="form-control" v-model="currentPassword">
              </div>
            </div>
            <div class="row">
              <div class="col">
                New password:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="password" id="newPassword" name="newPassword" class="form-control" v-model="newPassword">
              </div>
            </div>
            <div class="row">
              <div class="col">
                Confirm new password:
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" v-model="confirmPassword">
              </div>
            </div>
            <div class="row mt-2 mb-2">
              <div class="col-4">
                <input type="submit" @click="changePassword" class="btn btn-block btn-primary" value="Change Password">
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
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showSuccess: false,
      showFail: false
    }
  },
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn
  }),
  methods: {
    turnAlertOff () {
      this.showSuccess = false
      this.showFail = false
    },
    changePassword () {
      var data = {
        password: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      }
      var body = { passwordData: data }
      body.jwt = this.$session.get('token')
      util.changePassword(body).then(result => {
        if (result && result.saved === 200) {
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
