import { createRouter, createWebHistory } from 'vue-router'
import TheIndexView from '@/components/TheIndexView.vue';
import TheNotFoundView from '@/views/TheNotFoundView.vue';
import TheLoginView from '@/views/Auth/TheLoginView.vue';
import store from "@/store/index.js";
import ThePasswordView from "@/views/Auth/ThePasswordView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: TheIndexView,
      meta: {
        requiresAuth: true,
        layout: 'table-center'
      }
    },
    {
      path: '/auth/login',
      name: 'auth_login',
      component: TheLoginView,
      meta: {
        authForbidden: true,
        layout: 'table-center'
      }
    },
    {
      path: '/auth/password',
      name: 'auth_password',
      component: ThePasswordView,
      meta: {
        authForbidden: true,
        layout: 'table-center'
      }
    },
    {
      path: '/auth/register',
      name: 'auth_register',
      component: TheNotFoundView,
      meta: {
        authForbidden: true,
        layout: 'table-center'
      }
    },
    {
      path: '/auth/email-required',
      name: 'auth_email_required',
      component: TheNotFoundView,
      meta: {
        authForbidden: true,
        layout: 'table-center'
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: TheNotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authForbidden = to.matched.some(record => record.meta.authForbidden)
  store.dispatch('checkLogin');
  const isAuthenticated = store.state.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else if (authForbidden && isAuthenticated) {
    next('/')
  } else {
    next()
  }
});

export default router
