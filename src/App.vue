<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Auth</router-link>
      <br>
      <router-link to="/todos">Todos</router-link>
    </div>
    <div class="container">
      <img src="./assets/logo.png" alt="Logo" class="logo">
      <h1 class="title">Todo List</h1>
      <router-view/>
    </div>
  </div>
</template>

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
