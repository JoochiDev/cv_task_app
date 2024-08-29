import './assets/main.css'
import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import Portada from './pages/Portada.vue'
import TareasMain from './pages/TareasMain.vue'
import PaginaNoEncontrada from './pages/PaginaNoEncontrada.vue'
const routes = [
  { path: '/', name: 'Home', component: Portada },
  { path: '/tareas', name: 'tareas', component: TareasMain },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: PaginaNoEncontrada }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
