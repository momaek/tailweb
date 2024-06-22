<template>
  <div class="w-full flex items-end">
    <div class="p-3 border-none">
      <span> <SparklesIcon class="w-7 h-7 text-gray-900 dark:text-slate-300" /> </span>
    </div>
    <div
      class="flex ml-2 w-full items-end border border-light-emphasis dark:border-dark-emphasis pl-5 text-gray-900 dark:text-slate-300 bg-transparent"
    >
      <textarea
        class="flex-1 leading-[3rem] placeholder:text-gray-400 placeholder:items-center placeholder:font-semibold placeholder:text-sm border-none focus-visible:outline-none focus-visible:border-none"
        placeholder="开始新的聊天"
        v-model="value"
        rows="1"
      />
      <div class="cursor-pointer inset-y-0 right-0 flex items-center mb-1 z-50 pr-1">
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
  </div>
</template>
<script lang="ts" setup>
import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import FwTooltip from './tooltip/fw-tooltip.vue'
import { computed, defineEmits, defineProps } from 'vue'
import { SparklesIcon } from '@heroicons/vue/24/solid'

// 定义 props
const props = defineProps({
  modelValue: String,
  showClear: Boolean
})

// 定义 emits
const emit = defineEmits(['update:modelValue'])

// 创建一个计算属性来处理 v-model
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
