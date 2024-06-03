import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layout/basic-layout.vue'
import { useConfigStore } from '@/stores/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'Index',
          component: () => import('@/views/index.vue')
        },
        {
          path: '/explore',
          name: 'explore',
          component: () => import('@/views/index.vue')
        },
        {
          path: '/chat/:id',
          name: 'chat',
          component: () => import('@/views/index.vue')
        },

        {
          path: '/chats',
          name: 'chats',
          component: () => import('@/views/index.vue'),
          meta: {
            title: '所有聊天'
          }
        },

        {
          path: '/midjourney',
          name: 'midjourney',
          component: () => import('@/views/index.vue'),
          meta: {
            title: 'MidJourney 绘画'
          }
        },
        {
          path: '/stable-diffusion',
          name: 'sd',
          component: () => import('@/views/index.vue'),
          meta: {
            title: 'Stable-Diffusion 绘画'
          }
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: () => import('@/views/index.vue'),
          meta: {
            title: '画廊'
          }
        },
        {
          path: '/subscription',
          name: 'subscription',
          component: () => import('@/views/index.vue'),
          meta: {
            title: '订阅'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/index.vue'),
          meta: {
            title: '个人主页'
          }
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/settings/index.vue'),
          meta: {
            title: '设置'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // const userStore = useUserStore()
  const configStore = useConfigStore()

  configStore.getSystemConfig()
  configStore.setSelectedMenu(to.path)
  // userStore.getCurrentUserInfo()

  configStore.setPageTitle(to.meta.title as string | undefined)

  next()
})

export default router
