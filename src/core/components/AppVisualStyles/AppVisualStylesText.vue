<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import FixedPixelInput from './Controls/FixedPixelInput.vue'
import ColorInput from './Controls/ColorInput.vue'
import FontWeightSelect from './Controls/FontWeightSelect.vue'
import AppCauselRadio from '../AppCauselRadio.vue'
import AppIcon from '../AppIcon.vue'
import { textAlignOptions } from '@/core/config/select'

const { useVirsualCss, currentNode } = usePageNode()
const fontSize = useVirsualCss(() => currentNode.value!, 'fontSize')
const color = useVirsualCss(() => currentNode.value!, 'color')
const fontWeight = useVirsualCss(() => currentNode.value!, 'fontWeight')
const lineHeight = useVirsualCss(() => currentNode.value!, 'lineHeight')
const textAlign = useVirsualCss(() => currentNode.value!, 'textAlign')
</script>

<template>
  <div :class="$style.box">
    <FixedPixelInput
      v-model="fontSize"
      title="字号"
      style="grid-area: font-size"
    >
      <span>A</span>
    </FixedPixelInput>

    <ColorInput v-model="color" />
    <FontWeightSelect v-model="fontWeight" />

    <FixedPixelInput
      v-model="lineHeight"
      title="行高"
      style="grid-area: line-height"
    >
      <AppIcon icon="t-icon-style-line-height" />
    </FixedPixelInput>

    <AppCauselRadio
      v-model="textAlign"
      :options="textAlignOptions"
      style="grid-area: text-align"
    />
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
