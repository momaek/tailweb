<template>
  <div
    class="fixed top-5 z-50 right-20 p-1 border cursor-pointer border-gray-900 dark:border-slate-300 rounded-full text-gray-900 dark:text-slate-300"
  >
    <SunIcon v-if="theme == 'dark'" class="w-6" @click="setTheme('light')" />
    <MoonIcon v-else class="w-6" @click="setTheme('dark')" />
  </div>
</template>
<script lang="ts">
import { useConfigStore } from '@/stores/config'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ThemeToggle',
  components: {
    MoonIcon,
    SunIcon
  },
  setup() {
    const themeStore = useConfigStore()
    const theme = computed(() => themeStore.theme)
    themeStore.getTheme()

    const setTheme = (t: string) => {
      themeStore.setTheme(t)
    }
    return {
      theme,
      setTheme
    }
  }
})
</script>
