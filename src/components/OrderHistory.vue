<template>
<div class="container">
  <div class="row">
    <div class="col-4 border">
      <div class="row border-bottom">
        <div class="col">
          <h2>Menu</h2>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col"><a href="#/controlpanel">Account information</a></div>
      </div>
      <div class="row mt-2">
        <div class="col">Change password</div>
      </div>
      <div class="row mt-2">
        <div class="col"><a href="#">Order history</a></div>
      </div>
    </div>
    <div class="col-8 border">
      <form action="#/changepassword" method="POST">
      <div class="row border-bottom">
        <div class="col">
          <h2>Change password</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          Current password:
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input type="text" id="password" name="password" class="form-control" value="">
        </div>
      </div>
      <div class="row">
        <div class="col">
          New password:
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input type="text" id="newPassword" name="newPassword" class="form-control" value="">
        </div>
      </div>
      <div class="row">
        <div class="col">
          Confirm new password:
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input type="text" id="confirmPassword" name="confirmPassword" class="form-control" value="">
        </div>
      </div>
      <div class="row mt-1 mb-1">
        <div class="col">
          <div id="success-alert" class="alert alert-success" role="alert">Save successfully!</div>
        </div>
      </div>
      <div class="row mt-1 mb-1">
        <div class="col">
          <div id="fail-alert" class="alert alert-danger" role="alert">Save unsuccessfully!</div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-4">
          <input type="submit" class="btn btn-block btn-primary" value="Change Password">
        </div>
      </div>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
}
</script>
