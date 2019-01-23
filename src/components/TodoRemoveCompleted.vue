<template>
  <div
    class="todo-clear-completed"
    v-if="showRemoveCompletedButton"
    @click="removeCompletedTodos"
  >Remove completed</div>
</template>

<script>
/* global eventBus */

export default {
  name: "TodoRemoveCompleted",
  props: {
    showRemoveCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    removeCompletedTodos() {
      eventBus.$emit("removedCompletedTodos");
    }
  }
};
</script>
