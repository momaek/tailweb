<template>
  <div class="flex flex-col justify-center px-6 lg:px-8 relative w-full">
    <ThemeToggle />
    <div class="flex items-center justify-center shadow-inner w-full">
      <img
        v-if="theme === 'dark'"
        src="../../assets/breadthOfBotsGraphicDark.3e58fdf8.png"
        class="sm:w-[1200px] w-full"
      />
      <img
        v-else
        src="../../assets/breadthOfBotsGraphicLight.cd6e20e8.png"
        class="sm:w-[1200px] w-full"
      />
    </div>
    <div class="dark:shadow-[0_-80px_40px_0_#181818] shadow-[0_-80px_40px_0_white]">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoIcon class="!w-16 h-16 mx-auto" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          在这里可与ChatGPT、GPT-4、Claude-3-Opus、DALLE 3等数百万机器人交谈，可使用 Midjourney
          绘出精彩人生。
        </h2>
      </div>

      <LoginTab v-if="isLogin" @change-tab="isLogin = !isLogin" />
      <RegisterTab v-else @change-tab="isLogin = !isLogin" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ThemeToggle from '@/components/theme-toggle.vue'
import LogoIcon from '@/components/icons/logo-icon.vue'
import { useConfigStore } from '@/stores/config'
import LoginTab from './components/login-tab.vue'
import RegisterTab from './components/register-tab.vue'
import { useTitle } from '@vueuse/core'
useTitle('登录')

export default defineComponent({
  name: 'LoginView',
  components: {
    ThemeToggle,
    LogoIcon,
    LoginTab,
    RegisterTab
  },
  setup() {
    const themeStore = useConfigStore()
    const theme = computed(() => themeStore.theme)
    themeStore.getTheme()

    const isLogin = ref(true)

    return {
      theme,
      isLogin
    }
  }
})
</script>
<style scoped>
img {
  max-width: none;
}
</style>
