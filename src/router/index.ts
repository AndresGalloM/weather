import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import View404 from '@/views/404View.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/:location?',
    name: 'location',
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: View404
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  }
)

export default router