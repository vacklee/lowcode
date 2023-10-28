<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import FontSizeInput from './Controls/FontSizeInput.vue'
import ColorInput from './Controls/ColorInput.vue'
import FontWeightSelect from './Controls/FontWeightSelect.vue'

const { useVirsualCss, currentNode } = usePageNode()
const fontSize = useVirsualCss(() => currentNode.value!, 'fontSize')
const color = useVirsualCss(() => currentNode.value!, 'color')
const fontWeight = useVirsualCss(() => currentNode.value!, 'fontWeight')
</script>

<template>
  <div :class="$style.box">
    <FontSizeInput v-model="fontSize" />
    <ColorInput v-model="color" />
    <FontWeightSelect v-model="fontWeight" />
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
