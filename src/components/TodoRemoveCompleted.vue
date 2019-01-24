<template>
  <div
    class="todo-clear-completed"
    v-if="showRemoveCompletedButton"
    @click="removeCompletedTodos"
  >Remove completed</div>
</template>

<script>
export default {
  name: "TodoRemoveCompleted",
  computed: {
    showRemoveCompletedButton() {
      return this.$store.getters.showRemoveCompletedButton;
    }
  },
  methods: {
    removeCompletedTodos() {
      this.$store.dispatch("removeCompletedTodos");
    }
  }
};
</script>
