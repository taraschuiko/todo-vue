<template>
  <div class="todo-filter">
    <div :class="{active: filter == 'all'}" @click="changeFilter('all')">All</div>
    <div :class="{active: filter == 'active'}" @click="changeFilter('active')">Active</div>
    <div :class="{active: filter == 'completed'}" @click="changeFilter('completed')">Completed</div>
  </div>
</template>

<script>
/* global eventBus */

export default {
  name: "TodoFilter",
  data() {
    return {
      filter: "all"
    };
  },
  methods: {
    changeFilter(filter) {
      this.filter = filter;
      eventBus.$emit("filterChanged", filter);
    }
  }
};
</script>
