<template>
  <div>
    <div class="row">
      <div class="col">
        <p class="error">{{this.$store.state.authError}}</p>
      </div>
    </div>
    <div class="row">
      <Register class="col-12 col-sm-6"/>
      <Login class="col-12 col-sm-6"/>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";

export default {
  name: "Auth",
  components: {
    Login,
    Register
  }
};
</script>

<style lang="scss">
p {
  margin: 10px 0 5px 0;
}

.error {
  margin-top: 0;
}

.Register {
  margin-bottom: 20px;
}

.Register,
.Login {
  button {
    margin-top: 20px;
  }
}
</style>
