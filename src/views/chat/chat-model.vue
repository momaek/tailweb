<template>
  <div class="w-full flex flex-col gap-2 items-center justify-center py-10">
    <div class="max-w-4xl px-4 lg:px-8 w-full">
      <div class="group bg-light-faint dark:bg-dark-faint w-full rounded-lg px-4 py-2">Hello</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Role } from '@/models/chat'
import { useChatStore } from '@/stores/chat'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const modelKey = route.params.chatmodel
const chatStore = useChatStore()
const modelInfo = ref<Role>()
chatStore.getAllRoleList().then(() => {
  modelInfo.value = chatStore.getRoleByKey(modelKey as string)
})
</script>
