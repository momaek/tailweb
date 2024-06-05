<template>
  <div class="flex items-start">
    <tooltip :placement="placement" :triggers="[trigger]" :theme="theme" auto-hide>
      <slot name="trigger" />
      <template #popper>
        <slot name="content" />
      </template>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Tooltip } from 'floating-vue'
import type { TooltipPlacement, TooltipTrigger } from './types'
import { useConfigStore } from '@/stores/config'
import 'floating-vue/dist/style.css'

interface TooltipProps {
  placement?: TooltipPlacement
  trigger?: TooltipTrigger
}

const configStore = useConfigStore()

withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  trigger: 'hover'
})

const theme = computed(() => {
  const themes: Record<string, string> = {
    light: 'tooltip-light',
    dark: 'tooltip-dark'
  }
  return themes[configStore.getTheme() as string]
})
</script>

<style>
.v-popper--theme-tooltip-dark .v-popper__wrapper .v-popper__inner {
  background: rgba(0, 0, 0);
  color: #fff;
  border-radius: 6px;
  padding: 7px 12px 6px;
}

.v-popper--theme-tooltip-dark .v-popper__arrow-inner {
  visibility: hidden;
}

.v-popper--theme-tooltip-dark .v-popper__arrow-outer {
  border-color: #000c;
}

@media (prefers-color-scheme: dark) {
  .v-popper--theme-tooltip-dark .v-popper__wrapper .v-popper__inner {
    background: #313535;
  }

  .v-popper--theme-tooltip-dark .v-popper__arrow-outer {
    border-color: #313535;
  }
}

.v-popper--theme-tooltip-light .v-popper__wrapper .v-popper__inner {
  background: #fff;
  color: black;
  padding: 7px 12px 6px;
  border-radius: 6px;
  border: 1px solid #eeeeee;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.25);
}

.v-popper--theme-tooltip-light .v-popper__arrow-inner {
  visibility: visible;
  border-color: #fff;
}

.v-popper--theme-tooltip-light .v-popper__arrow-outer {
  border-color: #ddd;
}
.v-popper__popper[data-popper-placement^='bottom'] .v-popper__inner {
  margin-top: -1px;
}
.v-popper__popper[data-popper-placement^='right'] .v-popper__inner {
  margin-left: -1px;
}
</style>
