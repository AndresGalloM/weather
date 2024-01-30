<script setup lang="ts">
import { PhArrowUpRight } from '@phosphor-icons/vue'

const { name, region, country } = defineProps<{
  name: String,
  region: String,
  country: String
}>()
</script>

<template>
  <div class="flex justify-between">
    <p class="text-base font-semibold pr-3">{{ name }}</p>
    <PhArrowUpRight size="16" weight="bold" />
  </div>
  <p class="text-xs opacity-70">{{ region }} - {{ country }}</p>
</template>