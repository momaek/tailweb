<template>
  <div class="w-full flex flex-col gap-8 items-center justify-center py-10">
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-20">
      <div class="logo flex items-center justify-center text-gray-900 dark:text-slate-300">
        <LogoIcon class="w-20 h-20" />
        <span class="ml-2 text-6xl font-bold">Zen</span>
      </div>
      <div
        class="robot flex items-center lg:justify-center md:justify-center w-full overflow-x-scroll px-2"
      >
        <span
          v-for="role in originalRoles"
          :key="role.id"
          class="text-gray-900 dark:text-slate-300 border whitespace-nowrap border-light-muted dark:border-dark-muted py-0.5 px-3 mr-3 rounded-2xl flex items-center cursor-pointer"
          :class="{
            'bg-laccent-base dark:bg-daccent-base hover:bg-laccent-base dark:hover:bg-daccent-base text-white':
              selectedRole.id === role.id,
            'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedRole.id !== role.id
          }"
          @click="selectedRole = role"
        >
          <span><Gpt4Icon class="w-7" /></span>
          <span class="ml-2 font-semibold text-sm">{{ role.name }}</span>
        </span>
        <span
          class="text-gray-900 dark:text-slate-300 border whitespace-nowrap border-light-muted dark:border-dark-muted py-0.5 px-3 mr-3 rounded-2xl flex items-center cursor-pointer hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
        >
          <span><Squares2X2Icon class="w-7" /></span>
          <span class="ml-2 font-semibold text-sm">
            <router-link to="/explore">更多</router-link>
          </span>
        </span>
      </div>
      <div class="input">
        <MessageInput />
      </div>
    </div>
    <div class="all max-w-4xl w-full">
      <div class="recent-update flex max-w-4xl px-1 lg:px-8 w-full flex-col">
        <div
          class="head flex justify-between items-center w-full text-gray-900 dark:text-slate-300"
        >
          <span class="font-bold">最近更新</span>
          <span class="text-sm font-bold"
            ><a href="javascript;" class="text-laccent-base dark:text-daccent-base"
              >查看全部</a
            ></span
          >
        </div>
        <div class="cards mb-2 flex overflow-auto w-full">
          <div v-for="(roles, idx) in latestGroupRoles" :key="idx" class="w-60 mr-3">
            <a
              v-for="role in roles"
              :key="role.id"
              class="text-gray-900 mt-2 dark:text-slate-300 border w-60 h-20 border-light-muted dark:border-dark-muted py-0.5 px-3 rounded-2xl flex items-center cursor-pointer hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
            >
              <span><Gpt4Icon class="w-16" /></span>
              <div class="right ml-2 flex flex-col w-36 h-16 justify-center">
                <span class="font-semibold text-sm">{{ role.name }}</span>
                <span class="text-xs break-all overflow-hidden">{{ role.description }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="recent-update flex max-w-4xl mt-10 px-1 lg:px-8 w-full flex-col">
        <div
          class="head flex justify-between items-center w-full text-gray-900 dark:text-slate-300"
        >
          <span class="font-bold">这些机器人</span>
          <span class="text-sm font-bold"
            ><a href="javascript;" class="text-laccent-base dark:text-daccent-base"
              >查看全部</a
            ></span
          >
        </div>
        <div class="cards mb-2 flex overflow-auto w-full">
          <div v-for="(roles, idx) in groupRoles" :key="idx" class="w-60 mr-3">
            <a
              v-for="role in roles"
              :key="role.id"
              class="text-gray-900 mt-2 dark:text-slate-300 border w-60 h-20 border-light-muted dark:border-dark-muted py-0.5 px-3 rounded-2xl flex items-center cursor-pointer hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
            >
              <span><Gpt4Icon class="w-16" /></span>
              <div class="right ml-2 flex flex-col w-36 h-16 justify-center">
                <span class="font-semibold text-sm">{{ role.name }}</span>
                <span class="text-xs break-all overflow-hidden">{{ role.description }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Gpt4Icon from '@/components/icons/gpt4-icon.vue'
import LogoIcon from '@/components/icons/logo-icon.vue'
import type { Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { Squares2X2Icon } from '@heroicons/vue/24/outline'
import { defineComponent, ref } from 'vue'
import MessageInput from '@/components/message-input.vue'
export default defineComponent({
  name: 'BotIndex',
  components: {
    LogoIcon,
    Gpt4Icon,
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
