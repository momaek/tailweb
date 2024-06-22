<template>
  <div class="w-full flex items-end">
    <div class="p-2 border-none" v-if="props.showClear">
      <FwTooltip>
        <template #trigger>
          <span class="flex items-center justify-center cursor-pointer">
            <SparklesIcon class="w-7 h-7 text-gray-900 dark:text-slate-300" />
          </span>
        </template>
        <template #content>
          <span class="text-sm">清除上下文</span>
        </template>
      </FwTooltip>
    </div>
    <div
      class="flex ml-2 w-full items-end border border-light-emphasis dark:border-dark-emphasis pl-5 text-gray-900 dark:text-slate-300 bg-transparent"
      :class="{ 'rounded-full': textAreaHeight === 44, 'rounded-3xl': textAreaHeight > 44 }"
    >
      <textarea
        id="message-input"
        class="block p-2.5 w-full border-none outline-none bg-transparent resize-none"
        placeholder="开始新的聊天"
        :rows="1"
        v-model="input"
        @input="onInput"
      />
      <div class="cursor-pointer inset-y-0 right-0 flex items-center mb-0.5 z-50 pr-1">
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
              class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-laccent-muted dark:hover:bg-daccent-muted bg-laccent-base dark:bg-daccent-base"
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
import { defineProps, ref } from 'vue'
import { SparklesIcon } from '@heroicons/vue/24/solid'

// 定义 props
const props = defineProps({
  showClear: Boolean
})

const input = ref('')
const textAreaHeight = ref(44)
const onInput = () => {
  const textarea = document.getElementById('message-input') as HTMLTextAreaElement
  textarea.style.height = 'auto'
  if (textarea.scrollHeight < 440) {
    textarea.style.height = textarea.scrollHeight + 'px'
  } else {
    textarea.style.height = '440px'
  }
  textAreaHeight.value = textarea.scrollHeight
}
</script>
