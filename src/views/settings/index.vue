<template>
  <div class="w-full flex items-center justify-center py-10">
    <div class="max-w-4xl px-4 lg:px-8 w-full flex-col gap-8 flex">
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
      <div class="group bg-secondary w-full rounded-lg px-4 py-2" v-if="isTauri">
        <fieldset>
          <legend class="text-sm font-semibold leading-6">服务域名配置</legend>
          <div class="mt-2 space-y-2">
            <div class="flex w-full max-w-sm items-center gap-1.5">
              <Input id="email" placeholder="backendhost" v-model="tauriHost" />
              <Button variant="outline" @click="saveTauriHost"> 保存 </Button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { computed, ref, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
useTitle('设置')
const themes = [
  { id: 'light', title: '浅色主题' },
  { id: 'dark', title: '深色主题' }
]
const configStore = useConfigStore()
const theme = ref(configStore.getTheme())
const isTauri = computed(() => configStore.isTAURI())
const tauriHost = ref(configStore.getTauriHost())

const saveTauriHost = () => {
  configStore.setTauriHost(tauriHost.value as string)
  toast({ title: '保存成功' })
}

watch(theme, (value) => {
  configStore.setTheme(value as string)
})
</script>
