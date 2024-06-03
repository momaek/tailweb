<template>
  <menu class="flex flex-col overflow-y-auto gap-1 bg-light-muted dark:bg-dark-muted">
    <section
      class="flex flex-col border-b bg-light-base dark:bg-dark-base border-light-muted dark:border-dark-muted"
    >
      <li class="border-b p-3 border-light-muted dark:border-dark-muted flex justify-between">
        <div
          class="text-gray-900 dark:text-slate-300 bg-light-faint dark:bg-dark-faint rounded-lg w-1/2 hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
        >
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
          class="text-gray-900 dark:text-slate-300 bg-light-faint ml-1.5 dark:bg-dark-faint rounded-lg w-1/2 hover:bg-light-subtitle dark:hover:bg-dark-subtitle"
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
        class="border-b p-2 border-light-muted dark:border-dark-muted"
        v-for="chat in sideChats"
        :key="chat.id"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/chat/' + chat.id,
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/chat/' + chat.id
        }"
      >
        <router-link
          :to="'/chat/' + chat.id"
          class="flex items-center justify-start font-bold text-base p-2 w-full"
        >
          <div><gpt4Icon class="w-9" /></div>
          <div class="flex flex-col ml-2 w-full">
            <div class="head flex justify-between items-center text-sm font-normal">
              <span class="text-ellipsis break-words overflow-hidden">{{ chat.model }}</span>
              <span class="flex justify-start items-center"
                ><span>{{ formatTimestampToMD(chat.updated_at) }}</span>
                <span><ChevronRightIcon class="w-3.5" /></span
              ></span>
            </div>
            <div class="body text-gray-900 dark:text-slate-300 mt-2">{{ chat.title }}</div>
          </div>
        </router-link>
      </li>
      <li
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/chats',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/chats'
        }"
      >
        <router-link to="/chats" class="flex items-center justify-start font-bold text-base p-3">
          <span><ChatBubbleLeftRightIcon class="w-7" /></span>
          <span class="ml-2">所有聊天</span>
        </router-link>
      </li>
    </section>
    <section
      class="flex flex-col border-b bg-light-base dark:bg-dark-base border-light-muted dark:border-dark-muted"
    >
      <li
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/midjourney',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/midjourney'
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
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/stable-diffusion',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/stable-diffusion'
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
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/gallery',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/gallery'
        }"
      >
        <router-link to="/gallery" class="flex items-center justify-start font-bold text-base p-3">
          <span><PhotoIcon class="w-7" /></span>
          <span class="ml-2">画廊</span>
        </router-link>
      </li>
    </section>
    <section
      class="flex flex-col border-b bg-light-base dark:bg-dark-base border-light-muted dark:border-dark-muted"
    >
      <li
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/subscription',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/subscription'
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
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/user',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/user'
        }"
      >
        <router-link to="/user" class="flex items-center justify-start font-bold text-base p-3">
          <span><UserIcon class="w-7" /></span>
          <span class="ml-2">个人主页</span>
        </router-link>
      </li>
      <li
        class="border-b p-2 border-light-muted dark:border-dark-muted text-gray-900 dark:text-slate-300"
        :class="{
          ' bg-laccent-faint dark:bg-daccent-faint hover:bg-laccent-faint dark:hover:bg-daccent-faint':
            selectedKey === '/settings',
          'hover:bg-light-subtitle dark:hover:bg-dark-subtitle': selectedKey !== '/settings'
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
import gpt4Icon from '@/components/icons/gpt4-icon.vue'
import { formatTimestampToMD } from '@/utils'
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
    Cog8ToothIcon,
    gpt4Icon
  },
  setup() {
    const configStore = useConfigStore()
    const sideChats = computed(() => configStore.sideChats)
    const selectedKey = computed(() => configStore.sideMenuSelected)
    configStore.getSideChat()

    return { sideChats, selectedKey, formatTimestampToMD }
  }
})
</script>
