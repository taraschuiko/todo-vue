import Vue from 'vue'
import Router from 'vue-router'
import Auth from './views/Auth'
import TodoList from './views/TodoList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'login',
      component: Auth
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoList
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})