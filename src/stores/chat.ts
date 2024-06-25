import { getChatList, getModelList, getRoleList } from '@/api/chat'
import type { Chat, Model, Role } from '@/models/chat'
import { defineStore } from 'pinia'
let currentRequest: Promise<Role[]> | null = null

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatList: [] as Chat[],
    originalRoleList: [] as Role[],
    allRoleList: [] as Role[],
    modelList: [] as Model[],
    cachedMessage: '',
    cachedModel: undefined as Model | undefined,
    cachedRole: undefined as Role | undefined
  }),
  actions: {
    setCachedMessage(message: string) {
      this.cachedMessage = message
    },
    setCachedModel(model: Model) {
      this.cachedModel = model
    },
    setCachedRole(role: Role) {
      this.cachedRole = role
    },
    newChat(chat: Chat) {
      this.chatList.unshift(chat)
    },
    clearCachedItem() {
      this.cachedMessage = ''
      this.cachedModel = undefined
      this.cachedRole = undefined
    },
    async getAllChatList(force?: boolean): Promise<Chat[]> {
      if (!force) {
        if (this.chatList.length > 0) {
          return this.chatList
        }
      }
      const res = await getChatList()
      this.chatList = res
      return this.chatList
    },
    getChatByID(id: number): Chat | undefined {
      return this.chatList.find((chat) => chat.id === id)
    },
    getChatByChatID(chatID: string): Chat | undefined {
      return this.chatList.find((chat) => chat.chat_id === chatID)
    },
    fuzzySearchRole(query: string): Role[] {
      return this.allRoleList.filter((role) => role.name.includes(query))
    },
    getRoleByKey(key: string): Role | undefined {
      return this.allRoleList.find((role) => role.key === key)
    },
    getRoleByID(id: number): Role | undefined {
      return this.allRoleList.find((role) => role.id === id)
    },
    getModelByID(id: number): Model | undefined {
      return this.modelList.find((model) => model.id === id)
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
