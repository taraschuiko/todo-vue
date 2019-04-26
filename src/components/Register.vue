<template>
  <div class="Register">
    <h4>Register</h4>
    <form action="none">
      <p>Name:</p>
      <input
        type="name"
        name="register_name"
        autocomplete="name"
        v-model="name"
        @keyup.enter="register"
        required
      >
      <p>Email:</p>
      <input
        type="email"
        name="register_email"
        autocomplete="email"
        v-model="email"
        @keyup.enter="register"
        required
      >
      <p>Password:</p>
      <input
        type="password"
        name="register_password"
        autocomplete="password"
        v-model="password"
        @keyup.enter="register"
        required
      >
      <br>
      <button @click="register">Register</button>
    </form>
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
    register(event) {
      event.preventDefault();
      this.$store.dispatch("register", {
        displayName: this.name,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
