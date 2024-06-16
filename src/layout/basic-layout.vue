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
        class="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-x-4 border-b border-light-muted dark:border-dark-muted dark:bg-dark-faint bg-light-faint px-4 sm:gap-x-6 sm:px-6 lg:px-8"
        :class="{ '!bg-transparent': !title, '!border-b-0': !title }"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-900 dark:text-slate-300 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="w-full h-full flex items-center justify-center">
          <span v-if="title" class="text-lg font-bold text-gray-900 dark:text-slate-300">{{
            title
          }}</span>
        </div>
      </div>

      <main>
        <div class="px-4 sm:px-1 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Dialog as HeadDialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import LogoIcon from '@/components/icons/logo-icon.vue'
import SideMenu from './component/side-menu.vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    LogoIcon,
    SideMenu,
    HeadDialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Bars3Icon,
    XMarkIcon
  },

  setup() {
    console.log('213131')
    const sidebarOpen = ref(false)

    const route = useRoute()

    const title = computed(() => route.meta.title)

    return { sidebarOpen, title }
  }
})
</script>
