<template>
  <div>{{remaining}} items left</div>
</template>

<script>
export default {
  name: "TodoItemsLeft",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>
