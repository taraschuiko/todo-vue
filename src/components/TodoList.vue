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
      <TodoItem
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
      ></TodoItem>
    </transition-group>
    <div class="todo-manage">
      <TodoCheckAll :anyRemaining="anyRemaining"></TodoCheckAll>
      <TodoRemoveCompleted :showRemoveCompletedButton="showRemoveCompletedButton"></TodoRemoveCompleted>
      <TodoItemsLeft :remaining="remaining"></TodoItemsLeft>
    </div>
    <TodoFilter></TodoFilter>
  </div>
</template>

<script>
/* global eventBus */

import TodoItem from "./TodoItem";
import TodoCheckAll from "./TodoCheckAll";
import TodoRemoveCompleted from "./TodoRemoveCompleted";
import TodoItemsLeft from "./TodoItemsLeft";
import TodoFilter from "./TodoFilter";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoCheckAll,
    TodoRemoveCompleted,
    TodoItemsLeft,
    TodoFilter
  },
  data() {
    return {
      newTodoTitle: "",
      newTodoId: 3,
      beforeEditCache: "",
      filter: "all",
      todos: []
    };
  },
  created() {
    eventBus.$on("removedTodo", index => this.removeTodo(index));
    eventBus.$on("editedTodo", data => this.editedTodo(data));
    eventBus.$on("checkAllChanged", checked => this.checkAllTodos(checked));
    eventBus.$on("filterChanged", filter => (this.filter = filter));
    eventBus.$on("removedCompletedTodos", () => this.removeCompletedTodos());
  },
  beforeDestroy() {
    eventBus.$off("removedTodo", index => this.removeTodo(index));
    eventBus.$off("editedTodo", data => this.editedTodo(data));
    eventBus.$off("checkAllChanged", checked => this.checkAllTodos(checked));
    eventBus.$off("filterChanged", filter => (this.filter = filter));
    eventBus.$off("removedCompletedTodos", () => this.removeCompletedTodos());
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
  methods: {
    addTodo() {
      if (this.newTodoTitle.trim().length == 0) {
        return;
      }

      this.todos.push({
        id: this.newTodoId,
        title: this.newTodoTitle,
        editing: false,
        completed: false
      });

      this.newTodoTitle = "";
      this.newTodoId++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.map(todo => (todo.completed = event.target.checked));
    },
    removeCompletedTodos() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    editedTodo(data) {
      // this.todos[data.index] = data.todo;
      // or
      this.todos.splice(data.index, 1, data.todo);
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
