<template>
  <div
    class="flex w-full items-start"
    :class="{ 'flex-row-reverse': inversion, 'flex-col': !inversion }"
    ref="el"
    @mouseenter="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="!inversion" class="flex justify-start items-center">
      <img class="w-5 h-5 rounded-md mr-2" :src="role?.icon" />
      <span class="text-xs mr-5">{{ role.name }}</span>
      <DropdownMenu @click.stop v-if="!inversion && isHovered">
        <DropdownMenuTrigger
          ><span class="text-secondary-foreground/50" @click="handleMouseOver"
            ><Ellipsis class="w-5 h-5" /></span
        ></DropdownMenuTrigger>
        <DropdownMenuContent class="w-40 bg-background">
          <DropdownMenuItem class="cursor-pointer"
            ><span class="w-10 flex justify-center mr-5"><ThumbsUp class="w-5" /></span
            >赞</DropdownMenuItem
          >
          <DropdownMenuItem class="cursor-pointer"
            ><span class="w-10 flex justify-center mr-5"><ThumbsDown class="w-5" /></span
            >踩</DropdownMenuItem
          >
          <DropdownMenuItem class="cursor-pointer" @click="handleCopy"
            ><span class="w-10 flex justify-center mr-5"><Copy class="w-5 h-5" /></span
            >复制</DropdownMenuItem
          >
          <DropdownMenuItem class="cursor-pointer"
            ><span class="w-10 flex justify-center mr-5 text-destructive"
              ><Trash2 class="w-5 h-5"
            /></span>
            <span class="text-destructive">删除</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div
      class="flex"
      :class="{
        'mt-1.5 flex-col': !inversion,
        'flex-row-reverse justify-between': inversion
      }"
    >
      <div
        class="flex rounded-md bg-laccent-base p-2"
        :class="{
          'bg-secondary max-w-4xl': !inversion,
          'bg-primary text-white': inversion
        }"
      >
        <LoadingIcon class="w-8 h-8 text-secondary-foreground" v-if="!text" />
        <ContextMenu class="bg-background">
          <ContextMenuTrigger><TextResult :text="text" /></ContextMenuTrigger>
          <ContextMenuContent class="w-40 bg-background">
            <ContextMenuItem class="cursor-pointer"
              ><span class="w-10 flex justify-center mr-5"><ThumbsUp class="w-5" /></span
              >赞</ContextMenuItem
            >
            <ContextMenuItem class="cursor-pointer"
              ><span class="w-10 flex justify-center mr-5"><ThumbsDown class="w-5" /></span
              >踩</ContextMenuItem
            >
            <ContextMenuItem class="cursor-pointer" @click="handleCopy"
              ><span class="w-10 flex justify-center mr-5"><Copy class="w-5 h-5" /></span
              >复制</ContextMenuItem
            >
            <ContextMenuItem class="cursor-pointer"
              ><span class="w-10 flex justify-center mr-5 text-destructive"
                ><Trash2 class="w-5 h-5"
              /></span>
              <span class="text-destructive">删除</span></ContextMenuItem
            >
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <div class="mr-2 ml-2 mt-1.5 flex" v-if="inversion && isHovered">
        <DropdownMenu @click.stop>
          <DropdownMenuTrigger
            ><span class="text-secondary-foreground/50 w-5" @click="handleMouseOver"
              ><Ellipsis class="w-5" /></span
          ></DropdownMenuTrigger>
          <DropdownMenuContent class="w-40 bg-background">
            <DropdownMenuItem class="cursor-pointer"
              ><span class="w-10 flex justify-center mr-5"><ThumbsUp class="w-5" /></span
              >赞</DropdownMenuItem
            >
            <DropdownMenuItem class="cursor-pointer"
              ><span class="w-10 flex justify-center mr-5"><ThumbsDown class="w-5" /></span
              >踩</DropdownMenuItem
            >
            <DropdownMenuItem class="cursor-pointer" @click="handleCopy"
              ><span class="w-10 flex justify-center mr-5"><Copy class="w-5 h-5" /></span
              >复制</DropdownMenuItem
            >
            <DropdownMenuItem class="cursor-pointer"
              ><span class="w-10 flex justify-center mr-5 text-destructive"
                ><Trash2 class="w-5 h-5"
              /></span>
              <span class="text-destructive">删除</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, nextTick, type PropType, ref } from 'vue'
import TextResult from './text-result.vue'
import type { ChatHistory, Role } from '@/models/chat'
import LoadingIcon from '@/components/icons/loading-icon.vue'
import { Copy, Trash2, ThumbsUp, ThumbsDown, Ellipsis } from 'lucide-vue-next'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useClipboard } from '@vueuse/core'
import { toast } from '@/components/ui/toast'

const props = defineProps({
  chat: { type: Object as PropType<ChatHistory>, required: true },
  role: { type: Object as PropType<Role>, required: true },
  isLatest: Boolean
})

const text = computed(() => props.chat.content)
const role = computed(() => props.role)
const inversion = computed(() => (props.chat.type === 'reply' ? false : true))
const el = ref<HTMLElement | null>(null)
const { copy } = useClipboard()
const isHovered = ref(false)
const handleMouseOver = () => {
  isHovered.value = true
}

const mouseLeave = ref()
const handleMouseLeave = () => {
  if (mouseLeave.value) {
    clearTimeout(mouseLeave.value)
  }
  mouseLeave.value = setTimeout(() => {
    isHovered.value = false
  }, 25000)
}

if (props.chat.scrollToView) {
  nextTick(() => {
    el.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

const handleCopy = () => {
  copy(text.value).then(() => {
    toast({
      title: '复制成功'
    })
  })
}
</script>
