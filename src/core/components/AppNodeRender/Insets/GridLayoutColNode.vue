<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import { computedCellWidth } from 'core/utils/unit'
import NomalContainerNode from './NomalContainerNode.vue'

const props = defineProps<{
  node: AppComponent
}>()

const colStyle = computed(() => ({
  ...computedCellWidth(props.node.baseAttrs.colWidth.mobile, '--mobile-'),
  ...computedCellWidth(props.node.baseAttrs.colWidth.pc, '--pc-')
}))
</script>

<template>
  <div :class="$style.col" :style="colStyle">
    <NomalContainerNode :node="node" />
  </div>
</template>

<style lang="scss" module>
.col {
  :global(.platform-is-pc) & {
    --flex: var(--pc-flex);
    --width: var(--pc-width);
  }

  :global(.platform-is-mobile) & {
    --flex: var(--mobile-flex);
    --width: var(--mobile-width);
  }

  flex: var(--flex);
  width: var(--width);
  position: relative;
}
</style>
