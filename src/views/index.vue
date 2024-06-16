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
          class="text-gray-900 dark:text-slate-300 border whitespace-nowrap border-light-muted dark:border-dark-muted py-0.5 px-3 mr-3 rounded-2xl flex items-center cursor-pointer hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
          :class="{
            'bg-laccent-base dark:bg-daccent-base hover:bg-laccent-base dark:hover:bg-daccent-base text-white':
              selectedRole.id === role.id
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
    <div class="all">
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
        <div class="cards mt-2 flex overflow-auto w-full">
          <span
            v-for="role in allRoles"
            :key="role.id"
            class="text-gray-900 dark:text-slate-300 border whitespace-nowrap border-light-muted dark:border-dark-muted py-0.5 px-3 mr-3 rounded-2xl flex items-center cursor-pointer hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
          >
            <span><Gpt4Icon class="w-7" /></span>
            <span class="ml-2 font-semibold text-sm">{{ role.name }}</span>
          </span>
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
import { computed, defineComponent, ref } from 'vue'
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
    const allRoles = computed(() => chatStore.allRoleList)
    const selectedRole = ref<Role>({} as Role)
    const originalRoles = ref<Role[]>([])
    chatStore.getAllRoleList().then((res) => {
      originalRoles.value = res.filter((role) => role.model_id).slice(0, 3)
      selectedRole.value = originalRoles.value[0]
    })

    return {
      originalRoles,
      allRoles,
      selectedRole
    }
  }
})
</script>
