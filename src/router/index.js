import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'
import ActorsView from '../views/ActorsView.vue'
import CategoriesView from '../views/CategoriesView.vue'

import MoviesInfoView from '../views/MoviesInfoView.vue'
import ActorsInfoView from '../views/ActorsInfoView.vue'
import LoginView from '../views/LoginView.vue'

import MovieAddView from '../views/MovieAddView.vue'

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
      component: MoviesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movies/:id',
      name: 'movies-info',
      component: MoviesInfoView
    },
    {
      path: '/add/movie',
      name: 'add-movie',
      component: MovieAddView,
    },
    {
      path: '/actors',
      name: 'actos',
      component: ActorsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/actors/:id',
      name: 'actors-info',
      component: ActorsInfoView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     // route protégée
//     const token = localStorage.getItem('token');
//     if(!token){
//       router.push({name: 'login', params: { message: 'eduardo' }})
//     } else {
//       next();
//     }
//   } else {
//     // route pas protégée
//     next();
//   }
// });

export default router
