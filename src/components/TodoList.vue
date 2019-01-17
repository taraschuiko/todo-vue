<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodoTitle"
      @keyup.enter="addTodo"
    >
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div
          v-if="!todo.editing"
          @dblclick="editTodo(todo)"
          class="todo-item-title"
          :class="{completed : todo.completed}"
        >{{todo.title}}</div>
        <input
          v-else
          class="todo-item-edit"
          type="text"
          v-model="todo.title"
          @blur="doneEditTodo(todo)"
          @keyup.enter="doneEditTodo(todo)"
          @keyup.escape="cancelEditTodo(todo)"
          v-focus
        >
      </div>
      <div class="todo-item-remove" @click="removeTodo(index)">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTodoTitle: "",
      newTodoId: 3,
      beforeEditCache: "",
      todos: [
        {
          id: 1,
          title: "Some task",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Another task",
          completed: false,
          editing: false
        }
      ]
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle.trim().length == 0) {
        return;
      }

      this.todos.push({
        id: this.newTodoId,
        title: this.newTodoTitle,
        completed: false
      });

      this.newTodoTitle = "";
      this.newTodoId++;
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEditTodo(todo) {
      if (todo.title.trim().length == 0) {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    cancelEditTodo(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid rgb(172, 172, 172);

  &:focus {
    outline: 0;
  }
}

.todo-item {
  padding: 10px 18px;
  margin: 2px 0;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    display: flex;
    align-items: center;
  }

  &-title {
    font-size: 16px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    color: #2c3e50;
    padding: 4px;
    padding-left: 6px;
  }

  &-edit {
    font-size: 16px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    color: #2c3e50;
    padding: 4px;
  }

  .completed {
    text-decoration: line-through;
    color: rgb(161, 161, 161);
  }

  &-remove {
    padding: 4px;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: #000;
    }
  }
}
</style>
