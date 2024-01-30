<script setup lang="ts">
import { PhMapPin } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '@/components/Toast.vue'
import Tooltip from '@/components/Tooltip.vue'

const router = useRouter()
const toast = ref()

const showPosition = (position: GeolocationPosition) => {
  const { latitude, longitude } = position.coords

  router.push({
    name: 'location',
    params: {
      location: latitude + ',' + longitude
    }
  })
}

const handleError = () => {
  toast.value.showToast()
}

const geolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError)
  }
}
</script>

<template>
  <Toast ref="toast"/>

  <Tooltip msg="Geolocation">
    <button @click="geolocation">
      <PhMapPin size="24" weight="bold"/>
    </button> 
  </Tooltip>
</template>