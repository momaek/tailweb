<template>
  <div>
    <Toaster />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
const theme = localStorage.getItem('ZenbotTheme')
if (theme) {
  document.documentElement.classList.add(theme)
}
</script>
