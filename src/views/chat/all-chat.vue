<template>
  <div class="w-full flex flex-col items-center gap-6 justify-center py-2">
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-2">
      <div class="relative mt-1 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="mr-2 w-10 h-10 flex items-center justify-center cursor-pointer">
            <MagnifyingGlassIcon class="w-5 h-5" />
          </span>
        </div>
        <input
          type="text"
          class="block w-full rounded-full border leading-[2.5rem] px-12 bg-transparent placeholder:text-gray-400 placeholder:font-semibold placeholder:text-sm"
          placeholder="搜索聊天"
          @input="onInput"
          v-model="searchValue"
        />
        <div
          class="absolute cursor-pointer inset-y-0 right-0 items-center z-50 pr-1"
          v-if="isInputFocus"
        >
          <span
            @click="onClear"
            class="mr-2 w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <XMarkIcon class="w-5 h-5" />
          </span>
        </div>
      </div>
    </div>
    <div
      class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-2"
      v-if="searchChats.length === 0"
    >
      <ul role="list" class="divide-y divide-light-muted dark:divide-dark-muted">
        <ChatList :chats="allChats" />
      </ul>
    </div>
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-2" v-else>
      <ul role="list" class="divide-y divide-light-muted dark:divide-dark-muted">
        <ChatList :chats="searchChats" />
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Chat } from '@/models/chat'
import { useTitle } from '@vueuse/core'
import ChatList from '@/components/chat-list.vue'
useTitle('所有聊天')

const isInputFocus = ref(false)
const searchValue = ref('')
const chatStore = useChatStore()
const allChats = computed(() => {
  return chatStore.chatList
})

chatStore.getAllChatList()
const searchChats = ref<Chat[]>([])
const timeoutID = ref()
const onInput = () => {
  isInputFocus.value = true

  if (timeoutID.value) {
    clearTimeout(timeoutID.value)
  }

  timeoutID.value = setTimeout(() => {
    searchChats.value = chatStore.fuzzySearchChat(searchValue.value)
  }, 300)
}

const onClear = () => {
  isInputFocus.value = false
  searchValue.value = ''
  searchChats.value = []
}
</script>
