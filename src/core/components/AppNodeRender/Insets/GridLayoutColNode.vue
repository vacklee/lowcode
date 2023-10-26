<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import { computedCellWidth } from 'core/utils/unit'
import NomalContainerNode from './NomalContainerNode.vue'
import { usePageNode } from '@/core/hooks/use-page-node'
import { createComponentInstance } from '@/core/config/components'
import { useCanvasData } from '@/core/hooks/use-app-data'

const { watchNode, emitNode, getParentNode } = usePageNode()
const { toPx } = useCanvasData()

const props = defineProps<{
  node: AppComponent
}>()

const colStyle = computed(() => ({
  ...computedCellWidth(props.node.baseAttrs.colWidth.mobile, '--mobile-', toPx),
  ...computedCellWidth(props.node.baseAttrs.colWidth.pc, '--pc-', toPx)
}))

/** 添加删除行和列 */
watchNode<'top' | 'left' | 'right' | 'bottom'>(
  props.node,
  'row-col',
  ({ value }) => {
    const parentNode = getParentNode(props.node)!

    if (value === 'top' || value === 'bottom') {
      // 添加行的逻辑
      emitNode(parentNode, 'row', value)
      return
    }

    const newNode = createComponentInstance('GRID_LAYOUT_COL')
    let currentIndex = parentNode.nodes.indexOf(props.node)
    if (value === 'right') {
      currentIndex += 1
    }
    parentNode.nodes.splice(currentIndex, 0, newNode)
    parentNode.baseAttrs.cols += 1
  }
)
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
