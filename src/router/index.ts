import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/progress',
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../views/ProgressDemoView.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('../views/ChartView.vue'),
    },
  ],
})

export default router
