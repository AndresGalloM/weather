<script setup lang="ts">
import { fetcher, searchLocation } from '@/services/weather'
import { PhMagnifyingGlass, PhX } from '@phosphor-icons/vue'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import { ref } from 'vue'
import { SearchCity } from '@/interfaces/search'
import debounce from 'debounce'
import ScrollArea from '@/components/ScrollArea.vue'
import Tooltip from '@/components/Tooltip.vue'

const listLocation = ref<SearchCity[]>([])
const openStatePopover = ref()

const searchOnChange = debounce(async (e) => {
  if (e.target.value.length <= 2) return
  
  const url = `${searchLocation}${e.target.value}`
  listLocation.value = await fetcher(url)
}, 300)

const closePopover = () => {
  openStatePopover.value = false
  listLocation.value = []
}
</script>

<template>
  <PopoverRoot >
    <PopoverTrigger
      aria-label="Update dimensions"
      class="p-0"
    >
      <Tooltip msg="Search">
        <button class="h-full">
          <PhMagnifyingGlass size="24" weight="bold"/>
        </button>
      </Tooltip>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        align="end"
        :side-offset="5"
        class="PopoverContent rounded-lg p-5 text-current min-w-[280px] bg-white dark:bg-[#343436f4] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col gap-2.5">
          <p class="text-mauve12 text-base leading-[19px] font-semibold mb-2.5">
            Search
          </p>
          <fieldset class="flex gap-5 items-center">
            <input
              id="search"
              placeholder="Location"
              @input="searchOnChange"
              autocomplete="off"
              class="w-full bg-transparent rounded-lg px-2.5 py-1.5 border-2 focus:border-blue-500 text-sm outline-none"
            >
          </fieldset>
        </div>

        <ScrollArea 
          :listLocation="listLocation"
          @closePopover="closePopover"
        />

        <PopoverClose
          class="rounded-full size-[25px] inline-flex items-center justify-center absolute top-[5px] right-[5px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-pointer"
          aria-label="Close"
        >
          <PhX size="16" weight="bold"/>
        </PopoverClose>
        <PopoverArrow class="fill-white dark:fill-[#343436e6]"/>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>