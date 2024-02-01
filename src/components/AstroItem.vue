<script setup lang="ts">
type AstroInfo = {
  icon: unknown,
  astroTime: String,
  astroElement: String
}

const { icon, astroTime, astroElement } = defineProps<AstroInfo>()
</script>

<template>
  <div class="py-6 px-4 rounded-2xl text-center">
    <component :is="icon" size="30" class="inline mb-4"/>
    <h4 class="text-base font-bold">{{ astroTime }}</h4>
    <p class="text-sm opacity-70">{{ astroElement }}</p>
  </div>
</template>