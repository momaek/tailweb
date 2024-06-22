<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <HeadDialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-dark-emphasis/50" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col overflow-y-auto bg-light-base dark:bg-dark-base pb-4">
                <div
                  class="flex border-b h-14 text-gray-900 dark:text-slate-300 border-light-muted dark:border-dark-muted bg-light-faint dark:bg-dark-faint"
                >
                  <router-link to="/" class="flex-row flex px-4 items-center">
                    <LogoIcon class="!w-12 h-20 text-gray-900 dark:text-slate-300" />
                    <span class="ml-1 text-2xl font-bold">Zen</span>
                  </router-link>
                </div>
                <keep-alive>
                  <SideMenu />
                </keep-alive>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </HeadDialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[18.75rem] lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col overflow-y-auto border-r border-light-muted dark:border-dark-muted bg-light-base dark:bg-dark-base pb-4"
      >
        <div
          class="flex border-b h-14 text-gray-900 dark:text-slate-300 border-light-muted dark:border-dark-muted bg-light-faint dark:bg-dark-faint"
        >
          <router-link to="/" class="px-4 items-center flex-row flex">
            <LogoIcon class="!w-12 h-20 text-gray-900 dark:text-slate-300" />
            <span class="ml-1 text-2xl font-bold">Zen</span>
          </router-link>
        </div>
        <keep-alive>
          <SideMenu />
        </keep-alive>
      </div>
    </div>

    <div class="lg:pl-[18.75rem]">
      <div
        class="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b border-light-muted dark:border-dark-muted dark:bg-dark-faint bg-light-faint px-4 lg:px-8"
        :class="{ '!bg-transparent': !title && !isChatPage, '!border-b-0': !title && !isChatPage }"
      >
        <div class="flex flex-shrink-0 items-center">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-900 dark:text-slate-300 lg:hidden"
            @click="sidebarOpen = true"
          >
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-7 w-7" aria-hidden="true" />
          </button>
          <div v-if="roleInfo" class="flex justify-start w-full ml-5 lg:ml-2 items-center">
            <span><img class="w-8 rounded-lg bg-gray-50" :src="roleInfo.icon" alt="" /></span>
            <div class="ml-2 flex flex-col text-gray-900 dark:text-slate-300">
              <span v-if="chatInfo" class="font-bold text-base text-ellipsis whitespace-nowrap">
                {{ chatInfo.title }}
              </span>
              <span v-else class="font-bold text-base text-ellipsis whitespace-nowrap">
                新建聊天
              </span>
              <span class="text-sm font-bold flex text-slate-400"
                ><ShieldCheckIcon class="w-4 mr-2" />{{ roleInfo.key }}</span
              >
            </div>
          </div>
        </div>
        <div class="h-full flex-grow w-full flex items-center justify-center">
          <span v-if="title" class="text-lg font-bold text-gray-900 dark:text-slate-300">{{
            title
          }}</span>
        </div>
        <div class="flex flex-shrink-0 items-center justify-end text-gray-900 dark:text-slate-300">
          <span
            class="flex cursor-pointer"
            :class="{ 'pointer-events-none opacity-50': !chatInfo }"
            v-if="isChatPage"
          >
            <span><PencilSquareIcon class="w-5 font-bold" /></span>
            <span class="hidden ml-1 font-bold text-sm md:flex">新建聊天</span>
          </span>
          <span class="flex ml-7 cursor-pointer" v-if="isChatPage">
            <span><ArrowUpOnSquareIcon class="w-5 font-bold" /></span>
            <span class="hidden ml-1 font-bold text-sm md:flex">分享</span>
          </span>
        </div>
      </div>

      <main>
        <div class="px-2 sm:px-1 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
    <div class="fixed w-full bottom-3 lg:pl-[18.75rem] flex justify-center" v-if="isChatPage">
      <div class="px-2 sm:px-1 lg:px-8 justify-center max-w-4xl w-full">
        <div class="px-2 sm:px-2 lg:px-8 xl:px-0 max-w-4xl w-full">
          <MessageInput showClear />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { Dialog as HeadDialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  Bars3Icon,
  PencilSquareIcon,
  ArrowUpOnSquareIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import LogoIcon from '@/components/icons/logo-icon.vue'
import SideMenu from './component/side-menu.vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import type { Chat, Role } from '@/models/chat'
import { ShieldCheckIcon } from '@heroicons/vue/24/solid'
import MessageInput from '@/components/message-input.vue'
export default defineComponent({
  components: {
    LogoIcon,
    SideMenu,
    HeadDialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Bars3Icon,
    XMarkIcon,
    ShieldCheckIcon,
    PencilSquareIcon,
    ArrowUpOnSquareIcon,
    MessageInput
  },

  setup() {
    const sidebarOpen = ref(false)

    const route = useRoute()

    const title = computed(() => route.meta.title)
    const chatStore = useChatStore()
    const isChatPage = ref(false)
    const roleInfo = ref<Role>()
    const chatInfo = ref<Chat>()

    watch(
      () => route.meta,
      (newVal) => {
        if (newVal.chat_page) {
          isChatPage.value = true
          if (route.params.chatmodel)
            chatStore.getAllRoleList().then(() => {
              roleInfo.value = chatStore.getRoleByKey(route.params.chatmodel as string)
            })

          if (route.params.id)
            chatStore.getAllChatList().then(() => {
              chatInfo.value = chatStore.getChatByID(parseInt(route.params.id as string) as number)
              if (chatInfo.value) {
                roleInfo.value = chatStore.getRoleByID(chatInfo.value.role_id)
              }
            })
        } else {
          isChatPage.value = false
          roleInfo.value = undefined
          chatInfo.value = undefined
        }
      },
      { immediate: true }
    )

    return { sidebarOpen, isChatPage, title, roleInfo, chatInfo }
  }
})
</script>
