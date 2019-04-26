import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://server-for-todo-by-koa.herokuapp.com";

export default new Vuex.Store({
  state: {
    userName: "",
    isLoggedIn: false,
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
    },
    getCompletedTodosIds(state) {
      return state.todos.map(todo => {
        if (todo.completed) {
          return todo.id;
        }
      });
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
    },
    // auth
    setUserName(state, userName) {
      state.userName = userName;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    login(state, data) {
      state.userName = data.user;
      state.isLoggedIn = true;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user);
    },
    logout(state) {
      state.userName = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
  },
  actions: {
    loadTodos(context) {
      fetch(PROXY_URL + BASE_URL + "/" + this.state.userName, {
        method: "GET",
        headers: {}
      })
        .then(r => r.json())
        .then(d => {
          d.map(item => {
            item.id = item._id;
            delete item._id;
          });
          return d;
        })
        .then(d => context.commit("loadTodos", d));
    },
    addTodo(context, todo) {
      fetch(PROXY_URL + BASE_URL + "/" + this.state.userName, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(() => context.dispatch("loadTodos"))
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
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(() => context.dispatch("loadTodos"))
        .catch(e => alert(e));
    },
    removeTodo(context, id) {
      fetch(`${PROXY_URL + BASE_URL}/${id}`, {
        method: "DELETE"
      })
        .then(() => context.dispatch("loadTodos"))
        .catch(e => alert(e));
    },
    removeCompletedTodos(context) {
      let ids = this.getters.getCompletedTodosIds;
      ids.map(id => context.dispatch("removeTodo", id));
    },
    changeFilter(context, filter) {
      context.commit("changeFilter", filter);
    },
    checkAll(context, checked) {
      this.state.todos.map(todo => {
        todo.completed = checked;
        context.dispatch("updateTodo", todo);
      });
    },
    // auth
    register(context, data) {
      fetch(`${PROXY_URL}${BASE_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(r => r.json())
        .then(data => context.commit("login", data));
    },
    login(context, data) {
      fetch(`${PROXY_URL}${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(r => r.json())
        .then(data => {
          context.commit("login", data);
        });
    },
    checkLogin(context) {
      fetch(`${PROXY_URL}${BASE_URL}/checkLogin`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.isLoggedIn) {
            let data = {
              token: localStorage.getItem("token"),
              user: localStorage.getItem("userName")
            };
            context.commit("login", data);
          }
        });
    }
  }
});
