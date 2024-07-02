<template>
  <div class="w-full flex flex-col gap-8 items-center justify-center py-10">
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-5 sm:mt-20">
      <div class="logo flex items-center justify-center">
        <LogoIcon class="w-20 h-20" />
        <span class="ml-2 text-6xl font-bold">Zen</span>
      </div>
      <div
        class="robot flex items-center lg:justify-center md:justify-center w-full overflow-x-scroll px-2"
      >
        <span
          v-for="role in originalRoles"
          :key="role.id"
          class="border whitespace-nowrap px-3 py-1 mr-3 rounded-2xl flex items-center cursor-pointer"
          :class="{
            'bg-primary text-white': selectedRole.id === role.id,
            'hover:bg-secondary hover:text-secondary-foreground': selectedRole.id !== role.id
          }"
          @click="selectedRole = role"
        >
          <span
            ><img
              :src="role.icon"
              class="w-6 rounded"
              :class="{
                'border border-white': selectedRole.id === role.id
              }"
          /></span>
          <span class="ml-2 font-semibold text-sm">{{ role.name }}</span>
        </span>
        <router-link
          to="/explore"
          class="border whitespace-nowrap py-1 px-3 mr-3 rounded-2xl flex items-center cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
        >
          <span><Squares2X2Icon class="w-7" /></span>
          <span class="ml-2 font-semibold text-sm"> 更多 </span>
        </router-link>
      </div>
      <div class="input mt-1 w-full">
        <MessageInput />
      </div>
    </div>
    <div class="all max-w-4xl w-full">
      <div class="recent-update flex max-w-4xl px-1 lg:px-8 w-full flex-col">
        <div class="head flex justify-between items-center w-full">
          <span class="font-bold">最近更新</span>
          <span class="text-sm font-bold"
            ><router-link to="/explore" class="text-laccent-base dark:text-daccent-base"
              >查看全部</router-link
            ></span
          >
        </div>
        <div
          class="cards mb-2 flex overflow-auto w-full shadow-[inset_-38px_0_36px_-40px_#d3d3d3] dark:shadow-[inset_-38px_0_36px_-40px_#3b3b3b]"
        >
          <div v-for="(roles, idx) in latestGroupRoles" :key="idx" class="w-60 mr-3">
            <router-link
              :to="'/' + role.key"
              v-for="role in roles"
              :key="role.id"
              class="mt-2 border w-60 h-20 py-0.5 px-3 rounded-2xl flex items-center cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
            >
              <span><img class="w-14 rounded-md" :src="role.icon" /></span>
              <div class="right ml-2 flex flex-col w-36 h-16 justify-center">
                <span class="font-semibold text-sm">{{ role.name }}</span>
                <span class="text-xs break-all overflow-hidden truncate">{{
                  role.description
                }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="recent-update flex max-w-4xl mt-10 px-1 lg:px-8 w-full flex-col">
        <div class="head flex justify-between items-center w-full">
          <span class="font-bold">这些机器人</span>
          <span class="text-sm font-bold"
            ><router-link to="/explore" class="text-laccent-base dark:text-daccent-base"
              >查看全部</router-link
            ></span
          >
        </div>
        <div
          class="cards mb-2 flex overflow-auto w-full shadow-[inset_-38px_0_36px_-40px_#d3d3d3] dark:shadow-[inset_-38px_0_36px_-40px_#3b3b3b]"
        >
          <div v-for="(roles, idx) in groupRoles" :key="idx" class="w-60 mr-3">
            <router-link
              :to="'/' + role.key"
              v-for="role in roles"
              :key="role.id"
              class="mt-2 border w-60 h-20 py-0.5 px-3 rounded-2xl flex items-center cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
            >
              <span><img class="w-14 rounded-md" :src="role.icon" /></span>
              <div class="right ml-2 flex flex-col w-36 h-16 justify-center">
                <span class="font-semibold text-sm">{{ role.name }}</span>
                <span class="text-xs break-all overflow-hidden truncate">{{
                  role.description
                }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import LogoIcon from '@/components/icons/logo-icon.vue'
import type { Chat, Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { Squares2X2Icon } from '@heroicons/vue/24/outline'
import { defineComponent, ref } from 'vue'
import MessageInput from '@/components/message-input.vue'
import { useEventBus } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { UUID } from '@/utils'
export default defineComponent({
  name: 'BotIndex',
  components: {
    LogoIcon,
    Squares2X2Icon,
    MessageInput
  },
  setup() {
    const chatStore = useChatStore()
    const allRoles = ref<Role[]>([])
    const selectedRole = ref<Role>({} as Role)
    const originalRoles = ref<Role[]>([])
    const latestGroupRoles = ref<Role[][]>([])
    const groupRoles = ref<Role[][]>([])
    chatStore.getAllRoleList().then((res) => {
      originalRoles.value = res.filter((role) => role.model_id).slice(0, 3)
      selectedRole.value = originalRoles.value[0]
      res.sort((a, b) => {
        if (a.created_at > b.created_at) return -1
        if (a.created_at < b.created_at) return 1
        return 0
      })
      allRoles.value = res
      groupRoles.value = (allRoles.value as Role[]).reduce(
        (result: Role[][], value, index, array) => {
          if (index % 2 === 0) result.push(array.slice(index, index + 2))
          return result
        },
        [] as Role[][]
      )
      latestGroupRoles.value = groupRoles.value.slice(0, 5)
    })

    const msgSend = useEventBus<string>('message-send')
    const userStore = useUserStore()
    const router = useRouter()

    msgSend.on((message: string) => {
      if (!selectedRole.value) {
        return
      }

      if (selectedRole.value) {
        chatStore.setCachedMessage(message)
        chatStore.setCachedRole(selectedRole.value as Role)
        // New chat
        const chat: Chat = {
          chat_id: UUID(),
          role_id: selectedRole.value?.id as number,
          model_id: selectedRole.value?.model_id as number,
          created_at: new Date().getTime() / 1000,
          updated_at: new Date().getTime() / 1000,
          user_id: userStore.userInfo?.id,
          icon: selectedRole.value?.icon as string,
          title: message
        } as Chat
        chatStore.newChat(chat)
        router.push({ name: 'chat', params: { id: chat.chat_id } })
      }
    })
    return {
      originalRoles,
      allRoles,
      selectedRole,
      latestGroupRoles,
      groupRoles
    }
  }
})
</script>
