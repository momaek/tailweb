<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form id="loginForm" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium leading-6">邮箱或者用户名</label>
        <div class="mt-2">
          <input
            id="email"
            name="email"
            v-model="userLoginParam.username"
            autocomplete="email"
            required
            placeholder="请输入邮箱地址"
            class="block w-full rounded-md border-0 p-3 dark:bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6">密码</label>
          <div class="text-sm hidden">
            <a href="#" class="font-semibold text-primary hover:text-primary/80"
              >Forgot password?</a
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            v-model="userLoginParam.password"
            autocomplete="current-password"
            required
            placeholder="请输入密码"
            class="block w-full rounded-md border-0 p-3 dark:bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <Button class="w-full" @click="btnClick" :disabled="isSubmiting">登录</Button>
      </div>
    </form>
    <p class="mt-10 text-center text-sm text-slate-300">
      还没有账号？{{ ' ' }}
      <a
        @click="changeTab"
        class="font-semibold cursor-pointer leading-6 text-primary hover:text-primary/80 mr-5"
        >注册账号</a
      >
      <span v-if="isTauri"
        >配置错误？{{ ' ' }}
        <a
          @click="showEditDialog = true"
          class="font-semibold cursor-pointer leading-6 text-primary hover:text-primary/80 mr-5"
          >重新配置</a
        ></span
      >
    </p>

    <Dialog :open="showEditDialog" v-if="showEditDialog">
      <DialogContent
        class="sm:max-w-[425px]"
        @pointerDownOutside="showEditDialog = false"
        @escapeKeyDown="showEditDialog = false"
      >
        <DialogHeader>
          <DialogTitle>服务域名配置</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="title" v-model="domain" class="col-span-4" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child @click="showEditDialog = false"
            ><Button variant="outline"> 取消 </Button></DialogClose
          >
          <Button @click="updateDomain"> 保存变更 </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { login } from '@/api/user'
import type { UserLogin } from '@/models/user'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

const isSubmiting = ref(false)
const userLoginParam = ref<UserLogin>({} as UserLogin)
const userStore = useUserStore()
const router = useRouter()
const showEditDialog = ref(false)
const configStore = useConfigStore()
const isTauri = computed(() => configStore.isTAURI())
const domain = ref(configStore.tauriHost)
const updateDomain = () => {
  configStore.setTauriHost(domain.value as string)
  showEditDialog.value = false
}

if (isTauri.value) {
  showEditDialog.value = true
}

const emit = defineEmits(['changeTab'])

const btnClick = (e: Event) => {
  e.preventDefault()
  const form = document.getElementById('loginForm') as HTMLFormElement
  if (!form?.checkValidity()) {
    form.reportValidity()
    return
  }
  isSubmiting.value = true
  login(userLoginParam.value)
    .then((res) => {
      userStore.setToken(res)
      router.push('/')
    })
    .finally(() => {
      isSubmiting.value = false
    })
}
const changeTab = () => {
  emit('changeTab')
}
</script>
