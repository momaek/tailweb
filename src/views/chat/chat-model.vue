<template>
  <div class="w-full flex flex-col gap-2 items-center justify-center py-8">
    <div class="max-w-4xl px-2 lg:px-8 w-full">
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
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { InformationCircleIcon, UserPlusIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline'
import FwTooltip from '@/components/tooltip/fw-tooltip.vue'

const route = useRoute()
const modelKey = route.params.chatmodel
const chatStore = useChatStore()
const roleInfo = ref<Role>()
chatStore.getAllRoleList().then(() => {
  roleInfo.value = chatStore.getRoleByKey(modelKey as string)
})
</script>
