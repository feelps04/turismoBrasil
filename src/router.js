import { createRouter, createWebHistory } from 'vue-router'

// Import views
const Home = () => import('./views/Home.vue')
const Profile = () => import('./views/Profile.vue')
const Search = () => import('./views/Search.vue')
const Connections = () => import('./views/Connections.vue')
const Plans = () => import('./views/Plans.vue')
const Suggest = () => import('./views/Suggest.vue')

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/connections',
      name: 'connections',
      component: Connections
    },
    {
      path: '/plans',
      name: 'plans',
      component: Plans
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: Suggest
    }
  ]
})

export default router

