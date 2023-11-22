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

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetch("http://localhost:8088/wra506/api", {
//         headers: {
//           'Authorization': 'Bearer ' + token,
//         }
//       })
//           .then(response => response.json())
//           .then(result => console.log(result))
//           .catch(error => {
//             console.log('error', error)
//             if (error.response.status === 401) {
//               console.log('error', error)
//               localStorage.removeItem('token');
//               next('/login');
//             } else {
//               next();
//             }
//           });
//       // User is authenticated, proceed to the route
//       next();
//     } else {
//       // User is not authenticated, redirect to login
//       next('/login');
//     }
//   } else {
//     // Non-protected route, allow access
//     next();
//   }
// });

export default router
