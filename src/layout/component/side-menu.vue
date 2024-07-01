<template>
  <menu class="flex flex-col overflow-y-auto gap-1 bg-border">
    <section class="flex flex-col border-b bg-background">
      <li class="border-b p-3 flex justify-between">
        <div class="bg-secondary/70 hover:bg-secondary text-secondary-foreground rounded-lg w-1/2">
          <router-link to="/explore" class="p-2 flex flex-col">
            <div class="search-icon w-full">
              <MagnifyingGlassIcon class="w-7 h-7 font-bold" />
            </div>
            <div class="w-full mt-1 flex justify-between items-center">
              <span class="font-bold text-base">探索</span>
              <span><ChevronRightIcon class="w-6 h-6 font-bold" /> </span>
            </div>
          </router-link>
        </div>
        <div
          class="bg-secondary/70 hover:bg-secondary text-secondary-foreground ml-1.5 rounded-lg w-1/2"
        >
          <router-link to="/" class="p-2 flex flex-col">
            <div class="search-icon w-full">
              <SquaresPlusIcon class="w-7 h-7 font-bold" />
            </div>
            <div class="w-full mt-1 flex justify-between items-center">
              <span class="font-bold text-base">新建聊天</span>
              <span>
                <PlusIcon class="w-6 h-6 font-bold" />
              </span>
            </div>
          </router-link>
        </div>
      </li>
      <li
        class="border-b p-2"
        v-for="chat in sideChats"
        :key="chat.id"
        :class="{
          'bg-secondary': selectedKey === '/chat/' + chat.chat_id,
          'hover:bg-secondary': selectedKey !== '/chat/' + chat.chat_id
        }"
      >
        <router-link
          :to="'/chat/' + chat.chat_id"
          class="flex items-center justify-start font-bold text-base p-2 w-full"
        >
          <div><img class="w-10 rounded-md" :src="chat.icon" /></div>
          <div class="flex flex-col ml-2 w-full max-h-16 overflow-hidden">
            <div class="head flex justify-between items-center text-xs font-normal">
              <span class="text-ellipsis break-words overflow-hidden">{{
                getRoleName(chat.role_id)
              }}</span>
              <span class="flex justify-start items-center"
                ><span>{{ formatTimestampToMD(chat.updated_at) }}</span>
                <span><ChevronRightIcon class="w-3.5" /></span
              ></span>
            </div>
            <div class="body mt-1 flex flex-col">
              <div class="truncate">{{ chat.title }}</div>
              <div class="text-foreground/50 font-normal text-sm">{{ chat.model }}</div>
            </div>
          </div>
        </router-link>
      </li>
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/chats',
          'hover:bg-secondary': selectedKey !== '/chats'
        }"
      >
        <router-link to="/chats" class="flex items-center justify-start font-bold text-base p-3">
          <span><ChatBubbleLeftRightIcon class="w-7" /></span>
          <span class="ml-2">所有聊天</span>
        </router-link>
      </li>
    </section>
    <section class="flex flex-col border-b bg-background">
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/midjourney',
          'hover:bg-secondary': selectedKey !== '/midjourney'
        }"
      >
        <router-link
          to="/midjourney"
          class="flex items-center justify-start font-bold text-base p-3"
        >
          <span><mjicon class="w-7" /></span>
          <span class="ml-2">Midjourney 绘画</span>
        </router-link>
      </li>
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/stable-diffusion',
          'hover:bg-secondary': selectedKey !== '/stable-diffusion'
        }"
      >
        <router-link
          to="/stable-diffusion"
          class="flex items-center justify-start font-bold text-base p-3"
        >
          <span class="w-7 flex justify-center items-center">S.</span>
          <span class="ml-2">Stable Diffusion 绘画</span>
        </router-link>
      </li>
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/gallery',
          'hover:bg-secondary': selectedKey !== '/gallery'
        }"
      >
        <router-link to="/gallery" class="flex items-center justify-start font-bold text-base p-3">
          <span><PhotoIcon class="w-7" /></span>
          <span class="ml-2">画廊</span>
        </router-link>
      </li>
    </section>
    <section class="flex flex-col border-b bg-background">
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/subscription',
          'hover:bg-secondary': selectedKey !== '/subscription'
        }"
      >
        <router-link
          to="/subscription"
          class="flex items-center justify-start font-bold text-base p-3"
        >
          <span><GiftIcon class="w-7" /></span>
          <span class="ml-2">订阅</span>
        </router-link>
      </li>
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/user',
          'hover:bg-secondary': selectedKey !== '/user'
        }"
      >
        <router-link to="/user" class="flex items-center justify-start font-bold text-base p-3">
          <span><UserIcon class="w-7" /></span>
          <span class="ml-2">个人主页</span>
        </router-link>
      </li>
      <li
        class="border-b p-2"
        :class="{
          'bg-secondary': selectedKey === '/settings',
          'hover:bg-secondary': selectedKey !== '/settings'
        }"
      >
        <router-link to="/settings" class="flex items-center justify-start font-bold text-base p-3">
          <span><Cog8ToothIcon class="w-7" /></span>
          <span class="ml-2">设置</span>
        </router-link>
      </li>
    </section>
  </menu>
</template>
<script lang="ts">
import { useConfigStore } from '@/stores/config'
import {
  ChatBubbleLeftRightIcon,
  Cog8ToothIcon,
  GiftIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  SquaresPlusIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { ChevronRightIcon, PlusIcon } from '@heroicons/vue/24/solid'
import mjicon from '@/components/icons/mj-icon.vue'
import { computed, defineComponent } from 'vue'
import { formatTimestampToMD } from '@/utils'
import { useChatStore } from '@/stores/chat'
export default defineComponent({
  name: 'SideMenu',
  components: {
    ChatBubbleLeftRightIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    SquaresPlusIcon,
    mjicon,
    PhotoIcon,
    UserIcon,
    GiftIcon,
    Cog8ToothIcon
  },
  setup() {
    const configStore = useConfigStore()
    const chatStore = useChatStore()
    const sideChats = computed(() => chatStore.chatList.slice(0, 5))
    const selectedKey = computed(() => configStore.sideMenuSelected)
    chatStore.getAllChatList(true)
    chatStore.getAllRoleList()
    const getRoleName = (id: number) => {
      const role = chatStore.allRoleList.find((role) => role.id === id)
      return role?.name
    }

    return { sideChats, selectedKey, formatTimestampToMD, getRoleName }
  }
})
</script>
