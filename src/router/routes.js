
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requirelogin: true } },
      { path: '/info/:roomId', name: 'CompanyInfo', component: () => import('src/pages/CompanyInfo.vue'), meta: { requirelogin: true }, props: true },
      { path: '/detail/:roomId/:roomdata', name: 'BookDetail', component: () => import('src/pages/BookDetail.vue'), meta: { requirelogin: true }, props: true },
      { path: '/status/:idNew', name: 'BookStatus', component: () => import('src/pages/BookStatus.vue'), meta: { requirelogin: true }, props: true },
      { path: '/dashboard', component: () => import('src/pages/DashboardAdmin.vue'), meta: { requirelogin: true } },
      { path: '/profile', component: () => import('src/pages/ProfileUser.vue'), meta: { requirelogin: true } }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/auth/Register-user.vue') },
      { path: '/login', component: () => import('pages/auth/Login-user.vue') },
      { path: '/login-admin', component: () => import('pages/auth/Login-admin.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
