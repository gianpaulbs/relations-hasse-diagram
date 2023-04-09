import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Operations from '../views/Operations.vue'
import About from '../views/About.vue'

// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/operations',
      name: 'operations',
      component: Operations
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
