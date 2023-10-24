<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const iconName = computed(() => `#c-icon-${props.name}`)
</script>

<template>
  <svg :class="$style.icon">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="scss" module>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
