<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form id="loginForm" class="space-y-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
          >邮箱</label
        >
        <div class="mt-2">
          <input
            id="email"
            type="email"
            name="email"
            v-model="userLoginParam.username"
            autocomplete="email"
            required
            placeholder="请输入邮箱地址"
            class="block w-full rounded-md border-0 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >密码</label
          >
          <div class="text-sm hidden">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
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
            class="block w-full rounded-md border-0 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          @click="btnClick"
          :disabled="isSubmiting"
          class="flex w-full justify-center rounded-md bg-indigo-600 p-3 text-sm font-semibold disabled:bg-indigo-300 disabled:cursor-not-allowed leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          登录
        </button>
      </div>
    </form>
    <p class="mt-10 text-center text-sm text-slate-300">
      还没有账号？{{ ' ' }}
      <a
        @click="changeTab"
        class="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500"
        >注册账号</a
      >
    </p>
  </div>
</template>
<script lang="ts">
import { login } from '@/api/user'
import type { UserLogin } from '@/models/user'
import { useUserStore } from '@/stores/user'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LoginTab',
  emits: {
    changeTab: () => true
  },
  setup(_, { emit }) {
    const isSubmiting = ref(false)
    const userLoginParam = ref<UserLogin>({} as UserLogin)
    const userStore = useUserStore()
    const router = useRouter()

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
          console.log('====================>', res)
          router.push('/')
        })
        .finally(() => {
          isSubmiting.value = false
        })
    }
    const changeTab = () => {
      emit('changeTab')
    }
    return {
      btnClick,
      changeTab,
      isSubmiting,
      userLoginParam
    }
  }
})
</script>
