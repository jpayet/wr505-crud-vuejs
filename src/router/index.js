import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'
import ActorsView from '../views/ActorsView.vue'
import CategoriesView from '../views/CategoriesView.vue'

import MoviesInfoView from '../views/MoviesInfoView.vue'
import ActorsInfoView from '../views/ActorsInfoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/movies/:id',
      name: 'movies-info',
      component: MoviesInfoView
    },
    {
      path: '/actors',
      name: 'actos',
      component: ActorsView
    },
    {
      path: '/actors/:id',
      name: 'actors-info',
      component: ActorsInfoView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
  ]
})

export default router
