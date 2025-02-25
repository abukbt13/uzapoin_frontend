import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      component: Login,
    }, {
      path: '/auth/register',
      component: Register,
    },
  ],
})

export default router
