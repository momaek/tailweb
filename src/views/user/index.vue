<template>
  <div class="w-full flex flex-col gap-2 items-center justify-center py-10">
    <div class="max-w-4xl px-4 lg:px-8 w-full">
      <div
        class="group bg-secondary flex flex-col gap-4 w-full rounded-lg px-4 py-4"
        v-if="currentUser"
      >
        <div class="head flex shrink-0 items-center">
          <span><img :src="currentUser.avatar" class="w-12 rounded-lg" alt="" /></span>
          <div class="ml-2 flex flex-col">
            <span class="font-bold text-lg">{{ currentUser.nickname }}</span>
          </div>
        </div>
        <div class="description flex flex-col gap-2">
          <p class="text-foreground/70 text-sm flex items-center">
            <BatteryFull class="w-6 mr-2" />
            <span class="mr-2">剩余算力: </span><span>{{ currentUser.power }}</span>
          </p>
        </div>
        <div class="footer flex flex-row-reverse">
          <Button @click="signout">退出登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useTitle } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { BatteryFull } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { useRouter } from 'vue-router'
useTitle('个人主页')

const userStore = useUserStore()
const router = useRouter()
const currentUser = computed(() => userStore.userInfo)
userStore.getCurrentUserInfo()
const signout = () => {
  userStore.signout().then(() => {
    router.push('/login')
  })
}
</script>
