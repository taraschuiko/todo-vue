<template>
  <div id="app" class="container">
    <div v-if="this.$store.state.isLoggedIn" class="row top-bar">
      <div class="col-12 col-sm-6">
        <h2>Todo App</h2>
      </div>
      <div class="col-12 col-sm-6 top-bar__logout">
        <span>Hello, {{this.$store.state.userName}}</span>
        <Logout></Logout>
      </div>
    </div>
    <div class="row todo">
      <div class="col-12">
        <TodoList v-if="this.$store.state.isLoggedIn"/>
        <div v-if="!this.$store.state.isLoggedIn">
          <Login/>
          <Register/>
        </div>
      </div>
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
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 10px;
}

.top-bar {
  &__logout {
    display: flex;
    align-items: center;

    @media (min-width: 576px) {
      justify-content: flex-end;
    }

    span {
      margin-right: 10px;
    }
  }
}

.todo {
  margin-top: 10px;
}
</style>
