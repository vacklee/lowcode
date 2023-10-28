<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import FixedPixelInput from './Controls/FixedPixelInput.vue'

const { useVirsualCss, currentNode } = usePageNode()
const width = useVirsualCss(() => currentNode.value!, 'width')
const height = useVirsualCss(() => currentNode.value!, 'height')
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
    'padding-margin padding-margin';
}
</style>
