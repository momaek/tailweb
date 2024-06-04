import { getChatList, getRoleList } from '@/api/chat'
import type { Chat, Role } from '@/models/chat'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatList: [] as Chat[],
    originalRoleList: [] as Role[],
    allRoleList: [] as Role[]
  }),
  actions: {
    getAllChatList(force?: boolean) {
      if (!force) {
        if (this.chatList.length > 0) {
          return this.chatList
        }
      }
      getChatList().then((res) => {
        this.chatList = res
      })
    },
    addToChatList(chat: Chat) {
      this.chatList.unshift(chat)
    },
    async getAllRoleList(): Promise<Role[]> {
      const res = await getRoleList()
      this.allRoleList = res
      res.forEach((role) => {
        if (role.model_id !== 0) {
          this.originalRoleList.push(role)
        }
      })

      return res
    }
  }
})
