<script lang="ts" setup>
import { AppComponent } from '@/core/data/component'
import { usePageNode } from '@/core/hooks/use-page-node'
import { computed, ref } from 'vue'
import RenderNode from '../Nodes/RenderNode.vue'
import SelectNode from '../Nodes/SelectNode.vue'
import { delay } from '@/core/utils/common'

const { insertNode, watchNode, emitNode, setNodeAttrs } = usePageNode()

const props = defineProps<{
  node: AppComponent
}>()

const wrapStyle = computed(() => ({
  '--rows': props.node.baseAttrs.rows,
  '--row-gap': props.node.baseAttrs.rowGap,
  '--col-gap': props.node.baseAttrs.colGap
}))

const autoNodeStop = ref(false)
const nodes = computed(() => {
  const _nodes = props.node.nodes
  if (!autoNodeStop.value) {
    const rows = props.node.baseAttrs.rows
    while (_nodes.length < rows) {
      insertNode(props.node.instanceID, 'GRID_LAYOUT_ROW')
    }
  }
  return _nodes
})

/** 添加行 */
watchNode<'top' | 'bottom'>(props.node, 'row', ({ value }) => {
  const targetNode =
    value === 'top' ? nodes.value[0] : nodes.value[nodes.value.length - 1]
  if (targetNode) {
    emitNode(targetNode, 'row', value)
  } else {
    setNodeAttrs(props.node.instanceID, 'baseAttrs', 'rows', 1)
  }
})

/** 删除了行 */
watchNode(props.node, 'delete-node', () => {
  autoNodeStop.value = true
  setNodeAttrs(
    props.node.instanceID,
    'baseAttrs',
    'rows',
    props.node.baseAttrs.rows - 1
  )
  delay(0).then(() => {
    autoNodeStop.value = false
  })
})
</script>

<template>
  <div :class="$style.grid_layout" :style="wrapStyle">
    <SelectNode :id="node.instanceID" />
    <RenderNode :nodes="nodes" />
  </div>
</template>

<style lang="scss" module>
.grid_layout {
  --rows: 1;
  --row-gap: 0px;
  --col-gap: 0px;

  display: flex;
  flex-direction: column;
  row-gap: var(--row-gap);
  column-gap: var(--col-gap);
  position: relative;
}
</style>
