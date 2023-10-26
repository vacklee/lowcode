<script lang="ts" setup>
import { AppComponent } from '@/core/data/component'
import { usePageNode } from '@/core/hooks/use-page-node'
import { computed } from 'vue'
import RenderNode from '../Nodes/RenderNode.vue'
import SelectNode from '../Nodes/SelectNode.vue'

const { insertNode } = usePageNode()

const props = defineProps<{
  node: AppComponent
}>()

const wrapStyle = computed(() => ({
  '--rows': props.node.baseAttrs.rows,
  '--row-gap': props.node.baseAttrs.rowGap,
  '--col-gap': props.node.baseAttrs.colGap
}))

const nodes = computed(() => {
  const _nodes = props.node.nodes
  const rows = props.node.baseAttrs.rows
  while (_nodes.length < rows) {
    insertNode(props.node.instanceID, 'GRID_LAYOUT_ROW')
  }
  return _nodes
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
