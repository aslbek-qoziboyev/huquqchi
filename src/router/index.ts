import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/auth/ForgotPasswordView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/auth/verify',
    name: 'VerifyEmail',
    component: () => import('../views/auth/VerifyView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/auth/ResetPasswordView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/assistant',
    name: 'Assistant',
    component: () => import('../views/AssistantView.vue')
  },
  {
    path: '/laws',
    name: 'Laws',
    component: () => import('../views/LawsView.vue')
  },
  {
    path: '/laws/:id',
    name: 'LawDetails',
    component: () => import('../views/LawDetailsView.vue')
  },
  {
    path: '/documents',
    name: 'Documents',
    component: () => import('../views/DocumentsView.vue')
  },
  {
    path: '/documents/create/:id',
    name: 'DocumentCreate',
    component: () => import('../views/DocumentCreateView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  
  // Lazy initialize session user on reload
  if (authStore.user === null && sessionStorage.getItem('mening_huquqim_user')) {
    await authStore.initialize();
  }

  const isAuthed = authStore.isAuthenticated;
  const isVerified = authStore.isVerified;

  if (to.meta.requiresAuth && !isAuthed) {
    next({ path: '/auth/login', query: { redirect: to.fullPath } });
  } else if (to.meta.guestOnly && isAuthed) {
    next('/dashboard');
  } else if (to.meta.verifiedOnly && isAuthed && !isVerified && to.path !== '/auth/verify') {
    next('/auth/verify');
  } else {
    next();
  }
});

export default router;
