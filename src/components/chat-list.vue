<template>
  <div>
    <li
      class="py-1 p-2"
      v-for="chat in localChats"
      :key="chat.id"
      :class="{
        'border-b': props.isMenu,
        'bg-secondary': selectedKey === '/chat/' + chat.chat_id,
        'hover:bg-secondary': selectedKey !== '/chat/' + chat.chat_id
      }"
      @mouseenter="chat.showDropDownBtn = true"
      @mouseleave="chat.showDropDownBtn = false"
    >
      <router-link
        :to="'/chat/' + chat.chat_id"
        class="flex items-center justify-start font-bold text-base p-2 w-full"
      >
        <div><img class="w-10 rounded-md" :src="chat.icon" /></div>
        <div class="flex flex-col ml-2 w-full max-h-16">
          <div class="head flex justify-between items-center text-xs font-normal">
            <span class="text-ellipsis break-words truncate">{{ chat.role_name }}</span>
            <span class="flex justify-start items-center"
              ><span>{{ formatTimestampToMD(chat.updated_at) }}</span>
              <span><ChevronRight class="w-3.5" /></span
            ></span>
          </div>
          <div class="body flex justify-between">
            <div class="flex flex-col">
              <div class="truncate" :class="{ 'max-w-48': props.isMenu }">{{ chat.title }}</div>
              <div class="text-foreground/50 font-normal text-sm truncate">{{ chat.model }}</div>
            </div>
            <div class="dropwon flex">
              <DropdownMenu :open="chat.isDropdownOpen">
                <DropdownMenuTrigger
                  @click.prevent="chat.isDropdownOpen = true"
                  class="hover:bg-secondary/70"
                  v-if="chat.showDropDownBtn || chat.isDropdownOpen"
                  ><span><Ellipsis class="w-6 text-foreground/60" /></span
                ></DropdownMenuTrigger>
                <DropdownMenuContent
                  class="w-40 bg-background"
                  v-if="chat.isDropdownOpen"
                  @pointerDownOutside="chat.isDropdownOpen = false"
                  @escapeKeyDown="chat.isDropdownOpen = false"
                >
                  <DropdownMenuItem class="cursor-pointer" @click="openEditDialog(chat)"
                    ><span class="w-10 flex justify-center mr-5"><SquarePen class="w-5 h-5" /></span
                    >编辑</DropdownMenuItem
                  >
                  <DropdownMenuItem class="cursor-pointer" @click="openDeleteDialog(chat)"
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
      </router-link>
    </li>
    <Dialog :open="showEditDialog">
      <DialogContent
        class="sm:max-w-[425px]"
        @pointerDownOutside="showEditDialog = false"
        @escapeKeyDown="showEditDialog = false"
      >
        <DialogHeader>
          <DialogTitle>编辑 Title</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="title" v-if="editTarget" v-model="editTarget.title" class="col-span-4" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child @click="showEditDialog = false"
            ><Button variant="outline"> 取消 </Button></DialogClose
          >
          <Button @click="updateChatTitle" :disabled="isUpdating"
            ><Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isUpdating" /> 保存变更
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog :open="showDeleteDialog">
      <DialogContent
        @pointerDownOutside="showDeleteDialog = false"
        @escapeKeyDown="showDeleteDialog = false"
      >
        <DialogHeader>
          <DialogTitle class="text-destructive flex items-center">
            <TriangleAlert class="mr-3" /> 删除确认</DialogTitle
          >
          <DialogDescription class="font-normal">
            删除后不可恢复，确定要删除 <span class="font-bold">{{ deleteTarget?.title }}</span> ？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child @click="showDeleteDialog = false"
            ><Button variant="outline"> 取消 </Button></DialogClose
          >
          <Button @click="deleteChat" variant="destructive" :disabled="isDeleting">
            <Loader2 v-if="isDeleting" class="w-4 h-4 mr-2 animate-spin" />
            确认删除</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { Ellipsis, ChevronRight, Trash2, SquarePen, TriangleAlert, Loader2 } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import type { Chat } from '@/models/chat'
import { type PropType, defineProps, computed, ref } from 'vue'
import { useConfigStore } from '@/stores/config'
import { formatTimestampToMD } from '@/utils'
import { removeChat, updateChat } from '@/api/chat'
import { toast } from './ui/toast'
import { useChatStore } from '@/stores/chat'

interface ChatEx extends Chat {
  showDropDownBtn: boolean
  isDropdownOpen: boolean
}

const props = defineProps({
  isMenu: Boolean,
  chats: Object as PropType<Chat[]>
})

const chatStore = useChatStore()
const localChats = computed(() => props.chats as ChatEx[])
const configStore = useConfigStore()
const selectedKey = computed(() => configStore.sideMenuSelected)
const showDeleteDialog = ref(false)
const showEditDialog = ref(false)
const deleteTarget = ref<ChatEx | null>(null)
const editTarget = ref<ChatEx | null>(null)
const openDeleteDialog = (chat: ChatEx) => {
  showDeleteDialog.value = true
  deleteTarget.value = chat
  chat.isDropdownOpen = false
}
const openEditDialog = (chat: ChatEx) => {
  showEditDialog.value = true
  editTarget.value = chat
  chat.isDropdownOpen = false
}

const isDeleting = ref(false)
const deleteChat = () => {
  isDeleting.value = true
  removeChat(deleteTarget.value?.chat_id as string)
    .then(() => {
      toast({
        title: '删除成功'
      })
      deleteTarget.value = null
      showDeleteDialog.value = false
      chatStore.getAllChatList(true)
    })
    .finally(() => {
      isDeleting.value = false
    })
}

const isUpdating = ref(false)
const updateChatTitle = () => {
  isUpdating.value = true
  updateChat(editTarget.value?.chat_id as string, editTarget.value?.title as string)
    .then(() => {
      toast({
        title: '更新成功'
      })
      editTarget.value = null
      showEditDialog.value = false
      chatStore.getAllChatList(true)
    })
    .finally(() => {
      isUpdating.value = false
    })
}
</script>
