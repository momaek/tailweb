<template>
  <div class="w-full flex flex-col items-center gap-6 justify-center py-2">
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-2">
      <div class="relative mt-1 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="mr-2 w-10 h-10 flex items-center justify-center cursor-pointer">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-900 dark:text-slate-300" />
          </span>
        </div>
        <input
          type="text"
          class="block w-full rounded-full border border-light-emphasis dark:border-dark-emphasis leading-[2.5rem] px-12 text-gray-900 dark:text-slate-300 bg-transparent placeholder:text-gray-400 placeholder:font-semibold placeholder:text-sm focus:border-laccent-base dark:focus:border-daccent-base"
          placeholder="搜索机器人"
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
            <XMarkIcon class="w-5 h-5 text-gray-900 dark:text-slate-300" />
          </span>
        </div>
      </div>
    </div>
    <div
      class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-2"
      v-if="searchRoles.length === 0"
    >
      <ul role="list" class="divide-y divide-light-muted dark:divide-dark-muted">
        <li v-for="role in allRoles" :key="role.id" class="">
          <router-link
            :to="'/' + role.key"
            class="relative flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
          >
            <div class="flex min-w-0 gap-x-4">
              <img class="w-16 h-16 flex-none rounded-2xl bg-gray-50" :src="role.icon" alt="" />
              <div class="min-w-0 flex flex-col items-start justify-center">
                <p class="text-sm font-semibold leading-6">
                  <a :href="'/chat' + role.id">
                    <span />
                    {{ role.name }}
                  </a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-foreground/45">
                  {{ role.description }}
                </p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <div class="mt-1 flex items-center gap-x-1.5">
                  <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p class="text-xs leading-5 text-foreground/45">Online</p>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="max-w-4xl px-1 lg:px-8 w-full flex flex-col gap-5 mt-2" v-else>
      <ul role="list" class="divide-y divide-light-muted dark:divide-dark-muted">
        <li v-for="role in searchRoles" :key="role.id" class="">
          <router-link
            :to="'/' + role.key"
            class="relative flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
          >
            <div class="flex min-w-0 gap-x-4">
              <img class="w-16 h-16 flex-none rounded-2xl bg-gray-50" :src="role.icon" alt="" />
              <div class="min-w-0 flex flex-col items-start justify-center">
                <p class="text-sm font-semibold leading-6">
                  <a :href="'/chat' + role.id">
                    <span />
                    {{ role.name }}
                  </a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-foreground/45">
                  {{ role.description }}
                </p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <div class="mt-1 flex items-center gap-x-1.5">
                  <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p class="text-xs leading-5 text-foreground/45">Online</p>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Role } from '@/models/chat'
import { useTitle } from '@vueuse/core'
useTitle('探索')
export default defineComponent({
  name: 'ExploreRole',
  components: {
    XMarkIcon,
    MagnifyingGlassIcon
  },
  setup() {
    const isInputFocus = ref(false)
    const searchValue = ref('')
    const chatStore = useChatStore()
    const allRoles = computed(() => {
      return chatStore.allRoleList
    })

    chatStore.getAllRoleList()
    const searchRoles = ref<Role[]>([])
    const timeoutID = ref()
    const onInput = () => {
      isInputFocus.value = true

      if (timeoutID.value) {
        clearTimeout(timeoutID.value)
      }

      timeoutID.value = setTimeout(() => {
        searchRoles.value = chatStore.fuzzySearchRole(searchValue.value)
      }, 300)
    }

    const onClear = () => {
      isInputFocus.value = false
      searchValue.value = ''
      searchRoles.value = []
    }

    return { isInputFocus, searchValue, allRoles, searchRoles, onInput, onClear }
  }
})
</script>
