<script setup lang="ts">
import { Forescat } from '@/interfaces/forescatday'
import { ref, watch } from 'vue'

const measurement = ref<'C' | 'F'>('C')
const temp = ref()
const wind = ref()
const maxTemp = ref()
const minTemp = ref()
const avgTemp = ref()
const buttonActive = ref(false)

const {
  name,
  country,
  region,
  condition_text,
  condition_icon,
  humidity,
  change_rain,
  ...props
} = defineProps<Forescat>()

watch(measurement, newValue => {
  buttonActive.value = !buttonActive.value
  if (newValue === 'C') {
    temp.value = props.temp_c
    wind.value = props.wind_kph + ' Km/h'
    maxTemp.value = props.maxtemp_c
    minTemp.value = props.mintemp_c
    avgTemp.value = props.avgtemp_c
  } else {
    temp.value = props.temp_f
    wind.value = props.wind_mph + ' Mph'
    maxTemp.value = props.maxtemp_f
    minTemp.value = props.mintemp_f
    avgTemp.value = props.avgtemp_f
  }
}, { immediate: true })
</script>

<template>
  <article>
    <h1 class="text-6xl font-bold">{{ name }}</h1>
    <p class="text-lg opacity-60">{{ country }} - {{ region }}</p>

    <div class="mt-4">
      <div class="text-xl flex items-center gap-2">
        <img :src="condition_icon" :alt="condition_text" class="size-9">
        <p class="text-4xl">{{ temp }}</p>
        <div class="text-lg self-start">
          <button class="p-0 opacity-60" :class="{ isActive: buttonActive}" @click="measurement = 'C'">°C</button> |
          <button class="p-0 opacity-60" :class="{ isActive: !buttonActive}" @click="measurement = 'F'">°F</button>
        </div>
      </div>
      <span class="text-base opacity-70 block mb-5">{{ condition_text }}</span>
      <div class="grid min-[365px]:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 opacity-90">
        <p><span class="font-bold">Humidity:</span> {{ humidity }}%</p>
        <p><span class="font-bold">Wind:</span> {{ wind }}</p>
        <p><span class="font-bold">Temp max:</span> {{ maxTemp }} °{{ measurement }}</p>
        <p><span class="font-bold">Temp min:</span> {{ minTemp }} °{{ measurement }}</p>
        <p><span class="font-bold">Change of rain:</span> {{ change_rain }}%</p>
        <p><span class="font-bold">Average temp:</span> {{ avgTemp }} °{{ measurement }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.isActive {
  opacity: 1;
}
</style>