<script setup lang="ts">
import { SearchCity } from '@/interfaces/search'
import SearchItem from '@/components/SearchItem.vue'

const emit = defineEmits(['closePopover'])
const { listLocation } = defineProps<{
  listLocation: SearchCity[]
}>()
</script>

<template>
  <div
    class="flex flex-col gap-2 p-1 mt-3 w-full h-auto overflow-auto"
    style="--scrollbar-size: 10px"
    id="list"
  >
    <RouterLink 
      v-for="city, index in listLocation"
      :key="index"
      class="leading-[18px] border-2 rounded-lg p-2 hover:border-blue-500 hover:duration-300"
      :to="{ name: 'location',  params: { location: `${city.lat},${city.lon}` } }"
      @click="emit('closePopover')"
    >
      <SearchItem :name="city.name" :region="city.region" :country="city.country"/>
    </RouterLink>
  </div>
</template>


<style scoped>
#list {
  overflow: auto;
  flex: 1;
  scroll-behavior: smooth;
}

#list::-webkit-scrollbar {
  width: 3px;     /* Tamaño del scroll en vertical */
  height: 8px;    /* Tamaño del scroll en horizontal */
}

#list::-webkit-scrollbar-thumb {
  background: #78787857;
} 

#list::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
}
</style>