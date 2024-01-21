<script setup lang="ts">
import { PhMoon, PhSun } from '@phosphor-icons/vue'
import { useDark, useToggle } from '@vueuse/core'
import Tooltip from '@/components/Tooltip.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Tooltip msg="Theme">
    <button @click="toggleDark()">
      <component :is="isDark ? PhMoon : PhSun" size="26" weight="bold"/>
    </button>
  </Tooltip>
</template>