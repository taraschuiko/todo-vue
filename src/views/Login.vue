<template>
  <div class="about">
    <h2 class="title">Please log in</h2>
    <form action="#">
      <label>
        <p>Username</p>
        <input type="text" name="username">
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password">
      </label>
      <button>Log in</button>
      <button>Register</button>
    </form>
  </div>
</template>

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
}
</style>
