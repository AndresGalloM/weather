<script setup lang="ts">
import { ref } from 'vue'
import { ToastDescription, ToastProvider, ToastRoot, ToastViewport } from 'radix-vue'

const open = ref(false)
const timerRef = ref(0)

const showToast = () => {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => {
    open.value = true
  }, 100)
}

defineExpose({ showToast })
</script>

<template>
  <ToastProvider>
    <ToastRoot
      v-model:open="open"
      class="bg-[#343436e6] text-white w-max m-auto rounded-2xl py-3 px-6 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
    >
      <ToastDescription as-child>
        <p class="text-sm font-medium">User denied Geolocation</p>
      </ToastDescription>
    </ToastRoot>
    <ToastViewport class="[--viewport-padding:_25px] fixed bottom-0 right-0 w-full flex flex-col p-[var(--viewport-padding)] gap-[10px] m-0 list-none z-[2147483647] outline-none" />
  </ToastProvider>
</template>