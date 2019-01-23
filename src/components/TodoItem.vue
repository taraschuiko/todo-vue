<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEditTodo">
      <div
        v-if="!editing"
        class="todo-item-title"
        :class="{completed : completed}"
        @dblclick="editTodo"
      >{{title}}</div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEditTodo"
        @keyup.enter="doneEditTodo"
        @keyup.escape="cancelEditTodo"
        v-focus
      >
    </div>
    <div class="todo-item-remove" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
/* global eventBus */

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.todo.completed;
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      editing: this.todo.editing,
      completed: this.todo.completed,
      beforeEditCache: ""
    };
  },
  methods: {
    removeTodo(index) {
      eventBus.$emit("removedTodo", index);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEditTodo() {
      if (this.title.trim().length == 0) {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      eventBus.$emit("editedTodo", {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          editing: this.editing,
          completed: this.completed
        }
      });
    },
    cancelEditTodo() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>
