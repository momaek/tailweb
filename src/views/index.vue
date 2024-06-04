<template>
  <div class="w-full flex flex-col items-center justify-center py-10">
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-20">
      <div class="logo flex items-center justify-center text-gray-900 dark:text-slate-300">
        <LogoIcon class="w-24 h-24" />
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
          <span class="ml-2 font-semibold text-sm">更多</span>
        </span>
      </div>
      <div class="input">
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            type="text"
            class="block w-full rounded-full border border-light-emphasis dark:border-dark-emphasis leading-[3rem] px-5 pr-10 text-gray-900 dark:text-slate-300 bg-transparent placeholder:text-gray-400 placeholder:font-semibold placeholder:text-sm focus:border-laccent-base dark:focus:border-daccent-base"
            placeholder="开始新的聊天"
          />
          <div class="absolute cursor-pointer inset-y-0 right-0 flex items-center z-50 pr-1">
            <span
              class="w-10 h-10 rounded-full flex items-center justify-center bg-laccent-base dark:bg-daccent-base"
            >
              <ArrowRightIcon class="h-5 w-5 text-white" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="all"></div>
  </div>
</template>
<script lang="ts">
import Gpt4Icon from '@/components/icons/gpt4-icon.vue'
import LogoIcon from '@/components/icons/logo-icon.vue'
import type { Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BotIndex',
  components: {
    LogoIcon,
    Gpt4Icon,
    Squares2X2Icon,
    ArrowRightIcon
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
