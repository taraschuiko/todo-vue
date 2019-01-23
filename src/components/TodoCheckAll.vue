<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="checkAll"> Check all
    </label>
  </div>
</template>

<script>
/* global eventBus */

export default {
  name: "TodoCheckAll",
  props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    checkAll() {
      eventBus.$emit("checkAllChanged", this.anyRemaining);
    }
  }
};
</script>
