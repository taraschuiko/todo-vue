<template>
  <div class="todo-filter">
    <div :class="{active: filter == 'all'}" @click="changeFilter('all')">All</div>
    <div :class="{active: filter == 'active'}" @click="changeFilter('active')">Active</div>
    <div :class="{active: filter == 'completed'}" @click="changeFilter('completed')">Completed</div>
  </div>
</template>

<script>
export default {
  name: "TodoFilter",
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch("changeFilter", filter);
    }
  }
};
</script>
