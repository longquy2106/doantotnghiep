
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/info/:roomId', name: 'CompanyInfo', component: () => import('src/pages/CompanyInfo.vue'), props: true },
      { path: '/detail/:roomId/:roomdata', name: 'BookDetail', component: () => import('src/pages/BookDetail.vue'), props: true },
      { path: '/status/:idNew', name: 'BookStatus', component: () => import('src/pages/BookStatus.vue'), props: true },
      { path: '/dashboard', component: () => import('src/pages/DashboardAdmin.vue'), meta: { requirelogin: true } },
      { path: '/profile', component: () => import('src/pages/ProfileUser.vue'), meta: { requirelogin: true } },
      { path: '/historybook', component: () => import('src/pages/HistoryBooking.vue'), meta: { requirelogin: true } }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/auth/Register-user.vue') },
      { path: '/login', component: () => import('pages/auth/Login-user.vue') }
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
