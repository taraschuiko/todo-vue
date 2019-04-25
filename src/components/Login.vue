<template>
  <div>
    <h2>Login</h2>
    <div>
      <p>Email:</p>
      <input type="email" name="email" v-model="email" @keyup.enter="login">
      <p>Password:</p>
      <input type="password" name="password" v-model="password" @keyup.enter="login">
      <button @click="login">Login</button>
    </div>
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
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      this.email = "";
      this.password = "";
    }
  }
};
</script>