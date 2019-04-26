<template>
  <div class="todo-check-all">
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="checkAll"> Check all
    </label>
  </div>
</template>

<script>
export default {
  name: "TodoCheckAll",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    checkAll() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>

<style lang="scss">
.todo-check-all {
  input {
    margin-right: 5px;
  }
}
</style>
