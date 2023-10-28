<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import FixedPixelInput from './Controls/FixedPixelInput.vue'
import MarginPadding from './Controls/MarginPadding.vue'

const { useVirsualCss, currentNode } = usePageNode()
const width = useVirsualCss(() => currentNode.value!, 'width')
const height = useVirsualCss(() => currentNode.value!, 'height')
const margin = useVirsualCss(() => currentNode.value!, 'margin')
const padding = useVirsualCss(() => currentNode.value!, 'padding')
</script>

<template>
  <div :class="$style.box">
    <FixedPixelInput
      v-model="width"
      title="宽度"
      :hide-placeholder="true"
      fixed-unit="none"
      style="grid-area: width"
    >
      <span>宽</span>
    </FixedPixelInput>

    <FixedPixelInput
      v-model="height"
      title="高度"
      :hide-placeholder="true"
      fixed-unit="none"
      style="grid-area: height"
    >
      <span>高</span>
    </FixedPixelInput>

    <MarginPadding
      v-model:margin="margin"
      v-model:padding="padding"
      style="grid-area: margin-padding"
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
    'width height'
    'margin-padding margin-padding';
}
</style>
