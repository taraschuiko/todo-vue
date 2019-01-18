<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodoTitle"
      @keyup.enter="addTodo"
    >
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
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
    </transition-group>
    <div class="todo-manage">
      <label>
        <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check all
      </label>
      <div
        class="todo-clear-completed"
        v-if="showRemoveCompletedButton"
        @click="removeCompletedTodos"
      >Remove completed</div>
      <div>{{remaining}} items left</div>
    </div>
    <div class="todo-filter">
      <div :class="{active: filter == 'all'}" @click="filter = 'all'">All</div>
      <div :class="{active: filter == 'active'}" @click="filter = 'active'">Active</div>
      <div :class="{active: filter == 'completed'}" @click="filter = 'completed'">Completed</div>
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
      filter: "all",
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
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter === "all") {
        return this.todos;
      } else if (this.filter === "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    showRemoveCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
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
    },
    checkAllTodos() {
      this.todos.map(todo => (todo.completed = event.target.checked));
    },
    removeCompletedTodos() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

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
  animation-duration: 0.3s;

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

.todo-manage {
  display: flex;
  justify-content: space-between;
  padding: 10px 19px;
  margin-top: 10px;
  border-top: 1px solid rgb(235, 235, 235);

  .todo-clear-completed {
    cursor: pointer;
  }
}

.todo-filter {
  display: flex;
  justify-content: center;
  margin-top: 10px;

  div {
    cursor: pointer;
    margin: 0 10px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid rgb(235, 235, 235);
  }

  .active {
    border-color: rgb(172, 172, 172);
  }
}
</style>
