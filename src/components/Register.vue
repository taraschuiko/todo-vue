<template>
  <div>
    <h2>Register</h2>
    <div>
      <p>Name:</p>
      <input type="name" name="name" v-model="name" @keyup.enter="register">
      <p>Email:</p>
      <input type="email" name="email" v-model="email" @keyup.enter="register">
      <p>Password:</p>
      <input type="password" name="password" v-model="password" @keyup.enter="register">
      <button @click="register">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        displayName: this.name,
        email: this.email,
        password: this.password
      });
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>
