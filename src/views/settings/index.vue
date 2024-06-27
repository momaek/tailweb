<template>
  <div class="w-full flex flex-col gap-2 items-center justify-center py-10">
    <div class="max-w-4xl px-4 lg:px-8 w-full">
      <div class="group bg-secondary w-full rounded-lg px-4 py-2">
        <fieldset>
          <legend class="text-sm font-semibold leading-6">外观</legend>
          <div class="mt-2 space-y-2">
            <div v-for="tm in themes" :key="tm.id" class="flex items-center cursor-pointer">
              <input
                :id="tm.id"
                name="theme-method"
                type="radio"
                v-model="theme"
                :value="tm.id"
                class="h-4 w-4 text-indigo-500 cursor-pointer focus:ring-indigo-500"
              />
              <label :for="tm.id" class="ml-3 block text-sm font-medium leading-6 cursor-pointer">{{
                tm.title
              }}</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useConfigStore } from '@/stores/config'
import { ref, defineComponent, watch } from 'vue'
import { useTitle } from '@vueuse/core'
useTitle('设置')
export default defineComponent({
  name: 'SettingIndex',
  setup() {
    const themes = [
      { id: 'light', title: '浅色主题' },
      { id: 'dark', title: '深色主题' }
    ]
    const configStore = useConfigStore()
    const theme = ref(configStore.getTheme())

    watch(theme, (value) => {
      configStore.setTheme(value as string)
    })

    return { themes, theme }
  }
})
</script>
