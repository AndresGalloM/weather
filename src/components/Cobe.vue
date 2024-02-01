<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import createGlobe from 'cobe'

type Location = {
  latitude: number,
  longitude: number
} 

const props = defineProps<Location>()

const canvasRef = ref()
const focusRef = ref([0, 0])
const res = ref()

const locationToAngles = (lat: number, long: number) => {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

const onGlobe = () => {
  let width = 0;
  let currentPhi = 0;
  let currentTheta = 0;
  const doublePi = Math.PI * 2;

  const onResize = () => canvasRef.value && (width = canvasRef.value.offsetWidth)
  window.addEventListener("resize", onResize)
  onResize()

  const globe = createGlobe(canvasRef.value, {
    devicePixelRatio: 1,
    width: width,
    height: width,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 10,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.2314, 0.5098, 0.9647],
    glowColor: [0, 0, 0],
    opacity:0.9,
    scale: 1.11,
    markers: [
      { location: [props.latitude, props.longitude], size: 0.06 },
    ],
    onRender: (state) => {
      state.phi = currentPhi
      state.theta = currentTheta
      const [focusPhi, focusTheta] = focusRef.value
      const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
      const distNegative = (currentPhi - focusPhi + doublePi) % doublePi

      if (distPositive < distNegative) {
        currentPhi += distPositive * 0.08
      } else {
        currentPhi -= distNegative * 0.08
      }

      currentTheta = currentTheta * 0.92 + focusTheta * 0.08
      state.width = width
      state.height = width
    }
  })

  setTimeout(() => canvasRef.value.style.opacity = "1")
  return () => { 
    globe.destroy();
    window.removeEventListener("resize", onResize);
  }
}

onMounted(() => {
  focusRef.value = locationToAngles(props.latitude, props.longitude)
  res.value = onGlobe()
})

watch(props, () => {
  res.value()
  focusRef.value = locationToAngles(props.latitude, props.longitude)
  onGlobe()
})
</script>

<template>
  <article class="w-full max-w-[600px] aspect-square relative">
    <canvas 
      ref="canvasRef"
      :style="{
        width: '100%',
        height: '100%',
        contain: 'layout paint size',
        opacity: 0,
        transition: 'opacity 1s ease'
       }"
    />
  </article>
</template>