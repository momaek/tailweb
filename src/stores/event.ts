import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    messageInputValue: ''
  }),
  actions: {
    setMessageInputValue(val: string) {
      this.messageInputValue = val
    }
  }
})
