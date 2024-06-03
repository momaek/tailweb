import { getConfig } from '@/api/config'
import type { Config } from '@/models/config'
import { defineStore } from 'pinia'
import type { Chat } from '@/models/chat'
import { getChatList } from '@/api/chat'

export const useConfigStore = defineStore('config', {
  state: () => ({
    theme: 'light',
    system_config: {} as Config,
    pageTitle: undefined as string | undefined,
    sideChats: [] as Chat[],
    sideMenuSelected: ''
  }),
  actions: {
    setTheme(t: string) {
      if (this.theme) {
        document.documentElement.classList.remove(this.theme)
      }
      document.documentElement.classList.add(t)

      this.theme = t
      localStorage.setItem('ZenbotTheme', t)
    },
    getTheme(): string | null {
      const t = localStorage.getItem('ZenbotTheme')
      if (t === 'dark' || t === 'light') {
        this.theme = t
        return t
      }
      return 'light'
    },
    async getSystemConfig() {
      if (this.system_config) {
        return
      }

      const res = await getConfig()
      this.system_config = res
    },
    setPageTitle(title: string | undefined) {
      this.pageTitle = title
    },
    addToSideChats(chat: Chat) {
      this.sideChats.unshift(chat)
    },
    getSideChat(force?: boolean) {
      if (!force) {
        if (this.sideChats.length > 0) {
          return this.sideChats
        }
      }
      getChatList().then((res) => {
        this.sideChats = res
      })
    },
    setSelectedMenu(path: string) {
      this.sideMenuSelected = path
    }
  }
})
