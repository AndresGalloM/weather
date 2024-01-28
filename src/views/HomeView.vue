<script setup lang="ts">
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { watch, ref, Ref } from 'vue'
import { WeatherData } from '@/interfaces/weather'
import { weatherForecast, fetcher } from '@/services/weather'
import Astro from '@/components/Astro.vue'
import Cobe from '@/components/Cobe.vue'
import Summary from '@/components/Summary.vue'
import useSWRV from 'swrv'

const emit = defineEmits(['passDate'])
const router = useRouter()
const route = useRoute()
const location = route.params.location || 'Medellin'
const url = ref(`${weatherForecast}${location}`)

const { data, error }: { data: Ref<WeatherData>, error: Ref<Error | undefined> } = useSWRV(url, fetcher, {
  refreshInterval: 60000,
  revalidateOnFocus: false,
  shouldRetryOnError: false
})

watch(error, () => {
  if (error.value) {
    router.back()
  }
})

watch(data, () => {
  emit('passDate', data.value.forecast.forecastday[0].date)
})

onBeforeRouteUpdate(to => {
  url.value = `${weatherForecast}${to.params.location || 'Medellin'}`
})
</script>

<template>
  <section class="w-full h-full flex justify-center items-center md:px-6 mt-10">
    <div>
      <Summary
      :name="data.location.name"
      :region="data.location.region"
      :country="data.location.country"
      :condition_text="data.current.condition.text"
      :condition_icon="data.current.condition.icon"
      :temp_c="data.current.temp_c"
      :temp_f="data.current.temp_f"
      :wind_mph="data.current.wind_mph"
      :wind_kph="data.current.wind_kph"
      :humidity="data.current.humidity"
      :maxtemp_c="data.forecast.forecastday[0].day.maxtemp_c"
      :maxtemp_f="data.forecast.forecastday[0].day.maxtemp_f"
      :mintemp_c="data.forecast.forecastday[0].day.mintemp_c"
      :mintemp_f="data.forecast.forecastday[0].day.mintemp_f"
      :avgtemp_c="data.forecast.forecastday[0].day.avgtemp_c"
      :avgtemp_f="data.forecast.forecastday[0].day.avgtemp_f"
      :change_rain="data.forecast.forecastday[0].day.daily_chance_of_rain"
      />

      <Astro :astro="data.forecast.forecastday[0].astro"/>
      <p class="text-center opacity-70">
        <span class="font-bold">Moon phase:</span> {{ data.forecast.forecastday[0].astro.moon_phase }}
      </p>
    </div>

    <Cobe :latitude="data.location.lat" :longitude="data.location.lon" class="hidden md:block"/>
  </section>
</template>