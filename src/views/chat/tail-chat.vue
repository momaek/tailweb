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
          <span class="cursor-pointer flex px-2 py-1 rounded-full bg-accent hover:bg-accent/60">
            <InformationCircleIcon class="w-5 mr-1" />
            <span>角色信息</span>
          </span>

          <FwTooltip class="ml-3">
            <template #trigger>
              <span class="cursor-pointer flex px-2 py-1 rounded-full bg-accent hover:bg-accent/60">
                <UserPlusIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </template>
            <template #content>
              <span class="text-sm">关注角色</span>
            </template>
          </FwTooltip>

          <FwTooltip class="ml-3">
            <template #trigger>
              <span class="cursor-pointer flex px-2 py-1 rounded-full bg-accent hover:bg-accent/60">
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
            <Listbox
              as="div"
              class="ml-2 w-full"
              v-model="selectedModel"
              @update:model-value="modelUpdate"
            >
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
      <div class="chat-messages mt-4">
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
import type { Chat, ChatHistory, Model, Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InformationCircleIcon, UserPlusIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import FwTooltip from '@/components/tooltip/fw-tooltip.vue'
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useEventBus, useTitle } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { randString } from '@/utils'
import { toast } from '@/components/ui/toast'
import MessageLine from './components/message-line.vue'
import { getChatHistories, stopChatSession } from '@/api/chat'
import { useConfigStore } from '@/stores/config'

const route = useRoute()
const chatID = route.params.id
const chatStore = useChatStore()
const userStore = useUserStore()
const chatInfo = computed(() => chatStore.getChatByChatID(chatID as string))
const roleInfo = ref<Role>(chatStore.getCachedRole() as Role)
const models = computed(() => chatStore.modelList)
const selectedModel = ref<Model>(chatStore.getCachedModel() as Model)
const canSelect = ref(true)
const msgSend = useEventBus<string>('message-send')
const clearContextBus = useEventBus('clear-context')
const sendMessageBtn = useEventBus<boolean>('enable-input')
const heightChange = useEventBus<number>('height-change')
const showStopGenerate = useEventBus<boolean>('show-stop-generate')
const stopGenerate = useEventBus<boolean>('stop-generate')
const marginBottom = ref(50)
const router = useRouter()
const chatData = ref<ChatHistory[]>([])
const el = ref<HTMLElement | null>(null)
const sessionID = randString(42)
const replyBuffer = ref('')
const isReconnect = ref(false)

useTitle(chatInfo.value?.title)

heightChange.on((height: number) => {
  marginBottom.value = height
  if (el.value) {
    window.scrollTo(0, el.value.scrollHeight)
  }
})

const enableInput = () => {
  sendMessageBtn.emit(true)
}

const disableInput = () => {
  sendMessageBtn.emit(false)
}

const showStopGenerateBtn = (b: boolean = true) => {
  showStopGenerate.emit(b)
}

disableInput()

const sendMessage = (msg: string) => {
  if (chatStore.socket) {
    chatStore.socket.send(JSON.stringify({ type: 'chat', content: msg }))
    showStopGenerateBtn()
    disableInput()
    if (chatData.value.length > 0) {
      chatData.value[chatData.value.length - 1].scrollToView = false
    }
    chatData.value.push(
      {
        chat_id: chatID as string,
        role_id: roleInfo.value?.id as number,
        created_at: new Date().getTime() / 1000,
        updated_at: new Date().getTime() / 1000,
        user_id: userStore.userInfo?.id as number,
        icon: roleInfo.value?.icon as string,
        model: selectedModel.value.name,
        type: 'prompt',
        content: msg
      } as ChatHistory,
      {
        chat_id: chatID as string,
        role_id: roleInfo.value?.id as number,
        created_at: new Date().getTime() / 1000,
        updated_at: new Date().getTime() / 1000,
        user_id: userStore.userInfo?.id as number,
        icon: roleInfo.value?.icon as string,
        model: selectedModel.value.name,
        type: 'reply',
        isLoading: true
      } as ChatHistory
    )
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const getChatHistory = async () => {
  const res = await getChatHistories(chatID as string)
  chatData.value = res
  if (chatData.value.length > 0) {
    chatData.value[chatData.value.length - 1].scrollToView = true
  }
  nextTick(() => {
    const message = chatStore.getCachedMessage()
    if (message) {
      sendMessage(message)
    }
  })
}

msgSend.on((message: string) => {
  sendMessage(message)
})

clearContextBus.on(() => {
  console.log('123131 clear btn click')
})

const scrollToBottom = () => {
  if (el.value) {
    window.scrollTo(0, el.value.scrollHeight)
  }
}

const initPageWithRolesAndChats = async () => {
  if (userStore.getToken() === undefined) router.push('/login')
  await chatStore.getAllRoleList()
  await chatStore.getAllModelList()

  if (!roleInfo.value) {
    roleInfo.value = chatStore.getRoleByID(chatInfo.value?.role_id as number) as Role
  }
  if (!selectedModel.value) {
    selectedModel.value = chatStore.getModelByID(chatInfo.value?.model_id as number) as Model
  }

  if (roleInfo.value?.model_id) {
    canSelect.value = false
  }

  if (el.value) {
    window.scrollTo(0, el.value.scrollHeight)
  }
}

const configStore = useConfigStore()
const getWsHost = () => {
  let hostProtocol = 'ws://'
  if (window.location.protocol === 'https:') {
    hostProtocol = 'wss://'
  }
  const host = hostProtocol + window.location.host

  if (configStore.isTAURI()) {
    const tauriHost = configStore.getTauriHost() as string
    // 创建一个新的变量来存储处理后的 tauriHost
    let wsTauriHost
    if (tauriHost.startsWith('https://')) {
      wsTauriHost = tauriHost.replace('https://', 'wss://')
    } else if (tauriHost.startsWith('http://')) {
      wsTauriHost = tauriHost.replace('http://', 'ws://')
    } else {
      // 如果 tauriHost 没有协议前缀，默认使用 ws 协议
      wsTauriHost = 'ws://' + tauriHost
    }
    return wsTauriHost
  } else {
    return host
  }
}

const heartbeatTimeoutID = ref()
const connect = async () => {
  const sendHeartbeat = () => {
    if (heartbeatTimeoutID.value) clearTimeout(heartbeatTimeoutID.value)
    new Promise((resolve) => {
      if (chatStore.socket) {
        chatStore.socket.send(JSON.stringify({ type: 'heartbeat', content: 'ping' }))
      }
      resolve('success')
    }).then(() => {
      heartbeatTimeoutID.value = setTimeout(() => sendHeartbeat(), 5000)
    })
  }

  const host = getWsHost()
  const ws = new WebSocket(
    host +
      '/api/chat/new?chat_id=' +
      chatID +
      '&session_id=' +
      sessionID +
      '&role_id=' +
      chatInfo.value?.role_id +
      '&model_id=' +
      chatInfo.value?.model_id +
      '&token=' +
      userStore.getToken()
  )
  ws.addEventListener('open', async () => {
    sendHeartbeat()
    enableInput()
    // TODO
    if (!isReconnect.value) {
      toast({
        title: '连接成功'
      })
      await getChatHistory()
    }
  })
  ws.addEventListener('message', (e) => {
    try {
      if (e.data instanceof Blob) {
        const reader = new FileReader()
        reader.readAsText(e.data, 'UTF-8')
        reader.onload = () => {
          const data = JSON.parse(String(reader.result))
          switch (data.type) {
            case 'error':
              toast({
                title: '连接失败',
                variant: 'destructive',
                description: data.content
              })
              break
            case 'start':
              console.log('start', data)
              chatStore.clearCachedItem()
              chatStore.swapChatToFirst(chatInfo.value as Chat)
              break
            case 'end':
              enableInput()
              showStopGenerateBtn(false)
              replyBuffer.value = ''
              nextTick(() => {
                scrollToBottom()
              })
              break
            case 'middle':
              {
                replyBuffer.value += data.content
                const reply = chatData.value[chatData.value.length - 1]
                if (reply) {
                  reply.content = replyBuffer.value
                } else {
                  chatData.value.push({
                    chat_id: chatID as string,
                    role_id: roleInfo.value?.id as number,
                    created_at: new Date().getTime() / 1000,
                    updated_at: new Date().getTime() / 1000,
                    user_id: userStore.userInfo?.id as number,
                    icon: roleInfo.value?.icon as string,
                    model: selectedModel.value.name,
                    type: 'reply',
                    content: replyBuffer.value
                  } as ChatHistory)
                }
                scrollToBottom()
              }
              break
          }
        }
      }
    } catch (e: any) {
      console.log('123 loading failed', e)
    }
  })

  ws.addEventListener('close', (e) => {
    console.log('====>>', e)
    if (chatStore.reasonableClose || chatStore.isSocketConnected()) {
      return
    }
    reconnect()
  })

  ws.addEventListener('error', (e) => {
    console.error('WebSocket 连接错误:', e)
    toast({
      title: '连接失败',
      variant: 'destructive',
      description: '无法连接到服务器，请退出登录后重新登录再试。'
    })
  })
  chatStore.setSocket(ws)
}

const reconnect = () => {
  disableInput()
  userStore.checkSession().then(() => {
    isReconnect.value = true
    connect()
  })
}

const modelUpdate = () => {
  chatStore.closeSocket()
  if (chatInfo.value) {
    chatInfo.value.model_id = selectedModel.value.id
  }
  reconnect()
}

initPageWithRolesAndChats().then(() => {
  userStore.getCurrentUserInfo().then(() => {
    connect()
  })
})

stopGenerate.on((v: boolean) => {
  if (v) {
    stopChatSession(sessionID)
      .then(() => {
        enableInput()
        showStopGenerateBtn(false)
      })
      .catch(() => {
        toast({
          title: '停止失败',
          variant: 'destructive',
          description: '无法停止会话，请重试。'
        })
      })
  }
})
</script>
