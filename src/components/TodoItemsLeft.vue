<template>
  <div class="todo-items-left">{{remaining}} items left</div>
</template>

<script>
export default {
  name: "TodoItemsLeft",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>
