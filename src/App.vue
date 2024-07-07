<template>
  <div>
    <Toaster />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
const theme = localStorage.getItem('ZenbotTheme')
const router = useRouter()
const configStore = useConfigStore()
if (theme) {
  document.documentElement.classList.add(theme)
}
if (window.__TAURI__) {
  configStore.setTauri()
  if (configStore.getTauriHost()) {
    router.push('/')
  } else {
    router.push('/login')
  }
}
</script>
