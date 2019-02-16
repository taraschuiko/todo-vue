<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Auth</router-link>
      <br>
      <router-link to="/todos">Todos</router-link>
    </div>-->
    <button @click="logout">Log out</button>
    <div class="container">
      <img src="./assets/logo.png" alt="Logo" class="logo">
      <h1 class="title">Todo List</h1>
      <!-- <router-view/> -->
      <Auth v-if="!this.$store.state.isLoggedIn"/>
      <TodoList v-if="this.$store.state.isLoggedIn"/>
    </div>
  </div>
</template>

<script>
import Auth from "./views/Auth.vue";
import TodoList from "./views/TodoList.vue";

export default {
  name: "App",
  components: {
    Auth,
    TodoList
  },
  beforeMount() {
    this.$store.dispatch("checkLogin");
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
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
