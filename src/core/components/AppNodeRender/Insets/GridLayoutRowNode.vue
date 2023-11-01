<script lang="ts" setup>
import { computed, ref } from 'vue'
import { AppComponent } from '@/core/data/component'
import SelectNode from '../Nodes/SelectNode.vue'
import RenderNode from '../Nodes/RenderNode.vue'
import { usePageNode } from '@/core/hooks/use-page-node'
import { createComponentInstance } from '@/core/config/components'
import { cloneDeep } from 'lodash'
import { delay } from '@/core/utils/common'

const { insertNode, watchNode, getParentNode, spliceNode, setNodeAttrs } =
  usePageNode()

const props = defineProps<{
  node: AppComponent
}>()

const rowStyles = computed(() => ({
  '--cols': props.node.baseAttrs.cols,
  '--col-gap': props.node.baseAttrs.colGap,
  '--align-items': props.node.baseAttrs.alignItems
}))

const autoNodeStop = ref(false)
const nodes = computed(() => {
  const _nodes = props.node.nodes
  const cols = props.node.baseAttrs.cols

  if (!autoNodeStop.value) {
    if (_nodes.length > cols) {
      spliceNode(props.node, cols)
    }

    while (_nodes.length < cols) {
      insertNode(props.node.instanceID, 'GRID_LAYOUT_COL')
    }
  }

  return _nodes
})

// 添加行
watchNode<'top' | 'bottom'>(props.node, 'row', ({ value }) => {
  const parent = getParentNode(props.node)!
  const newNode = createComponentInstance('GRID_LAYOUT_ROW')
  newNode.baseAttrs = cloneDeep(props.node.baseAttrs)

  let currentIndex = parent.nodes.indexOf(props.node)
  if (value === 'bottom') {
    currentIndex += 1
  }
  parent.nodes.splice(currentIndex, 0, newNode)
})

// 删除了列
watchNode<AppComponent>(props.node, 'delete-node', () => {
  autoNodeStop.value = true
  setNodeAttrs(
    props.node.instanceID,
    'baseAttrs',
    'cols',
    props.node.baseAttrs.cols - 1
  )
  delay(0).then(() => {
    autoNodeStop.value = false
  })
})
</script>

<template>
  <div :class="$style.row" :style="rowStyles">
    <SelectNode :id="node.instanceID" />
    <RenderNode :nodes="nodes" />
  </div>
</template>

<style lang="scss" module>
.row {
  --cols: 1;
  --col-gap: auto;
  --align-items: auto;

  display: flex;
  column-gap: var(--col-gap);
  align-items: var(--align-items);
  position: relative;
}
</style>
