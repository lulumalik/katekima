import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Detail from '@/views/DetailData.vue'
import AddEdit from '@/views/AddEdit.vue'

// Berrypages
import BerryPages from '@/views/Berry/MainView.vue'
import BerryDetails from '@/views/Berry/DetailData.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/berry', component: BerryPages },
  { path: '/berry/:id', component: BerryDetails },
  { path: '/detail/:id', component: Detail },
  { path: '/add', component: AddEdit },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
