import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import SearchView from "@/views/SearchView.vue"
import View404 from "@/views/404View.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/:location",
    name: "location",
    component: SearchView
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: View404
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  }
)

export default router