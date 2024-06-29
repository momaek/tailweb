<template>
  <div class="w-full flex justify-center py-8">
    <div
      class="max-w-4xl px-2 lg:px-8 w-full flex flex-col"
      ref="el"
      :style="{ 'margin-bottom': marginBottom + 20 + 'px' }"
    >
      <div
        class="group bg-light-faint flex flex-col gap-4 bg-secondary w-full rounded-lg px-4 py-4"
        v-if="roleInfo"
      >
        <div class="head flex shrink-0 items-center">
          <span><img :src="roleInfo.icon" class="w-12 rounded-lg" alt="" /></span>
          <div class="ml-2 flex flex-col">
            <span class="font-bold text-lg">{{ roleInfo.name }}</span>
            <span class="text-sm">运营方：zenbot</span>
          </div>
        </div>
        <div class="more-op flex">
          <span class="cursor-pointer flex px-2 py-1 rounded-full bg-border hover:bg-border/60">
            <InformationCircleIcon class="w-5 mr-1" />
            <span>角色信息</span>
          </span>

          <FwTooltip class="ml-3">
            <template #trigger>
              <span class="cursor-pointer flex px-2 py-1 rounded-full bg-border hover:bg-border/60">
                <UserPlusIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </template>
            <template #content>
              <span class="text-sm">关注角色</span>
            </template>
          </FwTooltip>

          <FwTooltip class="ml-3">
            <template #trigger>
              <span class="cursor-pointer flex px-2 py-1 rounded-full bg-border hover:bg-border/60">
                <ArrowUpOnSquareIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </template>
            <template #content>
              <span class="text-sm">分享角色</span>
            </template>
          </FwTooltip>
        </div>
        <div class="description flex flex-col gap-2">
          <p class="text-sm">{{ roleInfo.description }}</p>
          <div class="flex items-center justify-start w-full">
            <p class="flex shrink-0">Powered By</p>
            <Listbox as="div" class="ml-2 w-full" v-model="selectedModel">
              <div class="relative">
                <ListboxButton
                  class="relative w-full sm:w-1/2 h-9 cursor-default rounded-md py-1.5 pl-3 pr-10 text-left 0 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <span v-if="selectedModel" class="block truncate">{{ selectedModel.name }}</span>
                  <span v-else>请选择模型</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    v-if="canSelect"
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 bg-secondary text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="model in models"
                      :key="model.id"
                      :value="model"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-secondary-foreground',
                          'relative cursor-default select-none py-2 pl-8 pr-4'
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
                          >{{ model.name }}</span
                        >

                        <span
                          v-if="selected"
                          :class="[
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                          ]"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      <div class="chat-messages mt-2">
        <div class="flex-1 space-y-6 text-sm leading-6 sm:text-base sm:leading-7">
          <MessageLine
            v-for="history in chatData"
            :key="history.created_at"
            :chat="history"
            :role="roleInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ChatHistory, Model, Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InformationCircleIcon, UserPlusIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import FwTooltip from '@/components/tooltip/fw-tooltip.vue'
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useEventBus } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { randString } from '@/utils'
import { notify } from 'notiwind'
import MessageLine from './components/message-line.vue'
import { getChatHistories } from '@/api/chat'

const route = useRoute()
const chatID = route.params.id
const chatStore = useChatStore()
const userStore = useUserStore()
const chatInfo = computed(() => chatStore.getChatByChatID(chatID as string))
const roleInfo = ref<Role>(chatStore.cachedRole as Role)
const models = ref<Model[]>([])
const selectedModel = ref<Model>(chatStore.cachedModel as Model)
const canSelect = ref(true)
const msgSend = useEventBus<string>('message-send')
const clearContextBus = useEventBus('clear-context')
const sendMessageBtn = useEventBus<boolean>('enable-input')
const heightChange = useEventBus<number>('height-change')
const marginBottom = ref(50)
const socket = ref()
const router = useRouter()
const chatData = ref<ChatHistory[]>([])
const el = ref<HTMLElement | null>(null)

heightChange.on((height: number) => {
  marginBottom.value = height
  if (el.value) {
    window.scrollTo(0, document.body.scrollHeight)
  }
})

chatStore.clearCachedItem()

const enableInput = () => {
  sendMessageBtn.emit(true)
}

const disableInput = () => {
  sendMessageBtn.emit(false)
}

disableInput()

const sendMessage = (msg: string) => {
  if (socket.value) {
    socket.value.send(JSON.stringify({ type: 'chat', content: msg }))
    disableInput()
  }
}

const getChatHistory = async () => {
  getChatHistories(chatID as string).then((res) => {
    chatData.value = res
  })
}

msgSend.on((message: string) => {
  sendMessage(message)
})

clearContextBus.on(() => {
  console.log('123131 clear btn click')
})

const initPageWithRolesAndChats = async () => {
  if (userStore.getToken() === undefined) router.push('/login')
  await chatStore.getAllRoleList()
  await chatStore.getAllModelList()

  roleInfo.value = chatStore.getRoleByID(chatInfo.value?.role_id as number) as Role
  selectedModel.value = chatStore.getModelByID(chatInfo.value?.model_id as number) as Model
  if (el.value) {
    window.scrollTo(0, el.value.scrollHeight)
  }
  await getChatHistory()
}

const heartbeatTimeoutID = ref()
const connect = async () => {
  let hostProtocol = 'ws://'
  if (window.location.protocol === 'https:') {
    hostProtocol = 'wss://'
  }

  const sendHeartbeat = () => {
    if (heartbeatTimeoutID.value) clearTimeout(heartbeatTimeoutID.value)
    new Promise((resolve) => {
      if (socket.value !== null) {
        socket.value.send(JSON.stringify({ type: 'heartbeat', content: 'ping' }))
      }
      resolve('success')
    }).then(() => {
      heartbeatTimeoutID.value = setTimeout(() => sendHeartbeat(), 5000)
    })
  }

  const host = hostProtocol + window.location.host
  const ws = new WebSocket(
    host +
      '/api/chat/new?chat_id=' +
      chatID +
      '&session_id=' +
      randString(42) +
      '&role_id=' +
      chatInfo.value?.role_id +
      '&model_id=' +
      chatInfo.value?.model_id +
      '&token=' +
      userStore.getToken()
  )
  ws.addEventListener('open', () => {
    notify({
      group: 'success',
      title: '连接成功'
    })
    sendHeartbeat()
    enableInput()
  })
  ws.addEventListener('message', (e) => {
    console.log('=====================>', e.data)
  })

  ws.addEventListener('close', (e) => {
    console.log('====>>', e)
  })

  ws.addEventListener('error', (e) => {
    console.error('WebSocket 连接错误:', e)
    notify({
      group: 'error',
      title: '连接失败',
      text: '无法连接到服务器，请退出登录后重新登录再试。'
    })
  })
  socket.value = ws
}

initPageWithRolesAndChats().then(() => {
  userStore.getCurrentUserInfo().then(() => {
    connect()
  })
})
</script>
