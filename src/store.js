import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://salty-oasis-70023.herokuapp.com/todos";

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
    loadTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
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
      state.todos.map(todo => (todo.completed = checked));
    }
  },
  actions: {
    loadTodos(context) {
      fetch(PROXY_URL + BASE_URL, {
          method: "GET"
        })
        .then(r => r.json())
        .then(d => {
          d.map(item => {
            item.id = item._id;
            delete item._id;
          })
          return d;
        })
        .then((d) => context.commit("loadTodos", d))
        .catch(e => alert(e));
    },
    addTodo(context, todo) {
      fetch(PROXY_URL + BASE_URL, {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => context.dispatch("loadTodos"))
        .catch(e => alert(e));
    },
    updateTodo(context, todo) {
      let data = {
        ...todo
      };
      const id = data.id;
      delete data.id;
      delete data.editing;
      fetch(`${PROXY_URL + BASE_URL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => context.dispatch("loadTodos"))
        .catch(e => alert(e));
    },
    removeTodo(context, id) {
      fetch(`${PROXY_URL + BASE_URL}/${id}`, {
        method: "DELETE"
      }).then(() => context.dispatch("loadTodos"))
    },
    removeCompletedTodos(context) {
      context.commit("removeCompletedTodos");
      // const ids = this.$state.todos.map(todo => console.log(todo.id));
    },
    changeFilter(context, filter) {
      context.commit("changeFilter", filter);
    },
    checkAll(context, checked) {
      context.commit("checkAll", checked);
    }
  }
});