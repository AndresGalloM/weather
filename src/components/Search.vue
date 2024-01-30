<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue'
import { fetcher, searchLocation } from '@/services/weather'
import { PhMagnifyingGlass, PhX } from '@phosphor-icons/vue'
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
  <DialogRoot v-model:open="openStatePopover">
    <Tooltip msg="Search">
      <DialogTrigger>
        <PhMagnifyingGlass size="24" weight="bold"/>
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay class="bg-[#000000d5] data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
      <DialogContent
        :aria-describedby="undefined"
        class="data-[state=open]:animate-contentShow fixed flex flex-col top-5 md:top-10 left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] rounded-[6px] bg-white dark:bg-[#343436f4] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <div class="flex flex-col gap-2.5">
          <DialogTitle class="text-mauve12 text-lg leading-[19px] font-semibold mb-1.5">
            Search
          </DialogTitle>
          <fieldset class="flex gap-5 items-center">
            <input
              id="search"
              placeholder="Type location to search"
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

        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex size-[28px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <PhX size="25" weight="bold"/>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>