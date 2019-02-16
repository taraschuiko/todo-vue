<template>
  <div class="about">
    <h2 class="title">Please log in or register</h2>
    <p v-for="(error, index) in errors" :key="index">{{error}}</p>
    <form action="#">
      <label>
        <p>Username</p>
        <input type="text" name="username" v-model="username">
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password" v-model="password">
      </label>
      <button @click="login">Log in</button>
      <button @click="register">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      username: "",
      password: "",
      errors: []
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.checkForm();
      if (this.errors.length == 0) {
        this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
      }
      this.username = "";
      this.password = "";
    },
    register(e) {
      e.preventDefault();
      this.checkForm();
      if (this.errors.length == 0) {
        this.$store.dispatch("register", {
          username: this.username,
          password: this.password
        });
      }
      this.username = "";
      this.password = "";
    },
    checkForm() {
      this.errors = [];
      if (this.username.trim() && this.password.trim()) {
        return true;
      }

      if (!this.username.trim() && !this.password.trim()) {
        this.errors.push("Please enter your username and password");
      } else if (!this.username.trim()) {
        this.errors.push("Please enter your username");
      } else if (!this.password.trim()) {
        this.errors.push("Please enter your password");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

label {
  display: block;
  margin-bottom: 10px;

  p {
    margin: 0;
  }
  input {
    color: #2c3e50;
    width: 100%;
    padding: 8px 14px;
    font-size: 16px;
    font-weight: normal;
  }
}

button {
  padding: 8px 14px;
  background-color: #fff;
  cursor: pointer;
  margin-right: 15px;
  font-size: 14px;
}
</style>
