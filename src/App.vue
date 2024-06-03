<template>
  <div>
    <NotiGroup />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import NotiGroup from '@/components/noti-group.vue'
const theme = localStorage.getItem('ZenbotTheme')
if (theme) {
  document.documentElement.classList.add(theme)
}
</script>
