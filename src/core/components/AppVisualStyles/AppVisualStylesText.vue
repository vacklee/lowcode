<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import FontSizeInput from './Controls/FontSizeInput.vue'

const { useVirsualCss, currentNode } = usePageNode()
const fontSize = useVirsualCss(() => currentNode.value!, 'fontSize')
</script>

<template>
  <div :class="$style.box">
    <FontSizeInput v-model="fontSize" />
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-mini $spacing-small;
  display: grid;
  gap: $spacing-small;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'font-size color'
    'font-weight line-height'
    'text-align text-align';
}
</style>
