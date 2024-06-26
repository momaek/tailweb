<template>
  <div
    class="flex items-start"
    :class="{ 'flex-row-reverse': props.inversion, 'flow-col': !props.inversion }"
  >
    <img
      class="ml-2 h-8 w-8 rounded-full"
      src="https://dummyimage.com/128x128/354ea1/ffffff&text=G"
      v-if="!props.inversion"
    />
    <div
      class="flex rounded-b-xl rounded-tl-xl bg-laccent-base text-white p-2 dark:bg-dark-faint sm:max-w-md md:max-w-2xl"
    >
      <TextResult :text="text" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import TextResult from './text-result.vue'
const props = defineProps({
  inversion: Boolean,
  text: String
})
const text = computed(() => props.text)
</script>
