import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import TodoList from '../components/ToDoList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: TodoList,
      beforeEnter: (to, from, next) => {
        const usuarioLogado = localStorage.getItem('usuarioLogado')
        if (!usuarioLogado) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})

export default router