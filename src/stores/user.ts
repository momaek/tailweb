import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: undefined as User | undefined,
    token: undefined as string | undefined
  }),
  actions: {
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo
    },
    async getCurrentUserInfo(): Promise<User> {
      if (this.userInfo) {
        return this.userInfo
      }
      const res = await getUserInfo()
      this.userInfo = res
      return this.userInfo
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('ZenbotToken', token)
    },
    getToken() {
      if (this.token) {
        return this.token
      }
      this.token = localStorage.getItem('ZenbotToken') || undefined
      return this.token
    }
  }
})
