<template>
  <div class="Login">
    <h4>Login</h4>
    <form action="none">
      <p>Email:</p>
      <input
        type="email"
        name="login_email"
        autocomplete="email"
        v-model="email"
        @keyup.enter="login"
        required
      >
      <p>Password:</p>
      <input
        type="password"
        name="login_password"
        autocomplete="password"
        v-model="password"
        @keyup.enter="login"
        required
      >
      <br>
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>