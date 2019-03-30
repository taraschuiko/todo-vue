<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <h1 class="title">Todo Vue.js App</h1>
    <TodoList/>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "app",
  components: {
    TodoList
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
