<template>
  <div
    class="flex w-full items-start"
    :class="{ 'flex-row-reverse': inversion, 'flex-col': !inversion }"
    ref="el"
  >
    <div v-if="!inversion" class="flex">
      <img class="w-5 h-5 rounded-full" :src="role?.icon" />
    </div>

    <div class="flex flex-col" :class="{ 'mt-1.5': !inversion }">
      <div
        class="flex rounded-md bg-laccent-base p-2 max-w-4xl"
        :class="{
          'bg-secondary': !inversion,
          'bg-primary text-white': inversion
        }"
      >
        <LoadingIcon class="w-8 h-8 text-secondary-foreground" v-if="!text" />
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
import { computed, defineProps, nextTick, type PropType, ref } from 'vue'
import TextResult from './text-result.vue'
import {
  ClipboardDocumentIcon,
  TrashIcon,
  ListBulletIcon,
  ArrowPathRoundedSquareIcon
} from '@heroicons/vue/24/outline'
import type { ChatHistory, Role } from '@/models/chat'
import LoadingIcon from '@/components/icons/loading-icon.vue'

const props = defineProps({
  chat: { type: Object as PropType<ChatHistory>, required: true },
  role: { type: Object as PropType<Role>, required: true },
  isLatest: Boolean
})

const text = computed(() => props.chat.content)
const role = computed(() => props.role)
const isLatest = computed(() => props.isLatest)
const inversion = computed(() => (props.chat.type === 'reply' ? false : true))
const el = ref<HTMLElement | null>(null)
if (props.chat.scrollToView) {
  nextTick(() => {
    el.value?.scrollIntoView({ behavior: 'smooth' })
  })
}
</script>
