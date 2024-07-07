<template>
  <Dialog :open="showEditDialog">
    <DialogContent
      class="sm:max-w-[425px]"
      @pointerDownOutside="showEditDialog = false"
      @escapeKeyDown="showEditDialog = false"
    >
      <DialogHeader>
        <DialogTitle>服务域名配置</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Input id="title" v-model="domain" class="col-span-4" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child @click="showEditDialog = false"
          ><Button variant="outline"> 取消 </Button></DialogClose
        >
        <Button @click="updateDomain"> 保存变更 </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import { useConfigStore } from '@/stores/config'
import { computed, ref } from 'vue'
const props = defineProps({
  open: Boolean
})
const showEditDialog = computed(() => props.open)
const configStore = useConfigStore()
const domain = ref(configStore.tauriHost)
const updateDomain = () => {
  configStore.setTauriHost(domain.value as string)
}
</script>
