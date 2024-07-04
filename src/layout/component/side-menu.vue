<template>
  <menu class="flex flex-col overflow-y-auto gap-1 bg-border max-h-[calc(100vh-60px)]">
    <section class="flex flex-col border-b bg-background">
      <li class="border-b p-3 flex justify-between">
        <div class="bg-secondary/70 hover:bg-secondary text-secondary-foreground rounded-lg w-1/2">
          <router-link to="/explore" class="p-2 flex flex-col">
            <div class="search-icon w-full">
              <Search class="w-6 h-6 font-bold" />
            </div>
            <div class="w-full mt-1 flex justify-between items-center">
              <span class="font-bold text-base">探索</span>
              <span><ChevronRight class="w-6 h-6 font-bold" /> </span>
            </div>
          </router-link>
        </div>
        <div
          class="bg-secondary/70 hover:bg-secondary text-secondary-foreground ml-1.5 rounded-lg w-1/2"
        >
          <router-link to="/" class="p-2 flex flex-col">
            <div class="search-icon w-full">
              <MessageSquarePlus class="w-6 h-6 font-bold" />
            </div>
            <div class="w-full mt-1 flex justify-between items-center">
              <span class="font-bold text-base">新建聊天</span>
              <span>
                <Plus class="w-6 h-6 font-bold" />
              </span>
            </div>
          </router-link>
        </div>
      </li>
      <ChatList :chats="sideChats" :isMenu="true" v-if="sideChats.length > 0" />
      <li
        class="border-b py-1 p-2"
        :class="{
          'bg-secondary': selectedKey === '/chats',
          'hover:bg-secondary': selectedKey !== '/chats'
        }"
      >
        <router-link to="/chats" class="flex items-center justify-start font-bold text-base p-3">
          <span><MessagesSquare class="w-7" /></span>
          <span class="ml-2">所有聊天</span>
        </router-link>
      </li>
    </section>
    <section class="flex flex-col border-b bg-background">
      <li
        class="border-b py-1 p-2"
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
        class="border-b py-1 p-2"
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
        class="border-b py-1 p-2"
        :class="{
          'bg-secondary': selectedKey === '/gallery',
          'hover:bg-secondary': selectedKey !== '/gallery'
        }"
      >
        <router-link to="/gallery" class="flex items-center justify-start font-bold text-base p-3">
          <span><Images class="w-7" /></span>
          <span class="ml-2">画廊</span>
        </router-link>
      </li>
    </section>
    <section class="flex flex-col border-b bg-background">
      <li
        class="border-b py-1 p-2"
        :class="{
          'bg-secondary': selectedKey === '/subscription',
          'hover:bg-secondary': selectedKey !== '/subscription'
        }"
      >
        <router-link
          to="/subscription"
          class="flex items-center justify-start font-bold text-base p-3"
        >
          <span><Gem class="w-7" /></span>
          <span class="ml-2">订阅</span>
        </router-link>
      </li>
      <li
        class="border-b py-1 p-2"
        :class="{
          'bg-secondary': selectedKey === '/user',
          'hover:bg-secondary': selectedKey !== '/user'
        }"
      >
        <router-link to="/user" class="flex items-center justify-start font-bold text-base p-3">
          <span><CircleUser class="w-7" /></span>
          <span class="ml-2">个人主页</span>
        </router-link>
      </li>
      <li
        class="border-b py-1 p-2"
        :class="{
          'bg-secondary': selectedKey === '/settings',
          'hover:bg-secondary': selectedKey !== '/settings'
        }"
      >
        <router-link to="/settings" class="flex items-center justify-start font-bold text-base p-3">
          <span><Settings class="w-7" /></span>
          <span class="ml-2">设置</span>
        </router-link>
      </li>
    </section>
    <section class="flex flex-col bg-background">
      <a
        class="py-2 px-5 mx-1 mt-2 border rounded-full hover:bg-secondary flex justify-center items-center"
        href="https://github.com/momaek/tailweb"
        target="_blank"
        ><githubIcon class="w-5 h-5 mr-2" />momaek/tailweb</a
      >
      <a
        class="py-2 px-5 mx-1 mt-2 border rounded-full hover:bg-secondary flex justify-center items-center"
        href="https://github.com/momaek/geekai"
        target="_blank"
        ><githubIcon class="w-5 h-5 mr-2" />momaek/geekai</a
      >

      <a
        class="py-2 px-5 mx-1 mt-2 border rounded-full hover:bg-secondary flex justify-center items-center"
        href="https://github.com/yangjian102621/geekai"
        target="_blank"
        ><githubIcon class="w-5 h-5 mr-2" />fork yangjian102621/geekai</a
      >
    </section>
  </menu>
</template>
<script lang="ts">
import { useConfigStore } from '@/stores/config'

import mjicon from '@/components/icons/mj-icon.vue'
import { computed, defineComponent } from 'vue'
import { formatTimestampToMD } from '@/utils'
import { useChatStore } from '@/stores/chat'
import githubIcon from '@/components/icons/github-icon.vue'
import {
  ChevronRight,
  Search,
  MessageSquarePlus,
  Plus,
  MessagesSquare,
  Images,
  Gem,
  CircleUser,
  Settings
} from 'lucide-vue-next'
import ChatList from '@/components/chat-list.vue'

export default defineComponent({
  name: 'SideMenu',
  components: {
    MessagesSquare,
    MessageSquarePlus,
    ChevronRight,
    Search,
    Plus,
    mjicon,
    ChatList,
    Images,
    CircleUser,
    Gem,
    Settings,
    githubIcon
  },
  setup() {
    const configStore = useConfigStore()
    const chatStore = useChatStore()
    const sideChats = computed(() => chatStore.menuChatList)
    const selectedKey = computed(() => configStore.sideMenuSelected)
    chatStore.getAllChatList(true)

    return { sideChats, selectedKey, formatTimestampToMD }
  }
})
</script>
