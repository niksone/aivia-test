export const routes = [
  {
    component: () => import('@/views/Authorization/LoginPage.vue'),
    name: 'login',
    path: '/login',
  },
  {
    component: () => import('@/views/Game/GamePage.vue'),
    name: 'game',
    path: '/game',
  },
]
