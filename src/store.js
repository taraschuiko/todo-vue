import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: "all",
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter === "all") {
        return state.todos;
      } else if (state.filter === "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter === "completed") {
        return state.todos.filter(todo => todo.completed);
      }
      return state.todos;
    },
    showRemoveCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        editing: todo.editing,
        completed: todo.completed
      });
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    removeCompletedTodos(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    changeFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, checked) {
      state.todos.map(
        todo => (todo.completed = checked)
      );
    }
  },
  actions: {
    addTodo(context, todo) {
      // For AJAX
      // setTimeout(() => {
      //   context.commit("addTodo", todo);
      // }, 1000);
      context.commit("addTodo", todo);
    },
    updateTodo(context, todo) {
      context.commit("updateTodo", todo);
    },
    removeTodo(context, id) {
      context.commit("removeTodo", id);
    },
    removeCompletedTodos(context) {
      context.commit("removeCompletedTodos");
    },
    changeFilter(context, filter) {
      context.commit("changeFilter", filter);
    },
    checkAll(context, checked) {
      context.commit("checkAll", checked);
    }
  }
})