<script setup lang="ts">
import { PhGithubLogo } from '@phosphor-icons/vue'
import Tooltip from '@/components/Tooltip.vue'
</script>

<template>
  <Tooltip msg="Github">
    <button>
      <a href="https://github.com/AndresGalloM/weather" target="_blank">
        <PhGithubLogo size="24" weight="bold"/>
      </a>
    </button>
  </Tooltip>
</template>