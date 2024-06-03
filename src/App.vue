<template>
  <div>
    <NotiGroup />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import NotiGroup from '@/components/noti-group.vue'
const theme = localStorage.getItem('ZenbotTheme')
if (theme) {
  document.documentElement.classList.add(theme)
}
</script>
