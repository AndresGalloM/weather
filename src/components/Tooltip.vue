<script setup lang="ts">
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from 'radix-vue'

const { msg } = defineProps<{ msg: string }>()
</script>

<template>
  <TooltipProvider :delay-duration="50" disable-closing-trigger disableHoverableContent>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot></slot>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          as-child
          side="bottom"
          class="TooltipContent duration-1000 block border text-sm font-semibold bg-white dark:bg-[#353540] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-lg px-2 py-1.5 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
          :side-offset="5"
        >
          <span>{{ msg }}</span>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style scoped>
.TooltipContent {
  transform-origin: var(--radix-tooltip-content-transform-origin);
  animation: scaleIn .1s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    scale: 0;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
</style>