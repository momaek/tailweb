import { getConfig } from '@/api/config'
import type { Config } from '@/models/config'
import httpRequest from '@/utils/axios'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    theme: 'light',
    system_config: undefined as Config | undefined,
    pageTitle: undefined as string | undefined,
    sideMenuSelected: '',
    tauriHost: undefined as string | undefined,
    isTauri: false
  }),
  actions: {
    setTauriHost(host: string) {
      this.tauriHost = host
      localStorage.setItem('ZenbotTauriHost', host)
      httpRequest.updateBaseURL(host)
    },
    getTauriHost() {
      if (this.tauriHost) {
        return this.tauriHost
      }
      this.tauriHost = localStorage.getItem('ZenbotTauriHost') || undefined
      return this.tauriHost
    },
    isTAURI(): boolean {
      return this.isTauri || this.getTauriHost() != undefined
    },
    setTauri() {
      this.isTauri = true
    },
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

    setSelectedMenu(path: string) {
      this.sideMenuSelected = path
    }
  }
})
