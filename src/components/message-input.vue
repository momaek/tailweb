<template>
  <div class="relative mt-1 rounded-md shadow-sm">
    <input
      type="text"
      class="block w-full rounded-full border border-light-emphasis dark:border-dark-emphasis leading-[3rem] px-5 pr-10 text-gray-900 dark:text-slate-300 bg-transparent placeholder:text-gray-400 placeholder:font-semibold placeholder:text-sm focus:border-laccent-base dark:focus:border-daccent-base"
      placeholder="开始新的聊天"
    />
    <div class="absolute cursor-pointer inset-y-0 right-0 flex items-center z-50 pr-1">
      <FwTooltip>
        <template #trigger>
          <span class="mr-2 w-10 h-10 flex items-center justify-center cursor-pointer">
            <PlusCircleIcon class="w-7 h-7 text-gray-900 dark:text-slate-300" />
          </span>
        </template>
        <template #content>
          <span class="text-sm">选择附件</span>
        </template>
      </FwTooltip>

      <FwTooltip>
        <template #trigger>
          <span
            class="w-10 h-10 rounded-full flex items-center justify-center bg-laccent-base dark:bg-daccent-base"
          >
            <ArrowRightIcon class="h-5 w-5 text-white" aria-hidden="true" />
          </span>
        </template>
        <template #content>
          <span class="text-sm">发送信息</span>
        </template>
      </FwTooltip>
    </div>
  </div>
</template>
<script lang="ts">
import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { defineComponent } from 'vue'
import FwTooltip from './tooltip/fw-tooltip.vue'

export default defineComponent({
  name: 'MessageInput',
  components: {
    ArrowRightIcon,
    PlusCircleIcon,
    FwTooltip
  }
})
</script>
