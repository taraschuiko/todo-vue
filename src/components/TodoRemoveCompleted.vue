<template>
  <div
    class="todo-remove-completed"
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
    },
    getCompletedTodosIds() {
      return this.$store.getters.getCompletedTodosIds;
    }
  },
  methods: {
    removeCompletedTodos() {
      this.$store.dispatch("removeCompletedTodos");
    }
  }
};
</script>
