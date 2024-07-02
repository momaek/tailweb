<template>
  <div class="fixed top-5 z-50 right-2 sm:right-20 p-1 border cursor-pointer rounded-full">
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
