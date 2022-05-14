import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Login',
    },
    beforeEnter: (to, from, next) => {
      document.title = `${to.meta.title}`;
      next();
    },
  },
  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue'),
    meta: {
      title: 'Forgot Password',
    },
    beforeEnter: (to, from, next) => {
      document.title = `${to.meta.title}`;
      if (!store.getters.getUserAuthStatus) next();
      else next({ name: 'Home' });
    },
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue'),
    meta: {
      title: '401',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/faqs',
    name: 'Faqs',
    component: () => import('@/views/Faqs.vue'),
    meta: {
      title: 'FAQs',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/my_faqs',
    name: 'MyFaqs',
    component: () => import('@/views/MyFaqs.vue'),
    meta: {
      title: 'My FAQs',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/create_faq',
    name: 'CreateFaq',
    component: () => import('@/views/CreateFaq.vue'),
    meta: {
      title: 'Create FAQ',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/edit_faq/:id',
    name: 'EditFaq',
    component: () => import('@/views/EditFaq.vue'),
    meta: {
      title: 'Edit FAQ',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/pending_approval',
    name: 'PendingApproval',
    component: () => import('@/views/PendingApproval.vue'),
    meta: {
      title: 'Pending Approval',
    },
    beforeEnter: ifScientist,
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: () => import('@/views/Volunteers.vue'),
    meta: {
      title: 'Volunteers',
    },
    beforeEnter: ifAdmin,
  },
  {
    path: '/create_volunteer',
    name: 'CreateVolunteer',
    component: () => import('@/views/CreateVolunteer.vue'),
    meta: {
      title: 'Create Volunteer',
    },
    beforeEnter: ifAdmin,
  },
  {
    path: '/edit_volunteer/:id',
    name: 'EditVolunteer',
    component: () => import('@/views/EditVolunteer.vue'),
    meta: {
      title: 'Edit Volunteer',
    },
    beforeEnter: ifAdmin,
  },
  {
    path: '/tweets',
    name: 'Tweets',
    component: () => import('@/views/Tweets.vue'),
    meta: {
      title: 'Tweets',
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: 'Settings',
    },
    beforeEnter: ifScientist,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404',
    },
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function ifAuthenticated(to, from, next) {
  document.title = `${to.meta.title}`;
  if (!store.getters.getUserAuthStatus) return next({ name: 'Login' });
  else return next();
}

function ifAdmin(to, from, next) {
  document.title = `${to.meta.title}`;
  if (store.getters.getUserAuthStatus) {
    if (store.getters.getUserRole !== 'מנהל')
      return next({ name: 'Unauthorized' });
    else return next();
  } else return next({ name: 'Login' });
}

function ifScientist(to, from, next) {
  document.title = `${to.meta.title}`;
  if (store.getters.getUserAuthStatus) {
    if (store.getters.getUserRole == 'מתנדב')
      return next({ name: 'Unauthorized' });
    else return next();
  } else return next({ name: 'Login' });
}

export default router;
