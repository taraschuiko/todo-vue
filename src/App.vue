<template>
  <div id="app" class="container">
    <div v-if="this.$store.state.isLoggedIn">
      <p>Hello, {{this.$store.state.userName}}</p>
      <Logout></Logout>
    </div>
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <h1 class="title">Todo Vue.js App</h1>
    <TodoList v-if="this.$store.state.isLoggedIn"/>
    <div v-if="!this.$store.state.isLoggedIn">
      <Login/>
      <Register/>
    </div>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

export default {
  name: "app",
  components: {
    TodoList,
    Login,
    Register,
    Logout
  },
  mounted() {
    this.$store.dispatch("checkLogin");
    // if (localStorage.getItem("token")) {
    //   this.$store.commit("login", {
    //     user: localStorage.getItem("userName"),
    //     token: localStorage.getItem("token")
    //   });
    // }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  width: 100px;
  margin: 0 auto;
  display: block;
}

.title {
  text-align: center;
}
</style>
