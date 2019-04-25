<template>
  <button @click="logout">Logout</button>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>
