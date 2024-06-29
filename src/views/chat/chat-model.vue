<template>
  <div class="w-full flex justify-center py-8">
    <div class="max-w-4xl px-2 lg:px-8 w-full flex flex-col">
      <div
        class="group bg-secondary flex flex-col gap-4 w-full rounded-lg px-4 py-4"
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
                  class="relative w-full sm:w-1/2 h-9 cursor-default rounded-md py-1.5 pl-3 pr-10 text-left 0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    class="absolute z-10 mt-1 max-h-60 w-full sm:w-1/2 overflow-auto rounded-md py-1 bg-secondary text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
      <div class="chat-messages mt-2"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Chat, Model, Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InformationCircleIcon, UserPlusIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import FwTooltip from '@/components/tooltip/fw-tooltip.vue'
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useEventBus } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { UUID } from '@/utils'

const route = useRoute()
const router = useRouter()
const modelKey = route.params.chatmodel
const chatStore = useChatStore()
const userStore = useUserStore()
const roleInfo = ref<Role>()
const models = ref<Model[]>([])
const selectedModel = ref<Model>()
const canSelect = ref(true)
const msgSend = useEventBus<string>('message-send')
const clearContextBus = useEventBus('clear-context')

msgSend.on((message: string) => {
  if (selectedModel.value) {
    chatStore.setCachedMessage(message)
    chatStore.setCachedModel(selectedModel.value)
    chatStore.setCachedRole(roleInfo.value as Role)
    // New chat
    const chat: Chat = {
      chat_id: UUID(),
      role_id: selectedModel.value?.id as number,
      model_id: selectedModel.value?.id as number,
      created_at: new Date().getTime() / 1000,
      updated_at: new Date().getTime() / 1000,
      user_id: userStore.userInfo?.id,
      icon: roleInfo.value?.icon as string,
      title: message,
      model: selectedModel.value.name
    } as Chat
    chatStore.newChat(chat)
    router.push({ name: 'chat', params: { id: chat.chat_id } })
  }
})

clearContextBus.on(() => {
  console.log('123131 clear btn click')
})

const initPageWithRolesAndChats = async () => {
  await chatStore.getAllRoleList()
  roleInfo.value = chatStore.getRoleByKey(modelKey as string)
  const res = await chatStore.getAllModelList()
  models.value = res
  if (roleInfo.value?.model_id) {
    selectedModel.value = models.value.find((model) => model.id === roleInfo.value?.model_id)
    canSelect.value = false
  }
}

initPageWithRolesAndChats()
</script>
