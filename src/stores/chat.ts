import { getChatList, getModelList, getRoleList } from '@/api/chat'
import type { Chat, Model, Role } from '@/models/chat'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
let currentRequest: Promise<Role[]> | null = null
export const useChatStore = defineStore('chat', {
  state: () => ({
    chatList: [] as Chat[],
    menuChatList: [] as Chat[],
    originalRoleList: [] as Role[],
    allRoleList: [] as Role[],
    modelList: [] as Model[],
    cachedMessage: '',
    cachedModel: undefined as Model | undefined,
    cachedRole: undefined as Role | undefined,
    socket: undefined as WebSocket | undefined,
    reasonableClose: false
  }),
  actions: {
    setSocket(socket: WebSocket) {
      this.socket = socket
      this.reasonableClose = false
    },
    isSocketConnected(): boolean {
      if (this.socket) {
        return (
          this.socket.readyState === WebSocket.OPEN ||
          this.socket.readyState === WebSocket.CONNECTING
        )
      }

      return false
    },
    closeSocket() {
      if (this.socket) {
        this.reasonableClose = true
        this.socket.close()
        this.socket = undefined
      }
    },
    setCachedMessage(message: string) {
      this.cachedMessage = message
      localStorage.setItem('ZenbotCachedMessage', message)
    },
    setCachedModel(model: Model) {
      this.cachedModel = model
      localStorage.setItem('ZenbotCachedModel', JSON.stringify(model))
    },
    setCachedRole(role: Role) {
      this.cachedRole = role
      localStorage.setItem('ZenbotCachedRole', JSON.stringify(role))
    },
    getCachedMessage() {
      const message = localStorage.getItem('ZenbotCachedMessage')
      if (message) {
        this.cachedMessage = message
      }
      return this.cachedMessage
    },
    getCachedModel() {
      const model = localStorage.getItem('ZenbotCachedModel')
      if (model) {
        this.cachedModel = JSON.parse(model)
      }
      return this.cachedModel
    },
    getCachedRole() {
      const role = localStorage.getItem('ZenbotCachedRole')
      if (role) {
        this.cachedRole = JSON.parse(role)
      }
      return this.cachedRole
    },
    newChat(chat: Chat) {
      this.chatList.unshift(chat)
      this.menuChatList.unshift(chat)
    },
    swapChatToFirst(chat: Chat) {
      // 首先检查chat是否已经是列表的第一位
      if (this.chatList[0] && this.chatList[0].id === chat.id) {
        // chat已经是第一位，无需处理
        return
      }

      const index = this.chatList.findIndex((item) => item.id === chat.id)
      if (index > 0) {
        // 确保找到的chat不是第一个元素，也确实在列表中
        this.chatList.splice(index, 1) // 从当前位置删除
        this.chatList.unshift(chat) // 添加到列表开头
      }
    },
    clearCachedItem() {
      if (this.cachedMessage) {
        this.cachedMessage = ''
        localStorage.removeItem('ZenbotCachedMessage')
      }
      if (this.cachedModel) {
        this.cachedModel = undefined
        localStorage.removeItem('ZenbotCachedModel')
      }
      if (this.cachedRole) {
        this.cachedRole = undefined
        localStorage.removeItem('ZenbotCachedRole')
      }
    },
    async getAllChatList(force?: boolean): Promise<Chat[]> {
      if (!force) {
        if (this.chatList.length > 0) {
          return this.chatList
        }
      }
      const res = await getChatList()
      if (res) {
        this.chatList = res
        this.menuChatList = JSON.parse(JSON.stringify(res.slice(0, 5)))
        this.updateChatListIcon()
      }
      return this.chatList
    },
    updateChatListIcon() {
      const configStore = useConfigStore()

      if (configStore.isTAURI()) {
        const tauriHost = configStore.getTauriHost() as string
        this.chatList.forEach((chat) => {
          chat.icon = tauriHost + chat.icon
        })
        this.menuChatList.forEach((chat) => {
          chat.icon = tauriHost + chat.icon
        })
      }
    },
    updateRoleIcon() {
      const configStore = useConfigStore()

      if (configStore.isTAURI()) {
        const tauriHost = configStore.getTauriHost() as string
        this.allRoleList.forEach((role) => {
          role.icon = tauriHost + role.icon
        })
        this.originalRoleList.forEach((role) => {
          role.icon = tauriHost + role.icon
        })
      }
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
    fuzzySearchChat(query: string): Chat[] {
      return this.chatList.filter((c) => c.title.includes(query))
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
          this.updateRoleIcon()
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
