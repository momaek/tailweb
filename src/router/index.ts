import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layout/basic-layout.vue'
import { useConfigStore } from '@/stores/config'
import { useChatStore } from '@/stores/chat'
import httpRequest from '@/utils/axios'

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
          path: '/:chatmodel',
          name: 'ChatModel',
          component: () => import('@/views/chat/chat-model.vue'),
          meta: {
            chat_page: true
          }
        },
        {
          path: '/explore',
          name: 'explore',
          component: () => import('@/views/chat/explore.vue'),
          meta: {
            title: '探索'
          }
        },
        {
          path: '/chat/:id',
          name: 'chat',
          component: () => import('@/views/chat/tail-chat.vue'),
          meta: {
            chat_page: true
          }
        },

        {
          path: '/chats',
          name: 'chats',
          component: () => import('@/views/chat/all-chat.vue'),
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
          component: () => import('@/views/price/index.vue'),
          meta: {
            title: '订阅'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
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
  if (configStore.isTAURI()) {
    httpRequest.updateBaseURL(configStore.getTauriHost() as string)
    console.log('12313123123123123123123', configStore.getTauriHost())
  }
  configStore.getSystemConfig()
  configStore.setSelectedMenu(to.path)
  // userStore.getCurrentUserInfo()

  configStore.setPageTitle(to.meta.title as string | undefined)

  const chatStore = useChatStore()
  chatStore.closeSocket()

  next()
})

export default router
