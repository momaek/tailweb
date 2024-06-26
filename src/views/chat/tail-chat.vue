<template>
  <div class="w-full flex justify-center py-8">
    <div class="max-w-4xl px-2 lg:px-8 w-full flex flex-col">
      <div
        class="group bg-light-faint flex flex-col gap-4 dark:bg-dark-faint w-full rounded-lg px-4 py-4"
        v-if="roleInfo"
      >
        <div class="head flex shrink-0 items-center">
          <span><img :src="roleInfo.icon" class="w-12 rounded-lg" alt="" /></span>
          <div class="ml-2 flex flex-col">
            <span class="font-bold text-lg text-gray-900 dark:text-slate-300">{{
              roleInfo.name
            }}</span>
            <span class="text-sm">运营方：zenbot</span>
          </div>
        </div>
        <div class="more-op flex text-gray-900 dark:text-slate-300">
          <span
            class="cursor-pointer flex px-2 py-1 rounded-full bg-light-subtitle dark:bg-dark-subtitle hover:bg-light-muted dark:hover:bg-dark-muted"
          >
            <InformationCircleIcon class="w-5 mr-1" />
            <span>角色信息</span>
          </span>

          <FwTooltip class="ml-3">
            <template #trigger>
              <span
                class="cursor-pointer flex px-2 py-1 rounded-full bg-light-subtitle dark:bg-dark-subtitle hover:bg-light-muted dark:hover:bg-dark-muted"
              >
                <UserPlusIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </template>
            <template #content>
              <span class="text-sm">关注角色</span>
            </template>
          </FwTooltip>

          <FwTooltip class="ml-3">
            <template #trigger>
              <span
                class="cursor-pointer flex px-2 py-1 rounded-full bg-light-subtitle dark:bg-dark-subtitle hover:bg-light-muted dark:hover:bg-dark-muted"
              >
                <ArrowUpOnSquareIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </template>
            <template #content>
              <span class="text-sm">分享角色</span>
            </template>
          </FwTooltip>
        </div>
        <div class="description flex flex-col gap-2 text-gray-900 dark:text-slate-300">
          <p class="text-sm">{{ roleInfo.description }}</p>
          <div class="flex items-center justify-start w-full">
            <p class="flex shrink-0">Powered By</p>
            <Listbox as="div" class="ml-2 w-full" v-model="selectedModel">
              <div class="relative">
                <ListboxButton
                  class="relative w-full sm:w-1/2 h-9 cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <span v-if="selectedModel" class="block truncate">{{ selectedModel.name }}</span>
                  <span v-else>请选择模型</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    v-if="canSelect"
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 dark:bg-dark-subtitle text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-slate-300',
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
        <div
          class="flex-1 space-y-6 text-sm leading-6 text-gray-900 dark:text-slate-300 sm:text-base sm:leading-7"
        >
          <div class="flex flex-row-reverse items-start">
            <div
              class="flex rounded-b-xl rounded-tl-xl bg-laccent-base text-white p-2 dark:bg-dark-faint sm:max-w-md md:max-w-2xl"
            >
              <p>Explain quantum computing in simple terms</p>
            </div>
          </div>
          <div class="flex items-start flex-col">
            <img
              class="ml-2 h-8 w-8 rounded-full"
              src="https://dummyimage.com/128x128/354ea1/ffffff&text=G"
            />

            <div
              class="flex min-h-[85px] rounded-b-xl rounded-tr-xl bg-light-faint p-4 dark:bg-dark-faint sm:min-h-0 sm:max-w-md md:max-w-2xl"
            >
              <p>
                Certainly! Quantum computing is a new type of computing that relies on the
                principles of quantum physics. Traditional computers, like the one you might be
                using right now, use bits to store and process information. These bits can represent
                either a 0 or a 1. In contrast, quantum computers use quantum bits, or qubits.<br /><br />
                Unlike bits, qubits can represent not only a 0 or a 1 but also a superposition of
                both states simultaneously. This means that a qubit can be in multiple states at
                once, which allows quantum computers to perform certain calculations much faster and
                more efficiently
              </p>
            </div>
            <div class="mr-2 mt-1 flex flex-row gap-2 text-slate-500">
              <button class="hover:text-blue-600" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
                  ></path>
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                </svg>
              </button>
              <button class="hover:text-blue-600" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
                  ></path>
                </svg>
              </button>
              <button class="hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex flex-row-reverse items-start">
            <div
              class="flex rounded-b-xl rounded-tl-xl bg-laccent-base text-white p-2 dark:bg-dark-faint sm:max-w-md md:max-w-2xl"
            >
              <p>What are three great applications of quantum computing?</p>
            </div>
          </div>
          <div class="flex items-start flex-col">
            <img
              class="ml-2 h-8 w-8 rounded-full"
              src="https://dummyimage.com/128x128/354ea1/ffffff&text=G"
            />
            <div
              class="flex min-h-[85px] rounded-b-xl rounded-tr-xl bg-light-faint p-4 dark:bg-dark-faint sm:min-h-0 sm:max-w-md md:max-w-2xl"
            >
              <p>
                Three great applications of quantum computing are: Optimization of complex problems,
                Drug Discovery and Cryptography.
              </p>
            </div>
            <div class="mr-2 mt-1 flex flex-row gap-2 text-slate-500">
              <button class="hover:text-blue-600" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
                  ></path>
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                </svg>
              </button>
              <button class="hover:text-blue-600" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
                  ></path>
                </svg>
              </button>
              <button class="hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Model, Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { computed, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InformationCircleIcon, UserPlusIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import FwTooltip from '@/components/tooltip/fw-tooltip.vue'
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useEventBus } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { randString } from '@/utils'
import { notify } from 'notiwind'

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
const socket = ref()
const router = useRouter()

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
  socket.value = ws
}

onUnmounted(() => {
  if (socket.value) {
    socket.value.close()
  }
})

initPageWithRolesAndChats().then(() => {
  userStore.getCurrentUserInfo().then(() => {
    connect()
  })
})
</script>
