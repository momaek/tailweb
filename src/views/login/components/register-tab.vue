<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-3" id="registerForm">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
          >邮箱</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            placeholder="请输入邮箱地址"
            class="block w-full rounded-md border-0 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          for="captcha"
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
          >验证码</label
        >
        <div class="mt-2 flex justify-between items-center">
          <input
            id="captcha"
            name="captcha"
            type="text"
            required
            placeholder="请输入验证码，目前可以随便写"
            class="block rounded-md border-0 w-7/12 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <a
            class="rounded-md h-12 items-center w-4/12 justify-center text-center flex dark:bg-background-muted px-3.5 py-2.5 cursor-pointer text-sm font-semibold text-gray-900 dark:text-slate-300 shadow-sm dark:ring-0 ring-gray-300 ring-1 hover:bg-gray-50 dark:hover:bg-background-emphasis"
            >发送验证码</a
          >
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >密码</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            placeholder="请输入密码"
            class="block w-full rounded-md border-0 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label
            for="cpassword"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >确认密码</label
          >
        </div>
        <div class="mt-2">
          <input
            id="cpassword"
            name="confirm_password"
            type="password"
            autocomplete="current-password"
            required
            placeholder="请再次输入密码"
            class="block w-full rounded-md border-0 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          for="invite_code"
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
          >邀请码</label
        >
        <div class="mt-2">
          <input
            id="invite_code"
            name="invite_code"
            type="text"
            required
            placeholder="请输入邀请码，没有就算了"
            class="block w-full rounded-md border-0 p-3 text-gray-900 dark:bg-transparent dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          @click="btnClick"
          class="flex w-full justify-center rounded-md bg-indigo-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          注册
        </button>
      </div>
    </form>
    <p class="mt-10 text-center text-sm text-slate-300">
      已经有账号？{{ ' ' }}
      <a
        @click="changeTab"
        class="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500"
        >去登录</a
      >
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterTab',
  emits: {
    changeTab: () => true
  },
  setup(_, { emit }) {
    const btnClick = (e: Event) => {
      e.preventDefault()
      const form = document.getElementById('registerForm') as HTMLFormElement
      if (!form?.checkValidity()) {
        form.reportValidity()
      }
    }
    const changeTab = () => {
      emit('changeTab')
    }
    return {
      btnClick,
      changeTab
    }
  }
})
</script>
