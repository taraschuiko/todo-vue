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
      <TodoCheckAll></TodoCheckAll>
      <TodoRemoveCompleted></TodoRemoveCompleted>
      <TodoItemsLeft></TodoItemsLeft>
    </div>
    <TodoFilter></TodoFilter>
  </div>
</template>

<script>
import TodoItem from "./../components/TodoItem";
import TodoCheckAll from "./../components/TodoCheckAll";
import TodoRemoveCompleted from "./../components/TodoRemoveCompleted";
import TodoItemsLeft from "./../components/TodoItemsLeft";
import TodoFilter from "./../components/TodoFilter";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoCheckAll,
    TodoRemoveCompleted,
    TodoItemsLeft,
    TodoFilter
  },
  mounted() {
    this.$store.dispatch("loadTodos");
  },
  data() {
    return {
      newTodoTitle: "",
      newTodoId: 0
    };
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle.trim().length == 0) {
        return;
      }

      this.$store.dispatch("addTodo", {
        title: this.newTodoTitle,
        completed: false
      });

      this.newTodoTitle = "";
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
}

.todo-check-all label {
  display: flex;
  align-items: center;
}

.todo-remove-completed {
  cursor: pointer;
  text-align: center;
  margin: 0 20px;
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
    outline: 0;
  }
}

.todo-items-left {
  text-align: right;
}
</style>
