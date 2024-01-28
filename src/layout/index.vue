<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/layout/header.vue'

const date = ref()
const passDate = (d: string) => {
  date.value = d
}
</script>

<template>
  <div class="max-w-[1800px] w-full m-auto">
    <Header :date="date"/>
    <main class="h-full w-full">
      <router-view @passDate="passDate"/>
    </main>
  </div>
</template>