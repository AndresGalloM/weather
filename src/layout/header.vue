<script setup lang="ts">
import { PhList, PhX } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import Menu from '@/components/Menu.vue'

const { date } = defineProps({date: String})
const isMobile = useMediaQuery('(max-width: 768px)')
const open = ref(false)
</script>

<template>
  <header class="top-0 w-full py-4 px-6">
    <nav class="flex justify-between items-center">
      <section>
        <h1 class="text-xl font-bold">Weather</h1>
        <span class="text-sm text-gray-500 font-bold">{{ date }}</span>
      </section>

      <section class="hidden md:flex md:flex-row md:gap-2.5">
        <Menu/>
      </section>

      <button class="block md:hidden" @click="open = true">
        <PhList size="26" weight="bold"/>
      </button>

      <section 
        v-if="isMobile" 
        v-show="open" 
        class="absolute top-0 left-0 flex flex-row gap-2.5 justify-center w-full bg-white dark:bg-[#19191d] py-4 px-6"
      >
        <Menu/>
        <button @click="open = false">
          <PhX size="26" weight="bold"/>
        </button>
      </section>
    </nav>
  </header>
</template>