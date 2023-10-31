<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import BorderInput from './Controls/BorderInput.vue'
import BackgroundInput from './Controls/BackgroundInput.vue'

const { useVirsualCss, currentNode } = usePageNode()
const border = useVirsualCss(() => currentNode.value!, 'border')
const background = useVirsualCss(() => currentNode.value!, 'background')
</script>

<template>
  <div :class="$style.box">
    <BorderInput v-model="border" />
    <BackgroundInput v-model="background" />
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-mini $spacing-small;
  display: flex;
  flex-direction: column;
  gap: $spacing-mini;
}
</style>
