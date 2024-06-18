import { getChatList, getModelList, getRoleList } from '@/api/chat'
import type { Chat, Model, Role } from '@/models/chat'
import { defineStore } from 'pinia'
let currentRequest: Promise<Role[]> | null = null

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatList: [] as Chat[],
    originalRoleList: [] as Role[],
    allRoleList: [] as Role[],
    modelList: [] as Model[]
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
    fuzzySearchRole(query: string): Role[] {
      return this.allRoleList.filter((role) => role.name.includes(query))
    },
    getRoleByKey(key: string): Role | undefined {
      return this.allRoleList.find((role) => role.key === key)
    },
    addToChatList(chat: Chat) {
      this.chatList.unshift(chat)
    },

    async getAllRoleList(): Promise<Role[]> {
      if (currentRequest) {
        return currentRequest
      }

      if (this.allRoleList.length > 0) {
        currentRequest = Promise.resolve(this.allRoleList)
        return currentRequest
      }

      currentRequest = getRoleList()
        .then((res) => {
          this.allRoleList = res
          res.forEach((role) => {
            if (role.model_id !== 0) {
              this.originalRoleList.push(role)
            }
          })
          return res
        })
        .catch((error) => {
          currentRequest = null
          throw error
        })
        .finally(() => {
          currentRequest = null
        })

      return currentRequest
    },
    async getAllModelList(): Promise<Model[]> {
      if (this.modelList.length > 0) {
        return this.modelList
      }

      const res = await getModelList()
      this.modelList = res
      return res
    }
  }
})
