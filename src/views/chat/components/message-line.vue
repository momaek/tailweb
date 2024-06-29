<template>
  <div class="flex items-start" :class="{ 'flex-row-reverse': inversion, 'flex-col': !inversion }">
    <div v-if="!inversion" class="flex">
      <img class="w-5 h-5 rounded-full" :src="role?.icon" />
    </div>

    <div class="flex flex-col" :class="{ 'mt-1.5': !inversion }">
      <div
        class="flex rounded-md bg-laccent-base p-2 sm:max-w-md md:max-w-2xl"
        :class="{
          'bg-secondary': !inversion,
          'bg-primary text-white': inversion
        }"
      >
        <TextResult :text="text" />
      </div>
      <div class="mr-2 ml-2 mt-1.5 flex flex-row gap-2">
        <button class="hover:text-primary" type="button">
          <ClipboardDocumentIcon class="w-5 h-5" />
        </button>
        <button class="hover:text-primary" type="button" v-if="isLatest">
          <ArrowPathRoundedSquareIcon class="w-5 h-5" />
        </button>
        <button class="hover:text-primary" type="button">
          <TrashIcon class="w-5 h-5" />
        </button>
        <button class="hover:text-primary" type="button">
          <ListBulletIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, type PropType } from 'vue'
import TextResult from './text-result.vue'
import {
  ClipboardDocumentIcon,
  TrashIcon,
  ListBulletIcon,
  ArrowPathRoundedSquareIcon
} from '@heroicons/vue/24/outline'
import type { ChatHistory, Role } from '@/models/chat'
const props = defineProps({
  chat: { type: Object as PropType<ChatHistory>, required: true },
  role: { type: Object as PropType<Role>, required: true },
  isLatest: Boolean
})

const text = computed(() => props.chat.content)
const role = computed(() => props.role)
const isLatest = computed(() => props.isLatest)
const inversion = computed(() => (props.chat.type === 'reply' ? false : true))
</script>
