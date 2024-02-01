<script setup lang="ts">
import { Astro } from '@/interfaces/astro'
import { PhMoon, PhCloudMoon, PhSun, PhCloudSun } from '@phosphor-icons/vue'
import AstroItem from '@/components/AstroItem.vue'

const { astro } = defineProps<{ astro: Astro }>()
</script>

<template>
  <article class="grid grid-cols-2 min-[500px]:grid-cols-4 gap-2 mt-4 justify-center">
    <AstroItem :icon="PhMoon" :astro-time="astro.sunrise" astro-element="Sunrise"/>
    <AstroItem :icon="PhCloudSun" :astro-time="astro.sunset" astro-element="Sunset"/>
    <AstroItem :icon="PhSun" :astro-time="astro.moonrise" astro-element="Moonrise"/>
    <AstroItem :icon="PhCloudMoon" :astro-time="astro.moonset" astro-element="Moonset"/>
  </article>
</template>