<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import BorderInput from './Controls/BorderInput.vue'

const { useVirsualCss, currentNode } = usePageNode()
const border = useVirsualCss(() => currentNode.value!, 'border')
</script>

<template>
  <div :class="$style.box">
    <BorderInput v-model="border" />
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-mini $spacing-small;
}
</style>
