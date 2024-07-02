<template>
  <div class="w-full flex flex-col">
    <div class="flex items-center justify-center mb-3" v-if="showStopButton">
      <Button variant="outline" @click="stopGenerateFun">
        <StopCircleIcon class="w-6 mr-2" /> 停止生成
      </Button>
    </div>
    <div class="flex items-end">
      <div class="p-2 border-none" v-if="props.showClear">
        <FwTooltip>
          <template #trigger>
            <span class="flex items-center justify-center cursor-pointer" @click="clearContext">
              <SparklesIcon class="w-7 h-7" />
            </span>
          </template>
          <template #content>
            <span class="text-sm">清除上下文</span>
          </template>
        </FwTooltip>
      </div>
      <div
        class="flex ml-2 w-full items-end border-2 pl-5 bg-transparent"
        :class="{
          '!rounded-3xl': textAreaHeight > 50 || uploadedImages.length > 0 || uploading,
          'rounded-full': textAreaHeight === 50,
          'border-primary ': focus
        }"
      >
        <div class="w-full flex flex-col">
          <textarea
            id="message-input"
            class="block py-3 w-full border-none outline-none bg-transparent resize-none font-normal"
            placeholder="开始新的聊天"
            :rows="1"
            v-model="input"
            @input="onInput"
            style="height: 50px"
            @focus="focus = true"
            @blur="focus = false"
          />
          <div
            class="upload-images flex mt-2 mb-1 gap-4"
            v-if="uploadedImages.length > 0 || uploading"
          >
            <span
              v-for="(img, idx) in uploadedImages"
              :key="img"
              class="relative w-16 h-16 border rounded-lg"
            >
              <XCircleIcon
                class="absolute -top-4 -right-4 w-6 cursor-pointer"
                @click="removeUploadedImage(idx)"
              />
              <img :src="img" class="w-full h-full object-cover rounded-lg" />
            </span>
            <span class="relative w-16 h-16 rounded-lg" v-if="uploading">
              <LoadingIcon class="w-14 h-14" />
            </span>
          </div>
        </div>
        <div class="cursor-pointer inset-y-0 right-0 flex items-center mb-1 z-50 pr-1">
          <FwTooltip>
            <template #trigger>
              <span
                class="mr-2 w-10 h-10 flex items-center justify-center cursor-pointer"
                @click="uploadFile"
              >
                <input type="file" name="" id="fileupload" hidden @change="handleFileUpload" />
                <PlusCircleIcon class="w-7 h-7" />
              </span>
            </template>
            <template #content>
              <span class="text-sm">选择附件</span>
            </template>
          </FwTooltip>

          <FwTooltip>
            <template #trigger>
              <span
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="{
                  'pointer-events-none bg-primary/50':
                    (!input && !uploadedImages.length) || !canPress,
                  'bg-primary hover:bg-primary/70': input || uploadedImages.length
                }"
                @click="sendMessage"
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
  </div>
</template>
<script lang="ts" setup>
import { ArrowRightIcon, PlusCircleIcon, StopCircleIcon } from '@heroicons/vue/24/outline'
import FwTooltip from './tooltip/fw-tooltip.vue'
import { defineProps, ref } from 'vue'
import { SparklesIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import LoadingIcon from './icons/loading-icon.vue'
import { uploadFile as apiUploadFile } from '@/api/file'
import { useEventListener, useEventBus } from '@vueuse/core'
import { Button } from './ui/button'

// 定义 props
const props = defineProps({
  showClear: Boolean
})

const input = ref('')
const focus = ref(false)
const textAreaHeight = ref(50)
const uploadedImages = ref<string[]>([])
const msgSend = useEventBus<string>('message-send')
const clearContextBus = useEventBus('clear-context')
const sendMessageBtn = useEventBus<boolean>('enable-input')
const heightChange = useEventBus<number>('height-change')
const showStopGenerate = useEventBus<boolean>('show-stop-generate')
const stopGenerate = useEventBus<boolean>('stop-generate')
const canPress = ref(true)
const showStopButton = ref(false)

sendMessageBtn.on((v: boolean) => {
  canPress.value = v
})
showStopGenerate.on((v: boolean) => {
  showStopButton.value = v
  if (v) {
    totalHeightChange(40)
  } else {
    totalHeightChange()
  }
})

const stopGenerateFun = () => {
  stopGenerate.emit(true)
}

const onInput = () => {
  const textarea = document.getElementById('message-input') as HTMLTextAreaElement
  textarea.style.height = 'auto'
  if (textarea.scrollHeight < 450) {
    if (textarea.scrollHeight < 50) {
      textarea.style.height = '50px'
      totalHeightChange()
    } else {
      textarea.style.height = textarea.scrollHeight + 'px'
      totalHeightChange()
    }
  } else {
    textarea.style.height = '450px'
    totalHeightChange()
  }
  if (textarea.scrollHeight < 50) {
    textAreaHeight.value = 50
  } else {
    textAreaHeight.value = textarea.scrollHeight
  }
}

const totalHeightChange = (extraHeight?: number) => {
  const textarea = document.getElementById('message-input') as HTMLTextAreaElement
  let h = parseInt(textarea.style.height, 10) || 0 // 将字符串转换为整数，默认值为0
  if (uploadedImages.value.length > 0) {
    h += 80
  }

  if (extraHeight) {
    h += extraHeight
  }

  heightChange.emit(h) // 触发高度变化事件
}

const resetTextarea = () => {
  const textarea = document.getElementById('message-input') as HTMLTextAreaElement
  textarea.style.height = '50px'
  textAreaHeight.value = 50
}

const clearContext = () => {
  clearContextBus.emit()
}

const sendMessage = () => {
  if (input.value) {
    if (uploadedImages.value.length > 0) {
      msgSend.emit(input.value + '\n' + updateImages())
    } else {
      msgSend.emit(input.value)
    }
    input.value = ''
    uploadedImages.value = []
    resetTextarea()
    totalHeightChange(40)
  }
}

const updateImages = () => {
  uploadedImages.value = uploadedImages.value.map((image) => {
    if (!image.startsWith('http://') && !image.startsWith('https://')) {
      // 如果 image 不以 'http://' 或 'https://' 开头，那么添加当前的 host 和协议
      return window.location.protocol + '//' + window.location.host + image
    } else {
      // 如果 image 已经是一个完整的 URL，那么不做任何改变
      return image
    }
  })

  return uploadedImages.value.join('\n')
}
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.isComposing) return
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
useEventListener('keydown', handleKeyDown)

const removeUploadedImage = (idx: number) => {
  uploadedImages.value.splice(idx, 1)
  totalHeightChange()
}

const uploadFile = () => {
  document.getElementById('fileupload')?.click()
}

const uploading = ref(false)
const handleFileUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    const formData = new FormData()
    formData.append('file', files[0])
    uploading.value = true
    try {
      const res = await apiUploadFile(formData)
      uploadedImages.value.push(res.url)
      totalHeightChange()
    } catch (error) {
      console.log('upload failed', error)
    } finally {
      uploading.value = false
    }
  }
}
</script>
